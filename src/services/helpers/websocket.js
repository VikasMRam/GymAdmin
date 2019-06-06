import { wsServerUrl } from 'sly/config';

export default class Websocket {
  static wInstance = null;
  reconnectionAttempts = 0;

  constructor() {
    this.wInstance = new WebSocket(wsServerUrl);
  }

  generateInterval = (k) => {
    return Math.min(30, ((k ** 2) - 1)) * 1000;
  }

  setupWebsocket = () => {
    this.wInstance.onopen = () => {
      // eslint-disable-next-line no-console
      console.debug('Websocket connected');
    };

    this.wInstance.onclose = () => {
      // eslint-disable-next-line no-console
      console.debug('Websocket disconnected');

      const time = this.generateInterval(this.reconnectionAttempts);
      this.timeoutID = setTimeout(() => {
        this.reconnectionAttempts += 1;
        this.setupWebsocket();
      }, time);
    };
  }

  addOnMessage = (onmessage) => {
    this.wInstance.onmessage = (evt) => {
      onmessage(evt.data);
    };
  }

  closeWebsocket = () => {
    clearTimeout(this.timeoutID);
    if (this.wInstance) {
      this.wInstance.close();
    }
  }
}
