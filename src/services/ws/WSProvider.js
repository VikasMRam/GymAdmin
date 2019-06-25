import React, { Component } from 'react';
import { string, node } from 'prop-types';

import WSContext from 'sly/services/ws/WSContext';
import Pubsub from 'sly/services/ws/pubsub';
import { domain } from 'sly/config';

const NOTIFICATIONS_URI = `ws://${domain}/v0/platform/notifications`;

let _instantiated_ = false;

export default class WSProvider extends Component {
  static propTypes = {
    children: node.isRequired,
  };

  pubsub = null;
  ws = null;
  timeoutID = null;
  reconnectionAttempts = 0;

  constructor(props) {
    super(props);

    this.pubsub = new Pubsub();
  }

  setup() {
    const ws = new WebSocket(NOTIFICATIONS_URI);

    ws.addEventListener('open', () => {
      // eslint-disable-next-line no-console
      console.debug(`Websocket connected to ${NOTIFICATIONS_URI}`);
      this.reconnectionAttempts = 0;
    });

    ws.addEventListener('error', (error) => {
      throw error;
    });

    ws.addEventListener('message', (evt) => {
      let message;
      try {
        message = JSON.parse(evt.data);
      } catch(e) {
        throw new Error('can\'t parse JSON');
      }
      if (!message.type) {
        throw new Error('Socket message with no type');
      }
      this.pubsub.emit(message.type, message);
    });

    ws.addEventListener('close', this.onWSClose);

    _instantiated_ = true;

    this.ws = ws;
  }

  onWSClose = () => {
    // eslint-disable-next-line no-console
    const time = this.generateInterval(this.reconnectionAttempts);
    console.debug(`Websocket disconnected, reconnecting in ${time}ms`);
    this.timeoutID = setTimeout(() => {
      this.reconnectionAttempts += 1;
      this.setup();
    }, time);
  };

  generateInterval = (k) => {
    return Math.min(30, ((k ** 2) - 1)) * 1000;
  };

  componentDidMount = () => {
    if (_instantiated_) {
      throw new Error('Websocket already instantiated');
    }

    this.setup();
  };

  componentWillUnmount = () => {
    clearTimeout(this.timeoutID);
    this.ws.removeEventListener('close', this.onWSClose);
    this.ws.close(1000, 'bye');
    this.ws = null;
  };

  render() {
    const { children } = this.props;
    return (
      <WSContext.Provider value={this.pubsub}>
        {children}
      </WSContext.Provider>
    );
  }
}

