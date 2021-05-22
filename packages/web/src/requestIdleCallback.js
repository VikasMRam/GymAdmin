/* eslint-disable */
export const requestIdleCallback =
  (typeof self !== 'undefined' && self.requestIdleCallback) ||
  function (cb) {
    let start = Date.now()
    return setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start))
        },
      })
    }, 1)
  }

export const cancelIdleCallback =
  (typeof self !== 'undefined' && self.cancelIdleCallback) ||
  function (id) {
    return clearTimeout(id)
  }
