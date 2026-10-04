
// Select the initial route before the browser paints any page content.
if('scrollRestoration' in history)history.scrollRestoration='manual';
window.kvcfInitialRoute=(function(){
 const pages=['home','about','greeting','org','history','contact','cert','vca','vcp','vce','consultant','schedule','rules','edu','partners','apply','verify','member','join','signup','companies','notice','recruit','noticeview','press','library','faq','inquiry','terms','privacy','noemail','login','dashboard','profile','admin'];
 let route=(location.hash||'#home').slice(1).split('?')[0];
 if(route==='mypage')route='dashboard';
 if(!pages.includes(route))route='home';
 if(route==='dashboard'||route==='profile')route='login';
 document.documentElement.style.backgroundColor=route==='home'?'':'#ffffff';
 document.documentElement.classList.toggle('home-background',route==='home');
 // 어드민 라우트로 직접 진입한 경우 legacy app.js 가 로드되기 전이라도
 // 어드민 셸 CSS 가 SSR 헤더에서 항상 로드되도록 body 클래스를 즉시 토글한다.
 // 어드민 셸 CSS(admin-shell.css) 가 .site-shell 을 display:none 으로 강제하므로
 // 깜빡임 없이 어드민 셸만 표시된다.
 if(route==='admin')document.body.classList.add('admin-mode');
 const style=document.createElement('style');style.id='initial-route-style';
 style.textContent='.page{display:none!important}#p-'+route+'{display:block!important}'+ (route==='admin' ? '.site-shell{display:none!important}#adminShell{display:block!important}#p-admin{display:block!important}' : '');
 document.head.appendChild(style);
 return route;
})();
