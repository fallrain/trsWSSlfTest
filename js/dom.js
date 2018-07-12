'use strict';
window.u = function (selector) {
  let dom = document.querySelectorAll(selector);
  dom.on = function (type, fn) {
    return dom.addEventListener(type, fn);
  };
  dom.off = function (type) {
    if (type === undefined) {
      return dom.removeAllListeners();
    } else {
      return dom.removeEventListener(type);
    }

  };
  return dom;
};