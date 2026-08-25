/* Mike Adelholm — lyst/mørkt tema.

   Bevidst IKKE defer/async, og indsat før CSS'en i <head>: scriptet skal
   nå at sætte data-theme på <html>, før browseren maler noget som helst,
   ellers blinker siden kort i det forkerte tema (FOUC). Ligger som egen
   fil frem for inline, fordi CSP'ens script-src ikke tillader
   'unsafe-inline'.

   Standardtema er mørkt — sidens hidtidige udseende. Kun et tidligere
   valg i denne browser (localStorage) slår om til lyst. window.MATheme
   bruges af temaknappen i SiteNav.dc.html. */
(function () {
  try {
    var stored = localStorage.getItem('ma-theme');
    var theme = (stored === 'light' || stored === 'dark') ? stored : 'dark';
    document.documentElement.setAttribute('data-theme', theme);

    window.MATheme = {
      get: function () {
        return document.documentElement.getAttribute('data-theme') || 'dark';
      },
      set: function (next) {
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('ma-theme', next); } catch (err) { /* privat browsing m.m. */ }
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', next === 'light' ? '#faf6ee' : '#080706');
        window.dispatchEvent(new CustomEvent('ma-theme-change', { detail: next }));
      },
      toggle: function () {
        window.MATheme.set(window.MATheme.get() === 'light' ? 'dark' : 'light');
      }
    };
  } catch (err) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
