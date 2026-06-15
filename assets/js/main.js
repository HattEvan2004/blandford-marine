/* Blandford Marine — shared site script */
(function () {
  // footer year
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // mobile menu
  var mb = document.getElementById('menuBtn');
  var nl = document.getElementById('navlinks');
  if (mb && nl) {
    mb.addEventListener('click', function () {
      var open = nl.classList.toggle('open');
      mb.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nl.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nl.classList.remove('open');
        mb.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: .12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // lead form (front-end only until wired to a mail service)
  var form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.getElementById('formNote');
      if (note) {
        note.textContent =
          "This form isn't connected yet — wire it to a form service (Formspree/Netlify) or a mailto before launch. For now, please call 902-228-2205.";
      }
    });
  }

  // photo slideshow(s)
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-carousel]').forEach(function (car) {
    var slides = Array.prototype.slice.call(car.querySelectorAll('.carousel-slide'));
    if (slides.length < 2) return;
    var dotsWrap = car.querySelector('.carousel-dots');
    var countEl = car.querySelector('.carousel-count');
    var i = 0, timer = null;

    var dots = slides.map(function (_, idx) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', 'Photo ' + (idx + 1));
      b.addEventListener('click', function () { go(idx); restart(); });
      if (dotsWrap) dotsWrap.appendChild(b);
      return b;
    });

    function go(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, idx) { s.classList.toggle('active', idx === i); });
      dots.forEach(function (d, idx) { d.classList.toggle('active', idx === i); });
      if (countEl) countEl.textContent = (i + 1) + ' / ' + slides.length;
    }
    function next() { go(i + 1); }
    function start() { if (!reduce) timer = setInterval(next, 4500); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    var prev = car.querySelector('.carousel-btn.prev');
    var nxt = car.querySelector('.carousel-btn.next');
    if (prev) prev.addEventListener('click', function () { go(i - 1); restart(); });
    if (nxt) nxt.addEventListener('click', function () { go(i + 1); restart(); });
    car.addEventListener('mouseenter', stop);
    car.addEventListener('mouseleave', start);
    car.addEventListener('focusin', stop);
    car.addEventListener('focusout', start);

    go(0);
    start();
  });
})();
