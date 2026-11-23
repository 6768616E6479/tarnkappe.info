// ==UserScript==
// @name         tarnkappe.info Filter (Tampermonkey)
// @match        https://tarnkappe.info/*
// @run-at       document-start
// @inject-into  page
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // --- Kosmetische Regeln (CSS) ---
  const css = `
    .around-aiCheXu1.around-desktop-ad,
    .sidebar-sticky.column,
    .card.banner-post,
    div[id^="google_vignette"],
    .columns.is-multiline > .column:has(> article.category-werbung),
    .column.is-full:has(.tarnads_general) { display: none !important; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);   // <-- hier, mit Fallback

  // --- +js(aopr, googletag): googletag unbeschreibbar machen ---
  try {
    Object.defineProperty(window, 'googletag', {
      get: () => undefined, set: () => {}
    });
  } catch (e) {}

  // --- +js(nostif): setTimeout mit getComputedStyle unterdrücken ---
  const origST = window.setTimeout;
  window.setTimeout = function(fn, ...rest) {
    if (typeof fn === 'string' && fn.includes('getComputedStyle')) return 0;
    return origST.call(this, fn, ...rest);
  };

  // --- +js(prevent-innerHTML, div, Werbeblocker) ---
  // Vereinfachte Nachbildung: innerHTML-Sets mit "Werbeblocker" verwerfen
  const proto = Element.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, 'innerHTML').set;
  Object.defineProperty(proto, 'innerHTML', {
    set(val) {
      if (val && String(val).includes('Werbeblocker')) return;
      setter.call(this, val);
    },
    get: Object.getOwnPropertyDescriptor(proto, 'innerHTML').get,
    configurable: true
  });
})();