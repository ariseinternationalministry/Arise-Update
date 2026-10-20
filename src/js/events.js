/* ==========================================================================
   Arise International Ministry — src/js/events.js
   Upcoming / past events (edit the EVENTS array) and the live announcements feed
   (Google Sheet via opensheet).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const guard = (name, fn) => { try { fn(); } catch (err) { console.warn("[arise] " + name + " skipped:", err); } };

  /* ---- 1. Events ---- */
  guard("events", () => {
    (function(){
    /* ===== Add future events here — newest data, same shape. Past events move to "Past events" automatically. ===== */
    const EVENTS=[{
     id:'entoto-hike-2026-10-11',
     start:'2026-10-11T09:00:00+03:00', end:'2026-10-11T15:00:00+03:00',
     img:'./src/assets/images/events/event-posters/entoto-hike-2026-10-11.webp',
     tag:{en:'Hiking · Fellowship',am:'ሃይኪንግ · ህብረት'},
     title:{en:'Christian Youth Hiking Day — Mount Entoto',am:'የጌታ ሰራዊት ክርስቲያን Hiking — እንጦጦ'},
     when:{en:'Sunday, 11 Oct 2026 (Tikimt 1) · from 3:00 morning, Ethiopian time (9:00 AM)',am:'እሁድ ጥቅምት 1 (ጥቅምት 1) · ከጠዋቱ 3:00 ሰዓት ጀምሮ'},
     where:{en:'Departing from Mexico, Addis Ababa → Entoto Mountain',am:'መነሻ ሜክሲኮ → እንጦጦ ተራራ'},
     incl:{en:'Includes lunch, transport, entry & snack',am:'ምሳ፣ ትራንስፖርት፣ መግቢያ እና ስናክን ጨምሮ'},
     price:800, early:700, earlyN:10, phone:'+251929955416', phoneShow:'0929-95-54-16',
     desc:{
      en:['<p>✨ <b>A hiking call for Christian youth and spiritual fellowships!</b> ✨</p><p>Worn out after a week of work and school? We have prepared a special program to refresh your spirit and give you quality time with nature and your Christian brothers and sisters!</p><p>On <b>Sunday, Tikimt 1</b>, from 3:00 in the morning, we set out from Mexico on a wonderful Christian hiking trip up beautiful Mount Entoto.</p><p><b>🎯 What the program includes</b></p><ul><li>🏔️ Climbing the mountain and enjoying nature</li><li>🎮 Fun and varied games</li><li>🍽️ Delicious lunch and snack — everything provided!</li><li>🌿 Travel prayer and spiritual fellowship</li><li>🎁 A special discount!</li></ul><p><b>Entry fee: 800 birr only</b> (including lunch, transport, entry and snack).<br><b>Special offer:</b> the first 10 people to register get 100 birr off — just 700 birr!</p><p>⚠️ <b>Note:</b> places are limited, so register early!</p><p>📞 <b>Call now to reserve your place: 0929-95-54-16</b></p><p>Come! Let us enjoy a healthy, spiritual fellowship together, pray, and climb the mountain side by side! ⛰️✞</p>'],
      am:['<p>✨ <b>የክርስቲያን ወጣቶች እና የመንፈሳዊ ህብረት የሃይኪንግ ጥሪ!</b> ✨</p><p>ሳምንቱን ሙሉ በስራ እና በትምህርት ተወጥረው ደክመዋል? መንፈስዎን የሚያድስ፣ ከተፈጥሮ እና ከክርስቲያን ወንድም እህቶች ጋር ቆንጆ ጊዜ የሚያሳልፉበት ልዩ ፕሮግራም አዘጋጅተናል!</p><p>እሁድ <b>ጥቅምት 1</b> ከጠዋቱ 3:00 ሰዓት ጀምሮ መነሻችንን ሜክሲኮ አድርገን ወደ ውቧ እንጦጦ ተራራ የምናደርገው ድንቅ የክርስቲያን ሃይኪንግ ጉዞ ይኖረናል።</p><p><b>🎯 የፕሮግራማችን ልዩ ልዩ ይዘቶች</b></p><ul><li>🏔️ ተራራ መውጣትና ተፈጥሮን ማደነቅ</li><li>🎮 ደስ የሚሉ ልዩ ልዩ ጨዋታዎች</li><li>🍽️ ጣፋጭ ምሳ እና ስናክ (ሁሉ ነገር የተሟላለት!)</li><li>🌿 የጉዞ ጸሎት እና መንፈሳዊ ህብረት</li><li>🎁 ልዩ የቅናሽ እድል!</li></ul><p><b>የመግቢያ ክፍያ: 800 ብር ብቻ!</b> (ምሳ, ትራንስፖርት, መግቢያ እና ስናክን ጨምሮ)<br><b>ልዩ ማበረታቻ:</b> ፈጥነው ለሚመዘገቡ የመጀመሪያዎቹ 10 ሰዎች የ 100 ብር ቅናሽ አዘጋጅተናል! (በ 700 ብር ብቻ ይሳተፋሉ!)</p><p>⚠️ <b>ማሳሰቢያ:</b> የቦታችን መጠን ውስን በመሆኑ ቀድመው ይመዝገቡ!</p><p>📞 <b>አሁኑኑ ይደውሉና ቦታዎን ያስይዙ: 0929-95-54-16</b></p><p>ይምጡ! ጤናማና መንፈሳዊ በሆነ ህብረት አብረን እንዝናና፣ እንጸልይ፣ ተራራውንም አብረን እንውጣ! ⛰️✞</p>']
     }
    }];
    const UI={
     h:{en:'Upcoming events & programs',am:'የሚመጡ ዝግጅቶችና ፕሮግራሞች'},
     p:{en:'Hikes, trainings, conferences and outreach — see what is coming next and save your place.',am:'ሃይኪንግ፣ ስልጠናዎች፣ ጉባኤዎችና አገልግሎቶች — የሚመጡትን ተመልከቱ፣ ቦታዎንም ያስይዙ።'},
     eye:{en:'Announcements',am:'ማስታወቂያዎች'},nav:{en:'Events',am:'ዝግጅቶች'},
     up:{en:'Upcoming',am:'የሚመጣ'},today:{en:'Happening today',am:'ዛሬ ነው'},tmr:{en:'Tomorrow',am:'ነገ'},
     days:{en:d=>d+' days to go',am:d=>'ለ'+d+' ቀን ቀርቷል'},
     more:{en:'Read full details',am:'ሙሉ ዝርዝር ያንብቡ'},call:{en:'Call to register',am:'ለመመዝገብ ይደውሉ'},
     cal:{en:'Add to calendar',am:'ወደ ቀን መቁጠሪያ'},share:{en:'Share',am:'ያጋሩ'},copied:{en:'Link copied ✓',am:'ሊንኩ ተቀድቷል ✓'},
     fee:{en:'Entry fee',am:'የመግቢያ ክፍያ'},early:{en:d=>'First '+d+' registrants',am:d=>'የመጀመሪያ '+d+' ተመዝጋቢዎች'},birr:{en:'birr',am:'ብር'},
     none:{en:'No upcoming events right now — please check back soon.',am:'አሁን የታቀደ ዝግጅት የለም — እባክዎ በቅርቡ ይመልከቱ።'},
     view:{en:'View past events',am:'ያለፉ ዝግጅቶችን ይመልከቱ'},nopast:{en:'No past events yet.',am:'እስካሁን ያለፉ ዝግጅቶች የሉም።'},past:{en:'Past events',am:'ያለፉ ዝግጅቶች'}
    };
    const lang=()=>(window.Arise&&typeof window.Arise.getLang==='function'&&window.Arise.getLang()==='am')?'am':'en';
    const $=s=>document.querySelector(s);
    const setText=(q,v)=>{const e=$(q);if(e)e.textContent=v};
    const setHTML=(q,v)=>{const e=$(q);if(e)e.innerHTML=v};
    const fmt=(d,l)=>d.toLocaleDateString(l==='am'?'en-GB':'en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'Africa/Addis_Ababa'});
    function badge(e,l){const d=Math.ceil((new Date(e.start)-Date.now())/864e5);
     const day=new Date(e.start).toLocaleDateString('en-CA',{timeZone:'Africa/Addis_Ababa'}),now=new Date().toLocaleDateString('en-CA',{timeZone:'Africa/Addis_Ababa'});
     if(day===now)return UI.today[l];const n=Math.round((new Date(day)-new Date(now))/864e5);return n===1?UI.tmr[l]:UI.up[l]+' · '+UI.days[l](n)}
    function card(e,l,past){const d=new Date(e.start);
     const dd=d.toLocaleDateString('en-GB',{day:'numeric',timeZone:'Africa/Addis_Ababa'}),mm=d.toLocaleDateString('en-GB',{month:'short',timeZone:'Africa/Addis_Ababa'}).toUpperCase(),yy=d.toLocaleDateString('en-GB',{year:'numeric',timeZone:'Africa/Addis_Ababa'});
     return `<article class="ev${past?' past':''}" data-id="${e.id}"><div class="ev-img"><img src="${e.img}" alt="${e.title[l]}" loading="lazy">${past?'':`<span class="ev-badge">${badge(e,l)}</span>`}</div>
    <div class="ev-b"><div class="ev-top"><div class="ev-date"><b>${dd}</b><span>${mm}</span><small>${yy}</small></div><div><div class="ev-tag">${e.tag[l]}</div><h3>${e.title[l]}</h3></div></div>
    <ul class="ev-meta"><li><i>🗓</i>${e.when[l]}</li><li><i>📍</i>${e.where[l]}</li><li><i>🍽</i>${e.incl[l]}</li></ul>
    <div class="ev-price"><span>${UI.fee[l]}<b>${e.price} ${UI.birr[l]}</b></span>${e.early?`<span class="hot">${UI.early[l](e.earlyN)}<b>${e.early} ${UI.birr[l]}</b></span>`:''}</div>
    <details class="ev-more"><summary>${UI.more[l]}</summary><div class="ev-desc">${e.desc[l].join('')}</div></details>
    ${past?'':`<div class="ev-act"><a class="btn f" href="tel:${e.phone}">📞 ${UI.call[l]} · ${e.phoneShow}</a><button class="btn" data-cal="${e.id}">${UI.cal[l]}</button><button class="btn" data-share="${e.id}">${UI.share[l]}</button></div>`}</div></article>`}
    function render(){const l=lang(),now=Date.now(),up=EVENTS.filter(e=>new Date(e.end)>=now).sort((a,b)=>new Date(a.start)-new Date(b.start)),ps=EVENTS.filter(e=>new Date(e.end)<now).sort((a,b)=>new Date(b.start)-new Date(a.start));
     setText('#an-h',UI.h[l]);setText('#an-p',UI.p[l]);setText('#announcements .eye',UI.eye[l]);setText('#nev',UI.nav[l]);
     setHTML('#evs',up.length?up.map(e=>card(e,l)).join(''):`<div class="ev-empty">${UI.none[l]}</div>`);
     setHTML('#evp',ps.length?`<p style="margin-top:34px"><a class="btn" href="#past-events">${UI.view[l]} (${ps.length}) &rarr;</a></p>`:'');
     const pv=$('#pev');if(pv){pv.innerHTML=ps.length?ps.map(e=>card(e,l,true)).join(''):`<div class="ev-empty">${UI.nopast[l]}</div>`;const ph=$('#pe-h');if(ph)ph.textContent=UI.past[l]}}
    function ics(e){const z=d=>new Date(d).toISOString().replace(/[-:]|\.\d{3}/g,''),t=e.title.en;
     return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Arise International Ministry//Events//EN','BEGIN:VEVENT','UID:'+e.id+'@arise','DTSTAMP:'+z(Date.now()),'DTSTART:'+z(e.start),'DTEND:'+z(e.end),'SUMMARY:'+t,'LOCATION:'+e.where.en,'DESCRIPTION:Fee '+e.price+' birr ('+e.early+' birr for the first '+e.earlyN+' registrants). Call '+e.phoneShow+' to register.','END:VEVENT','END:VCALENDAR'].join('\r\n')}
    document.addEventListener('click',async ev=>{
     const c=ev.target.closest('[data-cal]'),s=ev.target.closest('[data-share]');
     if(c){const e=EVENTS.find(x=>x.id===c.dataset.cal);if(!e)return;const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ics(e)],{type:'text/calendar'}));a.download=e.id+'.ics';document.body.appendChild(a);a.click();a.remove()}
     if(s){const e=EVENTS.find(x=>x.id===s.dataset.share);if(!e)return;const l=lang(),url=location.href.split('#')[0]+'#announcements',txt=e.title[l]+' — '+e.when[l];
      try{if(navigator.share){await navigator.share({title:e.title[l],text:txt,url});return}}catch(_){return}
      try{await navigator.clipboard.writeText(txt+' '+url);const o=s.textContent;s.textContent=UI.copied[l];setTimeout(()=>s.textContent=o,2200)}catch(_){prompt('Copy link',url)}}
    });
    const lg=$('#lg');if(lg)lg.addEventListener('click',()=>setTimeout(render,0));
    render();setInterval(render,60000);
    })();;
  });

  /* ---- 2. Announcements feed ---- */
  guard("announcements", () => {
    (function(){
    'use strict';
    /* ---- Settings: only change these if your Sheet changes ---- */
    const SHEET_ID='1uikuC3DANouWFbJYI7GbAfsWOk7YdWKcC3_cffCQnSM';
    const TAB='Sheet1';          // the name of the tab at the bottom of your Google Sheet
    const PAGE=6;                // announcements shown before "Show older"
    const REFRESH_MS=60000;      // auto-refresh every 60 seconds
    const TIMEOUT_MS=12000;
    const API='https://opensheet.elk.sh/'+SHEET_ID+'/'+encodeURIComponent(TAB);

    const TX={
     en:{eye:'News & Updates',h:'Latest announcements',p:'The latest news and announcements — newest first.',live:'Live',latest:'Latest',more:'Read more',less:'Show less',older:'Show older announcements',alt:'Announcement image',load:'Loading announcements…',none:'No announcements yet — please check back soon.',err:'We couldn’t load the announcements right now. Please check your connection and try again.',retry:'Try again'},
     am:{eye:'ዜና እና ማስታወቂያ',h:'የቅርብ ጊዜ ማስታወቂያዎች',p:'አዳዲስ ማስታወቂያዎች — አዲሱ በመጀመሪያ።',live:'ቀጥታ',latest:'አዲስ',more:'ተጨማሪ ያንብቡ',less:'ያነሰ አሳይ',older:'የቆዩ ማስታወቂያዎችን አሳይ',alt:'የማስታወቂያ ምስል',load:'ማስታወቂያዎች በመጫን ላይ…',none:'እስካሁን ማስታወቂያ የለም — እባክዎ በቅርቡ ይመልከቱ።',err:'ማስታወቂያዎቹን አሁን መጫን አልተቻለም። እባክዎ እንደገና ይሞክሩ።',retry:'እንደገና ይሞክሩ'}
    };
    const $=s=>document.querySelector(s),feed=$('#nw-feed'),more=$('#nw-more');
    if(!feed||!more)return;
    const lg=()=>document.documentElement.lang==='am'?'am':'en';
    const el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
    let items=[],shown=PAGE,sig=null,view=null,loaded=false,last=0;

    /* Read columns by name (tolerates "Image_URL", "image url", "Image", etc.) */
    const norm=k=>k.toLowerCase().replace(/[\s_\-]+/g,'');
    const pick=(row,keys)=>{for(const k in row)if(keys.includes(norm(k)))return String(row[k]==null?'':row[k]).trim();return''};
    /* Accept normal image links AND Google Drive share links */
    const imgUrl=u=>{if(!u)return'';const m=u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^#\s]*&)?id=)([\w-]+)/);if(m)return'https://drive.google.com/thumbnail?id='+m[1]+'&sz=w1600';return/^https?:\/\//i.test(u)?u:''};
    /* Safe text → paragraphs, links made clickable (never injects HTML) */
    function paras(txt){const f=document.createDocumentFragment();txt.split(/\n+/).forEach(l=>{l=l.trim();if(!l)return;const p=el('p');l.split(/(https?:\/\/[^\s<]+)/).forEach((s,i)=>{if(i%2){const u=s.replace(/[.,;:!?)\]]+$/,''),a=el('a',null,u);a.href=u;a.target='_blank';a.rel='noopener noreferrer';p.append(a,s.slice(u.length))}else if(s)p.append(s)});f.append(p)});return f}

    function card(it,i,n){
     const T=TX[lg()],c=el('article','nw-card'),b=i===0?el('span','nw-badge',T.latest):null,body=el('div','nw-body');
     c.style.animationDelay=Math.min(n,5)*70+'ms';
     if(it.text){
      const t=el('div','nw-text');t.append(paras(it.text));body.append(t);
      if(it.text.length>320||it.text.split(/\n+/).length>4){
       t.classList.add('clamp');
       const g=el('button','nw-tg',T.more);g.type='button';g.setAttribute('aria-expanded','false');
       g.onclick=()=>{const cl=t.classList.toggle('clamp');g.setAttribute('aria-expanded',String(!cl));g.textContent=TX[lg()][cl?'more':'less']};
       body.append(g)}}
     if(it.img){                      /* image on top, only when a link exists */
      const a=el('a','nw-img'),im=new Image();
      a.href=it.img;a.target='_blank';a.rel='noopener noreferrer';
      im.alt=T.alt;im.loading='lazy';im.decoding='async';im.referrerPolicy='no-referrer';
      im.onerror=()=>{a.remove();if(!it.text){c.remove();return}if(b){b.classList.add('in');body.prepend(b)}};
      im.src=it.img;a.append(im);if(b)a.append(b);c.append(a)
     }else if(b){b.classList.add('in');body.prepend(b)}
     if(body.childNodes.length)c.append(body);
     return c}

    function draw(from){const to=Math.min(items.length,shown);for(let i=from;i<to;i++)feed.append(card(items[i],i,i-from));
     more.hidden=items.length<=shown;more.textContent=TX[lg()].older+' ('+(items.length-shown)+')'}
    function render(){view=render;feed.setAttribute('aria-busy','false');feed.textContent='';if(!items.length)return state('none');draw(0)}
    function state(k,retry){
     view=()=>state(k,retry);feed.setAttribute('aria-busy','false');more.hidden=true;feed.textContent='';
     const T=TX[lg()],d=el('div','nw-state');d.setAttribute('role',retry?'alert':'status');d.append(el('p',null,T[k]));
     if(retry){const b=el('button','btn',T.retry);b.type='button';b.onclick=()=>load();d.append(b)}
     feed.append(d)}
    function skeleton(){view=skeleton;feed.setAttribute('aria-busy','true');more.hidden=true;feed.textContent='';
     for(let i=0;i<3;i++)feed.append(el('div','nw-sk'));feed.append(el('p','nw-ld',TX[lg()].load))}
    function labels(){const T=TX[lg()],st=(q,v)=>{const e=$(q);if(e)e.textContent=v};st('#nw-eye',T.eye);st('#nw-h',T.h);st('#nw-p',T.p);st('#nw-live',T.live)}

    async function load(){
     last=Date.now();if(!loaded)skeleton();
     const ac=new AbortController(),to=setTimeout(()=>ac.abort(),TIMEOUT_MS);
     try{
      const res=await fetch(API,{cache:'no-cache',signal:ac.signal});if(!res.ok)throw 0;
      const data=await res.json();if(!Array.isArray(data))throw 0;      /* wrong tab name returns an error object */
      const list=data.map(row=>({text:pick(row,['announcement']),img:imgUrl(pick(row,['imageurl','image']))}))
                     .filter(x=>x.text||x.img).reverse();               /* newest row first */
      loaded=true;const s=JSON.stringify(list);
      if(s!==sig){sig=s;items=list;shown=Math.max(shown,PAGE);render()}  /* only redraw when the Sheet changed */
     }catch(e){if(!loaded)state('err',true)}                            /* if a refresh fails, keep what is on screen */
     finally{clearTimeout(to)}}

    more.onclick=()=>{const f=shown;shown+=PAGE;draw(f)};
    document.addEventListener('visibilitychange',()=>{if(!document.hidden&&Date.now()-last>15000)load()});
    setInterval(()=>{if(!document.hidden)load()},REFRESH_MS);
    new MutationObserver(()=>{labels();view&&view()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    labels();load();
    })();;
  });
});
