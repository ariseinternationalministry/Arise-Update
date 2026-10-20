/* ==========================================================================
   Arise International Ministry — src/js/site-ui.js
   Site UI: hero slideshow, counters, copy buttons, hash router, contact form,
   city picker and the decorative "live layer".
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const guard = (name, fn) => { try { fn(); } catch (err) { console.warn("[arise] " + name + " skipped:", err); } };

  /* ---- 1. Main UI ---- */
  guard("site-ui", () => {
    (()=>{
    // === Connect the contact form to a real service here (e.g. Formspree "https://formspree.io/f/xxxx" or Web3Forms). Leave empty until connected. ===
    const FORM_ENDPOINT='';
    const Q=s=>document.querySelector(s),QA=s=>[...document.querySelectorAll(s)],rmo=matchMedia('(prefers-reduced-motion:reduce)').matches;
    const MAIL='Ariseinternationalministry@gmail.com',WAN='251970752729';
    QA('img[data-u]').forEach(i=>{const p=IMG[i.dataset.u];if(p)i.src=p});
    // hero slideshow
    const hs=['UP5','UP6','UP7','UP8','UP2'],alts=['Thousands of people raising their arms in praise under tall trees','Hands raised in worship at an open-air gathering','A crowd of young people looking up with joy at a street mission','A hillside crowd gathered to hear the gospel','An evangelist playing guitar for children gathered in a village'];
    const hb=Q('#hbg'),hd=Q('#hdots');let hi=0,ht;
    if(hb&&hd)hs.forEach((id,i)=>{if(!IMG[id])return;const d=document.createElement('div');d.className='hsl'+(i?'':' on')+(PH[id]&&PH[id][0]<1.1?' por':'');d.innerHTML=`<img class="bgb" alt="" src="${IMG[id]}"><img class="mn" alt="${alts[i]}" src="${IMG[id]}">`;hb.appendChild(d);
    const b=document.createElement('button');b.setAttribute('aria-label','Slide '+(i+1));b.className=i?'':'on';b.innerHTML='<i></i>';b.onclick=()=>{go(i);auto()};hd.appendChild(b)});
    function go(n){const sl=QA('.hsl'),bt=QA('#hdots button');if(!sl.length||!bt.length||!sl[hi]||!sl[n])return;sl[hi].classList.remove('on');bt[hi].classList.remove('on');hi=n;sl[hi].classList.add('on');void bt[hi].offsetWidth;bt[hi].classList.add('on')}
    function auto(){clearInterval(ht);if(!rmo)ht=setInterval(()=>{if(!document.hidden&&document.body.dataset.pg=='home')go((hi+1)%hs.length)},6500)}auto();
    // KPI counters
    const ko=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;ko.unobserve(e.target);const el=e.target,to=+el.dataset.to,pl=el.dataset.plus?'+':'',t0=performance.now();const f=n=>{const k=rmo?1:Math.min(1,(n-t0)/2600),v=k>=1?1:1-Math.pow(2,-10*k);el.textContent=Math.round(to*v).toLocaleString('en-US')+(k>=1?pl:'');if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}),{threshold:.6});QA('.kp').forEach(e=>ko.observe(e));
    // toast + copy
    let tt;const toast=m=>{const t=Q('#toast');if(!t)return;t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2600)};
    const fb=t=>{const a=document.createElement('textarea');a.value=t;a.setAttribute('readonly','');a.style.cssText='position:fixed;left:-9999px;top:0';document.body.appendChild(a);a.select();a.setSelectionRange(0,99);let ok=false;try{ok=document.execCommand('copy')}catch(e){}a.remove();return ok};
    const copy=async(t)=>{try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(t);return true}}catch(e){}return fb(t)};
    QA('[data-copy]').forEach(b=>b.onclick=async()=>{const ok=await copy(b.dataset.copy);if(!ok){toast('Press and hold the number to copy it.');return}toast('\u2713 '+(b.dataset.m||'Copied'));if(b.classList.contains('gk-b')){const o=b.dataset.l||b.textContent;b.dataset.l=o;b.textContent='\u2713 Copied';b.classList.add('ok');setTimeout(()=>{b.textContent=o;b.classList.remove('ok')},2200)}});
    // modals
    const modal=h=>{const mi=Q('#mi'),md=Q('#md');if(!mi||!md)return;mi.innerHTML=h;md.classList.add('on')};
    QA('[data-lg]').forEach(a=>a.onclick=e=>{e.preventDefault();modal(`<h2 style="font-size:38px">${a.dataset.lg}</h2><p style="color:var(--mu)">The full text will be provided by Arise International Ministry.</p><div class="acts"><button class="btn" onclick="document.getElementById('md').classList.remove('on')">Close</button></div>`)});

    // router
    const route=()=>{const h=location.hash.slice(1),pg=(['give','contact','privacy','terms','past-events'].includes(h))?h:'home',was=document.body.dataset.pg;document.body.dataset.pg=pg;Q('#nv')?.classList.remove('o');
    if(pg!='home'){if(was!=pg)scrollTo({top:0,behavior:'auto'});document.title=({give:'Give',contact:'Contact',privacy:'Privacy Policy',terms:'Terms of Use','past-events':'Past events'}[pg])+' — Arise International Ministry'}
    else{document.title='Arise International Ministry — The gospel across Ethiopia';if(h&&h!='top'){const el=document.getElementById(h);if(el)requestAnimationFrame(()=>el.scrollIntoView({behavior:was=='home'?'smooth':'auto'}))}else if(was!='home'||h=='top')scrollTo({top:0,behavior:'auto'})}};
    addEventListener('hashchange',route);document.body.dataset.pg='home';route();
    document.addEventListener('click',e=>{const a=e.target.closest('a[data-sc]');if(a){e.preventDefault();document.getElementById(a.dataset.sc).scrollIntoView({behavior:'smooth'})}});
    // contact form
    const cf=Q('#cf'),fr=Q('#fres'),R={name:v=>v.trim().length>1,email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),phone:v=>!v.trim()||/^\+?[\d\s()\-]{7,}$/.test(v.trim()),subject:v=>v.trim().length>2,message:v=>v.trim().length>=10};
    const chk=n=>{const f=cf&&cf.elements[n];if(!f)return true;const ok=R[n](f.value);f.closest('.fld').classList.toggle('bad',!ok);f.setAttribute('aria-invalid',!ok);return ok};
    if(cf)Object.keys(R).forEach(n=>cf.elements[n]?.addEventListener('blur',()=>chk(n)));
    cf?.addEventListener('submit',async e=>{e.preventDefault();if(cf.elements._gotcha&&cf.elements._gotcha.value)return;const ok=Object.keys(R).map(chk).every(Boolean);if(!ok){cf.querySelector('.bad input,.bad textarea')?.focus();return}
    const d=Object.fromEntries(new FormData(cf)),btn=cf.querySelector('button');
    const body=`Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone||'-'}\nTopic: ${d.topic}\n\n${d.message}`;
    const fallback=(lead)=>{if(!fr)return;fr.innerHTML=`<h3>${lead}</h3><p>Send your message directly using one of these options.</p><a class="btn f" href="mailto:${MAIL}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(body)}">Send by email</a><a class="btn" href="https://wa.me/${WAN}?text=${encodeURIComponent(d.subject+'\n\n'+body)}" target="_blank" rel="noopener">Send on WhatsApp</a>`;fr.classList.add('on');fr.scrollIntoView({behavior:'smooth',block:'center'})};
    if(!FORM_ENDPOINT){fallback('Your message is ready.');return}
    btn.disabled=true;btn.textContent='Sending…';
    try{if(!fr)throw 0;const r=await fetch(FORM_ENDPOINT,{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify({...d,_replyto:d.email,_subject:d.subject})});if(!r.ok)throw 0;cf.style.display='none';fr.innerHTML='<h3>Thank you.</h3><p>Your message has been received. The Arise team will get back to you.</p>';fr.classList.add('on');fr.scrollIntoView({behavior:'smooth',block:'center'})}
    catch(x){btn.disabled=false;btn.textContent='Send Message';fallback('We couldn’t send that just now.')}});
    })();
  });

  /* ---- 2. City picker (dropdown beside the map) ---- */
  guard("city-picker", () => {
    (function(){
      const A=window.Arise;
      const sel=document.getElementById('cpick');
      if(!sel||!A||!Array.isArray(A.ALLL))return;
      const idx=A.ALLL.map((c,k)=>[c.name,k]).sort((a,b)=>a[0].localeCompare(b[0]));
      sel.innerHTML='<option value="">Select a city to see its data...</option>'+idx.map(x=>`<option value="${x[1]}">${x[0]}</option>`).join('');
      sel.onchange=()=>{if(sel.value!=='')A.pick(+sel.value)};
      A.onPick(k=>{sel.value=k});                       // keep the dropdown in sync when a pin is clicked
      const rs=document.getElementById('zr');if(rs)rs.addEventListener('click',()=>{sel.value=''});
    })();
  });

  /* ---- 3. Live layer: embers, card spotlight, mission ticker, breathing pins ---- */
  guard("live-layer", () => {
    (function(){
    try{
    const $=(q,r)=>(r||document).querySelector(q),$$=(q,r)=>[...(r||document).querySelectorAll(q)];
    const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
    // jump button on Give page
    document.addEventListener('click',e=>{const b=e.target.closest('[data-jump]');if(!b)return;const t=document.getElementById(b.dataset.jump);if(t)t.scrollIntoView({behavior:rm?'auto':'smooth',block:'start'})});
    // hero: live pill + rising embers
    const hw=$('.cin .w');
    if(hw&&!$('.live',hw)){const a=document.createElement('a');a.className='live';a.href='https://t.me/eyubibleteachings';a.target='_blank';a.rel='noopener';a.innerHTML='<i></i><span>Join our online fellowship &middot; Telegram &amp; Zoom</span>';hw.insertBefore(a,hw.firstChild)}
    function embers(host,n){if(rm||!host||$('.ember',host))return;for(let i=0;i<n;i++){const e=document.createElement('i');e.className='ember';e.style.cssText='left:'+(Math.random()*100).toFixed(1)+'%;--s:'+(2+Math.random()*4).toFixed(1)+'px;--t:'+(11+Math.random()*12).toFixed(1)+'s;--dl:-'+(Math.random()*20).toFixed(1)+'s;--dx:'+(Math.round(Math.random()*120-60))+'px';host.appendChild(e)}}
    embers($('.cin'),16);embers($('.gv-hero'),10);
    // cursor spotlight on cards
    const sel='.mc,.ci,.gw2>div,.vals div,.gk,.ev,.ix,.card,.loc,.gh2';
    const ALLL=(window.Arise&&window.Arise.ALLL)||null;
    $$(sel).forEach(el=>el.classList.add('sp'));
    document.addEventListener('pointermove',e=>{const el=e.target.closest&&e.target.closest(sel);if(!el)return;el.classList.add('sp');const r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')},{passive:true});
    // mission trail ticker + Addis Ababa clock
    function ticker(){const chips=$('#chips');if(!chips||$('#tkr')||!ALLL)return;
    const names=ALLL.map(c=>c.name).filter(Boolean);if(names.length<5)return;
    const t=document.createElement('div');t.className='tkr';t.id='tkr';
    const items=names.map(n=>'<span>'+n.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</span>').join('');
    t.innerHTML='<div class="tk-l"><i></i><span>Addis Ababa <b id="tkt">--:--</b></span></div><div class="tk-w" aria-label="Cities Arise has served"><div class="tk-in">'+items+items+'</div></div>';
    chips.parentNode.insertBefore(t,chips);
    const tm=()=>{try{$('#tkt').textContent=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Africa/Addis_Ababa'}).format(new Date())+' EAT'}catch(x){}};tm();setInterval(tm,20000);
    const d=Math.max(60,names.length*1.1);$('.tk-in',t).style.animationDuration=d+'s'}
    ticker();
    // breathing pins on the map (a subset, so it stays light)
    function pins(){$$('#svg .pin').forEach((p,i)=>{if(i%6===0){p.classList.add('br');p.style.setProperty('--pd',(i%5)*.7+'s')}})}
    pins();const sv=$('#svg');if(sv)new MutationObserver(()=>{if(!$('#svg .pin.br'))pins()}).observe(sv,{childList:true});
    }catch(err){console.warn('live layer',err)}
    })();
  });
});
