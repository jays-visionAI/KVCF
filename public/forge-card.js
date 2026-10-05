/* AE-rendered choreography with accessible native web hit areas. */
(()=>{
 'use strict';
 const card=document.querySelector('#p-home .nh-forge'),scene=card?.querySelector('.bf-scene');
 if(!scene)return;
 const video=scene.querySelector('video'),nodes=[...scene.querySelectorAll('.bf-node')],caption=scene.querySelector('.bf-caption'),toggle=document.querySelector('.nh-motion-toggle');
 // WebKit uses HEVC with alpha; Chromium/Firefox use VP9 with alpha.
 const ua=typeof navigator==='undefined'?'':navigator.userAgent;
 if(/AppleWebKit/.test(ua)&&!/Chrome|Chromium|Edg|OPR|Firefox/.test(ua))video.src='/assets/blueforge/system-alpha-v7.mov';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const codeLines=[...scene.querySelectorAll('.bf-code-lines span')];
 const codeText=codeLines.map(line=>line.textContent);
 const codeLength=codeText.reduce((total,line)=>total+line.length,0);
 codeLines.forEach(line=>{line.textContent='';line.style.width='100%';});
 let typedLength=-1;
 const descriptions=['AI 모델과 블루프린트로 시스템 설계','웹·앱 인터페이스 구성','ForgeDB · 인증 · 저장소 연결','외부 서비스 연동과 배포'];
 let visible=false,hover=false,focused=false,selected=-1,fallback=false;
 let fallbackTime=0,fallbackTimer=0,lastFallbackTick=0;
 const order=[0,1,2,3]; // AI, App, Data/Auth, then Deploy
 const systemStart=6.3;
 const typingEnd=4.8; // Leave about one second to read the completed terminal before the diagram.
 function tick(){paint();}
 function interaction(){globalThis.KVCFCardInteraction=visible&&!document.hidden&&(hover||focused);}
 function paint(){
  const time=fallback?fallbackTime:video.currentTime;
  const system=reduced.matches||time>=systemStart;
  const nextLength=Math.min(codeLength,Math.floor(time/typingEnd*codeLength));
  if(nextLength!==typedLength){
   let remaining=nextLength;
   codeLines.forEach((line,i)=>{const count=Math.min(codeText[i].length,remaining);line.textContent=codeText[i].slice(0,count);remaining-=count;});
   typedLength=nextLength;
  }
  scene.classList.toggle('is-system',system);scene.classList.toggle('is-static',reduced.matches||fallback);
  scene.classList.toggle('is-fallback',fallback);
  if(fallback)scene.classList.toggle('is-intro',!reduced.matches&&!system);
  // Fit all four steps to the actual system segment, including the final Data step.
  const end=Number.isFinite(video.duration)&&video.duration>systemStart?video.duration:12;
  const smooth=v=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v);};
  // Fade the diagram and its labels together across the full-loop boundary.
  scene.style.opacity=String(reduced.matches||fallback?1:Math.min(smooth(time/.45),smooth((end-time)/.33)));
  const step=Math.min(3,Math.max(0,Math.floor((time-systemStart)/(end-systemStart)*4)));
  const active=selected>=0?selected:(!reduced.matches?order[step]:-1);
  // Match the shorter terminal typing sequence while preserving diagram pacing.
  video.playbackRate=system&&!reduced.matches&&!fallback?.55:1.5;
  nodes.forEach((n,i)=>{n.tabIndex=system?0:-1;n.disabled=!system;n.classList.toggle('is-active',i===active);});
  caption.textContent=system?(active>=0?descriptions[active]:'AI · 화면 · 데이터 · 배포, 하나의 시스템으로 연결'):'';
 }
 function sync(){
  interaction();paint();
  const paused=toggle?.getAttribute('aria-pressed')==='true';
  if(!visible||document.hidden||reduced.matches||paused){video.pause();clearInterval(fallbackTimer);fallbackTimer=0;return;}
  if(fallback){
   video.pause();
   if(!fallbackTimer){lastFallbackTick=performance.now();fallbackTimer=setInterval(()=>{const now=performance.now();fallbackTime=(fallbackTime+(now-lastFallbackTick)/1000*(fallbackTime>=systemStart?.55:1.5))%12;lastFallbackTick=now;paint();},50);}
   return;
  }
  video.play().catch(error=>{if(error.name!=='AbortError'&&visible&&!document.hidden){fallback=true;sync();}});
 }
 nodes.forEach((n,i)=>{n.addEventListener('pointerenter',()=>{selected=i;paint();});n.addEventListener('focus',()=>{selected=i;paint();});n.addEventListener('click',()=>{selected=i;paint();});n.addEventListener('pointerleave',()=>{if(!focused){selected=-1;paint();}});});
 card.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')hover=true;interaction();});
 card.addEventListener('pointerleave',()=>{hover=false;if(!focused)selected=-1;interaction();paint();});
 card.addEventListener('focusin',()=>{focused=true;interaction();});
 card.addEventListener('focusout',e=>{if(!card.contains(e.relatedTarget)){focused=false;selected=-1;interaction();paint();}});
 video.addEventListener('timeupdate',tick);
 // Follow decoded frames for a smooth fade; timeupdate remains the fallback.
 if(typeof video.requestVideoFrameCallback==='function'){
  const frame=()=>{paint();video.requestVideoFrameCallback(frame);};
  video.requestVideoFrameCallback(frame);
 }
 video.addEventListener('ended',()=>{video.currentTime=0;selected=-1;sync();});
 video.addEventListener('error',()=>{fallback=true;sync();});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible){hover=false;focused=false;}sync();},{threshold:.15}).observe(scene);
 if(toggle)new MutationObserver(sync).observe(toggle,{attributes:true,attributeFilter:['aria-pressed']});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){hover=false;focused=false;}sync();});
 reduced.addEventListener('change',sync);paint();
})();
