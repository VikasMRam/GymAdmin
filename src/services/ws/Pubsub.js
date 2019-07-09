// tiny implementation of a pubsub event emitter, with capture function

export default function Pubsub() {
  const all = {};

  return {
    // if capture is passed, we put the listener at the top of the queue
    on(type, handler, { capture } = {}) {
      const typeEvts = all[type] || (all[type] = []);

      if (capture) {
        typeEvts.unshift(handler);
      } else {
        typeEvts.push(handler);
      }
    },

    off(type, handler) {
      if (!all[type]) return;

      const index = all[type].indexOf(handler);
      if (index !== -1) {
        all[type].splice(index, 1);
      }
    },

    emit(type, evt) {
      const handlers = all[type] || [];
      for (let i = 0; i < handlers.length; i++) {
        if (handlers[i](evt) === false) {
          break;
        }
      }
    },
  };
}

