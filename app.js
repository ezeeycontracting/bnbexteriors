/* B&B Exteriors — shared front-end behaviour */
(function () {
  /* ---- custom cursor ---- */
  var dot = document.querySelector('.cur-dot'), ring = document.querySelector('.cur-ring');
  if (dot && ring && window.matchMedia('(hover:hover)').matches) {
    var mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a,button,input,select,textarea,.svc,.t-card,.step,.os-card').forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('hov'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('hov'); });
    });
  }

  /* ---- header shadow on scroll ---- */
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  /* ---- mobile menu ---- */
  var mb = document.getElementById('menuBtn'), nl = document.getElementById('navlinks');
  if (mb && nl) {
    mb.addEventListener('click', function () {
      var open = nl.classList.toggle('open');
      mb.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nl.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nl.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); });
    });
  }

  /* ---- scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 0.08 + 's'; io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- quote form (demo handler) ----
     NOTE: replace this with a real endpoint/webhook at go-live.
     Fields post as: first_name, last_name, phone, email, service, message  */
  window.handleSubmit = function (e) {
    e.preventDefault();
    var form = e.target;
    if (form.querySelector('[name="company"]') && form.querySelector('[name="company"]').value) return; // honeypot
    var btn = form.querySelector('button[type="submit"]');
    var original = btn.textContent;
    btn.textContent = '✓ Thank You! We’ll Be In Touch';
    btn.style.background = 'var(--navy)';
    form.reset();
    setTimeout(function () { btn.textContent = original; btn.style.background = ''; }, 3500);
  };
})();
