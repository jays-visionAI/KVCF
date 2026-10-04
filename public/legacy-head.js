
// Select the initial route before the browser paints any page content.
if('scrollRestoration' in history)history.scrollRestoration='manual';
window.kvcfInitialRoute=(function(){
 const pages=['home','about','greeting','org','history','contact','cert','vca','vcp','vce','consultant','schedule','rules','edu','partners','apply','verify','member','join','signup','companies','notice','recruit','noticeview','press','library','faq','inquiry','terms','privacy','noemail','login','dashboard','profile','admin'];
 let route=(location.hash||'#home').slice(1).split('?')[0];
 if(route==='mypage')route='dashboard';
 if(!pages.includes(route))route='home';
 if(route==='admin'||route==='dashboard'||route==='profile')route='login';
 document.documentElement.style.backgroundColor=route==='home'?'':'#ffffff';
 document.documentElement.classList.toggle('home-background',route==='home');
 const style=document.createElement('style');style.id='initial-route-style';
 style.textContent='.page{display:none!important}#p-'+route+'{display:block!important}';
 document.head.appendChild(style);
 return route;
})();
