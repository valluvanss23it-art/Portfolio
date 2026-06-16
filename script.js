/* ══════════════════════════════════════════
   PORTFOLIO SCRIPT
══════════════════════════════════════════ */

/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
if (cursor && window.matchMedia('(pointer: fine)').matches) {
  let cx = 0, cy = 0;
  document.addEventListener('mousemove', e => {
    cx = e.clientX; cy = e.clientY;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
  });
  document.querySelectorAll('a, button, .chip, .project-row, .edu-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
  });
}

/* ── Nav: scroll class + active link ── */
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 40);

  let active = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) active = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + active);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Mobile nav toggle ── */
const toggle = document.getElementById('nav-toggle');
const menu   = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  menu.classList.toggle('open');
});
menu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    toggle.classList.remove('open');
    menu.classList.remove('open');
  });
});

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── Intersection Observer: fade-up ── */
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    // Stagger children within same parent
    const siblings = [...(entry.target.parentElement?.querySelectorAll('.fade-up') || [])];
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => {
      entry.target.classList.add('visible');
    }, Math.min(idx * 70, 280));
    fadeObserver.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

/* Hero fades in immediately on load */
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .fade-up').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 100 + i * 130);
  });
});

/* ── Skill bar animation ── */
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const level = entry.target.getAttribute('data-level');
    const fill  = entry.target.querySelector('.bar-fill');
    if (fill) setTimeout(() => { fill.style.width = level + '%'; }, 150);
    barObserver.unobserve(entry.target);
  });
}, { threshold: 0.4 });
document.querySelectorAll('.bar-row[data-level]').forEach(r => barObserver.observe(r));

/* ── Counter animation ── */
function countUp(el) {
  const target = +el.dataset.target;
  const dur = 1200;
  const fps = 60;
  const inc = target / (dur / (1000 / fps));
  let val = 0;
  const t = setInterval(() => {
    val = Math.min(val + inc, target);
    el.textContent = Math.floor(val);
    if (val >= target) clearInterval(t);
  }, 1000 / fps);
}
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.astat-n').forEach(countUp);
    statsObs.unobserve(entry.target);
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.about-stats');
if (statsEl) statsObs.observe(statsEl);

/* ── Contact form ── */
const form    = document.getElementById('contact-form');
const success = document.getElementById('form-success');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    ['name','email','message'].forEach(name => {
      const el = form.querySelector(`[name="${name}"]`);
      el.classList.remove('error');
      if (!el.value.trim()) { el.classList.add('error'); valid = false; }
      if (name === 'email' && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
        el.classList.add('error'); valid = false;
      }
    });
    if (!valid) return;
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Sending…'; btn.disabled = true;
    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Message →'; btn.disabled = false;
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 5000);
    }, 1000);
  });
  form.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('error'));
  });
}

/* ── Hover glow on project rows ── */
document.querySelectorAll('.project-row').forEach(row => {
  row.addEventListener('mouseenter', () => {
    row.style.transition = 'background 0.25s ease, padding 0.25s ease, margin 0.25s ease, border-radius 0.25s ease';
  });
});