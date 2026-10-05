
// Select the initial route before the browser paints any page content.
if('scrollRestoration' in history)history.scrollRestoration='manual';
window.kvcfInitialRoute=(function(){
 const pages=['home','about','greeting','org','history','contact','cert','vca','vcp','vce','consultant','schedule','rules','edu','partners','apply','verify','member','join','signup','companies','notice','recruit','noticeview','press','library','faq','inquiry','terms','privacy','noemail','login','dashboard','profile','admin'];
 let route=(location.hash||'#home').slice(1).split('?')[0];
 // 외부에서 붙여 들어오는 해시 정규화 — 예: #/login, #/admin.
 // 이 앱의 정식 해시는 슬래시 없는 #login / #admin 입니다. 슬래시가 붙은 채로
 // 오면 아래 pages 목록에 없어 route 가 'home' 으로 떨어지고, 사용자가 로그인 버튼을
 // 눌렀는데도 로그인 폼이 보이지 않는 증상이 그대로 남습니다. 첫 페인트 전에
 // 여기서 정규화하면 이후 모든 라우터(show/restoreRoute/ShellVisibilityBridge)가
 // 같은 값을 보게 됩니다.
 route=route.replace(/^\/+/,'');
 if(route==='mypage')route='dashboard';
 // 정규화한 값을 주소창에도 반영합니다. 그래야 이후 모든 라우터가 location.hash
 // 를 직접 읽어도 동일한 정식 해시(#login / #admin)를 보게 됩니다.
 // file:// 은 replaceState 가 거부될 수 있으므로 실패해도 조용히 넘어갑니다.
 try{
  var canonical='#'+route;
  if(location.hash!==canonical)history.replaceState(history.state||{},'',canonical);
 }catch(_){}
 if(!pages.includes(route))route='home';
 if(route==='dashboard'||route==='profile')route='login';
 // 어드민 라우트는 어드민 셸의 캔버스 배경(진한 남색)을 그대로 사용한다.
 // 회원 라우트만 흰색(홈은 hero 이미지 아래로 비워둠) — 어드민 화면 가장자리/오버스크롤에
 // 흰 배경이 남으면 어드민 셸과 색이 달라 이중 배경으로 보인다.
 document.documentElement.style.backgroundColor=route==='home'?'':(route==='admin'?'#0a1024':'#ffffff');
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
