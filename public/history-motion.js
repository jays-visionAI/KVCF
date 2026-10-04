/* Reveal the history in chronological order; no global loading state. */
(()=>{
 const list=document.querySelector('#p-history .tl');
 if(!list||!('IntersectionObserver' in window))return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 if(reduced.matches)return;
 const items=[...list.children];
 items.forEach((item,i)=>item.style.setProperty('--history-delay',`${i*.20}s`));
 list.classList.add('history-ready');
 const observer=new IntersectionObserver(entries=>{
  if(entries.some(entry=>entry.isIntersecting)){
   list.classList.add('history-visible');observer.disconnect();
  }
 },{threshold:.08});
 observer.observe(list);
 reduced.addEventListener('change',e=>{if(e.matches){list.classList.remove('history-ready');observer.disconnect();}});
})();
