/* Mike Adelholm — delt sideadfærd: reveal-on-scroll, kurvetegning, søjlevækst,
   let parallax på foto/baggrund. Alt er progressiv forbedring: uden JS vises
   indholdet som normalt. prefers-reduced-motion slår al bevægelse fra.

   Filen rydder også den pre-renderede reservekopi op — se bunden. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var EASE = 'cubic-bezier(.16,1,.3,1)';

  /* Reservekopien fra tools/prerender.mjs er statisk markup. Den må hverken
     animeres eller gøres usynlig — den er alt, brugeren har at se på, indtil
     React er klar. */
  function skip(el) {
    return !!(el.closest && el.closest('#dc-prerender'));
  }

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      show(e.target);
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;

  function show(el) {
    var kind = el.getAttribute('data-ma-kind');
    el.addEventListener('transitionend', function clear() {
      el.style.willChange = 'auto';
      el.removeEventListener('transitionend', clear);
    });
    if (kind === 'draw') {
      el.style.strokeDashoffset = '0';
    } else if (kind === 'grow') {
      el.style.transform = 'scaleY(1)';
      el.style.opacity = '1';
    } else {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }
  }

  function prep(el, kind) {
    if (skip(el)) return false;
    if (el.dataset.maReady === '1') return false;
    el.dataset.maReady = '1';
    el.setAttribute('data-ma-kind', kind);
    if (reduced || !io) return false;
    return true;
  }

  function init() {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      if (!prep(el, 'reveal')) return;
      var d = parseInt(el.getAttribute('data-reveal'), 10) || 0;
      /* Kun opacity og transform animeres. Den tidligere blur() kunne ikke
         køre på compositoren og tvang en genoptegning af hele elementet i
         hver frame. */
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.willChange = 'opacity, transform';
      el.style.transition = 'opacity .72s ' + EASE + ' ' + d + 'ms,transform .72s ' + EASE + ' ' + d + 'ms';
      io.observe(el);
    });

    document.querySelectorAll('[data-draw]').forEach(function (el) {
      if (!prep(el, 'draw')) return;
      var dur = parseInt(el.getAttribute('data-draw'), 10) || 1600;
      var d = parseInt(el.getAttribute('data-draw-delay'), 10) || 0;
      var len = 0;
      try { len = el.getTotalLength(); } catch (err) { return; }
      if (!len) return;
      el.style.strokeDasharray = len;
      el.style.strokeDashoffset = len;
      el.style.transition = 'stroke-dashoffset ' + dur + 'ms ' + EASE + ' ' + d + 'ms';
      io.observe(el);
    });

    document.querySelectorAll('[data-grow]').forEach(function (el) {
      if (!prep(el, 'grow')) return;
      var d = parseInt(el.getAttribute('data-grow'), 10) || 0;
      el.style.transformOrigin = el.getAttribute('data-grow-origin') || 'bottom';
      el.style.transform = 'scaleY(0)';
      el.style.transition = 'transform .9s ' + EASE + ' ' + d + 'ms';
      io.observe(el);
    });

    var par = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'))
      .filter(function (el) { return !skip(el); });
    if (par.length && !reduced && !window.__maParallax) {
      window.__maParallax = true;
      var tick = false;
      var run = function () {
        tick = false;
        var y = window.scrollY || 0;
        par.forEach(function (el) {
          var f = parseFloat(el.getAttribute('data-parallax')) || 0.05;
          el.style.transform = 'translate3d(0,' + (-y * f).toFixed(2) + 'px,0)';
        });
      };
      window.addEventListener('scroll', function () {
        if (tick) return;
        tick = true;
        requestAnimationFrame(run);
      }, { passive: true });
      run();
    }
  }

  /* ── Overdragelse fra pre-render til React ──────────────────────────────
     Serveren leverer den færdige side som statisk HTML i #dc-prerender, så
     der er noget at se og noget at læse for crawlere med det samme. Når
     dc-runtimet har renderet sit eget træ i #dc-root, fjernes reservekopien
     i samme frame — MutationObserveren kører, før browseren maler igen, så
     de to versioner aldrig ses samtidig. */
  function dropPrerender() {
    var pre = document.getElementById('dc-prerender');
    if (!pre) return true;
    var root = document.getElementById('dc-root');
    if (!root || !root.firstElementChild) return false;
    pre.remove();
    return true;
  }

  function watchHandover() {
    if (dropPrerender()) return;
    var mo = new MutationObserver(function () {
      if (dropPrerender()) mo.disconnect();
    });
    mo.observe(document.body, { childList: true, subtree: true });
    /* Kommer React aldrig, bliver reservekopien stående — den er brugbar. */
  }

  window.MASite = { init: init };
  if (document.readyState !== 'loading') { watchHandover(); setTimeout(init, 0); }
  else document.addEventListener('DOMContentLoaded', function () { watchHandover(); init(); });
})();
