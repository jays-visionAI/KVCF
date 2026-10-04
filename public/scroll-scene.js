/* Main-only viewport scene. Native document scrolling remains untouched. */
(() => {
 'use strict';
 const root=document.getElementById('p-home'),hero=root?.querySelector('.nh-hero');
 const anchor=document.getElementById('nh-particle-globe');
 if(!root||!hero||!anchor)return;
 const canvas=document.getElementById('nh-pointer-field'),button=root.querySelector('.nh-motion-toggle');
 root.prepend(canvas);root.append(button);root.classList.add('nh-scroll-scene');
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const smooth=v=>{v=clamp(v,0,1);return v*v*(3-2*v)};
 const sections=[...root.querySelectorAll('.nh-learning,#nh-paths,.nh-partners')];
 const stats=root.querySelector('#bStats');
 const introTitle=root.querySelector('.nh-about-message h2');
 const listeners=new Set();let current=null;
 function update(){
  const rr=root.getBoundingClientRect(),hr=hero.getBoundingClientRect(),ar=anchor.getBoundingClientRect();
  if(root.hidden||rr.width<=0||ar.width<=0){current=null;canvas.style.display='none';listeners.forEach(fn=>fn());return;}
  const W=document.documentElement.clientWidth,H=window.innerHeight;
  const header=document.querySelector('header').getBoundingClientRect();
  const top=Math.max(0,header.bottom);
  const scroll=Math.max(0,-hr.top);
  const initialX=ar.left+ar.width*.5,initialY=ar.top+ar.height*.51;
  const initialR=Math.min(ar.width*.345,235);
  const entryStart=W<700?Math.max(0,ar.top-hr.top+ar.height*.51-H*.56):0;
  const firstY=W<700?H*.56:clamp(ar.top-hr.top+ar.height*.51+top,top+initialR+16,Math.max(top+initialR+16,H-initialR-20));
  const track=[{at:entryStart,x:initialX,r:initialR,y:firstY}];
  sections.forEach((s,i)=>{
   const rect=s.getBoundingClientRect();
   const card=i===0?root.querySelector('.nh-forge')?.getBoundingClientRect():null;
   const firstX=card&&card.width>0&&W>=701?card.left+card.width*.5:initialX;
   track.push({at:Math.max(1,rect.top-hr.top-H*.20),x:i===0?firstX:W*(W<700?.62:([.80,.26,.76][i])),r:initialR*(i===0?1:(W<700?.83:.86)),y:i===0?firstY:Math.min(H*.56,H-initialR-30)});
  });
  // Hold the first globe over the practice card; travel only after dispersal.
  const practice=root.querySelector('.nh-forge')?.getBoundingClientRect();
  if(practice&&track.length>2){
   const first=track[1],next=track[2];
   const end=clamp(practice.bottom-hr.top-H*.72,first.at,next.at-H*.30);
   if(end>first.at)track.splice(2,0,{...first,at:end,hold:true,depart:true});
  }
  let a=track[0],b=track[1];
  for(let i=0;i<track.length-1;i++){a=track[i];b=track[i+1];if(scroll<=b.at)break;}
  const phase=clamp((scroll-a.at)/Math.max(1,b.at-a.at),0,1);
  const e=smooth(phase);
  const hold=W<700?smooth((scroll-entryStart)/Math.max(1,hr.height*.65)):1;
  const targetY=a.y+(b.y-a.y)*e;
  let cx=a.x+(b.x-a.x)*e;
  // The full-width practice card has a centered target. Keep the earlier
  // left-to-right journey independent of that card's grid position.
  const certification=root.querySelector('.nh-cert')?.getBoundingClientRect();
  if(W>=701&&certification&&practice){
   const leftAt=Math.max(entryStart+1,certification.top-hr.top-H*.33);
   const rightAt=Math.max(leftAt+1,track[1].at);
   const cardAt=Math.max(rightAt+1,practice.top-hr.top-H*.35);
   if(scroll<cardAt){
    const inset=initialR+16;
    const points=[
     {at:entryStart,x:initialX},
     {at:leftAt,x:clamp(W*.25,inset,W-inset)},
     {at:rightAt,x:clamp(W*.77,inset,W-inset)},
     {at:cardAt,x:practice.left+practice.width*.5}
    ];
    for(let i=0;i<points.length-1;i++){
     if(scroll>points[i+1].at)continue;
     const t=smooth((scroll-points[i].at)/(points[i+1].at-points[i].at));
     cx=points[i].x+(points[i+1].x-points[i].x)*t;
     break;
    }
   }
  }
  // Hold a lightly dispersed globe through the intro, then release it into the news field.
  const statsTop=stats?stats.getBoundingClientRect().top-hr.top:0;
  const introProgress=smooth((scroll-(statsTop-top-H*.5))/Math.max(160,H*.4));
  const titleRect=introTitle?.getBoundingClientRect();
  const titleBottom=titleRect?titleRect.bottom-hr.top:0;
  const titleRelease=smooth((scroll-(titleBottom-top-H*.36))/Math.max(160,H*.24));
  const partialScatterCap=.02+.14*introProgress+.84*titleRelease;
  const scatter=b.hold?0:Math.min(smooth((phase-.1)/.28)*(1-smooth((phase-.62)/.28)),partialScatterCap);
  const state={W,H,cx,cy:initialY+(targetY-initialY)*hold,
   R:a.r+(b.r-a.r)*e,scatter,heroBottom:hr.bottom,heroTop:hr.top,heroHeight:hr.height,heroCX:initialX,heroCY:initialY,heroR:initialR,
   top,bottom:Math.min(H,rr.bottom)};
  // Keep the fixed sphere inside a short/mobile viewport once it leaves the hero.
  if(hold>.99)state.cy=clamp(state.cy,top+state.R+16,Math.max(top+state.R+16,H-state.R-20));
  current=state;canvas.style.display=rr.bottom>top?'block':'none';
  // Clipping is performed inside Canvas, avoiding a changing CSS compositor mask.
  button.style.visibility=rr.bottom>top?'visible':'hidden';
  listeners.forEach(fn=>fn());
 }
 globalThis.KVCFScrollScene={root,read:()=>current,subscribe:fn=>listeners.add(fn)};
 window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);
 new ResizeObserver(update).observe(root);new ResizeObserver(update).observe(anchor);
 new MutationObserver(update).observe(root,{attributes:true,attributeFilter:['hidden']});
 update();
})();
