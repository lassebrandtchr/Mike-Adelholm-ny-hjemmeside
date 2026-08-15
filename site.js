/* Mike Adelholm — delt sideadfærd: reveal-on-scroll, kurvetegning, søjlevækst,
   let parallax på foto/baggrund. Alt er progressiv forbedring: uden JS vises
   indholdet som normalt. prefers-reduced-motion slår al bevægelse fra. */
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var EASE = 'cubic-bezier(.16,1,.3,1)';

  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      show(e.target);
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;

  function show(el) {
    var kind = el.getAttribute('data-ma-kind');
    if (kind === 'draw') {
      el.style.strokeDashoffset = '0';
    } else if (kind === 'grow') {
      el.style.transform = 'scaleY(1)';
      el.style.opacity = '1';
    } else {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
    }
  }

  function prep(el, kind) {
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
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px)';
      el.style.filter = 'blur(4px)';
      el.style.transition = 'opacity .72s ' + EASE + ' ' + d + 'ms,transform .72s ' + EASE + ' ' + d + 'ms,filter .72s ' + EASE + ' ' + d + 'ms';
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

    var par = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
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

  window.MASite = { init: init };
  if (document.readyState !== 'loading') setTimeout(init, 0);
  else document.addEventListener('DOMContentLoaded', init);
})();
