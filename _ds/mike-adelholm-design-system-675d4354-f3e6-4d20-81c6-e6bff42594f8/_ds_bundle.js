/* @ds-bundle: {"format":4,"namespace":"MikeAdelholmDesignSystem_675d43","components":[{"name":"LogoBadge","sourcePath":"components/brand/LogoBadge.jsx"},{"name":"Marquee","sourcePath":"components/brand/Marquee.jsx"},{"name":"Accordion","sourcePath":"components/content/Accordion.jsx"},{"name":"FeatureCard","sourcePath":"components/content/FeatureCard.jsx"},{"name":"ServiceRow","sourcePath":"components/content/ServiceRow.jsx"},{"name":"Testimonial","sourcePath":"components/content/Testimonial.jsx"},{"name":"TimelineItem","sourcePath":"components/content/TimelineItem.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"Pill","sourcePath":"components/core/Pill.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Textarea","sourcePath":"components/forms/Input.jsx"},{"name":"TabPills","sourcePath":"components/forms/TabPills.jsx"},{"name":"NavDock","sourcePath":"components/navigation/NavDock.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"}],"sourceHashes":{"components/brand/LogoBadge.jsx":"aec776f3e7c1","components/brand/Marquee.jsx":"d3f03722f91f","components/content/Accordion.jsx":"d49f388a703f","components/content/FeatureCard.jsx":"e3ea86fc567e","components/content/ServiceRow.jsx":"6071fe9ceb99","components/content/Testimonial.jsx":"0ab3448cc040","components/content/TimelineItem.jsx":"ca0dc1b648da","components/core/Button.jsx":"fbf561413acf","components/core/Card.jsx":"2c897d7002a1","components/core/Eyebrow.jsx":"62bce177d3f7","components/core/Icon.jsx":"050ce54e9ebc","components/core/Pill.jsx":"0e7b5a4ca248","components/core/SectionHeading.jsx":"b8d2eb956f0f","components/core/Stat.jsx":"e56c85fda91c","components/forms/Input.jsx":"cca89cf9cce2","components/forms/TabPills.jsx":"18c926eb9bad","components/navigation/NavDock.jsx":"2a95fbfd7386","components/navigation/SiteFooter.jsx":"201b39256c7a","ui_kits/website/About.jsx":"a3df28666867","ui_kits/website/Contact.jsx":"8c978a85e329","ui_kits/website/Home.jsx":"0fa8c598ff8b","ui_kits/website/Services.jsx":"54c0c3bcef7c","ui_kits/website/Site.jsx":"b90e2f83286e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MikeAdelholmDesignSystem_675d43 = window.MikeAdelholmDesignSystem_675d43 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/LogoBadge.jsx
try { (() => {
function LogoBadge({
  src = 'assets/logo-badge.png',
  size = 44,
  lockup = true,
  tone = 'light',
  name = 'Mike Adelholm',
  role = 'Muskuloskeletal fysioterapeut'
}) {
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '11px',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      height: size + 'px',
      width: 'auto',
      display: 'block'
    }
  }), lockup && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '16px',
      color: dark ? 'var(--bone-100)' : 'var(--ink-800)',
      letterSpacing: '.005em'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: '10px',
      letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'uppercase',
      color: dark ? 'var(--n-400)' : 'var(--text-subtle)',
      marginTop: '3px'
    }
  }, role)));
}
Object.assign(__ds_scope, { LogoBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/LogoBadge.jsx", error: String((e && e.message) || e) }); }

// components/brand/Marquee.jsx
try { (() => {
function Marquee({
  items = [],
  speed = 38
}) {
  const run = [...items, ...items];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink-650)',
      color: 'var(--n-150)',
      overflow: 'hidden',
      borderBottom: '1px solid var(--line-bone-09)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      width: 'max-content',
      animation: 'marquee ' + speed + 's linear infinite',
      padding: '15px 0'
    }
  }, run.map((m, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '14px',
      padding: '0 24px',
      fontSize: 'var(--body-xs)',
      fontWeight: 600,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '6px',
      height: '6px',
      borderRadius: 'var(--r-round)',
      background: 'var(--gold-500)',
      flexShrink: 0
    }
  }), m))));
}
Object.assign(__ds_scope, { Marquee });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Marquee.jsx", error: String((e && e.message) || e) }); }

// components/content/Accordion.jsx
try { (() => {
function Accordion({
  items = [],
  allowMultiple = false
}) {
  const [open, setOpen] = React.useState([]);
  const toggle = i => setOpen(o => o.includes(i) ? o.filter(x => x !== i) : allowMultiple ? [...o, i] : [i]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }, items.map((it, i) => {
    const isOpen = open.includes(i);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: 'var(--surface-card)',
        border: '1px solid ' + (isOpen ? 'var(--line-gold-40)' : 'var(--line-ink-09)'),
        borderRadius: 'var(--r-xl)',
        overflow: 'hidden',
        transition: 'box-shadow var(--dur-base) ease,border-color var(--dur-fast) ease',
        boxShadow: isOpen ? '0 20px 40px -30px rgba(23,19,14,.35)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => toggle(i),
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        textAlign: 'left',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '22px 24px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '18.5px',
        color: 'var(--n-900)'
      }
    }, it.q), /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        width: '30px',
        height: '30px',
        borderRadius: 'var(--r-round)',
        background: 'var(--wash-gold-14)',
        color: 'var(--copper-600)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        lineHeight: 1,
        transform: isOpen ? 'rotate(45deg)' : 'none',
        transition: 'transform .4s var(--ease)'
      }
    }, "+")), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: isOpen ? '420px' : '0',
        opacity: isOpen ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height .5s var(--ease),opacity .4s ease'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        padding: '0 24px 24px',
        fontSize: '15.5px',
        lineHeight: '1.66',
        color: 'var(--text-body)',
        textWrap: 'pretty'
      }
    }, it.a)));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/content/ServiceRow.jsx
try { (() => {
function ServiceRow({
  number,
  icon,
  title,
  description,
  onClick
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      gap: '22px',
      alignItems: 'flex-start',
      padding: '26px 22px',
      borderTop: '1px solid var(--line-ink-10)',
      borderRadius: 'var(--r-xl)',
      background: h ? 'var(--surface-card)' : 'transparent',
      transform: h ? 'translateX(6px)' : 'none',
      boxShadow: h ? 'var(--sh-row-hover)' : 'none',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'background var(--dur-base) ease,transform var(--dur-base) var(--ease),box-shadow var(--dur-base) ease'
    }
  }, number && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '15px',
      color: 'var(--bronze-300)',
      flexShrink: 0,
      paddingTop: '6px'
    }
  }, number), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      width: '54px',
      height: '54px',
      borderRadius: 'var(--r-lg)',
      background: 'var(--ink-800)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--title-2)',
      marginBottom: '6px',
      letterSpacing: 0
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--body-sm)',
      lineHeight: 'var(--leading-body-tight)',
      color: 'var(--text-muted)',
      textWrap: 'pretty'
    }
  }, description)));
}
Object.assign(__ds_scope, { ServiceRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ServiceRow.jsx", error: String((e && e.message) || e) }); }

// components/content/TimelineItem.jsx
try { (() => {
function TimelineItem({
  year,
  title,
  description,
  last = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      gap: '24px',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '26px',
      color: 'var(--copper-600)',
      textAlign: 'right',
      lineHeight: 1.1
    }
  }, year), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      paddingLeft: '32px',
      paddingBottom: last ? '0' : '34px',
      borderLeft: last ? '2px solid transparent' : '2px solid rgba(217,154,43,.35)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: '-9px',
      top: '4px',
      width: '16px',
      height: '16px',
      borderRadius: 'var(--r-round)',
      background: 'var(--gold-500)',
      border: '3px solid var(--bone-100)',
      boxShadow: '0 0 0 1px var(--line-gold-50)'
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--title-2)',
      marginBottom: '5px',
      letterSpacing: 0
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--body-sm)',
      lineHeight: '1.6',
      color: 'var(--text-muted)',
      textWrap: 'pretty'
    }
  }, description)));
}
Object.assign(__ds_scope, { TimelineItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/TimelineItem.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const V = {
  primary: {
    bg: 'var(--gold-500)',
    fg: 'var(--ink-800)',
    bd: 'none',
    sh: 'var(--sh-gold)',
    hbg: 'var(--gold-400)',
    hsh: 'var(--sh-gold-hover)'
  },
  dark: {
    bg: 'var(--ink-800)',
    fg: 'var(--bone-100)',
    bd: 'none',
    sh: 'none',
    hbg: 'var(--ink-550)',
    hsh: 'none'
  },
  outline: {
    bg: 'transparent',
    fg: 'var(--bone-100)',
    bd: '1.5px solid var(--line-bone-32)',
    sh: 'none',
    hbg: 'var(--wash-bone-06)',
    hsh: 'none'
  },
  ghost: {
    bg: 'transparent',
    fg: 'var(--link)',
    bd: 'none',
    sh: 'none',
    hbg: 'transparent',
    hsh: 'none'
  }
};
const S = {
  sm: {
    fs: '14.5px',
    pad: '13px 22px',
    r: 'var(--r-md)'
  },
  md: {
    fs: '15.5px',
    pad: '15px 26px',
    r: '15px'
  },
  lg: {
    fs: '17px',
    pad: '17px 30px',
    r: 'var(--r-lg)'
  }
};
function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  icon,
  fullWidth,
  disabled,
  onClick,
  type = 'button',
  ...rest
}) {
  const [h, setH] = React.useState(false);
  const v = V[variant] || V.primary,
    s = S[size] || S.md;
  const style = {
    display: fullWidth ? 'flex' : 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '9px',
    fontFamily: 'var(--font-ui)',
    fontWeight: variant === 'outline' ? 700 : 800,
    fontSize: s.fs,
    padding: s.pad,
    borderRadius: s.r,
    border: v.bd,
    background: h && !disabled ? v.hbg : v.bg,
    color: v.fg,
    cursor: disabled ? 'not-allowed' : 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    width: fullWidth ? '100%' : undefined,
    boxShadow: h && !disabled ? v.hsh : v.sh,
    opacity: disabled ? .42 : 1,
    transform: h && !disabled ? 'var(--lift)' : 'none',
    borderColor: h && variant === 'outline' ? 'rgba(231,192,122,.6)' : undefined,
    transition: 'transform var(--dur-base) var(--ease),box-shadow var(--dur-base) var(--ease),background var(--dur-fast) ease,border-color var(--dur-fast) ease,color var(--dur-fast) ease'
  };
  const on = {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false)
  };
  if (href) return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    style: style,
    onClick: onClick
  }, on, rest), icon, children);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    style: style,
    onClick: onClick
  }, on, rest), icon, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  children,
  tone = 'light',
  radius = 'var(--r-2xl)',
  padding = 'var(--card-p)',
  hoverable = true,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      background: dark ? 'var(--grad-panel)' : 'var(--surface-card)',
      color: dark ? 'var(--text-on-dark)' : 'var(--text-heading)',
      border: dark ? 'none' : '1px solid ' + (h && hoverable ? 'var(--border-card-hover)' : 'var(--border-card)'),
      borderRadius: radius,
      padding: padding,
      boxShadow: dark ? 'none' : h && hoverable ? 'var(--sh-card-hover)' : 'var(--sh-card)',
      transform: h && hoverable ? 'var(--lift-card)' : 'none',
      transition: 'transform .4s var(--ease),box-shadow .4s ease,border-color var(--dur-fast) ease',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/content/FeatureCard.jsx
try { (() => {
function FeatureCard({
  icon,
  number,
  title,
  description,
  layout = 'row'
}) {
  const badge = number != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      width: '56px',
      height: '56px',
      borderRadius: 'var(--r-lg)',
      background: 'var(--ink-800)',
      color: 'var(--champagne-300)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '20px'
    }
  }, number) : /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: 'var(--r-sm)',
      background: 'var(--wash-gold-14)',
      color: 'var(--copper-600)'
    }
  }, icon);
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    style: {
      display: 'flex',
      flexDirection: layout === 'row' ? 'row' : 'column',
      gap: layout === 'row' ? '20px' : '14px',
      alignItems: 'flex-start'
    }
  }, badge, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--title-3)',
      marginBottom: '7px',
      letterSpacing: 0
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--body-sm)',
      lineHeight: '1.58',
      color: 'var(--text-muted)',
      textWrap: 'pretty'
    }
  }, description)));
}
Object.assign(__ds_scope, { FeatureCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/FeatureCard.jsx", error: String((e && e.message) || e) }); }

// components/content/Testimonial.jsx
try { (() => {
function Testimonial({
  quote,
  name,
  meta,
  initial,
  stars = 5,
  tag
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.Card, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold-500)',
      fontSize: 'var(--body-base)',
      letterSpacing: '3px'
    }
  }, '★'.repeat(stars)), tag && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--label)',
      fontWeight: 600,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: 'var(--bronze-200)'
    }
  }, tag)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: 'var(--title-3)',
      lineHeight: 1.5,
      color: 'var(--n-800)',
      textWrap: 'pretty'
    }
  }, quote), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '42px',
      height: '42px',
      borderRadius: 'var(--r-round)',
      background: 'var(--ink-800)',
      color: 'var(--champagne-300)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--body-base)',
      flexShrink: 0
    }
  }, initial), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: '14.5px'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--micro)',
      color: 'var(--text-subtle)'
    }
  }, meta))));
}
Object.assign(__ds_scope, { Testimonial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Testimonial.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function Eyebrow({
  children,
  tone = 'copper',
  rule = true
}) {
  const c = tone === 'champagne' ? 'var(--champagne-300)' : 'var(--copper-600)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '11px'
    }
  }, rule && /*#__PURE__*/React.createElement("span", {
    style: {
      width: '34px',
      height: '1.5px',
      background: c,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-ui)',
      fontWeight: 600,
      fontSize: '13px',
      letterSpacing: '.02em',
      color: c
    }
  }, children));
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
/* Thin wrapper over the Lucide UMD build (window.lucide). The brand uses Lucide
   stroke icons at 1.8–2.2 weight with round caps; no custom glyph set exists. */
function Icon({
  name,
  size = 18,
  stroke = 'currentColor',
  strokeWidth = 2,
  style
}) {
  const lib = typeof window !== 'undefined' && window.lucide || {};
  const key = name && name.replace(/(^|-)([a-z])/g, (m, a, b) => b.toUpperCase());
  const node = lib.icons && (lib.icons[key] || lib.icons[name]) || lib[key];
  const base = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke,
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    style: {
      flexShrink: 0,
      ...style
    }
  };
  if (!Array.isArray(node)) return /*#__PURE__*/React.createElement("svg", base);
  const kids = Array.isArray(node[0]) ? node : node[2];
  return /*#__PURE__*/React.createElement("svg", base, (kids || []).map(([tag, attrs], i) => React.createElement(tag, {
    key: i,
    ...attrs
  })));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Pill.jsx
try { (() => {
function Pill({
  children,
  tone = 'dark',
  icon,
  index
}) {
  const [h, setH] = React.useState(false);
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      border: '1px solid ' + (dark ? 'var(--line-gold-40)' : 'var(--line-gold-34)'),
      background: dark ? h ? 'var(--wash-gold-20)' : 'var(--wash-gold-08)' : 'var(--wash-gold-06)',
      color: dark ? 'var(--bone-100)' : 'var(--n-800)',
      fontWeight: 600,
      fontSize: '13px',
      padding: '8px 13px',
      borderRadius: 'var(--r-pill)',
      whiteSpace: 'nowrap',
      transform: h ? 'translateY(-2px)' : 'none',
      transition: 'background var(--dur-fast) ease,transform var(--dur-base) var(--ease)'
    }
  }, icon, index != null && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold-500)',
      fontWeight: 700
    }
  }, index, "."), children);
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Pill.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function SectionHeading({
  eyebrow,
  title,
  body,
  tone = 'light',
  align = 'left',
  size = 'md',
  aside
}) {
  const dark = tone === 'dark';
  const fs = size === 'lg' ? 'var(--display-3)' : size === 'sm' ? 'clamp(24px,3vw,30px)' : 'var(--display-4)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '14px',
      textAlign: align,
      margin: align === 'center' ? '0 auto' : undefined,
      maxWidth: align === 'center' ? '600px' : undefined
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 auto'
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '18px',
      justifyContent: align === 'center' ? 'center' : undefined,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    tone: dark ? 'champagne' : 'copper'
  }, eyebrow)), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: fs,
      lineHeight: 'var(--leading-heading)',
      letterSpacing: 'var(--tracking-heading)',
      color: dark ? 'var(--bone-100)' : 'var(--text-heading)',
      textWrap: 'balance'
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--body-base)',
      lineHeight: 'var(--leading-body)',
      color: dark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)',
      marginTop: '14px',
      maxWidth: '520px',
      marginLeft: align === 'center' ? 'auto' : undefined,
      marginRight: align === 'center' ? 'auto' : undefined,
      textWrap: 'pretty'
    }
  }, body)), aside && /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: 'var(--copper-600)',
      fontSize: 'var(--body-base)'
    }
  }, aside));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
function Stat({
  value,
  label,
  tone = 'dark',
  size = 'md'
}) {
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: size === 'lg' ? '40px' : '30px',
      lineHeight: 1,
      color: dark ? 'var(--bone-100)' : 'var(--text-heading)'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--micro)',
      color: dark ? 'var(--n-400)' : 'var(--text-muted)',
      marginTop: '4px'
    }
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const field = focus => ({
  background: '#fff',
  color: 'var(--n-900)',
  border: '1px solid ' + (focus ? 'var(--border-field-focus)' : 'var(--border-field)'),
  borderRadius: '13px',
  padding: '13px 15px',
  fontSize: 'var(--body-sm)',
  fontFamily: 'inherit',
  width: '100%',
  boxShadow: focus ? 'var(--ring-focus)' : 'none',
  outline: 'none',
  transition: 'border-color var(--dur-fast) ease,box-shadow var(--dur-fast) ease'
});
function Input({
  label,
  required,
  type = 'text',
  hint,
  ...rest
}) {
  const [f, setF] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'grid',
      gap: '6px',
      fontSize: '13px',
      fontWeight: 600,
      color: 'var(--text-body)'
    }
  }, label, required && '*', /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    required: required,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: field(f)
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400,
      fontSize: 'var(--micro)',
      color: 'var(--n-450)'
    }
  }, hint));
}
function Textarea({
  label,
  required,
  rows = 5,
  hint,
  ...rest
}) {
  const [f, setF] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'grid',
      gap: '6px',
      fontSize: '13px',
      fontWeight: 600,
      color: 'var(--text-body)'
    }
  }, label, required && '*', /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    required: required,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      ...field(f),
      resize: 'vertical'
    }
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400,
      fontSize: 'var(--micro)',
      color: 'var(--n-450)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Input, Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/TabPills.jsx
try { (() => {
function TabPills({
  tabs = [],
  value,
  onChange
}) {
  const active = value ?? tabs[0]?.id;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '9px'
    }
  }, tabs.map(t => {
    const on = t.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => onChange && onChange(t.id),
      style: {
        border: '1px solid ' + (on ? 'var(--ink-800)' : 'var(--line-ink-16)'),
        background: on ? 'var(--ink-800)' : 'transparent',
        color: on ? 'var(--bone-100)' : 'var(--n-800)',
        fontWeight: 700,
        fontSize: '14.5px',
        padding: '11px 20px',
        borderRadius: 'var(--r-pill)',
        cursor: 'pointer',
        transition: 'transform var(--dur-fast) var(--ease),border-color var(--dur-fast) ease,background var(--dur-fast) ease'
      }
    }, t.label);
  }));
}
Object.assign(__ds_scope, { TabPills });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TabPills.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavDock.jsx
try { (() => {
/* Floating pill dock. Fixed at the top of every page; a gold pill slides behind
   the hovered link. Bone-translucent with backdrop blur over any background. */
function NavDock({
  items = [],
  active,
  onSelect,
  brand,
  action,
  fixed = true
}) {
  const [hover, setHover] = React.useState(null);
  const wrap = React.useRef(null);
  const [pill, setPill] = React.useState({
    left: 0,
    width: 0,
    on: false
  });
  React.useEffect(() => {
    const key = hover ?? active;
    const el = wrap.current && wrap.current.querySelector('[data-navkey="' + key + '"]');
    if (!el) {
      setPill(p => ({
        ...p,
        on: false
      }));
      return;
    }
    setPill({
      left: el.offsetLeft,
      width: el.offsetWidth,
      on: true
    });
  }, [hover, active, items]);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: fixed ? 'fixed' : 'static',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'center',
      padding: '18px 16px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'min(1180px,100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      background: 'var(--surface-dock)',
      backdropFilter: 'blur(14px) saturate(1.15)',
      WebkitBackdropFilter: 'blur(14px) saturate(1.15)',
      border: '1px solid var(--line-ink-09)',
      borderRadius: 'var(--r-2xl)',
      padding: '11px 12px 11px 18px',
      boxShadow: 'var(--sh-dock)'
    }
  }, brand, /*#__PURE__*/React.createElement("nav", {
    ref: wrap,
    onMouseLeave: () => setHover(null),
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: '1px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: pill.left + 'px',
      width: pill.width + 'px',
      height: '38px',
      transform: 'translateY(-50%)',
      background: 'var(--gold-500)',
      borderRadius: 'var(--r-pill)',
      opacity: pill.on ? 1 : 0,
      pointerEvents: 'none',
      zIndex: 0,
      boxShadow: 'var(--sh-gold-pill)',
      transition: 'left .42s var(--ease),width .42s var(--ease),opacity var(--dur-fast) ease'
    }
  }), items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.key,
    href: it.href || '#',
    "data-navkey": it.key,
    onMouseEnter: () => setHover(it.key),
    onClick: e => {
      e.preventDefault();
      onSelect && onSelect(it.key);
    },
    style: {
      position: 'relative',
      zIndex: 1,
      fontWeight: 600,
      fontSize: '13.5px',
      padding: '9px 14px',
      borderRadius: 'var(--r-pill)',
      color: 'var(--n-800)',
      whiteSpace: 'nowrap',
      textDecoration: 'none',
      transition: 'color var(--dur-fast) ease'
    }
  }, it.label))), action));
}
Object.assign(__ds_scope, { NavDock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavDock.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
function SiteFooter({
  brand,
  blurb,
  columns = [],
  legal,
  note
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--grad-footer)',
      color: 'var(--text-on-dark-muted)',
      borderRadius: 'var(--r-page) var(--r-page) 0 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--measure)',
      margin: '0 auto',
      padding: 'clamp(48px,6vw,64px) 32px 30px',
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr 1fr',
      gap: '40px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '16px'
    }
  }, brand), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '14.5px',
      lineHeight: '1.62',
      maxWidth: '340px',
      textWrap: 'pretty'
    }
  }, blurb)), columns.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontFamily: 'var(--font-display)',
      color: 'var(--bone-100)',
      fontWeight: 700,
      fontSize: '15px',
      marginBottom: '14px',
      letterSpacing: 0
    }
  }, c.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: '10px',
      fontSize: '14.5px'
    }
  }, c.items)))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--measure)',
      margin: '0 auto',
      padding: '20px 32px 30px',
      borderTop: '1px solid rgba(246,241,233,.1)',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: '10px',
      fontSize: '13px',
      color: 'var(--n-350)'
    }
  }, /*#__PURE__*/React.createElement("span", null, legal), /*#__PURE__*/React.createElement("span", null, note)));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/About.jsx
try { (() => {
const {
  Card,
  Eyebrow,
  TimelineItem,
  Pill,
  Icon
} = window.MikeAdelholmDesignSystem_675d43;
const TIMELINE = [{
  year: '2015',
  t: 'Fysioterapeut',
  d: 'Uddannet fysioterapeut og straks i gang med at kombinere klinik og styrketræning.'
}, {
  year: '2019',
  t: 'Klinisk erfaring',
  d: 'Arbejde med idrætsskader, rygpatienter og genoptræning efter operation.'
}, {
  year: '2023',
  t: 'Exam. muskuloskeletal fysioterapeut',
  d: 'Videreuddannelse i muskuloskeletal undersøgelse og behandling afsluttet.'
}, {
  year: '2025',
  t: 'Egen praksis',
  d: 'Muskuloskeletal fysioterapi og online coaching under eget navn.'
}];
function About({
  go
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: 'pageIn var(--dur-page) var(--ease-page) both',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--grad-banner)',
      color: 'var(--bone-100)',
      borderRadius: '0 0 var(--r-page) var(--r-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--measure)',
      margin: '0 auto',
      padding: '150px 32px 66px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "champagne"
  }, "Om mig"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--display-2)',
      letterSpacing: 'var(--tracking-display)',
      lineHeight: 1,
      marginTop: '16px'
    }
  }, "Mike Adelholm"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '9px',
      marginTop: '22px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    tone: "dark",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "graduation-cap",
      size: 13,
      stroke: "var(--gold-500)",
      strokeWidth: 1.8
    })
  }, "Exam. MPT"), /*#__PURE__*/React.createElement(Pill, {
    tone: "dark",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "map-pin",
      size: 13,
      stroke: "var(--gold-500)",
      strokeWidth: 1.8
    })
  }, "Vejen"), /*#__PURE__*/React.createElement(Pill, {
    tone: "dark",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 13,
      stroke: "var(--gold-500)",
      strokeWidth: 1.8
    })
  }, "ESTD 2025")))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--measure-narrow)',
      margin: '0 auto',
      padding: 'clamp(56px,7vw,72px) 32px 30px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.08fr .92fr',
      gap: 'clamp(32px,4vw,52px)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: '18px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(24px,3vw,29px)',
      letterSpacing: '-.01em'
    }
  }, "Fysioterapeut, coach \u2014 og selv tr\xE6ningsmenneske"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '16.5px',
      lineHeight: 'var(--leading-body-loose)',
      color: 'var(--text-body)',
      textWrap: 'pretty'
    }
  }, "Jeg er uddannet fysioterapeut med eksamen i muskuloskeletal fysioterapi. Det betyder at jeg er tr\xE6net i at unders\xF8ge led, muskler og nerver systematisk og finde \xE5rsagen frem for at behandle det, der g\xF8r mest ondt lige nu."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '16.5px',
      lineHeight: 'var(--leading-body-loose)',
      color: 'var(--text-body)',
      textWrap: 'pretty'
    }
  }, "Samtidig har jeg tr\xE6net med v\xE6gte i over ti \xE5r. Jeg kender forskellen p\xE5 at have ondt og at v\xE6re i fare, og jeg ved hvad der skal til for at komme tilbage til en tung stang uden at g\xE5 p\xE5 kompromis med kroppen."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '16.5px',
      lineHeight: 'var(--leading-body-loose)',
      color: 'var(--text-body)',
      textWrap: 'pretty'
    }
  }, "Derfor arbejder jeg altid med behandling og tr\xE6ning som \xE9n plan. Du f\xE5r forklaringen i et sprog du kan bruge, og du f\xE5r at vide hvad du selv skal g\xF8re mellem bes\xF8gene.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: '20px',
      position: 'sticky',
      top: '120px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--r-2xl)',
      overflow: 'hidden',
      height: '300px',
      boxShadow: 'var(--sh-media)',
      background: 'var(--grad-panel)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/mike-portrait.png",
    alt: "Mike Adelholm",
    style: {
      height: '98%',
      objectFit: 'contain'
    }
  })), /*#__PURE__*/React.createElement(Card, {
    tone: "dark",
    hoverable: false,
    radius: "var(--r-2xl)",
    padding: "28px"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '19px',
      marginBottom: '12px',
      color: 'var(--champagne-300)'
    }
  }, "S\xE5dan arbejder jeg"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--body-sm)',
      lineHeight: '1.66',
      color: 'var(--text-on-dark-muted)',
      textWrap: 'pretty'
    }
  }, "Grundig unders\xF8gelse f\xF8rst. Derefter en plan med et m\xE5l, en tidsramme og en tydelig n\xE6ste \xF8velse. Ingen l\xF8se ender, og ingen behandling for behandlingens skyld."))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--measure-narrow)',
      margin: '0 auto',
      padding: 'var(--section-y-sm) 32px var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Vejen hertil"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(26px,3.4vw,38px)',
      letterSpacing: 'var(--tracking-heading)',
      margin: '14px 0 36px'
    }
  }, "Fra klinikgulv til egen praksis"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, TIMELINE.map((t, i) => /*#__PURE__*/React.createElement(TimelineItem, {
    key: t.year,
    year: t.year,
    title: t.t,
    description: t.d,
    last: i === TIMELINE.length - 1
  })))));
}
Object.assign(window, {
  About
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/About.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Contact.jsx
try { (() => {
const {
  Button,
  Card,
  Eyebrow,
  Input,
  Textarea,
  Icon
} = window.MikeAdelholmDesignSystem_675d43;
function Contact() {
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: 'pageIn var(--dur-page) var(--ease-page) both',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--grad-banner)',
      color: 'var(--bone-100)',
      borderRadius: '0 0 var(--r-page) var(--r-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--measure)',
      margin: '0 auto',
      padding: '150px 32px 66px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "champagne"
  }, "Skriv til mig"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--display-2)',
      letterSpacing: 'var(--tracking-display)',
      lineHeight: 1,
      marginTop: '16px'
    }
  }, "Kontakt"))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--measure-narrow)',
      margin: '0 auto',
      padding: 'clamp(52px,7vw,64px) 32px var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.08fr .92fr',
      gap: 'clamp(32px,4vw,44px)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    hoverable: false,
    radius: "var(--r-3xl)",
    padding: "clamp(28px,3.5vw,36px)",
    style: {
      border: '1px solid var(--line-gold-40)'
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '34px 10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '64px',
      height: '64px',
      borderRadius: 'var(--r-round)',
      background: 'var(--gold-500)',
      color: 'var(--ink-800)',
      fontSize: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 18px',
      fontWeight: 800
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '23px',
      marginBottom: '8px'
    }
  }, "Tak for din besked!"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "Jeg vender tilbage hurtigst muligt \u2014 typisk samme hverdag.")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '23px',
      marginBottom: '20px'
    }
  }, "Send mig en besked"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: '15px'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Navn",
    required: true,
    placeholder: "Dit fulde navn"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "E-mail",
    type: "email",
    required: true,
    placeholder: "dig@eksempel.dk"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Telefon",
    type: "tel",
    required: true,
    placeholder: "20 00 00 00"
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Emne",
    placeholder: "Fx skulder, ryg eller online coaching"
  }), /*#__PURE__*/React.createElement(Textarea, {
    label: "Hvad kan jeg hj\xE6lpe med?",
    rows: 5,
    placeholder: "Kort om din skade, hvor l\xE6nge du har haft den, og hvad dit m\xE5l er"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '12.5px',
      color: 'var(--n-450)'
    }
  }, "Alle felter markeret med * skal udfyldes."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    type: "submit"
  }, "Send besked")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "dark",
    hoverable: false,
    radius: "var(--r-2xl)",
    padding: "32px"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '20px',
      marginBottom: '18px',
      color: 'var(--champagne-300)'
    }
  }, "Kontaktinfo"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: '16px',
      fontSize: '15.5px',
      lineHeight: '1.5'
    }
  }, [['Navn', 'Mike Adelholm'], ['Titel', 'Exam. muskuloskeletal fysioterapeut & online coach'], ['Telefon', '20 00 00 00'], ['E-mail', 'mike@adelholm.dk'], ['Område', 'Vejen og omegn · online i hele landet']].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--n-400)',
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '.07em',
      marginBottom: '3px'
    }
  }, k), v)))), /*#__PURE__*/React.createElement(Card, {
    hoverable: false,
    radius: "var(--r-2xl)",
    padding: "24px",
    style: {
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '36px',
      height: '36px',
      borderRadius: '11px',
      background: 'var(--wash-gold-14)',
      color: 'var(--copper-600)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 18
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '14.5px',
      lineHeight: '1.6',
      color: 'var(--text-body)'
    }
  }, "Jeg l\xE6ser beskeder mellem behandlinger og svarer typisk samme hverdag. Har du en akut skade, s\xE5 ring i stedet."))))));
}
Object.assign(window, {
  Contact
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
const {
  Button,
  Pill,
  Stat,
  Card,
  Eyebrow,
  SectionHeading,
  ServiceRow,
  FeatureCard,
  Testimonial,
  Accordion,
  Marquee,
  Icon
} = window.MikeAdelholmDesignSystem_675d43;
const SERVICES = [{
  n: '01',
  icon: 'stethoscope',
  t: 'Muskuloskeletal undersøgelse',
  d: 'Grundig screening af led, muskler og bevægemønstre — så vi ved præcis hvad vi arbejder med.'
}, {
  n: '02',
  icon: 'activity',
  t: 'Behandling og manuel terapi',
  d: 'Mobilisering, nålebehandling og aflastning kombineret med målrettet træning.'
}, {
  n: '03',
  icon: 'dumbbell',
  t: 'Genoptræning',
  d: 'Progressiv styrketræning fra første øvelse til fuld belastning i din sport.'
}, {
  n: '04',
  icon: 'monitor',
  t: 'Online coaching',
  d: 'Program, videofeedback og løbende justering — uanset hvor du træner.'
}];
const WHY = [{
  icon: 'graduation-cap',
  t: 'Faglig tyngde',
  d: 'Exam. muskuloskeletal fysioterapeut med træning som andet modersmål.'
}, {
  icon: 'route',
  t: 'Én samlet plan',
  d: 'Behandling og træning hænger sammen, i stedet for at leve hver sit sted.'
}, {
  icon: 'message-circle',
  t: 'Klar besked',
  d: 'Du får forklaringen på dansk — hvad der sker, og hvad du selv gør.'
}, {
  icon: 'trending-up',
  t: 'Mål, ikke symptomer',
  d: 'Vi stopper først når du er tilbage på det niveau du kom fra.'
}];
const FAQS = [{
  q: 'Skal jeg have en henvisning fra lægen?',
  a: 'Nej. Du kan booke direkte hos mig, og du får en fuld undersøgelse ved første besøg.'
}, {
  q: 'Hvor lang tid tager et forløb?',
  a: 'Det afhænger af skaden og dit mål. Efter undersøgelsen giver jeg dig en realistisk tidsramme — ikke et løst gæt.'
}, {
  q: 'Kan jeg træne mens jeg er i behandling?',
  a: 'Næsten altid. Vi tilpasser belastningen i stedet for at sætte alt på pause.'
}, {
  q: 'Hvad er forskellen på online coaching og et fysisk forløb?',
  a: 'Online coaching er program, videofeedback og opfølgning. Er der brug for hænder på, tager vi det i klinikken.'
}, {
  q: 'Arbejder du med både skader og performance?',
  a: 'Ja. De hænger sammen — god teknik og styrke er både behandling og forebyggelse.'
}, {
  q: 'Hvad koster det?',
  a: 'Priser aftales inden vi går i gang, så du kender dem på forhånd. Skriv eller ring for de aktuelle takster.'
}];
function Hero({
  onBook,
  onServices
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--grad-hero)',
      color: 'var(--bone-100)',
      borderRadius: '0 0 var(--r-page) var(--r-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '-180px',
      right: '-120px',
      width: '660px',
      height: '660px',
      background: 'var(--glow-gold)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '-220px',
      left: '-160px',
      width: '560px',
      height: '560px',
      background: 'var(--glow-copper)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--measure)',
      margin: '0 auto',
      padding: '150px 32px 108px',
      display: 'grid',
      gridTemplateColumns: '1.05fr .95fr',
      gap: '56px',
      alignItems: 'center',
      position: 'relative',
      zIndex: 3
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Pill, {
    tone: "dark",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 14,
      stroke: "var(--gold-500)",
      strokeWidth: 3.2
    })
  }, "Exam. muskuloskeletal fysioterapeut \xB7 Vejen"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--display-1)',
      lineHeight: 'var(--leading-display)',
      letterSpacing: 'var(--tracking-display)',
      margin: '24px 0 22px',
      textWrap: 'balance'
    }
  }, "Fri bev\xE6gelse.", /*#__PURE__*/React.createElement("br", null), "\xC6gte styrke.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--gold-500)',
      fontStyle: 'italic',
      fontWeight: 700
    }
  }, "Ingen l\xF8se ender.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--body-lg)',
      lineHeight: 'var(--leading-body)',
      color: 'var(--text-on-dark-muted)',
      maxWidth: '520px',
      textWrap: 'pretty'
    }
  }, "Jeg unders\xF8ger, behandler og tr\xE6ner dig tilbage \u2014 og bliver ved indtil du er p\xE5 niveau igen. Muskuloskeletal fysioterapi og online coaching i Vejen."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '13px',
      marginTop: '32px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onBook
  }, "Book en tid \u2192"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: onServices
  }, "Se hvad jeg tilbyder")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '24px',
      marginTop: '42px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "10+",
    label: "\xE5r med tr\xE6ning og rehab"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "1:1",
    label: "altid samme behandler"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "2025",
    label: "egen praksis"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      justifySelf: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '-28px',
      borderRadius: 'var(--r-round)',
      border: '1.5px dashed rgba(217,154,43,.38)',
      animation: 'spin 44s linear infinite'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 'clamp(280px,34vw,420px)',
      height: 'clamp(280px,34vw,420px)',
      borderRadius: 'var(--r-round)',
      background: 'var(--grad-medal)',
      border: '13px solid var(--gold-500)',
      boxShadow: 'var(--sh-medal)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/mike-portrait.png",
    alt: "Mike Adelholm",
    style: {
      width: '96%',
      objectFit: 'contain'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '2px',
      right: '-8px',
      animation: 'floaty 4.8s ease-in-out infinite',
      background: 'var(--ink-800)',
      color: 'var(--bone-100)',
      border: '1px solid var(--line-gold-50)',
      padding: '12px 18px',
      borderRadius: 'var(--r-lg)',
      boxShadow: 'var(--sh-float)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '15.5px',
      color: 'var(--champagne-300)'
    }
  }, "Exam. MPT"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: 'var(--n-300)',
      letterSpacing: '.03em'
    }
  }, "Muskuloskeletal specialist")))));
}
function Home({
  go
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: 'pageIn var(--dur-page) var(--ease-page) both',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement(Hero, {
    onBook: () => go('kontakt'),
    onServices: () => go('ydelser')
  }), /*#__PURE__*/React.createElement(Marquee, {
    items: ['Exam. MPT', 'Genoptræning', 'Smertebehandling', 'Styrketræning', 'Online coaching', 'Skadesforebyggelse']
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--measure)',
      margin: '0 auto',
      padding: 'clamp(70px,9vw,108px) 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.08fr .92fr',
      gap: 'clamp(36px,5vw,64px)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Om mig"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--display-3)',
      lineHeight: '1.05',
      letterSpacing: 'var(--tracking-heading)',
      marginTop: '20px',
      textWrap: 'balance'
    }
  }, "Faglighed, styrke \u2014 og et menneske der bliver ved."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--body-md)',
      lineHeight: 'var(--leading-body-loose)',
      color: 'var(--text-body)',
      marginTop: '22px',
      maxWidth: '560px',
      textWrap: 'pretty'
    }
  }, "Jeg hedder Mike Adelholm. Jeg er uddannet fysioterapeut med eksamen i muskuloskeletal fysioterapi, og jeg har tr\xE6net med v\xE6gte siden jeg var teenager. Den kombination er hele pointen: jeg kan b\xE5de finde \xE5rsagen til smerten og bygge dig st\xE6rk igen bagefter."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      marginTop: '30px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: '26px',
      color: 'var(--ink-800)',
      lineHeight: 1
    }
  }, "Mike Adelholm"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '26px',
      width: '1px',
      background: 'var(--line-ink-18)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '13px',
      color: 'var(--text-muted)',
      fontWeight: 500
    }
  }, "Exam. MPT", /*#__PURE__*/React.createElement("br", null), "& online coach"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '-14px -14px -14px 14px',
      borderRadius: 'var(--r-6xl)',
      background: 'linear-gradient(150deg,var(--wash-gold-16),var(--wash-copper-18))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--r-3xl)',
      overflow: 'hidden',
      height: 'clamp(320px,40vw,440px)',
      boxShadow: 'var(--sh-media)',
      background: 'var(--grad-panel)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/mike-portrait.png",
    alt: "Mike Adelholm i klinikken",
    style: {
      height: '96%',
      objectFit: 'contain'
    }
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--measure)',
      margin: '0 auto',
      padding: '0 32px var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '.82fr 1.18fr',
      gap: 'clamp(30px,4vw,58px)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: '120px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(29px,3.6vw,40px)',
      lineHeight: '1.06',
      letterSpacing: 'var(--tracking-heading)'
    }
  }, "Fra unders\xF8gelse", /*#__PURE__*/React.createElement("br", null), "til fuld belastning"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--body-base)',
      lineHeight: '1.65',
      color: 'var(--text-muted)',
      margin: '18px 0 26px',
      maxWidth: '340px'
    }
  }, "Fire trin, \xE9n plan. Du beh\xF8ver ikke selv samle stykkerne."), /*#__PURE__*/React.createElement(Button, {
    variant: "dark",
    size: "sm",
    onClick: () => go('ydelser')
  }, "Se hele listen \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, SERVICES.map(s => /*#__PURE__*/React.createElement(ServiceRow, {
    key: s.n,
    number: s.n,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: s.icon,
      size: 22,
      stroke: "var(--champagne-300)",
      strokeWidth: 1.8
    }),
    title: s.t,
    description: s.d,
    onClick: () => go('ydelser')
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--measure)',
      margin: '0 auto',
      padding: '0 32px var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    hoverable: false,
    radius: "var(--r-5xl)",
    padding: "var(--panel-p)"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    size: "md",
    title: "Et forl\xF8b med dig i midten",
    aside: "\u2014 derfor v\xE6lger man mig"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 0,
      marginTop: '34px'
    }
  }, WHY.map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: w.t,
    style: {
      padding: '6px 26px 6px 0',
      borderRight: i < 3 ? '1px solid var(--line-ink-09)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: 'var(--r-sm)',
      background: 'var(--wash-gold-14)',
      color: 'var(--copper-600)',
      marginBottom: '14px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: w.icon,
    size: 19
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--title-3)',
      marginBottom: '6px',
      letterSpacing: 0
    }
  }, w.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--body-xs)',
      lineHeight: '1.55',
      color: 'var(--text-muted)',
      textWrap: 'pretty'
    }
  }, w.d)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--measure)',
      margin: '0 auto',
      padding: '0 32px var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      maxWidth: '600px',
      margin: '0 auto 42px'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    title: "Ord fra klienterne",
    body: "Anmeldelser samles her, n\xE5r forl\xF8bene er afsluttet. Har du tr\xE6net med mig? S\xE5 vil jeg meget gerne h\xF8re din vurdering."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '22px'
    }
  }, /*#__PURE__*/React.createElement(Testimonial, {
    tag: "Pladsholder",
    quote: "F\xF8rste gang nogen forklarede mig hvad der egentlig skete i skulderen.",
    name: "Anders K.",
    meta: "Vejen \xB7 CrossFit",
    initial: "A"
  }), /*#__PURE__*/React.createElement(Testimonial, {
    tag: "Pladsholder",
    quote: "Jeg kom for en d\xE5rlig ryg og gik derfra med en plan jeg faktisk kunne f\xF8lge.",
    name: "Louise M.",
    meta: "Holsted \xB7 l\xF8b",
    initial: "L"
  }), /*#__PURE__*/React.createElement(Testimonial, {
    tag: "Pladsholder",
    quote: "Online coachingen holdt mig i gang hele vinteren.",
    name: "Jonas B.",
    meta: "Br\xF8rup \xB7 styrkel\xF8ft",
    initial: "J"
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--measure-prose)',
      margin: '0 auto',
      padding: '0 32px var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: '38px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--display-4)',
      letterSpacing: 'var(--tracking-heading)'
    }
  }, "Ofte stillede sp\xF8rgsm\xE5l")), /*#__PURE__*/React.createElement(Accordion, {
    items: FAQS
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--measure)',
      margin: '0 auto',
      padding: '0 32px var(--section-y-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.15fr .85fr',
      gap: '22px',
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tone: "dark",
    hoverable: false,
    radius: "var(--r-4xl)",
    padding: "clamp(32px,4vw,48px)",
    style: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '-70px',
      right: '-50px',
      width: '240px',
      height: '240px',
      background: 'var(--glow-gold)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--display-5)',
      lineHeight: '1.08',
      letterSpacing: 'var(--tracking-heading)'
    }
  }, "Skal vi l\xE6gge en plan?"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-on-dark-muted)',
      margin: '14px 0 26px',
      lineHeight: '1.6',
      maxWidth: '400px',
      textWrap: 'pretty'
    }
  }, "Skriv eller ring \u2014 s\xE5 finder vi en tid. Jeg svarer typisk samme hverdag."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: '11px',
      maxWidth: '420px'
    }
  }, [['phone', '20 00 00 00'], ['mail', 'mike@adelholm.dk']].map(([ic, label]) => /*#__PURE__*/React.createElement("a", {
    key: label,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go('kontakt');
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '13px',
      background: 'var(--wash-bone-06)',
      border: '1px solid var(--line-bone-13)',
      padding: '15px 18px',
      borderRadius: '15px',
      color: 'var(--bone-100)',
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '36px',
      height: '36px',
      borderRadius: '11px',
      background: 'var(--gold-500)',
      color: 'var(--ink-800)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 17
  })), label))))), /*#__PURE__*/React.createElement(Card, {
    hoverable: false,
    radius: "var(--r-4xl)",
    padding: "clamp(28px,3.5vw,40px)"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '22px',
      marginBottom: '6px'
    }
  }, "Tider"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '13px',
      color: 'var(--text-subtle)',
      marginBottom: '20px'
    }
  }, "Klinik & telefon"), [['Mandag – torsdag', '07.00 – 18.00'], ['Fredag', '07.00 – 15.00'], ['Lørdag', 'Efter aftale'], ['Søndag', 'Lukket']].map(([d, t]) => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '13px 0',
      borderBottom: '1px solid var(--line-ink-08)',
      fontSize: 'var(--body-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: 'var(--n-800)'
    }
  }, d), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      marginTop: '20px',
      background: 'var(--surface-inset)',
      borderRadius: 'var(--r-md)',
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--copper-600)',
      fontWeight: 800,
      flexShrink: 0
    }
  }, "!"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: '13.5px',
      lineHeight: '1.5',
      color: 'var(--text-body)'
    }
  }, "Akut skade? Ring direkte \u2014 jeg fors\xF8ger altid at finde plads samme uge."))))));
}
Object.assign(window, {
  Home,
  Hero,
  MA_SERVICES: SERVICES,
  MA_FAQS: FAQS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Services.jsx
try { (() => {
const {
  Button,
  Card,
  Eyebrow,
  FeatureCard,
  Icon
} = window.MikeAdelholmDesignSystem_675d43;
const CORE = [{
  n: '01',
  t: 'Muskuloskeletal undersøgelse',
  d: '60 minutter: anamnese, tests af led og muskler, gennemgang af bevægemønstre og en klar konklusion.'
}, {
  n: '02',
  t: 'Behandling',
  d: 'Manuel terapi, mobilisering og nålebehandling som understøttelse af træningen — ikke som erstatning.'
}, {
  n: '03',
  t: 'Genoptræning',
  d: 'Progressivt program fra aflastning til fuld belastning, med kontrol undervejs.'
}, {
  n: '04',
  t: 'Online coaching',
  d: 'Månedligt program, videofeedback på dine løft og løbende justering af belastningen.'
}];
const EXTRA = ['Skadesforebyggende screening', 'Styrketræningsprogrammer', 'Løbeteknik og belastningsstyring', 'Opfølgning efter operation', 'Genoptræning efter idrætsskade', 'Smerteforståelse og rådgivning', 'Bevægelsesanalyse på video', 'Programmering til styrkeløft', 'Vedligeholdelsesforløb'];
function Services({
  go
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      animation: 'pageIn var(--dur-page) var(--ease-page) both',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--grad-banner)',
      color: 'var(--bone-100)',
      borderRadius: '0 0 var(--r-page) var(--r-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--measure)',
      margin: '0 auto',
      padding: '150px 32px 66px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "champagne"
  }, "Ydelser"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--display-2)',
      letterSpacing: 'var(--tracking-display)',
      lineHeight: 1,
      marginTop: '16px'
    }
  }, "Hvad jeg tilbyder"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-on-dark-muted)',
      maxWidth: '640px',
      marginTop: '16px',
      fontSize: '16.5px',
      lineHeight: '1.6',
      textWrap: 'pretty'
    }
  }, "Alt h\xE6nger sammen: unders\xF8gelsen bestemmer behandlingen, behandlingen g\xF8r plads til tr\xE6ningen, og tr\xE6ningen er det der holder resultatet."))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--measure)',
      margin: '0 auto',
      padding: 'clamp(56px,7vw,72px) 32px 30px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(24px,3vw,30px)'
    }
  }, "Kerneforl\xF8b"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      margin: '6px 0 30px',
      fontSize: '15.5px'
    }
  }, "i klinikken i Vejen og online"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      alignItems: 'stretch'
    }
  }, CORE.map(s => /*#__PURE__*/React.createElement(FeatureCard, {
    key: s.n,
    number: s.n,
    title: s.t,
    description: s.d
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--measure)',
      margin: '0 auto',
      padding: 'clamp(30px,4vw,44px) 32px var(--section-y)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(24px,3vw,30px)',
      marginBottom: '28px'
    }
  }, "Derudover tilbyder jeg"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '16px'
    }
  }, EXTRA.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s,
    radius: "var(--r-xl)",
    padding: "24px",
    style: {
      display: 'flex',
      gap: '14px',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      width: '30px',
      height: '30px',
      borderRadius: 'var(--r-xs)',
      background: 'var(--wash-gold-16)',
      color: 'var(--copper-600)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 800,
      fontSize: '14px',
      marginTop: '1px'
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--body-sm)',
      fontWeight: 500,
      lineHeight: '1.5',
      color: 'var(--n-800)',
      textWrap: 'pretty'
    }
  }, s)))), /*#__PURE__*/React.createElement(Card, {
    tone: "dark",
    hoverable: false,
    radius: "var(--r-3xl)",
    padding: "clamp(28px,4vw,40px)",
    style: {
      marginTop: '36px',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(22px,2.6vw,26px)'
    }
  }, "Er du i tvivl om hvad du har brug for?"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-on-dark-muted)',
      marginTop: '6px',
      fontSize: '15.5px'
    }
  }, "Skriv kort om din skade \u2014 s\xE5 siger jeg hvad jeg ville starte med.")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => go('kontakt')
  }, "Kontakt mig \u2192"))));
}
Object.assign(window, {
  Services
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Services.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Site.jsx
try { (() => {
const {
  NavDock,
  SiteFooter,
  LogoBadge,
  Button,
  Icon
} = window.MikeAdelholmDesignSystem_675d43;
const NAV = [{
  key: 'home',
  label: 'Forside'
}, {
  key: 'ydelser',
  label: 'Ydelser'
}, {
  key: 'om',
  label: 'Om mig'
}, {
  key: 'kontakt',
  label: 'Kontakt'
}];
function Site() {
  const [page, setPage] = React.useState('home');
  const go = k => {
    setPage(k);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons && window.lucide.createIcons();
  }, [page]);
  const Screen = page === 'ydelser' ? window.Services : page === 'om' ? window.About : page === 'kontakt' ? window.Contact : window.Home;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink-800)',
      minHeight: '100vh',
      overflowX: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(NavDock, {
    items: NAV,
    active: page,
    onSelect: go,
    brand: /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        go('home');
      },
      style: {
        textDecoration: 'none'
      }
    }, /*#__PURE__*/React.createElement(LogoBadge, {
      src: "../../assets/logo-badge.png",
      size: 40,
      role: "Muskuloskeletal fysioterapeut"
    })),
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "dark",
      size: "sm",
      onClick: () => go('kontakt'),
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "phone",
        size: 15,
        stroke: "var(--gold-500)",
        strokeWidth: 2.2
      })
    }, "20 00 00 00")
  }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Screen, {
    go: go
  })), /*#__PURE__*/React.createElement(SiteFooter, {
    brand: /*#__PURE__*/React.createElement(LogoBadge, {
      src: "../../assets/logo-badge.png",
      size: 50,
      tone: "dark",
      role: "Exam. MPT & online coach"
    }),
    blurb: "Muskuloskeletal fysioterapi, genoptr\xE6ning og online coaching i Vejen \u2014 og online i hele landet.",
    columns: [{
      title: 'Sider',
      items: NAV.map(n => /*#__PURE__*/React.createElement("a", {
        key: n.key,
        href: "#",
        onClick: e => {
          e.preventDefault();
          go(n.key);
        },
        style: {
          color: 'var(--n-250)',
          width: 'fit-content'
        }
      }, n.label))
    }, {
      title: 'Kontakt',
      items: [/*#__PURE__*/React.createElement("span", {
        key: "t"
      }, "20 00 00 00"), /*#__PURE__*/React.createElement("span", {
        key: "m"
      }, "mike@adelholm.dk"), /*#__PURE__*/React.createElement("span", {
        key: "o"
      }, "Vejen")]
    }],
    legal: "\xA9 2026 Mike Adelholm",
    note: "Exam. MPT \xB7 ESTD 2025"
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Site, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Site.jsx", error: String((e && e.message) || e) }); }

__ds_ns.LogoBadge = __ds_scope.LogoBadge;

__ds_ns.Marquee = __ds_scope.Marquee;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.FeatureCard = __ds_scope.FeatureCard;

__ds_ns.ServiceRow = __ds_scope.ServiceRow;

__ds_ns.Testimonial = __ds_scope.Testimonial;

__ds_ns.TimelineItem = __ds_scope.TimelineItem;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.TabPills = __ds_scope.TabPills;

__ds_ns.NavDock = __ds_scope.NavDock;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

})();
