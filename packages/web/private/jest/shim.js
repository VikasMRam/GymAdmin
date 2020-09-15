global.fetch = require('isomorphic-fetch');

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

// https://github.com/jsdom/jsdom/issues/1843#issuecomment-357556277
/* eslint-disable-next-line no-console */
global.alert = (msg) => { console.log(msg); };
global.scroll = jest.fn();

if (global.window) {
  global.HTMLElement.prototype.scrollIntoView = jest.fn();
  global.HTMLElement.prototype.scroll = jest.fn();
}
