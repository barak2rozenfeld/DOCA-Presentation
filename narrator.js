/* ════════════════════════════════════════════════
   DOCA Narrator — Waveform Visualizer Edition
   ────────────────────────────────────────────────
   Self-contained: injects its own CSS + HTML.
   To re-enable: add ONE line before </body>:
       <script src="narrator.js"></script>
════════════════════════════════════════════════ */
(function(){
'use strict';

/* ── Inject CSS ── */
const _style = document.createElement('style');
_style.textContent = `
#avOverlay{
  position:fixed;bottom:30px;right:16px;z-index:300;
  display:flex;flex-direction:column;align-items:flex-end;
  font-family:'Segoe UI',system-ui,sans-serif;
  pointer-events:none;
}
#avOverlay>*{pointer-events:auto;}
#avCard{
  width:322px;
  background:linear-gradient(148deg,rgba(9,15,27,.97) 0%,rgba(6,10,18,.97) 100%);
  backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);
  border:1px solid rgba(118,185,0,.22);
  border-radius:14px;
  box-shadow:0 14px 60px rgba(0,0,0,.78),0 0 50px rgba(118,185,0,.05),
             inset 0 1px 0 rgba(255,255,255,.042);
  overflow:hidden;
  transition:opacity .32s cubic-bezier(.16,1,.3,1),transform .32s cubic-bezier(.16,1,.3,1);
}
#avCard.av-hide{opacity:0;pointer-events:none;transform:translateY(7px) scale(.97);display:none;}
.av-topbar{
  display:flex;align-items:center;justify-content:space-between;
  padding:10px 14px 0;
}
.av-live{display:flex;align-items:center;gap:7px;}
.av-liveDot{
  width:6px;height:6px;border-radius:50%;background:rgba(118,185,0,.85);flex-shrink:0;
  animation:avLP 2.5s ease-in-out infinite;
}
@keyframes avLP{
  0%,100%{box-shadow:0 0 0 0 rgba(118,185,0,.5);}
  50%{box-shadow:0 0 0 5px rgba(118,185,0,0);}
}
.av-liveLabel{font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(118,185,0,.72);}
.av-topBtns{display:flex;align-items:center;gap:4px;}
.av-tb{
  background:transparent;border:1px solid rgba(255,255,255,.08);
  color:rgba(128,158,192,.7);
  width:24px;height:24px;border-radius:5px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  font-size:11px;transition:all .15s;padding:0;font-family:inherit;line-height:1;
}
.av-tb:hover{border-color:rgba(118,185,0,.35);color:rgba(118,185,0,.9);background:rgba(118,185,0,.07);}
.av-tb.lit{border-color:rgba(118,185,0,.48);color:#76b900;background:rgba(118,185,0,.13);}
.av-wave-wrap{padding:12px 14px 6px;}
#avWaveCanvas{display:block;width:100%;height:60px;border-radius:8px;}
.av-presenter{display:flex;flex-direction:column;gap:2px;padding:0 14px 10px;}
.av-pname{font-size:13px;font-weight:700;color:#dce8ff;letter-spacing:-.01em;}
.av-prole{font-size:10.5px;color:rgba(118,185,0,.62);letter-spacing:.02em;}
.av-div{height:1px;background:rgba(255,255,255,.05);margin:0 14px 10px;}
.av-narr-wrap{padding:0 14px 8px;}
.av-slTag{font-size:9.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(118,185,0,.55);margin-bottom:5px;}
.av-narr{font-size:11.5px;color:rgba(185,210,235,.82);line-height:1.58;max-height:68px;overflow:hidden;position:relative;}
.av-narr::after{content:'';position:absolute;bottom:0;left:0;right:0;height:20px;background:linear-gradient(transparent,rgba(6,10,18,.96));pointer-events:none;}
.av-narr .w{display:inline;}
.av-narr .w.done{color:rgba(118,185,0,.58);}
.av-narr .w.now{color:#fff;background:rgba(118,185,0,.18);border-radius:3px;padding:0 2px;box-shadow:0 0 9px rgba(118,185,0,.2);}
.av-ctrls{display:flex;align-items:center;gap:5px;padding:0 14px 8px;}
.av-cb{
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);
  color:rgba(128,158,192,.8);border-radius:6px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  font-size:12px;transition:all .15s;padding:0;font-family:inherit;
}
.av-cb:hover{border-color:rgba(118,185,0,.3);color:rgba(118,185,0,.9);background:rgba(118,185,0,.07);}
.av-cb.lg{width:34px;height:28px;font-size:13px;}
.av-cb.sm{width:24px;height:24px;font-size:10px;}
.av-cb.on{border-color:rgba(118,185,0,.5);color:#76b900;background:rgba(118,185,0,.13);}
.av-pbar{flex:1;height:3px;background:rgba(255,255,255,.06);border-radius:2px;overflow:hidden;}
.av-pfill{height:100%;background:linear-gradient(90deg,rgba(118,185,0,.5),rgba(118,185,0,.95));width:0%;transition:width .45s;border-radius:2px;}
.av-statrow{display:flex;align-items:center;gap:5px;font-size:9.5px;color:rgba(95,125,155,.65);padding:0 14px 12px;}
.av-statdot{width:4px;height:4px;border-radius:50%;background:rgba(95,125,155,.38);flex-shrink:0;transition:background .3s;}
.av-statdot.on{background:rgba(118,185,0,.82);animation:avDP .55s ease-in-out infinite alternate;}
@keyframes avDP{from{transform:scale(1);opacity:.7;}to{transform:scale(1.5);opacity:1;}}
#avPill{
  display:none;align-items:center;gap:8px;
  background:linear-gradient(135deg,rgba(9,15,27,.96),rgba(6,10,18,.96));
  backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  border:1px solid rgba(118,185,0,.28);border-radius:28px;
  padding:7px 14px;cursor:pointer;
  box-shadow:0 4px 24px rgba(0,0,0,.55),0 0 22px rgba(118,185,0,.05);
  transition:border-color .2s,box-shadow .2s;
}
#avPill:hover{border-color:rgba(118,185,0,.5);box-shadow:0 4px 28px rgba(118,185,0,.12);}
#avPill .pLbl{font-size:11px;color:rgba(118,185,0,.82);font-weight:600;letter-spacing:.04em;}
`;
document.head.appendChild(_style);

/* ── Inject HTML ── */
const _wrap = document.createElement('div');
_wrap.innerHTML = `
<div id="avOverlay">
  <div id="avPill" onclick="avRestore()">
    <svg width="22" height="22" viewBox="0 0 22 22">
      <circle cx="11" cy="11" r="10" fill="#0b1220" stroke="rgba(118,185,0,.44)" stroke-width="1"/>
      <circle cx="11" cy="9" r="4.5" fill="#1a3a5a"/>
      <ellipse cx="11" cy="18.5" rx="6.5" ry="4" fill="#1a3a5a"/>
    </svg>
    <span class="pLbl">AI Narrator</span>
    <div class="av-liveDot" style="margin-left:2px"></div>
  </div>
  <div id="avCard">
    <div class="av-topbar">
      <div class="av-live">
        <div class="av-liveDot"></div>
        <span class="av-liveLabel">AI Narrator</span>
      </div>
      <div class="av-topBtns">
        <button class="av-tb" id="avPbTop" onclick="avToggle()" title="Play / Pause">&#9654;</button>
        <button class="av-tb" onclick="avMinimize()" title="Minimize">&#8722;</button>
      </div>
    </div>
    <div class="av-wave-wrap"><canvas id="avWaveCanvas"></canvas></div>
    <div class="av-presenter">
      <div class="av-pname">Barak Rozenfeld</div>
      <div class="av-prole">Product Strategy &middot; ConnectX &amp; BlueField &middot; DOCA</div>
    </div>
    <div class="av-div"></div>
    <div class="av-narr-wrap">
      <div class="av-slTag" id="avSlTag">Slide 1 of 13</div>
      <div class="av-narr" id="avNarr"></div>
    </div>
    <div class="av-ctrls">
      <button class="av-cb sm" onclick="avPrev()" title="Previous">&#8249;</button>
      <button class="av-cb lg" id="avPbMain" onclick="avToggle()">&#9654;</button>
      <button class="av-cb sm" onclick="avNext()" title="Next">&#8250;</button>
      <div class="av-pbar"><div class="av-pfill" id="avPfill"></div></div>
    </div>
    <div class="av-statrow">
      <div class="av-statdot" id="avDot"></div>
      <span id="avStatus">Click &#9654; to narrate</span>
    </div>
  </div>
</div>`;
document.body.appendChild(_wrap.firstElementChild);

/* ── Narration scripts (13 slides, post-reorder DOM order) ── */
const NAR = [
  /* 0 – Intro */
  "Welcome! This presentation covers DOCA Solution Blueprints, prepared by Barak Rozenfeld for NVIDIA's DOCA Product Group in 2026. The deck explains how DOCA turns powerful networking hardware into a programmable, software-defined revenue engine.",
  /* 1 – Agenda */
  "Here's what we'll cover today — eleven sections in total. We'll start with the core problem: why GPU utilization fails at scale. Then we cover what DOCA is, the competitive market landscape, key customers and their buying reasons, and the urgent market forces at play. Next we'll walk through five strategic options, reveal the chosen blueprint strategy, detail the execution plan across ConnectX and BlueField, dive into a concrete example blueprint for AI cluster offload, show the ROI and KPIs, and close with why Barak Rozenfeld is the right person to lead this.",
  /* 2 – Problem & Solution */
  "Here's the core problem. Today's GPU clusters waste enormous compute because the host CPU is overwhelmed with networking tasks — reaching 94% load. DOCA Solution Blueprints fix this by offloading those workloads onto BlueField DPUs, pushing GPU utilization from 65% up to 90% while cutting CPU overhead dramatically.",
  /* 3 – What is DOCA */
  "DOCA is NVIDIA's software framework for programming DPUs and SmartNICs — think of it as CUDA for the data path. It gives developers a unified API to write portable applications across ConnectX adapters and BlueField DPUs, enabling them to offload, accelerate, and isolate network workloads directly from the hardware.",
  /* 4 – Competitive Landscape */
  "In the SmartNIC and DPU market, NVIDIA commands roughly 55% share — ahead of Broadcom at 22%, Intel at 15%, AMD Pensando at 5%, and custom silicon at 3%. Our competitive moat is the DOCA software stack. It's what makes our hardware sticky, defensible, and increasingly non-negotiable in modern AI infrastructure.",
  /* 5 – Key Customers */
  "Our key customers break down into four segments: hyperscalers at 40%, GPU cloud providers at 28%, enterprise cloud at 20%, and telcos at 12%. Each has a distinct pain point. Top accounts are deploying BlueField at massive scale for storage offload, security isolation, and AI networking acceleration — and DOCA is the software that makes every deployment work.",
  /* 6 – Market Urgency */
  "Why now? Because every GPU cluster being built today needs a DPU for network offload — and DOCA is what makes BlueField monetizable beyond just silicon. It's the software flywheel: more DOCA adoption drives more BlueField pull-through, which expands the developer ecosystem, which drives more adoption. This flywheel needs to be accelerated deliberately.",
  /* 7 – Strategic Alternatives */
  "We rigorously evaluated five strategic paths: expanding the API and SDK, building Solution Blueprints, cloud-native integration, observability tooling, and a partner ecosystem play. Each option was scored on four dimensions: customer impact, speed to revenue, strategic differentiation, and long-term scalability. The analysis pointed clearly to one winner.",
  /* 8 – Chosen Strategy */
  "The chosen strategy is DOCA Solution Blueprints, scoring 87 out of 100. A blueprint is a validated, end-to-end reference architecture — from customer pain to production deployment — packaged with working code, an automated deployment script, a metrics dashboard, and a built-in ROI calculator. It converts developer interest into measurable, citable business outcomes.",
  /* 9 – Product Strategy Alignment */
  "The execution plan runs on three parallel pillars. First: ship three to five high-impact blueprints targeting the biggest pain points. Second: build an ISV and partner ecosystem that certifies and co-sells those blueprints. Third: establish a structured upgrade path from ConnectX to BlueField so customers can grow into greater offload capability. All three pillars reinforce each other.",
  /* 10 – Example Blueprint */
  "Let's make it concrete. The AI Cluster Networking Offload blueprint offloads all collective communication from the host CPU onto BlueField. The results: GPU utilization rises to 92%, CPU networking overhead drops to just 20%, and time-to-deployment shrinks by 96%. One script. One repo. One outcome you can put in a customer case study the next day.",
  /* 11 – ROI & KPIs */
  "Success is measured across four KPIs. First: plus 20 new enterprise accounts per quarter. Second: 92% GPU utilization achieved in every blueprint deployment. Third: ten times faster time-to-production versus a manual setup. Fourth: 30% increase in BlueField attach rate per GPU cluster sold. Every number here is tied directly to NVIDIA hardware revenue.",
  /* 12 – Why Barak Rozenfeld */
  "So — why Barak Rozenfeld? He combines deep networking silicon and software expertise with a product storytelling ability that makes complex infrastructure land with business buyers. He thinks customer-backwards, structures decisions with explicit trade-offs, and treats every metric as a hypothesis to validate. The strongest value he brings is the bridge between deep infrastructure technology, product execution, and repeatable customer value.",
];

/* ── Waveform visualizer ── */
const WC   = document.getElementById('avWaveCanvas');
const WCtx = WC ? WC.getContext('2d') : null;
const BARS = 26;
let avWW   = 294;

function avSizeCanvas(){
  if(!WC) return;
  const W = Math.round(WC.parentElement.getBoundingClientRect().width || 294);
  WC.style.width = W+'px'; WC.style.height = '60px';
  WC.width = W*2; WC.height = 120;
  if(WCtx) WCtx.scale(2,2);
  avWW = W;
}
avSizeCanvas();
window.addEventListener('resize', avSizeCanvas);

const avBars = Array.from({length:BARS}, (_,i) => ({
  phase : i/BARS * Math.PI * 2.8 + Math.random() * 0.6,
  freq  : 1.0 + Math.random() * 2.2,
  minH  : 0.06 + Math.random() * 0.10,
  peakH : 0.38 + Math.random() * 0.56,
}));

let avAmp=0, avAmpTgt=0, avWTime=0;

function avDrawWave(ts){
  if(!WCtx){ requestAnimationFrame(avDrawWave); return; }
  avWTime = ts * 0.001;
  avAmp  += (avAmpTgt - avAmp) * 0.055;
  const W=avWW, H=60, gap=2.5, bw=(W-gap*(BARS-1))/BARS;
  WCtx.clearRect(0,0,W,H);
  avBars.forEach((b,i)=>{
    const x    = i*(bw+gap);
    const raw  = Math.abs(Math.sin(avWTime*b.freq + b.phase));
    const idleH  = b.minH + 0.04*Math.sin(avWTime*0.55+b.phase);
    const speakH = b.minH + (b.peakH-b.minH)*raw;
    const frac   = Math.max(0.03, idleH + (speakH-idleH)*avAmp);
    const h=frac*H, y=(H-h)/2, r=Math.min(bw/2,h/2,2.8);
    const a1=0.35+avAmp*0.55, a2=0.10+avAmp*0.18;
    const gr=WCtx.createLinearGradient(0,y,0,y+h);
    gr.addColorStop(0,`rgba(118,185,0,${a1})`);
    gr.addColorStop(0.45,`rgba(118,185,0,${a1*0.75})`);
    gr.addColorStop(1,`rgba(118,185,0,${a2})`);
    WCtx.fillStyle=gr;
    WCtx.beginPath();
    WCtx.moveTo(x+r,y); WCtx.lineTo(x+bw-r,y);
    WCtx.arcTo(x+bw,y,x+bw,y+r,r); WCtx.lineTo(x+bw,y+h-r);
    WCtx.arcTo(x+bw,y+h,x+bw-r,y+h,r); WCtx.lineTo(x+r,y+h);
    WCtx.arcTo(x,y+h,x,y+h-r,r); WCtx.lineTo(x,y+r);
    WCtx.arcTo(x,y,x+r,y,r); WCtx.closePath(); WCtx.fill();
    if(avAmp>0.4 && frac>0.35){
      WCtx.save(); WCtx.shadowBlur=8; WCtx.shadowColor='rgba(118,185,0,.35)';
      WCtx.fill(); WCtx.restore();
    }
  });
  requestAnimationFrame(avDrawWave);
}
requestAnimationFrame(avDrawWave);

function startMouth(){ avAmpTgt=1; }
function stopMouth() { avAmpTgt=0; }

/* ── Speech engine ── */
let avPlaying=false, avUtt=null;

const narrEl  = document.getElementById('avNarr');
const tagEl   = document.getElementById('avSlTag');
const pfillEl = document.getElementById('avPfill');
const statusEl= document.getElementById('avStatus');
const dotEl   = document.getElementById('avDot');
const pbTop   = document.getElementById('avPbTop');
const pbMain  = document.getElementById('avPbMain');
const cardEl  = document.getElementById('avCard');
const pillEl  = document.getElementById('avPill');

function curIdx(){
  const sl=document.querySelectorAll('.slide');
  for(let i=0;i<sl.length;i++) if(sl[i].classList.contains('active')) return i;
  return 0;
}
function slTotal(){ return document.querySelectorAll('.slide').length; }

function render(idx){
  const text=NAR[idx]||'', n=slTotal();
  tagEl.textContent='Slide '+(idx+1)+' of '+n;
  pfillEl.style.width=((idx+1)/n*100)+'%';
  narrEl.innerHTML=text.split(' ').map((w,i)=>'<span class="w" data-i="'+i+'">'+w+' </span>').join('');
}

function highlight(wi){
  const spans=narrEl.querySelectorAll('.w');
  spans.forEach((s,i)=>{
    s.classList.remove('now','done');
    if(i<wi) s.classList.add('done');
    else if(i===wi) s.classList.add('now');
  });
}

function setUI(speaking){
  const ic=speaking?'⏸':'▶';
  statusEl.textContent=speaking?'Speaking…':'Paused';
  dotEl.classList.toggle('on',speaking);
  pbTop.textContent=ic; pbTop.classList.toggle('lit',speaking);
  pbMain.textContent=ic; pbMain.classList.toggle('on',speaking);
}

function avSpeak(){
  if(!window.speechSynthesis) return;
  const text=NAR[curIdx()]||''; if(!text) return;
  window.speechSynthesis.cancel();
  narrEl.querySelectorAll('.w').forEach(s=>s.classList.remove('now','done'));
  avUtt=new SpeechSynthesisUtterance(text);
  avUtt.lang='en-US'; avUtt.rate=0.88; avUtt.pitch=1.04; avUtt.volume=1;
  const vs=window.speechSynthesis.getVoices();
  const pick=vs.find(v=>/Google UK English Male|Microsoft David|Microsoft Mark|Daniel/i.test(v.name))
            ||vs.find(v=>/en/i.test(v.lang)&&!/female|zira|aria|siri|cortana/i.test(v.name));
  if(pick) avUtt.voice=pick;
  let wi=0;
  avUtt.onboundary=e=>{ if(e.name==='word'){highlight(wi);wi++;} };
  avUtt.onstart=()=>{ avPlaying=true; startMouth(); setUI(true); };
  avUtt.onend=()=>{
    avPlaying=false; stopMouth();
    statusEl.textContent='Done'; dotEl.classList.remove('on');
    pbTop.textContent='▶'; pbTop.classList.remove('lit');
    pbMain.textContent='▶'; pbMain.classList.remove('on');
    narrEl.querySelectorAll('.w').forEach(s=>{s.classList.remove('now');s.classList.add('done');});
  };
  avUtt.onerror=e=>{ if(e.error!=='interrupted'){avPlaying=false;stopMouth();statusEl.textContent='Ready';} };
  window.speechSynthesis.speak(avUtt);
  avPlaying=true; setUI(true);
}

function avStop(){
  if(window.speechSynthesis) window.speechSynthesis.cancel();
  avPlaying=false; stopMouth();
  statusEl.textContent='Paused'; dotEl.classList.remove('on');
  pbTop.textContent='▶'; pbTop.classList.remove('lit');
  pbMain.textContent='▶'; pbMain.classList.remove('on');
  narrEl.querySelectorAll('.w').forEach(s=>s.classList.remove('now'));
}

window.avToggle  = ()=>{ avPlaying ? avStop() : avSpeak(); };
window.avPrev    = ()=>{ const was=avPlaying; avStop(); if(curIdx()>0){ window.goTo(curIdx()-1); if(was) setTimeout(avSpeak,380); } };
window.avNext    = ()=>{ const was=avPlaying; avStop(); if(curIdx()<slTotal()-1){ window.goTo(curIdx()+1); if(was) setTimeout(avSpeak,380); } };
window.avMinimize= ()=>{ avStop(); cardEl.classList.add('av-hide'); setTimeout(()=>{ pillEl.style.display='flex'; },280); };
window.avRestore = ()=>{ pillEl.style.display='none'; cardEl.style.display=''; requestAnimationFrame(()=>cardEl.classList.remove('av-hide')); };

/* Intercept slide navigation */
const _goTo=window.goTo;
window.goTo=function(i){
  const was=curIdx(); _goTo(i); const now=curIdx();
  if(now!==was){ render(now); if(avPlaying){avStop();setTimeout(avSpeak,380);} }
};

/* Init */
render(0);
statusEl.textContent='Click ▶ to narrate';
if(window.speechSynthesis){
  window.speechSynthesis.getVoices();
  if(typeof window.speechSynthesis.onvoiceschanged!=='undefined')
    window.speechSynthesis.onvoiceschanged=()=>window.speechSynthesis.getVoices();
}
/* Auto-play */
setTimeout(()=>{ if(!avPlaying && window.speechSynthesis) avSpeak(); }, 1600);

})();
