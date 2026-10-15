const loaderEl = document.getElementById('loader');
if (loaderEl) {
  document.body.classList.add('loading');
  window.addEventListener('load',()=>{
    window.setTimeout(()=>{
      loaderEl.classList.add('done');
      document.body.classList.remove('loading');
    },1750);
  });
}

document.getElementById('year').textContent=new Date().getFullYear();

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const heroVideo=document.querySelector('.hero-photo-bg video');
if(heroVideo){
  heroVideo.play().catch(()=>{});
}

document.querySelectorAll('.equipment-row').forEach(row=>{
  row.addEventListener('mousemove',e=>{
    const r=row.getBoundingClientRect();
    row.style.background=`radial-gradient(circle at ${e.clientX-r.left}px ${e.clientY-r.top}px, rgba(135,227,4,.12), transparent 32%)`;
  });
  row.addEventListener('mouseleave',()=>row.style.background='');
});

// Cookie preference controls
const cookieFields = {
  preferences: document.getElementById('prefCookies'),
  analytics: document.getElementById('analyticsCookies'),
  marketing: document.getElementById('marketingCookies')
};
if (cookieFields.preferences || cookieFields.analytics || cookieFields.marketing) {
  try {
    const saved = JSON.parse(localStorage.getItem('masterhaulCookiePreferences') || '{}');
    Object.entries(cookieFields).forEach(([key, el]) => { if (el) el.checked = saved[key] === true; });
  } catch(e) {}
  const save = document.getElementById('saveCookieSettings');
  if (save) save.addEventListener('click', () => {
    const values = {};
    Object.entries(cookieFields).forEach(([key, el]) => { if (el) values[key] = el.checked; });
    localStorage.setItem('masterhaulCookiePreferences', JSON.stringify(values));
    const msg = document.getElementById('cookieSaved');
    if (msg) msg.classList.add('show');
  });
  const acceptAll = document.getElementById('acceptAllCookies');
  if (acceptAll) acceptAll.addEventListener('click', () => {
    Object.values(cookieFields).forEach(el => { if (el) el.checked = true; });
    if (save) save.click();
  });
  const rejectAll = document.getElementById('rejectAllCookies');
  if (rejectAll) rejectAll.addEventListener('click', () => {
    Object.values(cookieFields).forEach(el => { if (el) el.checked = false; });
    if (save) save.click();
  });
}
