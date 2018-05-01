
global.requestAnimationFrame = /* istanbul ignore next */ (callback) => {
  setTimeout(callback, 0);
};

// https://github.com/jsdom/jsdom/issues/1843#issuecomment-357556277
global.alert = (msg) => { console.log(msg); };
global.scroll = jest.fn();
