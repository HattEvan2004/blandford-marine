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
})();
