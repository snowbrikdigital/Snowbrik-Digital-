document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------- Loader ---------------- */
window.addEventListener('load', ()=>{
  setTimeout(()=>{ document.getElementById('loader').classList.add('done'); playHero(); }, 900);
});

/* ---------------- Scroll progress + navbar state ---------------- */
const scrollbar = document.getElementById('scrollbar');
const navEl = document.getElementById('nav');
const totop = document.getElementById('totop');
window.addEventListener('scroll', ()=>{
  const h = document.documentElement;
  const pct = (h.scrollTop)/(h.scrollHeight - h.clientHeight) * 100;
  scrollbar.style.width = pct + '%';
  navEl.classList.toggle('scrolled', h.scrollTop > 40);
  totop.classList.toggle('show', h.scrollTop > 600);
});
totop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

/* ---------------- Mobile menu ---------------- */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', ()=>{
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nlink').forEach(a=>a.addEventListener('click', ()=>{
  burger.classList.remove('open'); navLinks.classList.remove('open');
}));

/* ---------------- Cursor glow ---------------- */
const glow = document.getElementById('cursor-glow');
window.addEventListener('mousemove', e=>{
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

/* ---------------- Magnetic buttons ---------------- */
document.querySelectorAll('.magnetic').forEach(btn=>{
  btn.addEventListener('mousemove', e=>{
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    btn.style.transform = `translate(${x*0.25}px, ${y*0.4}px)`;
  });
  btn.addEventListener('mouseleave', ()=>{ btn.style.transform = 'translate(0,0)'; });
});

/* ---------------- Background circuitry particles ---------------- */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W,H,particles=[];
function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize(); window.addEventListener('resize', resize);
const COUNT = window.innerWidth < 700 ? 40 : 85;
for(let i=0;i<COUNT;i++){
  particles.push({x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25});
}
function drawBg(){
  ctx.clearRect(0,0,W,H);
  ctx.fillStyle = 'rgba(0,229,255,0.55)';
  for(const p of particles){
    p.x += p.vx; p.y += p.vy;
    if(p.x<0||p.x>W) p.vx*=-1;
    if(p.y<0||p.y>H) p.vy*=-1;
  }
  for(let i=0;i<particles.length;i++){
    const p = particles[i];
    ctx.beginPath(); ctx.arc(p.x,p.y,1.3,0,Math.PI*2); ctx.fill();
    for(let j=i+1;j<particles.length;j++){
      const q = particles[j];
      const dx=p.x-q.x, dy=p.y-q.y, dist=Math.sqrt(dx*dx+dy*dy);
      if(dist < 140){
        ctx.strokeStyle = `rgba(0,157,255,${(1-dist/140)*0.18})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawBg);
}
drawBg();

/* ---------------- mini graphs in hero panels ---------------- */
function buildGraph(id, n){
  const el = document.getElementById(id);
  let html='';
  for(let i=0;i<n;i++){
    const h = 20 + Math.random()*80;
    html += `<i style="height:${h}%"></i>`;
  }
  el.innerHTML = html;
}
buildGraph('graph1', 14);
buildGraph('graph2', 14);

/* ---------------- Services data ---------------- */
const services = [
  {t:'Social Media Marketing', d:'Content systems and paid strategy that turn attention into pipeline.', i:'M4 4h16v16H4zM4 9h16M9 4v16'},
  {t:'Search Engine Optimization', d:'Technical, on-page and content SEO built for compounding organic growth.', i:'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.35-4.35'},
  {t:'Web Development', d:'Fast, scalable websites and web apps engineered for conversion.', i:'M4 5h16v14H4zM4 9h16'},
  {t:'UI/UX Design', d:'Interfaces designed around clarity, trust and measurable outcomes.', i:'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z'},
  {t:'Graphic Design', d:'Visual identity systems that make brands instantly recognizable.', i:'M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z'},
  {t:'Video Editing', d:'Short and long-form edits engineered for retention and reach.', i:'M4 4h12v16H4zM16 9l5-3v12l-5-3'},
  {t:'Brand Strategy', d:'Positioning, voice and messaging that make growth easier everywhere else.', i:'M3 12h18M3 6h18M3 18h18'},
  {t:'Marketing Automation', d:'Connected systems that nurture, convert and retain — on autopilot.', i:'M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8'},
];
const servGrid = document.getElementById('servicesGrid');
services.forEach((s,idx)=>{
  servGrid.innerHTML += `
  <div class="card reveal">
    <div class="serv-index">0${idx+1}</div>
    <div class="serv-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${s.i}"/></svg></div>
    <h3>${s.t}</h3>
    <p>${s.d}</p>
  </div>`;
});

/* ---------------- Portfolio data ----------------
   Real, live projects go first. The last two are concept builds —
   shown as "Concept" work (not fabricated client results) so the
   grid doesn't look empty/broken while real case studies are added
   over time. Swap their copy/tag/metrics for real numbers once a
   client project actually ships. */
const folio = [
  {tag:'Personal Brand', title:'Creator Growth System', desc:'Content and growth framework that scaled a niche page past 200K+ views.', m1:['Total Views','220K+'], m2:['Follower Growth','+310%'], grad:'linear-gradient(135deg,#04304a,#04101f)'},
  {tag:'Web Platform', title:'Snowbrik Digital — Brand OS', desc:'The identity, automation stack and site system behind Snowbrik Digital itself.', m1:['Load Time','0.8s'], m2:['Lighthouse','96'], grad:'linear-gradient(135deg,#04304a,#04101f)'},
  {tag:'Concept', title:'E-Commerce Growth System', desc:'A concept build showing how we\'d structure brand, storefront and social funnel for a retail client.', m1:['Scope','Full Funnel'], m2:['Type','Concept Build'], grad:'linear-gradient(135deg,#04304a,#04101f)'},
  {tag:'Concept', title:'Content Engine', desc:'A concept build for a packaged content and outreach system designed to generate qualified leads.', m1:['Scope','Content + Outreach'], m2:['Type','Concept Build'], grad:'linear-gradient(135deg,#04304a,#04101f)'},
];
const folioGrid = document.getElementById('folioGrid');
folio.forEach(f=>{
  folioGrid.innerHTML += `
  <div class="folio-card reveal">
    <div class="folio-bg" style="background:${f.grad}"></div>
    <div class="folio-tag">${f.tag}</div>
    <div class="folio-arrow"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg></div>
    <h3>${f.title}</h3>
    <p>${f.desc}</p>
    <div class="folio-meta">
      <div><b>${f.m1[1]}</b>${f.m1[0]}</div>
      <div><b>${f.m2[1]}</b>${f.m2[0]}</div>
    </div>
  </div>`;
});

/* ---------------- Features ---------------- */
const feats = [
  {n:'AI', t:'AI Automation', d:'Intelligent workflows that handle the repetitive work — so your team scales without headcount.'},
  {n:'∞', t:'Scalable Systems', d:'Architecture that holds up whether you have 100 customers or 100,000.'},
  {n:'★', t:'Premium Design', d:'Interfaces and identities crafted to feel effortless — and convert.'},
  {n:'↗', t:'Growth Strategy', d:'Roadmaps grounded in data, not guesswork or trends.'},
  {n:'⚡', t:'Performance Marketing', d:'Paid and organic channels engineered to hit a target CAC.'},
  {n:'</>', t:'Development Excellence', d:'Clean, fast, maintainable code shipped by engineers who care.'},
];
const featGrid = document.getElementById('featGrid');
feats.forEach(f=>{
  featGrid.innerHTML += `<div class="card feat-card reveal"><b>${f.n}</b><h3>${f.t}</h3><p>${f.d}</p></div>`;
});

/* ---------------- Pricing ---------------- */
const pricingMonthly = [
  {name:'Starter', price:'$450', per:'/mo', desc:'For early-stage brands needing consistent execution.', feat:['4 content pieces / week','Monthly performance report','Basic SEO maintenance','Email support'], cta:'Start Growing'},
  {name:'Growth', price:'$950', per:'/mo', desc:'Our most-picked plan for scaling businesses.', feat:['Full content + SEO system','Marketing automation setup','Bi-weekly strategy calls','Priority support'], cta:'Book a Call', feat_flag:true},
  {name:'Scale', price:'$1,900', per:'/mo', desc:'For brands ready to run growth like a system.', feat:['Full-funnel management','Dedicated strategist + dev support','Weekly reporting dashboard','24/7 priority line'], cta:'Talk to Us'},
];
const pricingProject = [
  {name:'Launch', price:'$800', per:'one-time', desc:'Brand identity + a fully built website.', feat:['Logo & brand system','5-page website','Basic SEO setup','2 weeks delivery'], cta:'Start Project'},
  {name:'Growth Build', price:'$2,400', per:'one-time', desc:'Full website + automation + content system.', feat:['Custom web app','CRM + automation setup','Content system templates','4 weeks delivery'], cta:'Book a Call', feat_flag:true},
  {name:'Full System', price:'Custom', per:'quote', desc:'End-to-end digital system, built from zero.', feat:['Brand, web, app & automation','Dedicated project team','Post-launch support included','Timeline scoped to project'], cta:'Get a Quote'},
];
const priceGrid = document.getElementById('priceGrid');
function renderPricing(list){
  // NOTE: these cards render dynamically after the initial scroll-reveal
  // pass has already run, so they intentionally skip the "reveal" class
  // (which starts at opacity:0 and only gets animated to opacity:1 once,
  // on page load). Without this fix, toggling Monthly <-> Project-Based
  // left the grid blank because the new cards never got revealed.
  priceGrid.innerHTML = list.map(p=>`
    <div class="card price-card ${p.feat_flag?'feat':''}">
      ${p.feat_flag?'<div class="tag">Most Popular</div>':''}
      <div class="price-name">${p.name}</div>
      <div class="price-amt">${p.price}<span>${p.per}</span></div>
      <div class="price-desc">${p.desc}</div>
      <ul class="price-list">
        ${p.feat.map(f=>`<li><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>${f}</li>`).join('')}
      </ul>
      <a href="#contact" class="btn ${p.feat_flag?'btn-primary':'btn-ghost'} magnetic">${p.cta}</a>
    </div>`).join('');
}
renderPricing(pricingMonthly);
const priceSwitch = document.getElementById('priceSwitch');
const labelM = document.getElementById('labelMonthly');
const labelP = document.getElementById('labelProject');
let onProject = false;
function togglePricing(){
  onProject = !onProject;
  priceSwitch.classList.toggle('on', onProject);
  labelM.classList.toggle('active', !onProject);
  labelP.classList.toggle('active', onProject);
  renderPricing(onProject ? pricingProject : pricingMonthly);
}
priceSwitch.addEventListener('click', togglePricing);

/* ---------------- FAQ ---------------- */
const faqs = [
  {q:'What does Snowbrik Digital actually do?', a:'We design and build the full digital system behind a brand — strategy, content, design, development, and the automation that connects it all — so growth doesn\'t depend on any one channel.'},
  {q:'How fast can we get started?', a:'Most engagements kick off within a week of our first call, once we\'ve aligned on scope, goals and access to the right accounts.'},
  {q:'Do you work with businesses outside Pakistan?', a:'Yes — we work with brands across Pakistan, the Gulf and internationally. All communication and reporting is fully remote-friendly.'},
  {q:'Can we start with one service and add more later?', a:'Absolutely. Most clients start with one system (usually web or content) and expand into automation and paid growth once the foundation is live.'},
  {q:'What makes Snowbrik Digital different?', a:'We think in systems, not one-off deliverables. Every asset we build is designed to connect to the next, so results compound instead of resetting each month.'},
];
const faqList = document.getElementById('faqList');
faqs.forEach((f,i)=>{
  faqList.innerHTML += `
  <div class="faq-item reveal" data-i="${i}">
    <div class="faq-q"><h4>${f.q}</h4><div class="faq-plus"></div></div>
    <div class="faq-a"><p>${f.a}</p></div>
  </div>`;
});
document.querySelectorAll('.faq-item').forEach(item=>{
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', ()=>{
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(o=>{o.classList.remove('open'); o.querySelector('.faq-a').style.maxHeight=null;});
    if(!isOpen){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight+40+'px'; }
  });
});

/* ---------------- Testimonials ---------------- */
const testimonials = [
  {q:'"Snowbrik Digital didn\'t just redesign our brand — they rebuilt how we think about growth. The systems they set up are still compounding results months later."', n:'Ayesha R.', r:'Founder, Retail Brand', a:'A'},
  {q:'"Every deliverable felt engineered, not decorative. Our website finally converts the way our product deserves."', n:'Bilal K.', r:'Co-Founder, D2C Startup', a:'B'},
  {q:'"They plugged straight into our team and shipped faster than any studio we\'d worked with before — without cutting corners."', n:'Sana M.', r:'Marketing Lead, Retail Chain', a:'S'},
];
let testiIdx = 0;
const testiDots = document.getElementById('testiDots');
testimonials.forEach((t,i)=>{ testiDots.innerHTML += `<button data-i="${i}" class="${i===0?'active':''}"></button>`; });
function renderTesti(i){
  const t = testimonials[i];
  document.getElementById('testiQuote').textContent = t.q;
  document.getElementById('testiName').textContent = t.n;
  document.getElementById('testiRole').textContent = t.r;
  document.getElementById('testiAvatar').textContent = t.a;
  document.querySelectorAll('.testi-dots button').forEach((b,bi)=>b.classList.toggle('active', bi===i));
}
document.querySelectorAll('.testi-dots button').forEach(btn=>{
  btn.addEventListener('click', ()=>{ testiIdx = +btn.dataset.i; renderTesti(testiIdx); resetTestiTimer(); });
});
let testiTimer;
function resetTestiTimer(){
  clearInterval(testiTimer);
  testiTimer = setInterval(()=>{ testiIdx = (testiIdx+1)%testimonials.length; renderTesti(testiIdx); }, 5500);
}
resetTestiTimer();

/* ---------------- Contact form ----------------
   IMPORTANT: This form currently sends via FormSubmit's AJAX endpoint
   (https://formsubmit.co/ajax/snowbrikdigital@gmail.com). That works
   the first time an email address is used with FormSubmit, but it
   requires a ONE-TIME confirmation: FormSubmit emails
   snowbrikdigital@gmail.com an "activate your form" link the first
   time a submission comes through, and no messages deliver until that
   link is clicked. Go check that inbox (including spam) after your
   first test submission and click "Activate Form".
   The old version of this form just tried to open the visitor's own
   email app via a mailto: link — which silently does nothing on most
   phones/browsers if no default mail app is configured, which is very
   likely why it looked "not working". */
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('contactSubmitBtn');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/snowbrikdigital@gmail.com';

contactForm.addEventListener('submit', async function(e){
  e.preventDefault();
  formSuccess.style.display = 'none';
  formError.style.display = 'none';

  const fd = new FormData(this);
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  try{
    const res = await fetch(FORM_ENDPOINT, {
      method:'POST',
      headers:{ 'Accept':'application/json' },
      body: fd
    });
    if(!res.ok) throw new Error('Request failed');
    formSuccess.style.display = 'flex';
    contactForm.reset();
  }catch(err){
    formError.style.display = 'block';
  }finally{
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});

/* ---------------- AI assistant widget ---------------- */
const aiLauncher = document.getElementById('ai-launcher');
const aiPanel = document.getElementById('ai-panel');
const aiBody = document.getElementById('aiBody');
aiLauncher.addEventListener('click', ()=> aiPanel.classList.toggle('open'));
function aiAdd(text, who){
  const d = document.createElement('div');
  d.className = 'ai-msg ' + who;
  d.textContent = text;
  aiBody.appendChild(d);
  aiBody.scrollTop = aiBody.scrollHeight;
}
document.getElementById('aiQuick').addEventListener('click', (e)=>{
  const btn = e.target.closest('button');
  if(!btn) return;
  const r = btn.dataset.r;
  if(r==='services'){ aiAdd('Show me your services', 'me'); setTimeout(()=>{ aiAdd('We cover social media, SEO, web development, UI/UX, graphic design, video editing, brand strategy and marketing automation. Want me to scroll you to that section?', 'bot'); document.getElementById('services').scrollIntoView({behavior:'smooth'}); }, 500); }
  if(r==='pricing'){ aiAdd('What are your prices?', 'me'); setTimeout(()=>{ aiAdd('Plans start at $450/mo, or from $800 for a fixed-scope project. Taking you to the pricing section now.', 'bot'); document.getElementById('pricing').scrollIntoView({behavior:'smooth'}); }, 500); }
  if(r==='call'){ aiAdd('I want to book a call', 'me'); setTimeout(()=>{ aiAdd('Great — scroll down to the contact section and use WhatsApp or the form, our team replies within 24 hours.', 'bot'); document.getElementById('contact').scrollIntoView({behavior:'smooth'}); }, 500); }
});

/* ---------------- GSAP scroll reveals ---------------- */
gsap.registerPlugin(ScrollTrigger);

function playHero(){
  gsap.to('#home .reveal', {
    opacity:1, y:0, duration:1, ease:'power3.out', stagger:0.12
  });
}

ScrollTrigger.batch('.reveal:not(#home .reveal)', {
  start:'top 88%',
  onEnter: batch => gsap.to(batch, {opacity:1, y:0, duration:0.9, ease:'power3.out', stagger:0.1}),
  once:true
});

/* counters */
document.querySelectorAll('.counter').forEach(el=>{
  const target = +el.dataset.target;
  ScrollTrigger.create({
    trigger: el,
    start:'top 90%',
    once:true,
    onEnter:()=>{
      let obj={v:0};
      gsap.to(obj,{v:target, duration:1.8, ease:'power2.out', onUpdate:()=>{ el.textContent = Math.floor(obj.v); }, onComplete:()=>{ el.textContent = target; }});
    }
  });
});

/* process timeline fill + active step */
const track = document.getElementById('processTrack');
const fill = document.getElementById('processFill');
const steps = document.querySelectorAll('.process-item');
ScrollTrigger.create({
  trigger: track,
  start:'top 60%',
  end:'bottom 60%',
  onUpdate: self=>{
    fill.style.height = (self.progress*100) + '%';
    const idx = Math.min(steps.length-1, Math.floor(self.progress * steps.length));
    steps.forEach((s,i)=> s.classList.toggle('active', i<=idx));
  }
});

/* refresh scroll trigger after dynamic content injected */
window.addEventListener('load', ()=> ScrollTrigger.refresh());
