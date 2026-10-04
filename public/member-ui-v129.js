/* Personal member UI demo only. No requests, payment processing, grading or persistence. */
(()=>{
 const root=document.getElementById('p-dashboard');if(!root)return;
 const records=[
 {id:'EDU-DEMO-01',group:'education',title:'공통 기초 과정',meta:'VCA · 공통 기초 / 예시 신청',application:'신청 완료',payment:'결제 대기',progress:'교육 시작 전',action:'수강료 결제 안내',next:true,detail:'수강료와 결제 기한은 확정 후 표시됩니다. 실제 결제 기능은 연결되지 않았습니다.'},
 {id:'EDU-DEMO-02',group:'education',title:'분야별 심화 · 웹 트랙',meta:'VCP · 웹 트랙 / 별도 예시 신청',application:'수강 등록 완료',payment:'결제 완료 (예시)',progress:'수강 중',action:'수강 상세 보기',detail:'교육 일정·학습 활동·실습 연결·이수 요건을 확인할 화면입니다. 진도와 출석·과제의 실제 연동은 준비 중이며, 이수 기준은 아직 확정되지 않았습니다.'},
 {id:'EDU-DEMO-03',group:'education',title:'공통 기초 과정 · 이전 이수',meta:'VCA · 이전 과정 / 별도 예시',application:'수강 등록 완료',payment:'결제 완료 (예시)',progress:'이수 완료 (예시)',action:'이수 내역 보기',detail:'과정명·이수일·인정 내역을 표시할 영역입니다. 진도 완료와 이수 판정은 구분하며, 이수 판정 기준은 운영정책 확정 후 연결됩니다.'},
 {id:'EXAM-DEMO-01',group:'exams',title:'VCP · 2급 자격시험',meta:'웹 트랙 / 회차·일정 확정 후 안내',application:'신청 완료',payment:'결제 대기',progress:'응시 전',action:'응시료 결제 안내',next:true,results:['응시 전','응시 전','미확정'],detail:'시험 일시·장소·응시 요건·접수번호와 응시료를 확인할 영역입니다. 실제 접수 확정이나 응시료 결제는 진행되지 않습니다.'},
 {id:'EXAM-DEMO-02',group:'exams',title:'VCA · 3급 자격시험',meta:'이전 시험 / 결과 표시 예시',application:'접수 확정 (예시)',payment:'결제 완료 (예시)',progress:'최종 합격 (예시)',action:'결과 상세 보기',results:['결과 확인 (예시)','결과 확인 (예시)','합격 (예시)'],detail:'필기·실기 각각의 결과와 최종 판정을 구분해 표시합니다. 점수·비율·합격 기준을 임의로 부여하지 않았습니다. 실제 시험이나 자동채점은 제공하지 않습니다.'},
 {id:'CERT-DEMO-01',group:'certificates',title:'VCA · 3급 자격증 발급',meta:'연결 시험 EXAM-DEMO-02',application:'발급 미신청',payment:'신청 전',progress:'발급 신청 가능 (예시)',action:'발급 신청 안내',next:true,detail:'자격증 표기 정보·발급 형태·비용을 확인한 뒤 신청할 영역입니다. 발급 형태와 비용은 미확정이며, 지금은 실제 신청되지 않습니다.'},
 {id:'CERT-DEMO-02',group:'certificates',title:'자격증 발급 신청 건',meta:'발급비 결제 단계 / 독립된 예시',application:'발급 신청 완료 (예시)',payment:'결제 대기',progress:'발급 처리 전',action:'발급비 결제 안내',detail:'발급 신청번호·표기 정보·발급비·결제 기한과 처리 현황을 표시할 영역입니다. 실제 결제나 발급은 진행되지 않습니다.'},
 {id:'CERT-DEMO-03',group:'certificates',title:'보유 자격 · VCA',meta:'보유 자격 표시 / 독립된 예시',application:'발급 신청 완료 (예시)',payment:'결제 완료 (예시)',progress:'발급·등록 완료 (예시)',action:'보유 자격 상세',detail:'자격명·자격번호·취득일·발급일과 진위 확인 정보를 표시할 영역입니다. 실제 자격번호나 증명서는 생성하지 않으며, 다운로드·재발급은 연결되지 않았습니다.'}
 ];
 const names={education:'내 교육',exams:'시험 신청·결과',certificates:'자격증·발급'};
 const fees={education:'수강료',exams:'응시료',certificates:'발급비'};
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const status=r=>'<dl class="mp-status"><div><dt>신청 상태</dt><dd>'+esc(r.application)+'</dd></div><div><dt>결제 상태</dt><dd>'+esc(r.payment)+'</dd></div><div><dt>진행 상태</dt><dd>'+esc(r.progress)+'</dd></div><div><dt>다음 행동</dt><dd><button class="mp-text-button" data-mp-detail="'+r.id+'">'+esc(r.action)+' ↗</button></dd></div></dl>';
 function card(r){return '<article class="mp-box mp-record" id="mp-record-'+r.id+'"><div class="mp-record-head"><div><span class="mp-id">'+r.id+'</span><h3>'+esc(r.title)+'</h3><p>'+esc(r.meta)+'</p></div><span class="mp-badge">데모</span></div>'+status(r)+(r.results?'<dl class="mp-results">'+['필기','실기','최종 결과'].map((n,i)=>'<div><dt>'+n+'</dt><dd>'+r.results[i]+'</dd></div>').join('')+'</dl>':'')+'<div class="mp-record-foot"><span>신청일·일정: 운영 연결 후 표시</span><button class="minibtn" data-mp-detail="'+r.id+'">신청 상세</button></div></article>';}
 Object.keys(names).forEach(k=>document.getElementById('mp-'+k).innerHTML=records.filter(r=>r.group===k).map(card).join(''));
 const next=records.filter(r=>r.payment==='결제 대기'||r.progress==='발급 신청 가능 (예시)');
 document.getElementById('mp-next').innerHTML=next.length?next.map(r=>'<article class="mp-task"><span class="mp-id">'+names[r.group]+'</span><h3>'+r.action+'</h3><p>'+r.title+'</p><span class="mp-task-state">'+r.progress+' · '+r.payment+'</span><button class="b line sm" data-mp-go="'+r.group+'" data-mp-record="'+r.id+'">해당 내역 확인 ↗</button></article>').join(''):'<div class="mp-empty">지금 필요한 다음 행동이 없습니다.</div>';

 function payments(filter='all'){
 const list=records.filter(r=>r.payment!=='신청 전'&&(filter==='all'||r.group===filter));
 document.getElementById('mp-payments').innerHTML=list.map(r=>'<article class="mp-box"><div class="mp-record-head"><div><span class="mp-id">'+fees[r.group]+' · '+r.id+'</span><h3>'+r.title+'</h3></div><span class="mp-badge">'+r.payment+'</span></div><dl class="mp-payment-info"><div><dt>금액</dt><dd>운영 기준 확정 후 표시</dd></div><div><dt>결제일·수단</dt><dd>결제 연동 후 표시</dd></div><div><dt>환불 상태</dt><dd>신청 내역 없음</dd></div></dl><div class="mp-payment-actions"><button class="minibtn" data-mp-go="'+r.group+'" data-mp-record="'+r.id+'">연결 신청 보기</button><button class="minibtn" data-mp-detail="'+r.id+'" data-mp-mode="payment">'+(r.payment==='결제 대기'?'결제 안내':'영수증·환불 안내')+'</button></div></article>').join('')||'<p class="mp-empty">해당 결제 내역이 없습니다.</p>';
 }payments();
 document.getElementById('mp-alerts').innerHTML=next.map(r=>'<div class="mp-alert"><div><span class="mp-badge">안내 예시</span><h4>'+r.action+'</h4><p>'+r.title+' · '+r.id+'</p></div><button class="minibtn" data-mp-go="'+r.group+'" data-mp-record="'+r.id+'">관련 내역</button></div>').join('');
 const tabs=[...root.querySelectorAll('[data-mp-tab]')];
 function syncMemberSummary(){
 ['email','phone'].forEach(k=>{document.getElementById('mp-account-'+k).textContent=document.getElementById(k==='email'?'memberEmail':'memberPhone').textContent;});
 document.getElementById('mp-profile-saved').textContent=document.getElementById('profileSaved').textContent;
 document.getElementById('mp-notif-list').innerHTML=document.getElementById('notifList').innerHTML;
 }
 const memberObserver=new MutationObserver(syncMemberSummary);
 ['memberEmail','memberPhone','profileSaved','notifList'].forEach(id=>memberObserver.observe(document.getElementById(id),{childList:true,subtree:true,characterData:true}));
 syncMemberSummary();
 function select(key,focus=false){
 syncMemberSummary();
 if(!tabs.some(t=>t.dataset.mpTab===key))return;
 tabs.forEach(t=>{const on=t.dataset.mpTab===key;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;if(on&&focus)t.focus();});
 root.querySelectorAll('.mp-panel').forEach(p=>p.hidden=p.id!=='mp-panel-'+key);
 }
 root.addEventListener('click',e=>{
 const tab=e.target.closest('[data-mp-tab]');if(tab){select(tab.dataset.mpTab);return;}
 const go=e.target.closest('[data-mp-go]');if(go){select(go.dataset.mpGo,true);if(go.dataset.mpRecord){const row=document.getElementById('mp-record-'+go.dataset.mpRecord);row?.scrollIntoView({block:'center',behavior:'auto'});}return;}
 const f=e.target.closest('[data-mp-filter]');if(f){root.querySelectorAll('[data-mp-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===f)));payments(f.dataset.mpFilter);return;}
 const d=e.target.closest('[data-mp-detail]');if(d){const r=records.find(x=>x.id===d.dataset.mpDetail);if(!r)return;document.getElementById('mp-dialog-title').textContent=r.title;document.getElementById('mp-dialog-body').innerHTML='<p class="mp-id">'+r.id+' · UI 데모</p>'+status(r)+'<p>'+esc(d.dataset.mpMode==='payment'?'금액·결제수단·거래번호·영수증과 환불 요청 상태를 표시할 영역입니다. 결제·환불 기준은 미확정이며 실제 요청은 전송되지 않습니다.':r.detail)+'</p><p class="mp-policy">기능 연결 전 미리보기입니다. 이 창을 닫아도 신청·결제·진행 상태는 변경되지 않습니다.</p>';document.querySelectorAll('#mp-dialog-body [data-mp-detail]').forEach(b=>{const text=document.createElement('span');text.textContent=b.textContent.replace(' ↗','');b.replaceWith(text);});document.getElementById('mp-dialog').showModal();return;}
 if(e.target.closest('[data-mp-close]'))document.getElementById('mp-dialog').close();
 });
 root.querySelector('.mp-tabs').addEventListener('keydown',e=>{const i=tabs.indexOf(e.target);if(i<0)return;let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;else if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();select(tabs[n].dataset.mpTab,true);});
})();
