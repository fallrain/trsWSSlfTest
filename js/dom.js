

window.u = function (selector) {
  const dom = document.querySelectorAll(selector);
  dom.on = function (type, fn) {
    return dom.addEventListener(type, fn);
  };
  dom.off = function (type) {
    if (type === undefined) {
      return dom.removeAllListeners();
    }
    return dom.removeEventListener(type);
  };
  return dom;
};
