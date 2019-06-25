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
    wsUrl: string.isRequired,
  };

  pubsub = null;
  ws = null;
  timeoutID = null;
  reconnectionAttempts = 0;

  constructor(props) {
    super(props);

    console.log('constructor')
    this.pubsub = new Pubsub();
  }

  setup() {
    console.log('setting up')
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
      const message = JSON.parse(evt.data);
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
    console.debug('Websocket disconnected');

    const time = this.generateInterval(this.reconnectionAttempts);
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

