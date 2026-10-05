"use client";
import {useEffect} from "react";
import {fetchSiteSettings, applyFooterOrg, applyOrgForm, fetchNotices, renderHomeNotices, fetchRecruits, renderHomeRecruits, client as fbClient} from "./lib/forgedb";
declare global {
  interface Window {
    __kvcfLegacyReady?: boolean;
    /** legacy-app.js (#saveInfo 등) 가 ForgeDB SDK 를 직접 호출할 수 있도록 노출하는 브릿지 */
    kvcfClient?: () => ReturnType<typeof fbClient>;
    applyFooterOrg?: typeof applyFooterOrg;
  }
}
const scripts = ["/legacy-app.js?v=5", "/scroll-scene.js?v=93", "/hero-motion-v21.js?v=9", "/globe-guides-visibility-v19.js?v=1", "/hero-motion-control-v24.js?v=1", "/forge-card.js?v=84", "/history-motion.js?v=102", "/member-ui-v129.js", "/org-motion-preview-v40.js?v=9"];
export default function LegacyRuntime() {
 useEffect(() => {
  // legacy-app.js 가 ForgeDB SDK 와 applyFooterOrg helper 를 직접 호출할 수 있도록 노출
  window.kvcfClient = () => fbClient();
  window.applyFooterOrg = applyFooterOrg;

  if(!window.__kvcfLegacyReady){
   window.__kvcfLegacyReady=true;
   (async()=>{for(const src of scripts){await new Promise<void>((resolve,reject)=>{const script=document.createElement("script");script.src=src;script.onload=()=>resolve();script.onerror=()=>reject(new Error(`Could not load ${src}`));document.body.appendChild(script);});}})().catch(console.error);
  }
  (async()=>{
   try{
    const s=await fetchSiteSettings();
    if(s){
     applyFooterOrg(s);
     if(document.getElementById("am-info"))applyOrgForm(s);
    }
   }catch(_){ }
   try{
    const n=await fetchNotices();
    if(n)renderHomeNotices(n);
   }catch(_){ }
   try{
    const r=await fetchRecruits();
    if(r)renderHomeRecruits(r);
   }catch(_){ }
  })();
 },[]);
 return null;
}
