(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const o of i)
      if (o.type === 'childList')
        for (const s of o.addedNodes)
          s.tagName === 'LINK' && s.rel === 'modulepreload' && r(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(i) {
    const o = {};
    return (
      i.integrity && (o.integrity = i.integrity),
      i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === 'use-credentials'
        ? (o.credentials = 'include')
        : i.crossOrigin === 'anonymous'
          ? (o.credentials = 'omit')
          : (o.credentials = 'same-origin'),
      o
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const o = n(i);
    fetch(i.href, o);
  }
})();
var $e = { value: () => {} };
function Gt() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + '') || r in n || /[\s.]/.test(r))
      throw new Error('illegal type: ' + r);
    n[r] = [];
  }
  return new Z(n);
}
function Z(t) {
  this._ = t;
}
function be(t, e) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (n) {
      var r = '',
        i = n.indexOf('.');
      if (
        (i >= 0 && ((r = n.slice(i + 1)), (n = n.slice(0, i))),
        n && !e.hasOwnProperty(n))
      )
        throw new Error('unknown type: ' + n);
      return { type: n, name: r };
    });
}
Z.prototype = Gt.prototype = {
  constructor: Z,
  on: function (t, e) {
    var n = this._,
      r = be(t + '', n),
      i,
      o = -1,
      s = r.length;
    if (arguments.length < 2) {
      for (; ++o < s; )
        if ((i = (t = r[o]).type) && (i = Ae(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != 'function')
      throw new Error('invalid callback: ' + e);
    for (; ++o < s; )
      if ((i = (t = r[o]).type)) n[i] = Rt(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = Rt(n[i], t.name, null);
    return this;
  },
  copy: function () {
    var t = {},
      e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new Z(t);
  },
  call: function (t, e) {
    if ((i = arguments.length - 2) > 0)
      for (var n = new Array(i), r = 0, i, o; r < i; ++r)
        n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r) o[r].value.apply(e, n);
  },
  apply: function (t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error('unknown type: ' + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i)
      r[i].value.apply(e, n);
  },
};
function Ae(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e) return i.value;
}
function Rt(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      ((t[r] = $e), (t = t.slice(0, r).concat(t.slice(r + 1))));
      break;
    }
  return (n != null && t.push({ name: e, value: n }), t);
}
var dt = 'http://www.w3.org/1999/xhtml';
const Ct = {
  svg: 'http://www.w3.org/2000/svg',
  xhtml: dt,
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/',
};
function lt(t) {
  var e = (t += ''),
    n = e.indexOf(':');
  return (
    n >= 0 && (e = t.slice(0, n)) !== 'xmlns' && (t = t.slice(n + 1)),
    Ct.hasOwnProperty(e) ? { space: Ct[e], local: t } : t
  );
}
function Ne(t) {
  return function () {
    var e = this.ownerDocument,
      n = this.namespaceURI;
    return n === dt && e.documentElement.namespaceURI === dt
      ? e.createElement(t)
      : e.createElementNS(n, t);
  };
}
function ke(t) {
  return function () {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function Kt(t) {
  var e = lt(t);
  return (e.local ? ke : Ne)(e);
}
function Te() {}
function mt(t) {
  return t == null
    ? Te
    : function () {
        return this.querySelector(t);
      };
}
function Ee(t) {
  typeof t != 'function' && (t = mt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (
      var o = e[i], s = o.length, a = (r[i] = new Array(s)), l, c, u = 0;
      u < s;
      ++u
    )
      (l = o[u]) &&
        (c = t.call(l, l.__data__, u, o)) &&
        ('__data__' in l && (c.__data__ = l.__data__), (a[u] = c));
  return new m(r, this._parents);
}
function Me(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Re() {
  return [];
}
function Zt(t) {
  return t == null
    ? Re
    : function () {
        return this.querySelectorAll(t);
      };
}
function Ce(t) {
  return function () {
    return Me(t.apply(this, arguments));
  };
}
function Se(t) {
  typeof t == 'function' ? (t = Ce(t)) : (t = Zt(t));
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var s = e[o], a = s.length, l, c = 0; c < a; ++c)
      (l = s[c]) && (r.push(t.call(l, l.__data__, c, s)), i.push(l));
  return new m(r, i);
}
function Jt(t) {
  return function () {
    return this.matches(t);
  };
}
function jt(t) {
  return function (e) {
    return e.matches(t);
  };
}
var Le = Array.prototype.find;
function Ie(t) {
  return function () {
    return Le.call(this.children, t);
  };
}
function Oe() {
  return this.firstElementChild;
}
function Fe(t) {
  return this.select(t == null ? Oe : Ie(typeof t == 'function' ? t : jt(t)));
}
var De = Array.prototype.filter;
function Pe() {
  return Array.from(this.children);
}
function Be(t) {
  return function () {
    return De.call(this.children, t);
  };
}
function He(t) {
  return this.selectAll(
    t == null ? Pe : Be(typeof t == 'function' ? t : jt(t))
  );
}
function qe(t) {
  typeof t != 'function' && (t = Jt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = (r[i] = []), l, c = 0; c < s; ++c)
      (l = o[c]) && t.call(l, l.__data__, c, o) && a.push(l);
  return new m(r, this._parents);
}
function te(t) {
  return new Array(t.length);
}
function Xe() {
  return new m(this._enter || this._groups.map(te), this._parents);
}
function tt(t, e) {
  ((this.ownerDocument = t.ownerDocument),
    (this.namespaceURI = t.namespaceURI),
    (this._next = null),
    (this._parent = t),
    (this.__data__ = e));
}
tt.prototype = {
  constructor: tt,
  appendChild: function (t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function (t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function (t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function (t) {
    return this._parent.querySelectorAll(t);
  },
};
function Qe(t) {
  return function () {
    return t;
  };
}
function ze(t, e, n, r, i, o) {
  for (var s = 0, a, l = e.length, c = o.length; s < c; ++s)
    (a = e[s]) ? ((a.__data__ = o[s]), (r[s] = a)) : (n[s] = new tt(t, o[s]));
  for (; s < l; ++s) (a = e[s]) && (i[s] = a);
}
function Ue(t, e, n, r, i, o, s) {
  var a,
    l,
    c = new Map(),
    u = e.length,
    f = o.length,
    h = new Array(u),
    p;
  for (a = 0; a < u; ++a)
    (l = e[a]) &&
      ((h[a] = p = s.call(l, l.__data__, a, e) + ''),
      c.has(p) ? (i[a] = l) : c.set(p, l));
  for (a = 0; a < f; ++a)
    ((p = s.call(t, o[a], a, o) + ''),
      (l = c.get(p))
        ? ((r[a] = l), (l.__data__ = o[a]), c.delete(p))
        : (n[a] = new tt(t, o[a])));
  for (a = 0; a < u; ++a) (l = e[a]) && c.get(h[a]) === l && (i[a] = l);
}
function Ve(t) {
  return t.__data__;
}
function Ye(t, e) {
  if (!arguments.length) return Array.from(this, Ve);
  var n = e ? Ue : ze,
    r = this._parents,
    i = this._groups;
  typeof t != 'function' && (t = Qe(t));
  for (
    var o = i.length,
      s = new Array(o),
      a = new Array(o),
      l = new Array(o),
      c = 0;
    c < o;
    ++c
  ) {
    var u = r[c],
      f = i[c],
      h = f.length,
      p = We(t.call(u, u && u.__data__, c, r)),
      _ = p.length,
      v = (a[c] = new Array(_)),
      M = (s[c] = new Array(_)),
      me = (l[c] = new Array(h));
    n(u, f, v, M, me, p, e);
    for (var F = 0, Y = 0, Et, Mt; F < _; ++F)
      if ((Et = v[F])) {
        for (F >= Y && (Y = F + 1); !(Mt = M[Y]) && ++Y < _; );
        Et._next = Mt || null;
      }
  }
  return ((s = new m(s, r)), (s._enter = a), (s._exit = l), s);
}
function We(t) {
  return typeof t == 'object' && 'length' in t ? t : Array.from(t);
}
function Ge() {
  return new m(this._exit || this._groups.map(te), this._parents);
}
function Ke(t, e, n) {
  var r = this.enter(),
    i = this,
    o = this.exit();
  return (
    typeof t == 'function'
      ? ((r = t(r)), r && (r = r.selection()))
      : (r = r.append(t + '')),
    e != null && ((i = e(i)), i && (i = i.selection())),
    n == null ? o.remove() : n(o),
    r && i ? r.merge(i).order() : i
  );
}
function Ze(t) {
  for (
    var e = t.selection ? t.selection() : t,
      n = this._groups,
      r = e._groups,
      i = n.length,
      o = r.length,
      s = Math.min(i, o),
      a = new Array(i),
      l = 0;
    l < s;
    ++l
  )
    for (
      var c = n[l], u = r[l], f = c.length, h = (a[l] = new Array(f)), p, _ = 0;
      _ < f;
      ++_
    )
      (p = c[_] || u[_]) && (h[_] = p);
  for (; l < i; ++l) a[l] = n[l];
  return new m(a, this._parents);
}
function Je() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], s; --i >= 0; )
      (s = r[i]) &&
        (o &&
          s.compareDocumentPosition(o) ^ 4 &&
          o.parentNode.insertBefore(s, o),
        (o = s));
  return this;
}
function je(t) {
  t || (t = tn);
  function e(f, h) {
    return f && h ? t(f.__data__, h.__data__) : !f - !h;
  }
  for (
    var n = this._groups, r = n.length, i = new Array(r), o = 0;
    o < r;
    ++o
  ) {
    for (
      var s = n[o], a = s.length, l = (i[o] = new Array(a)), c, u = 0;
      u < a;
      ++u
    )
      (c = s[u]) && (l[u] = c);
    l.sort(e);
  }
  return new m(i, this._parents).order();
}
function tn(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function en() {
  var t = arguments[0];
  return ((arguments[0] = this), t.apply(null, arguments), this);
}
function nn() {
  return Array.from(this);
}
function rn() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var s = r[i];
      if (s) return s;
    }
  return null;
}
function on() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function sn() {
  return !this.node();
}
function an(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, s = i.length, a; o < s; ++o)
      (a = i[o]) && t.call(a, a.__data__, o, i);
  return this;
}
function ln(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function cn(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function un(t, e) {
  return function () {
    this.setAttribute(t, e);
  };
}
function fn(t, e) {
  return function () {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function hn(t, e) {
  return function () {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function pn(t, e) {
  return function () {
    var n = e.apply(this, arguments);
    n == null
      ? this.removeAttributeNS(t.space, t.local)
      : this.setAttributeNS(t.space, t.local, n);
  };
}
function dn(t, e) {
  var n = lt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each(
    (e == null
      ? n.local
        ? cn
        : ln
      : typeof e == 'function'
        ? n.local
          ? pn
          : hn
        : n.local
          ? fn
          : un)(n, e)
  );
}
function ee(t) {
  return (
    (t.ownerDocument && t.ownerDocument.defaultView) ||
    (t.document && t) ||
    t.defaultView
  );
}
function gn(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function _n(t, e, n) {
  return function () {
    this.style.setProperty(t, e, n);
  };
}
function yn(t, e, n) {
  return function () {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function wn(t, e, n) {
  return arguments.length > 1
    ? this.each(
        (e == null ? gn : typeof e == 'function' ? yn : _n)(t, e, n ?? '')
      )
    : I(this.node(), t);
}
function I(t, e) {
  return (
    t.style.getPropertyValue(e) ||
    ee(t).getComputedStyle(t, null).getPropertyValue(e)
  );
}
function vn(t) {
  return function () {
    delete this[t];
  };
}
function xn(t, e) {
  return function () {
    this[t] = e;
  };
}
function mn(t, e) {
  return function () {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : (this[t] = n);
  };
}
function $n(t, e) {
  return arguments.length > 1
    ? this.each((e == null ? vn : typeof e == 'function' ? mn : xn)(t, e))
    : this.node()[t];
}
function ne(t) {
  return t.trim().split(/^|\s+/);
}
function $t(t) {
  return t.classList || new re(t);
}
function re(t) {
  ((this._node = t), (this._names = ne(t.getAttribute('class') || '')));
}
re.prototype = {
  add: function (t) {
    var e = this._names.indexOf(t);
    e < 0 &&
      (this._names.push(t),
      this._node.setAttribute('class', this._names.join(' ')));
  },
  remove: function (t) {
    var e = this._names.indexOf(t);
    e >= 0 &&
      (this._names.splice(e, 1),
      this._node.setAttribute('class', this._names.join(' ')));
  },
  contains: function (t) {
    return this._names.indexOf(t) >= 0;
  },
};
function ie(t, e) {
  for (var n = $t(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function oe(t, e) {
  for (var n = $t(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function bn(t) {
  return function () {
    ie(this, t);
  };
}
function An(t) {
  return function () {
    oe(this, t);
  };
}
function Nn(t, e) {
  return function () {
    (e.apply(this, arguments) ? ie : oe)(this, t);
  };
}
function kn(t, e) {
  var n = ne(t + '');
  if (arguments.length < 2) {
    for (var r = $t(this.node()), i = -1, o = n.length; ++i < o; )
      if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == 'function' ? Nn : e ? bn : An)(n, e));
}
function Tn() {
  this.textContent = '';
}
function En(t) {
  return function () {
    this.textContent = t;
  };
}
function Mn(t) {
  return function () {
    var e = t.apply(this, arguments);
    this.textContent = e ?? '';
  };
}
function Rn(t) {
  return arguments.length
    ? this.each(t == null ? Tn : (typeof t == 'function' ? Mn : En)(t))
    : this.node().textContent;
}
function Cn() {
  this.innerHTML = '';
}
function Sn(t) {
  return function () {
    this.innerHTML = t;
  };
}
function Ln(t) {
  return function () {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? '';
  };
}
function In(t) {
  return arguments.length
    ? this.each(t == null ? Cn : (typeof t == 'function' ? Ln : Sn)(t))
    : this.node().innerHTML;
}
function On() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Fn() {
  return this.each(On);
}
function Dn() {
  this.previousSibling &&
    this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Pn() {
  return this.each(Dn);
}
function Bn(t) {
  var e = typeof t == 'function' ? t : Kt(t);
  return this.select(function () {
    return this.appendChild(e.apply(this, arguments));
  });
}
function Hn() {
  return null;
}
function qn(t, e) {
  var n = typeof t == 'function' ? t : Kt(t),
    r = e == null ? Hn : typeof e == 'function' ? e : mt(e);
  return this.select(function () {
    return this.insertBefore(
      n.apply(this, arguments),
      r.apply(this, arguments) || null
    );
  });
}
function Xn() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function Qn() {
  return this.each(Xn);
}
function zn() {
  var t = this.cloneNode(!1),
    e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Un() {
  var t = this.cloneNode(!0),
    e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function Vn(t) {
  return this.select(t ? Un : zn);
}
function Yn(t) {
  return arguments.length ? this.property('__data__', t) : this.node().__data__;
}
function Wn(t) {
  return function (e) {
    t.call(this, e, this.__data__);
  };
}
function Gn(t) {
  return t
    .trim()
    .split(/^|\s+/)
    .map(function (e) {
      var n = '',
        r = e.indexOf('.');
      return (
        r >= 0 && ((n = e.slice(r + 1)), (e = e.slice(0, r))),
        { type: e, name: n }
      );
    });
}
function Kn(t) {
  return function () {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        ((o = e[n]),
          (!t.type || o.type === t.type) && o.name === t.name
            ? this.removeEventListener(o.type, o.listener, o.options)
            : (e[++r] = o));
      ++r ? (e.length = r) : delete this.__on;
    }
  };
}
function Zn(t, e, n) {
  return function () {
    var r = this.__on,
      i,
      o = Wn(e);
    if (r) {
      for (var s = 0, a = r.length; s < a; ++s)
        if ((i = r[s]).type === t.type && i.name === t.name) {
          (this.removeEventListener(i.type, i.listener, i.options),
            this.addEventListener(i.type, (i.listener = o), (i.options = n)),
            (i.value = e));
          return;
        }
    }
    (this.addEventListener(t.type, o, n),
      (i = { type: t.type, name: t.name, value: e, listener: o, options: n }),
      r ? r.push(i) : (this.__on = [i]));
  };
}
function Jn(t, e, n) {
  var r = Gn(t + ''),
    i,
    o = r.length,
    s;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var l = 0, c = a.length, u; l < c; ++l)
        for (i = 0, u = a[l]; i < o; ++i)
          if ((s = r[i]).type === u.type && s.name === u.name) return u.value;
    }
    return;
  }
  for (a = e ? Zn : Kn, i = 0; i < o; ++i) this.each(a(r[i], e, n));
  return this;
}
function se(t, e, n) {
  var r = ee(t),
    i = r.CustomEvent;
  (typeof i == 'function'
    ? (i = new i(e, n))
    : ((i = r.document.createEvent('Event')),
      n
        ? (i.initEvent(e, n.bubbles, n.cancelable), (i.detail = n.detail))
        : i.initEvent(e, !1, !1)),
    t.dispatchEvent(i));
}
function jn(t, e) {
  return function () {
    return se(this, t, e);
  };
}
function tr(t, e) {
  return function () {
    return se(this, t, e.apply(this, arguments));
  };
}
function er(t, e) {
  return this.each((typeof e == 'function' ? tr : jn)(t, e));
}
function* nr() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, s; i < o; ++i)
      (s = r[i]) && (yield s);
}
var ae = [null];
function m(t, e) {
  ((this._groups = t), (this._parents = e));
}
function U() {
  return new m([[document.documentElement]], ae);
}
function rr() {
  return this;
}
m.prototype = U.prototype = {
  constructor: m,
  select: Ee,
  selectAll: Se,
  selectChild: Fe,
  selectChildren: He,
  filter: qe,
  data: Ye,
  enter: Xe,
  exit: Ge,
  join: Ke,
  merge: Ze,
  selection: rr,
  order: Je,
  sort: je,
  call: en,
  nodes: nn,
  node: rn,
  size: on,
  empty: sn,
  each: an,
  attr: dn,
  style: wn,
  property: $n,
  classed: kn,
  text: Rn,
  html: In,
  raise: Fn,
  lower: Pn,
  append: Bn,
  insert: qn,
  remove: Qn,
  clone: Vn,
  datum: Yn,
  on: Jn,
  dispatch: er,
  [Symbol.iterator]: nr,
};
function et(t) {
  return typeof t == 'string'
    ? new m([[document.querySelector(t)]], [document.documentElement])
    : new m([[t]], ae);
}
function bt(t, e, n) {
  ((t.prototype = e.prototype = n), (n.constructor = t));
}
function le(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function V() {}
var q = 0.7,
  nt = 1 / q,
  L = '\\s*([+-]?\\d+)\\s*',
  X = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*',
  A = '\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*',
  ir = /^#([0-9a-f]{3,8})$/,
  or = new RegExp(`^rgb\\(${L},${L},${L}\\)$`),
  sr = new RegExp(`^rgb\\(${A},${A},${A}\\)$`),
  ar = new RegExp(`^rgba\\(${L},${L},${L},${X}\\)$`),
  lr = new RegExp(`^rgba\\(${A},${A},${A},${X}\\)$`),
  cr = new RegExp(`^hsl\\(${X},${A},${A}\\)$`),
  ur = new RegExp(`^hsla\\(${X},${A},${A},${X}\\)$`),
  St = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074,
  };
bt(V, Q, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Lt,
  formatHex: Lt,
  formatHex8: fr,
  formatHsl: hr,
  formatRgb: It,
  toString: It,
});
function Lt() {
  return this.rgb().formatHex();
}
function fr() {
  return this.rgb().formatHex8();
}
function hr() {
  return ce(this).formatHsl();
}
function It() {
  return this.rgb().formatRgb();
}
function Q(t) {
  var e, n;
  return (
    (t = (t + '').trim().toLowerCase()),
    (e = ir.exec(t))
      ? ((n = e[1].length),
        (e = parseInt(e[1], 16)),
        n === 6
          ? Ot(e)
          : n === 3
            ? new x(
                ((e >> 8) & 15) | ((e >> 4) & 240),
                ((e >> 4) & 15) | (e & 240),
                ((e & 15) << 4) | (e & 15),
                1
              )
            : n === 8
              ? W(
                  (e >> 24) & 255,
                  (e >> 16) & 255,
                  (e >> 8) & 255,
                  (e & 255) / 255
                )
              : n === 4
                ? W(
                    ((e >> 12) & 15) | ((e >> 8) & 240),
                    ((e >> 8) & 15) | ((e >> 4) & 240),
                    ((e >> 4) & 15) | (e & 240),
                    (((e & 15) << 4) | (e & 15)) / 255
                  )
                : null)
      : (e = or.exec(t))
        ? new x(e[1], e[2], e[3], 1)
        : (e = sr.exec(t))
          ? new x((e[1] * 255) / 100, (e[2] * 255) / 100, (e[3] * 255) / 100, 1)
          : (e = ar.exec(t))
            ? W(e[1], e[2], e[3], e[4])
            : (e = lr.exec(t))
              ? W(
                  (e[1] * 255) / 100,
                  (e[2] * 255) / 100,
                  (e[3] * 255) / 100,
                  e[4]
                )
              : (e = cr.exec(t))
                ? Pt(e[1], e[2] / 100, e[3] / 100, 1)
                : (e = ur.exec(t))
                  ? Pt(e[1], e[2] / 100, e[3] / 100, e[4])
                  : St.hasOwnProperty(t)
                    ? Ot(St[t])
                    : t === 'transparent'
                      ? new x(NaN, NaN, NaN, 0)
                      : null
  );
}
function Ot(t) {
  return new x((t >> 16) & 255, (t >> 8) & 255, t & 255, 1);
}
function W(t, e, n, r) {
  return (r <= 0 && (t = e = n = NaN), new x(t, e, n, r));
}
function pr(t) {
  return (
    t instanceof V || (t = Q(t)),
    t ? ((t = t.rgb()), new x(t.r, t.g, t.b, t.opacity)) : new x()
  );
}
function gt(t, e, n, r) {
  return arguments.length === 1 ? pr(t) : new x(t, e, n, r ?? 1);
}
function x(t, e, n, r) {
  ((this.r = +t), (this.g = +e), (this.b = +n), (this.opacity = +r));
}
bt(
  x,
  gt,
  le(V, {
    brighter(t) {
      return (
        (t = t == null ? nt : Math.pow(nt, t)),
        new x(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? q : Math.pow(q, t)),
        new x(this.r * t, this.g * t, this.b * t, this.opacity)
      );
    },
    rgb() {
      return this;
    },
    clamp() {
      return new x(C(this.r), C(this.g), C(this.b), rt(this.opacity));
    },
    displayable() {
      return (
        -0.5 <= this.r &&
        this.r < 255.5 &&
        -0.5 <= this.g &&
        this.g < 255.5 &&
        -0.5 <= this.b &&
        this.b < 255.5 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    hex: Ft,
    formatHex: Ft,
    formatHex8: dr,
    formatRgb: Dt,
    toString: Dt,
  })
);
function Ft() {
  return `#${R(this.r)}${R(this.g)}${R(this.b)}`;
}
function dr() {
  return `#${R(this.r)}${R(this.g)}${R(this.b)}${R((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Dt() {
  const t = rt(this.opacity);
  return `${t === 1 ? 'rgb(' : 'rgba('}${C(this.r)}, ${C(this.g)}, ${C(this.b)}${t === 1 ? ')' : `, ${t})`}`;
}
function rt(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function C(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function R(t) {
  return ((t = C(t)), (t < 16 ? '0' : '') + t.toString(16));
}
function Pt(t, e, n, r) {
  return (
    r <= 0
      ? (t = e = n = NaN)
      : n <= 0 || n >= 1
        ? (t = e = NaN)
        : e <= 0 && (t = NaN),
    new $(t, e, n, r)
  );
}
function ce(t) {
  if (t instanceof $) return new $(t.h, t.s, t.l, t.opacity);
  if ((t instanceof V || (t = Q(t)), !t)) return new $();
  if (t instanceof $) return t;
  t = t.rgb();
  var e = t.r / 255,
    n = t.g / 255,
    r = t.b / 255,
    i = Math.min(e, n, r),
    o = Math.max(e, n, r),
    s = NaN,
    a = o - i,
    l = (o + i) / 2;
  return (
    a
      ? (e === o
          ? (s = (n - r) / a + (n < r) * 6)
          : n === o
            ? (s = (r - e) / a + 2)
            : (s = (e - n) / a + 4),
        (a /= l < 0.5 ? o + i : 2 - o - i),
        (s *= 60))
      : (a = l > 0 && l < 1 ? 0 : s),
    new $(s, a, l, t.opacity)
  );
}
function gr(t, e, n, r) {
  return arguments.length === 1 ? ce(t) : new $(t, e, n, r ?? 1);
}
function $(t, e, n, r) {
  ((this.h = +t), (this.s = +e), (this.l = +n), (this.opacity = +r));
}
bt(
  $,
  gr,
  le(V, {
    brighter(t) {
      return (
        (t = t == null ? nt : Math.pow(nt, t)),
        new $(this.h, this.s, this.l * t, this.opacity)
      );
    },
    darker(t) {
      return (
        (t = t == null ? q : Math.pow(q, t)),
        new $(this.h, this.s, this.l * t, this.opacity)
      );
    },
    rgb() {
      var t = (this.h % 360) + (this.h < 0) * 360,
        e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        n = this.l,
        r = n + (n < 0.5 ? n : 1 - n) * e,
        i = 2 * n - r;
      return new x(
        ft(t >= 240 ? t - 240 : t + 120, i, r),
        ft(t, i, r),
        ft(t < 120 ? t + 240 : t - 120, i, r),
        this.opacity
      );
    },
    clamp() {
      return new $(Bt(this.h), G(this.s), G(this.l), rt(this.opacity));
    },
    displayable() {
      return (
        ((0 <= this.s && this.s <= 1) || isNaN(this.s)) &&
        0 <= this.l &&
        this.l <= 1 &&
        0 <= this.opacity &&
        this.opacity <= 1
      );
    },
    formatHsl() {
      const t = rt(this.opacity);
      return `${t === 1 ? 'hsl(' : 'hsla('}${Bt(this.h)}, ${G(this.s) * 100}%, ${G(this.l) * 100}%${t === 1 ? ')' : `, ${t})`}`;
    },
  })
);
function Bt(t) {
  return ((t = (t || 0) % 360), t < 0 ? t + 360 : t);
}
function G(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function ft(t, e, n) {
  return (
    (t < 60
      ? e + ((n - e) * t) / 60
      : t < 180
        ? n
        : t < 240
          ? e + ((n - e) * (240 - t)) / 60
          : e) * 255
  );
}
const ue = (t) => () => t;
function _r(t, e) {
  return function (n) {
    return t + n * e;
  };
}
function yr(t, e, n) {
  return (
    (t = Math.pow(t, n)),
    (e = Math.pow(e, n) - t),
    (n = 1 / n),
    function (r) {
      return Math.pow(t + r * e, n);
    }
  );
}
function wr(t) {
  return (t = +t) == 1
    ? fe
    : function (e, n) {
        return n - e ? yr(e, n, t) : ue(isNaN(e) ? n : e);
      };
}
function fe(t, e) {
  var n = e - t;
  return n ? _r(t, n) : ue(isNaN(t) ? e : t);
}
const Ht = (function t(e) {
  var n = wr(e);
  function r(i, o) {
    var s = n((i = gt(i)).r, (o = gt(o)).r),
      a = n(i.g, o.g),
      l = n(i.b, o.b),
      c = fe(i.opacity, o.opacity);
    return function (u) {
      return (
        (i.r = s(u)),
        (i.g = a(u)),
        (i.b = l(u)),
        (i.opacity = c(u)),
        i + ''
      );
    };
  }
  return ((r.gamma = t), r);
})(1);
function E(t, e) {
  return (
    (t = +t),
    (e = +e),
    function (n) {
      return t * (1 - n) + e * n;
    }
  );
}
var _t = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
  ht = new RegExp(_t.source, 'g');
function vr(t) {
  return function () {
    return t;
  };
}
function xr(t) {
  return function (e) {
    return t(e) + '';
  };
}
function mr(t, e) {
  var n = (_t.lastIndex = ht.lastIndex = 0),
    r,
    i,
    o,
    s = -1,
    a = [],
    l = [];
  for (t = t + '', e = e + ''; (r = _t.exec(t)) && (i = ht.exec(e)); )
    ((o = i.index) > n &&
      ((o = e.slice(n, o)), a[s] ? (a[s] += o) : (a[++s] = o)),
      (r = r[0]) === (i = i[0])
        ? a[s]
          ? (a[s] += i)
          : (a[++s] = i)
        : ((a[++s] = null), l.push({ i: s, x: E(r, i) })),
      (n = ht.lastIndex));
  return (
    n < e.length && ((o = e.slice(n)), a[s] ? (a[s] += o) : (a[++s] = o)),
    a.length < 2
      ? l[0]
        ? xr(l[0].x)
        : vr(e)
      : ((e = l.length),
        function (c) {
          for (var u = 0, f; u < e; ++u) a[(f = l[u]).i] = f.x(c);
          return a.join('');
        })
  );
}
var qt = 180 / Math.PI,
  yt = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1,
  };
function he(t, e, n, r, i, o) {
  var s, a, l;
  return (
    (s = Math.sqrt(t * t + e * e)) && ((t /= s), (e /= s)),
    (l = t * n + e * r) && ((n -= t * l), (r -= e * l)),
    (a = Math.sqrt(n * n + r * r)) && ((n /= a), (r /= a), (l /= a)),
    t * r < e * n && ((t = -t), (e = -e), (l = -l), (s = -s)),
    {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(e, t) * qt,
      skewX: Math.atan(l) * qt,
      scaleX: s,
      scaleY: a,
    }
  );
}
var K;
function $r(t) {
  const e = new (typeof DOMMatrix == 'function' ? DOMMatrix : WebKitCSSMatrix)(
    t + ''
  );
  return e.isIdentity ? yt : he(e.a, e.b, e.c, e.d, e.e, e.f);
}
function br(t) {
  return t == null ||
    (K || (K = document.createElementNS('http://www.w3.org/2000/svg', 'g')),
    K.setAttribute('transform', t),
    !(t = K.transform.baseVal.consolidate()))
    ? yt
    : ((t = t.matrix), he(t.a, t.b, t.c, t.d, t.e, t.f));
}
function pe(t, e, n, r) {
  function i(c) {
    return c.length ? c.pop() + ' ' : '';
  }
  function o(c, u, f, h, p, _) {
    if (c !== f || u !== h) {
      var v = p.push('translate(', null, e, null, n);
      _.push({ i: v - 4, x: E(c, f) }, { i: v - 2, x: E(u, h) });
    } else (f || h) && p.push('translate(' + f + e + h + n);
  }
  function s(c, u, f, h) {
    c !== u
      ? (c - u > 180 ? (u += 360) : u - c > 180 && (c += 360),
        h.push({ i: f.push(i(f) + 'rotate(', null, r) - 2, x: E(c, u) }))
      : u && f.push(i(f) + 'rotate(' + u + r);
  }
  function a(c, u, f, h) {
    c !== u
      ? h.push({ i: f.push(i(f) + 'skewX(', null, r) - 2, x: E(c, u) })
      : u && f.push(i(f) + 'skewX(' + u + r);
  }
  function l(c, u, f, h, p, _) {
    if (c !== f || u !== h) {
      var v = p.push(i(p) + 'scale(', null, ',', null, ')');
      _.push({ i: v - 4, x: E(c, f) }, { i: v - 2, x: E(u, h) });
    } else (f !== 1 || h !== 1) && p.push(i(p) + 'scale(' + f + ',' + h + ')');
  }
  return function (c, u) {
    var f = [],
      h = [];
    return (
      (c = t(c)),
      (u = t(u)),
      o(c.translateX, c.translateY, u.translateX, u.translateY, f, h),
      s(c.rotate, u.rotate, f, h),
      a(c.skewX, u.skewX, f, h),
      l(c.scaleX, c.scaleY, u.scaleX, u.scaleY, f, h),
      (c = u = null),
      function (p) {
        for (var _ = -1, v = h.length, M; ++_ < v; ) f[(M = h[_]).i] = M.x(p);
        return f.join('');
      }
    );
  };
}
var Ar = pe($r, 'px, ', 'px)', 'deg)'),
  Nr = pe(br, ', ', ')', ')'),
  O = 0,
  P = 0,
  D = 0,
  de = 1e3,
  it,
  B,
  ot = 0,
  S = 0,
  ct = 0,
  z = typeof performance == 'object' && performance.now ? performance : Date,
  ge =
    typeof window == 'object' && window.requestAnimationFrame
      ? window.requestAnimationFrame.bind(window)
      : function (t) {
          setTimeout(t, 17);
        };
function At() {
  return S || (ge(kr), (S = z.now() + ct));
}
function kr() {
  S = 0;
}
function st() {
  this._call = this._time = this._next = null;
}
st.prototype = _e.prototype = {
  constructor: st,
  restart: function (t, e, n) {
    if (typeof t != 'function')
      throw new TypeError('callback is not a function');
    ((n = (n == null ? At() : +n) + (e == null ? 0 : +e)),
      !this._next &&
        B !== this &&
        (B ? (B._next = this) : (it = this), (B = this)),
      (this._call = t),
      (this._time = n),
      wt());
  },
  stop: function () {
    this._call && ((this._call = null), (this._time = 1 / 0), wt());
  },
};
function _e(t, e, n) {
  var r = new st();
  return (r.restart(t, e, n), r);
}
function Tr() {
  (At(), ++O);
  for (var t = it, e; t; )
    ((e = S - t._time) >= 0 && t._call.call(void 0, e), (t = t._next));
  --O;
}
function Xt() {
  ((S = (ot = z.now()) + ct), (O = P = 0));
  try {
    Tr();
  } finally {
    ((O = 0), Mr(), (S = 0));
  }
}
function Er() {
  var t = z.now(),
    e = t - ot;
  e > de && ((ct -= e), (ot = t));
}
function Mr() {
  for (var t, e = it, n, r = 1 / 0; e; )
    e._call
      ? (r > e._time && (r = e._time), (t = e), (e = e._next))
      : ((n = e._next), (e._next = null), (e = t ? (t._next = n) : (it = n)));
  ((B = t), wt(r));
}
function wt(t) {
  if (!O) {
    P && (P = clearTimeout(P));
    var e = t - S;
    e > 24
      ? (t < 1 / 0 && (P = setTimeout(Xt, t - z.now() - ct)),
        D && (D = clearInterval(D)))
      : (D || ((ot = z.now()), (D = setInterval(Er, de))), (O = 1), ge(Xt));
  }
}
function Qt(t, e, n) {
  var r = new st();
  return (
    (e = e == null ? 0 : +e),
    r.restart(
      (i) => {
        (r.stop(), t(i + e));
      },
      e,
      n
    ),
    r
  );
}
var Rr = Gt('start', 'end', 'cancel', 'interrupt'),
  Cr = [],
  ye = 0,
  zt = 1,
  vt = 2,
  J = 3,
  Ut = 4,
  xt = 5,
  j = 6;
function ut(t, e, n, r, i, o) {
  var s = t.__transition;
  if (!s) t.__transition = {};
  else if (n in s) return;
  Sr(t, n, {
    name: e,
    index: r,
    group: i,
    on: Rr,
    tween: Cr,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: ye,
  });
}
function Nt(t, e) {
  var n = b(t, e);
  if (n.state > ye) throw new Error('too late; already scheduled');
  return n;
}
function N(t, e) {
  var n = b(t, e);
  if (n.state > J) throw new Error('too late; already running');
  return n;
}
function b(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error('transition not found');
  return n;
}
function Sr(t, e, n) {
  var r = t.__transition,
    i;
  ((r[e] = n), (n.timer = _e(o, 0, n.time)));
  function o(c) {
    ((n.state = zt),
      n.timer.restart(s, n.delay, n.time),
      n.delay <= c && s(c - n.delay));
  }
  function s(c) {
    var u, f, h, p;
    if (n.state !== zt) return l();
    for (u in r)
      if (((p = r[u]), p.name === n.name)) {
        if (p.state === J) return Qt(s);
        p.state === Ut
          ? ((p.state = j),
            p.timer.stop(),
            p.on.call('interrupt', t, t.__data__, p.index, p.group),
            delete r[u])
          : +u < e &&
            ((p.state = j),
            p.timer.stop(),
            p.on.call('cancel', t, t.__data__, p.index, p.group),
            delete r[u]);
      }
    if (
      (Qt(function () {
        n.state === J &&
          ((n.state = Ut), n.timer.restart(a, n.delay, n.time), a(c));
      }),
      (n.state = vt),
      n.on.call('start', t, t.__data__, n.index, n.group),
      n.state === vt)
    ) {
      for (
        n.state = J, i = new Array((h = n.tween.length)), u = 0, f = -1;
        u < h;
        ++u
      )
        (p = n.tween[u].value.call(t, t.__data__, n.index, n.group)) &&
          (i[++f] = p);
      i.length = f + 1;
    }
  }
  function a(c) {
    for (
      var u =
          c < n.duration
            ? n.ease.call(null, c / n.duration)
            : (n.timer.restart(l), (n.state = xt), 1),
        f = -1,
        h = i.length;
      ++f < h;

    )
      i[f].call(t, u);
    n.state === xt && (n.on.call('end', t, t.__data__, n.index, n.group), l());
  }
  function l() {
    ((n.state = j), n.timer.stop(), delete r[e]);
    for (var c in r) return;
    delete t.__transition;
  }
}
function Lr(t, e) {
  var n = t.__transition,
    r,
    i,
    o = !0,
    s;
  if (n) {
    e = e == null ? null : e + '';
    for (s in n) {
      if ((r = n[s]).name !== e) {
        o = !1;
        continue;
      }
      ((i = r.state > vt && r.state < xt),
        (r.state = j),
        r.timer.stop(),
        r.on.call(i ? 'interrupt' : 'cancel', t, t.__data__, r.index, r.group),
        delete n[s]);
    }
    o && delete t.__transition;
  }
}
function Ir(t) {
  return this.each(function () {
    Lr(this, t);
  });
}
function Or(t, e) {
  var n, r;
  return function () {
    var i = N(this, t),
      o = i.tween;
    if (o !== n) {
      r = n = o;
      for (var s = 0, a = r.length; s < a; ++s)
        if (r[s].name === e) {
          ((r = r.slice()), r.splice(s, 1));
          break;
        }
    }
    i.tween = r;
  };
}
function Fr(t, e, n) {
  var r, i;
  if (typeof n != 'function') throw new Error();
  return function () {
    var o = N(this, t),
      s = o.tween;
    if (s !== r) {
      i = (r = s).slice();
      for (var a = { name: e, value: n }, l = 0, c = i.length; l < c; ++l)
        if (i[l].name === e) {
          i[l] = a;
          break;
        }
      l === c && i.push(a);
    }
    o.tween = i;
  };
}
function Dr(t, e) {
  var n = this._id;
  if (((t += ''), arguments.length < 2)) {
    for (var r = b(this.node(), n).tween, i = 0, o = r.length, s; i < o; ++i)
      if ((s = r[i]).name === t) return s.value;
    return null;
  }
  return this.each((e == null ? Or : Fr)(n, t, e));
}
function kt(t, e, n) {
  var r = t._id;
  return (
    t.each(function () {
      var i = N(this, r);
      (i.value || (i.value = {}))[e] = n.apply(this, arguments);
    }),
    function (i) {
      return b(i, r).value[e];
    }
  );
}
function we(t, e) {
  var n;
  return (
    typeof e == 'number'
      ? E
      : e instanceof Q
        ? Ht
        : (n = Q(e))
          ? ((e = n), Ht)
          : mr
  )(t, e);
}
function Pr(t) {
  return function () {
    this.removeAttribute(t);
  };
}
function Br(t) {
  return function () {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Hr(t, e, n) {
  var r,
    i = n + '',
    o;
  return function () {
    var s = this.getAttribute(t);
    return s === i ? null : s === r ? o : (o = e((r = s), n));
  };
}
function qr(t, e, n) {
  var r,
    i = n + '',
    o;
  return function () {
    var s = this.getAttributeNS(t.space, t.local);
    return s === i ? null : s === r ? o : (o = e((r = s), n));
  };
}
function Xr(t, e, n) {
  var r, i, o;
  return function () {
    var s,
      a = n(this),
      l;
    return a == null
      ? void this.removeAttribute(t)
      : ((s = this.getAttribute(t)),
        (l = a + ''),
        s === l
          ? null
          : s === r && l === i
            ? o
            : ((i = l), (o = e((r = s), a))));
  };
}
function Qr(t, e, n) {
  var r, i, o;
  return function () {
    var s,
      a = n(this),
      l;
    return a == null
      ? void this.removeAttributeNS(t.space, t.local)
      : ((s = this.getAttributeNS(t.space, t.local)),
        (l = a + ''),
        s === l
          ? null
          : s === r && l === i
            ? o
            : ((i = l), (o = e((r = s), a))));
  };
}
function zr(t, e) {
  var n = lt(t),
    r = n === 'transform' ? Nr : we;
  return this.attrTween(
    t,
    typeof e == 'function'
      ? (n.local ? Qr : Xr)(n, r, kt(this, 'attr.' + t, e))
      : e == null
        ? (n.local ? Br : Pr)(n)
        : (n.local ? qr : Hr)(n, r, e)
  );
}
function Ur(t, e) {
  return function (n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Vr(t, e) {
  return function (n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Yr(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return (o !== r && (n = (r = o) && Vr(t, o)), n);
  }
  return ((i._value = e), i);
}
function Wr(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return (o !== r && (n = (r = o) && Ur(t, o)), n);
  }
  return ((i._value = e), i);
}
function Gr(t, e) {
  var n = 'attr.' + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != 'function') throw new Error();
  var r = lt(t);
  return this.tween(n, (r.local ? Yr : Wr)(r, e));
}
function Kr(t, e) {
  return function () {
    Nt(this, t).delay = +e.apply(this, arguments);
  };
}
function Zr(t, e) {
  return (
    (e = +e),
    function () {
      Nt(this, t).delay = e;
    }
  );
}
function Jr(t) {
  var e = this._id;
  return arguments.length
    ? this.each((typeof t == 'function' ? Kr : Zr)(e, t))
    : b(this.node(), e).delay;
}
function jr(t, e) {
  return function () {
    N(this, t).duration = +e.apply(this, arguments);
  };
}
function ti(t, e) {
  return (
    (e = +e),
    function () {
      N(this, t).duration = e;
    }
  );
}
function ei(t) {
  var e = this._id;
  return arguments.length
    ? this.each((typeof t == 'function' ? jr : ti)(e, t))
    : b(this.node(), e).duration;
}
function ni(t, e) {
  if (typeof e != 'function') throw new Error();
  return function () {
    N(this, t).ease = e;
  };
}
function ri(t) {
  var e = this._id;
  return arguments.length ? this.each(ni(e, t)) : b(this.node(), e).ease;
}
function ii(t, e) {
  return function () {
    var n = e.apply(this, arguments);
    if (typeof n != 'function') throw new Error();
    N(this, t).ease = n;
  };
}
function oi(t) {
  if (typeof t != 'function') throw new Error();
  return this.each(ii(this._id, t));
}
function si(t) {
  typeof t != 'function' && (t = Jt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], s = o.length, a = (r[i] = []), l, c = 0; c < s; ++c)
      (l = o[c]) && t.call(l, l.__data__, c, o) && a.push(l);
  return new T(r, this._parents, this._name, this._id);
}
function ai(t) {
  if (t._id !== this._id) throw new Error();
  for (
    var e = this._groups,
      n = t._groups,
      r = e.length,
      i = n.length,
      o = Math.min(r, i),
      s = new Array(r),
      a = 0;
    a < o;
    ++a
  )
    for (
      var l = e[a], c = n[a], u = l.length, f = (s[a] = new Array(u)), h, p = 0;
      p < u;
      ++p
    )
      (h = l[p] || c[p]) && (f[p] = h);
  for (; a < r; ++a) s[a] = e[a];
  return new T(s, this._parents, this._name, this._id);
}
function li(t) {
  return (t + '')
    .trim()
    .split(/^|\s+/)
    .every(function (e) {
      var n = e.indexOf('.');
      return (n >= 0 && (e = e.slice(0, n)), !e || e === 'start');
    });
}
function ci(t, e, n) {
  var r,
    i,
    o = li(e) ? Nt : N;
  return function () {
    var s = o(this, t),
      a = s.on;
    (a !== r && (i = (r = a).copy()).on(e, n), (s.on = i));
  };
}
function ui(t, e) {
  var n = this._id;
  return arguments.length < 2
    ? b(this.node(), n).on.on(t)
    : this.each(ci(n, t, e));
}
function fi(t) {
  return function () {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function hi() {
  return this.on('end.remove', fi(this._id));
}
function pi(t) {
  var e = this._name,
    n = this._id;
  typeof t != 'function' && (t = mt(t));
  for (var r = this._groups, i = r.length, o = new Array(i), s = 0; s < i; ++s)
    for (
      var a = r[s], l = a.length, c = (o[s] = new Array(l)), u, f, h = 0;
      h < l;
      ++h
    )
      (u = a[h]) &&
        (f = t.call(u, u.__data__, h, a)) &&
        ('__data__' in u && (f.__data__ = u.__data__),
        (c[h] = f),
        ut(c[h], e, n, h, c, b(u, n)));
  return new T(o, this._parents, e, n);
}
function di(t) {
  var e = this._name,
    n = this._id;
  typeof t != 'function' && (t = Zt(t));
  for (var r = this._groups, i = r.length, o = [], s = [], a = 0; a < i; ++a)
    for (var l = r[a], c = l.length, u, f = 0; f < c; ++f)
      if ((u = l[f])) {
        for (
          var h = t.call(u, u.__data__, f, l),
            p,
            _ = b(u, n),
            v = 0,
            M = h.length;
          v < M;
          ++v
        )
          (p = h[v]) && ut(p, e, n, v, h, _);
        (o.push(h), s.push(u));
      }
  return new T(o, s, e, n);
}
var gi = U.prototype.constructor;
function _i() {
  return new gi(this._groups, this._parents);
}
function yi(t, e) {
  var n, r, i;
  return function () {
    var o = I(this, t),
      s = (this.style.removeProperty(t), I(this, t));
    return o === s ? null : o === n && s === r ? i : (i = e((n = o), (r = s)));
  };
}
function ve(t) {
  return function () {
    this.style.removeProperty(t);
  };
}
function wi(t, e, n) {
  var r,
    i = n + '',
    o;
  return function () {
    var s = I(this, t);
    return s === i ? null : s === r ? o : (o = e((r = s), n));
  };
}
function vi(t, e, n) {
  var r, i, o;
  return function () {
    var s = I(this, t),
      a = n(this),
      l = a + '';
    return (
      a == null && (l = a = (this.style.removeProperty(t), I(this, t))),
      s === l ? null : s === r && l === i ? o : ((i = l), (o = e((r = s), a)))
    );
  };
}
function xi(t, e) {
  var n,
    r,
    i,
    o = 'style.' + e,
    s = 'end.' + o,
    a;
  return function () {
    var l = N(this, t),
      c = l.on,
      u = l.value[o] == null ? a || (a = ve(e)) : void 0;
    ((c !== n || i !== u) && (r = (n = c).copy()).on(s, (i = u)), (l.on = r));
  };
}
function mi(t, e, n) {
  var r = (t += '') == 'transform' ? Ar : we;
  return e == null
    ? this.styleTween(t, yi(t, r)).on('end.style.' + t, ve(t))
    : typeof e == 'function'
      ? this.styleTween(t, vi(t, r, kt(this, 'style.' + t, e))).each(
          xi(this._id, t)
        )
      : this.styleTween(t, wi(t, r, e), n).on('end.style.' + t, null);
}
function $i(t, e, n) {
  return function (r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function bi(t, e, n) {
  var r, i;
  function o() {
    var s = e.apply(this, arguments);
    return (s !== i && (r = (i = s) && $i(t, s, n)), r);
  }
  return ((o._value = e), o);
}
function Ai(t, e, n) {
  var r = 'style.' + (t += '');
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != 'function') throw new Error();
  return this.tween(r, bi(t, e, n ?? ''));
}
function Ni(t) {
  return function () {
    this.textContent = t;
  };
}
function ki(t) {
  return function () {
    var e = t(this);
    this.textContent = e ?? '';
  };
}
function Ti(t) {
  return this.tween(
    'text',
    typeof t == 'function'
      ? ki(kt(this, 'text', t))
      : Ni(t == null ? '' : t + '')
  );
}
function Ei(t) {
  return function (e) {
    this.textContent = t.call(this, e);
  };
}
function Mi(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return (i !== n && (e = (n = i) && Ei(i)), e);
  }
  return ((r._value = t), r);
}
function Ri(t) {
  var e = 'text';
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != 'function') throw new Error();
  return this.tween(e, Mi(t));
}
function Ci() {
  for (
    var t = this._name,
      e = this._id,
      n = xe(),
      r = this._groups,
      i = r.length,
      o = 0;
    o < i;
    ++o
  )
    for (var s = r[o], a = s.length, l, c = 0; c < a; ++c)
      if ((l = s[c])) {
        var u = b(l, e);
        ut(l, t, n, c, s, {
          time: u.time + u.delay + u.duration,
          delay: 0,
          duration: u.duration,
          ease: u.ease,
        });
      }
  return new T(r, this._parents, t, n);
}
function Si() {
  var t,
    e,
    n = this,
    r = n._id,
    i = n.size();
  return new Promise(function (o, s) {
    var a = { value: s },
      l = {
        value: function () {
          --i === 0 && o();
        },
      };
    (n.each(function () {
      var c = N(this, r),
        u = c.on;
      (u !== t &&
        ((e = (t = u).copy()),
        e._.cancel.push(a),
        e._.interrupt.push(a),
        e._.end.push(l)),
        (c.on = e));
    }),
      i === 0 && o());
  });
}
var Li = 0;
function T(t, e, n, r) {
  ((this._groups = t), (this._parents = e), (this._name = n), (this._id = r));
}
function xe() {
  return ++Li;
}
var k = U.prototype;
T.prototype = {
  constructor: T,
  select: pi,
  selectAll: di,
  selectChild: k.selectChild,
  selectChildren: k.selectChildren,
  filter: si,
  merge: ai,
  selection: _i,
  transition: Ci,
  call: k.call,
  nodes: k.nodes,
  node: k.node,
  size: k.size,
  empty: k.empty,
  each: k.each,
  on: ui,
  attr: zr,
  attrTween: Gr,
  style: mi,
  styleTween: Ai,
  text: Ti,
  textTween: Ri,
  remove: hi,
  tween: Dr,
  delay: Jr,
  duration: ei,
  ease: ri,
  easeVarying: oi,
  end: Si,
  [Symbol.iterator]: k[Symbol.iterator],
};
function Ii(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Oi = { time: null, delay: 0, duration: 250, ease: Ii };
function Fi(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode)) throw new Error(`transition ${e} not found`);
  return n;
}
function Di(t) {
  var e, n;
  t instanceof T
    ? ((e = t._id), (t = t._name))
    : ((e = xe()), ((n = Oi).time = At()), (t = t == null ? null : t + ''));
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var s = r[o], a = s.length, l, c = 0; c < a; ++c)
      (l = s[c]) && ut(l, t, e, c, s, n || Fi(l, e));
  return new T(r, this._parents, t, e);
}
U.prototype.interrupt = Ir;
U.prototype.transition = Di;
function H(t, e, n) {
  ((this.k = t), (this.x = e), (this.y = n));
}
H.prototype = {
  constructor: H,
  scale: function (t) {
    return t === 1 ? this : new H(this.k * t, this.x, this.y);
  },
  translate: function (t, e) {
    return (t === 0) & (e === 0)
      ? this
      : new H(this.k, this.x + this.k * t, this.y + this.k * e);
  },
  apply: function (t) {
    return [t[0] * this.k + this.x, t[1] * this.k + this.y];
  },
  applyX: function (t) {
    return t * this.k + this.x;
  },
  applyY: function (t) {
    return t * this.k + this.y;
  },
  invert: function (t) {
    return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k];
  },
  invertX: function (t) {
    return (t - this.x) / this.k;
  },
  invertY: function (t) {
    return (t - this.y) / this.k;
  },
  rescaleX: function (t) {
    return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t));
  },
  rescaleY: function (t) {
    return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t));
  },
  toString: function () {
    return 'translate(' + this.x + ',' + this.y + ') scale(' + this.k + ')';
  },
};
H.prototype;
var y = ((t) => (
    (t.Triangle = 'TRIANGLE'),
    (t.QuarterCircle = 'QUARTER_CIRCLE'),
    (t.SCurve = 'S_CURVE'),
    (t.Diagonal = 'DIAGONAL'),
    t
  ))(y || {}),
  g = ((t) => (
    (t.TopLeft = 'TOP_LEFT'),
    (t.TopRight = 'TOP_RIGHT'),
    (t.BottomRight = 'BOTTOM_RIGHT'),
    (t.BottomLeft = 'BOTTOM_LEFT'),
    t
  ))(g || {}),
  w = ((t) => (
    (t.None = 'NONE'),
    (t.Random = 'RANDOM'),
    (t.QuadRotation = 'QUAD_ROTATION'),
    (t.Wave = 'WAVE'),
    (t.QuadReflection = 'QUAD_REFLECTION'),
    t
  ))(w || {});
const Pi = {
    tileSize: 40,
    tileType: y.Triangle,
    layoutAlgorithm: w.None,
    colors: { fill: '#333333', stroke: '#333333', background: '#ffffff' },
  },
  d = Pi;
function Vt(t, e) {
  const n = typeof e == 'function' ? e(d[t]) : e;
  d[t] = n;
}
const Yt = [
    {
      class: 'tile-type-selector',
      key: 'tileType',
      type: 'radio',
      options: [
        {
          label: 'Triangle',
          value: y.Triangle,
          checked: d.tileType === y.Triangle,
        },
        {
          label: 'Quadratic Circles',
          value: y.QuarterCircle,
          checked: d.tileType === y.QuarterCircle,
        },
        { label: 'S-Curve', value: y.SCurve, checked: d.tileType === y.SCurve },
        {
          label: 'Diagonal',
          value: y.Diagonal,
          checked: d.tileType === y.Diagonal,
        },
      ],
    },
    {
      class: 'layout-algorythm-selector',
      key: 'layoutAlgorithm',
      type: 'radio',
      options: [
        { label: 'None', value: w.None, checked: d.layoutAlgorithm === w.None },
        {
          label: 'Random',
          value: w.Random,
          checked: d.layoutAlgorithm === w.Random,
        },
        {
          label: 'Quad-rotation',
          value: w.QuadRotation,
          checked: d.layoutAlgorithm === w.QuadRotation,
        },
        { label: 'Wave', value: w.Wave, checked: d.layoutAlgorithm === w.Wave },
        {
          label: 'Quad-reflection',
          value: w.QuadReflection,
          checked: d.layoutAlgorithm === w.QuadReflection,
        },
      ],
    },
    {
      class: 'tile-size-selector',
      key: 'tileSize',
      type: 'radio',
      options: [
        { label: 'Small', value: 20, checked: d.tileSize === 20 },
        { label: 'Medium', value: 40, checked: d.tileSize === 40 },
        { label: 'Big', value: 80, checked: d.tileSize === 80 },
      ],
    },
    {
      class: 'colors-selector',
      type: 'color',
      key: 'colors',
      options: [
        { label: 'Fill', name: 'fill', value: d.colors.fill },
        { label: 'Stroke', name: 'stroke', value: d.colors.stroke },
        { label: 'Background', name: 'background', value: d.colors.background },
      ],
    },
  ],
  Bi = et('.main-header');
function Hi() {
  const t = Bi.selectAll('fieldset')
    .data(Yt)
    .join('fieldset')
    .attr('class', (n) => n.class)
    .style('display', 'flex')
    .style('align-items', 'center')
    .style('gap', '12px');
  (t
    .filter((n, r) => r < Yt.length - 1)
    .each((n, r, i) => {
      i[r].after('|');
    }),
    t
      .selectAll('label')
      .data((n) => n.options.map((r) => ({ ...r, parent: n })))
      .join('label')
      .style('cursor', 'pointer')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('gap', '4px')
      .each((n, r, i) => {
        const o = et(i[r]),
          { parent: s } = n;
        (o
          .append('input')
          .attr('type', s.type)
          .attr('name', s.key)
          .attr('value', n.value)
          .property('checked', n.checked)
          .on('change', (a) => qi(s.key, n, a.target.value)),
          o.append('span').text(n.label));
      }));
}
function qi(t, e, n) {
  (t === 'colors' ? Vt(t, (r) => ({ ...r, [e.name]: n })) : Vt(t, e.value),
    Tt());
}
function Xi(t, e) {
  const { tileSize: n } = d,
    r = Math.floor(t / n),
    i = Math.floor(e / n),
    o = t / r,
    s = e / i;
  return Array.from({ length: i * r }, (a, l) => {
    const c = l % r,
      u = Math.floor(l / r);
    return { w: o, h: s, x: c * o, y: u * s, orientation: g.TopLeft };
  });
}
function Qi(t, e, n) {
  const { layoutAlgorithm: r } = d,
    i = e / 2,
    o = n / 2,
    s = Object.values(g);
  if (
    (r === w.Random &&
      t.forEach((a) => {
        a.orientation = s[Math.floor(Math.random() * s.length)];
      }),
    r === w.QuadRotation &&
      t.forEach((a) => {
        const l = a.x + a.w / 2 - i,
          c = a.y + a.h / 2 - o,
          u = Math.atan2(c, l);
        u < -Math.PI / 2
          ? (a.orientation = g.BottomLeft)
          : u < 0
            ? (a.orientation = g.TopLeft)
            : u < Math.PI / 2
              ? (a.orientation = g.TopRight)
              : (a.orientation = g.BottomRight);
      }),
    r === w.Wave)
  ) {
    const a = (2 * Math.PI) / (Math.min(e, n) / 2);
    t.forEach((l) => {
      const c = Math.sin(l.x * a) + Math.cos(l.y * a),
        u = Math.floor(((c + 2) / 4) * s.length) % s.length;
      l.orientation = s[u];
    });
  }
  r === w.QuadReflection &&
    t.forEach((a) => {
      const l = a.x + a.w / 2 - i,
        c = a.y + a.h / 2 - o,
        u = Math.atan2(c, l),
        f = Object.values(g),
        h = Math.floor(((u + Math.PI) / (2 * Math.PI)) * 4) % f.length;
      a.orientation = f[h];
    });
}
function Wt(t, e) {
  if (t === y.QuarterCircle) return Ui(e);
  if (t === y.Triangle) return zi(e);
  if (t === y.SCurve) return Vi(e);
  if (t === y.Diagonal) return Yi(e);
  throw new Error(`Unsupported tile type: ${t}`);
}
function zi(t) {
  const { w: e, h: n, orientation: r } = t;
  switch (r) {
    case g.TopLeft:
      return `M0,${n} L${e},0 L0,0 Z`;
    case g.TopRight:
      return `M0,0 L${e},${n} L0,${n} Z`;
    case g.BottomLeft:
      return `M0,0 L${e},${n} L${e},0 Z`;
    case g.BottomRight:
      return `M${e},${n} L${e},0 L0,${n} Z`;
    default:
      throw new Error(`Unsupported orientation: ${r}`);
  }
}
function Ui(t) {
  const { w: e, h: n, orientation: r } = t,
    i = Math.min(e, n) / 2;
  switch (r) {
    case g.TopLeft:
      return `
            M${i},0 A${i},${i} 0 0,1 ${e},${i}
            M0,${i} A${i},${i} 0 0,1 ${i},${n}
        `;
    case g.TopRight:
      return `
            M${e - i},0 A${i},${i} 0 0,0 0,${i}
            M${e},${i} A${i},${i} 0 0,0 ${e - i},${n}
        `;
    case g.BottomLeft:
      return `
            M0,${n - i} A${i},${i} 0 0,0 ${i},0
            M${i},${n} A${i},${i} 0 0,0 ${e},${n - i}
        `;
    case g.BottomRight:
      return `
        M0,${n - i} A${i},${i} 0 0,1 ${i},${n}
        M${i},0 A${i},${i} 0 0,1 ${e},${n - i}
      `;
    default:
      throw new Error(`Unsupported orientation: ${r}`);
  }
}
function Vi(t) {
  const { w: e, h: n, orientation: r } = t;
  switch (r) {
    case g.TopLeft:
      return `M0,0 C0,${n / 2} ${e / 2},${n} ${e},${n}`;
    case g.TopRight:
      return `M${e},0 C${e},${n / 2} ${e / 2},${n} 0,${n}`;
    case g.BottomLeft:
      return `M0,${n} C0,${n / 2} ${e / 2},0 ${e},0`;
    case g.BottomRight:
      return `M${e},${n} C${e},${n / 2} ${e / 2},0 0,0`;
    default:
      throw new Error(`Unsupported orientation: ${r}`);
  }
}
function Yi(t) {
  const { w: e, h: n, orientation: r } = t;
  switch (r) {
    case g.TopLeft:
      return `M0,0 L${e},${n}`;
    case g.TopRight:
      return `M${e},0 L0,${n}`;
    case g.BottomLeft:
      return `M0,${n} L${e},0`;
    case g.BottomRight:
      return `M${e},${n} L0,0`;
    default:
      throw new Error(`Unsupported orientation: ${r}`);
  }
}
function Wi(t) {
  switch (t) {
    case y.Triangle:
      return { fill: d.colors.fill, stroke: d.colors.stroke };
    case y.SCurve:
    case y.QuarterCircle:
      return {
        fill: d.colors.fill,
        stroke: d.colors.stroke,
        'stroke-width': '2',
        'vector-effect': 'non-scaling-stroke',
      };
    case y.Diagonal:
      return {
        stroke: d.colors.stroke,
        'stroke-width': '1',
        fill: 'transparent',
      };
    default:
      throw new Error(`Unsupported tile type: ${t}`);
  }
}
function Gi(t, e) {
  const { tileType: n } = d,
    r = Math.floor(t),
    i = Math.floor(e),
    o = Xi(r, i);
  Qi(o, r, i);
  const a = et('.chart-container')
    .selectAll('svg')
    .data([null])
    .join('svg')
    .attr('viewBox', `0 0 ${r} ${i}`)
    .attr('width', '100%')
    .attr('height', '100%')
    .style('display', 'block')
    .style('background-color', d.colors.background)
    .selectAll('g.tile')
    .data(o)
    .join('g')
    .attr('class', 'tile')
    .attr('transform', (c) => `translate(${c.x}, ${c.y})`);
  (a
    .append('rect')
    .attr('width', (c) => c.w)
    .attr('height', (c) => c.h)
    .attr('fill', 'transparent'),
    a
      .selectAll('path')
      .data((c) => [c])
      .join('path')
      .attr('d', (c) => Wt(n, c)),
    Object.entries(Wi(n)).forEach(([c, u]) => {
      a.selectAll('path').attr(c, u);
    }),
    a.on('click', function (c, u) {
      const f = Object.values(g),
        p = (f.indexOf(u.orientation) + 1) % f.length;
      ((u.orientation = f[p]), et(this).select('path').attr('d', Wt(n, u)));
    }));
}
function Ki(t, e) {
  let n = null;
  return (...r) => {
    (n && clearTimeout(n),
      (n = setTimeout(() => {
        (t(...r), (n = null));
      }, e)));
  };
}
const at = document.querySelector('.chart-container');
let pt = null;
const Zi = Ki(Tt, 25),
  Ji = new ResizeObserver((t) => {
    const [e] = t,
      { width: n, height: r } = e.contentRect;
    Zi(n, r);
  });
window.addEventListener('load', () => {
  const { width: t, height: e } = at.getBoundingClientRect();
  (Tt(t, e), Hi());
});
Ji.observe(at);
function Tt(t = at.clientWidth, e = at.clientHeight) {
  (pt && cancelAnimationFrame(pt),
    (pt = requestAnimationFrame(() => Gi(t, e))));
}
