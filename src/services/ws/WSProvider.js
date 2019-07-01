import React, { Component } from 'react';
import { node } from 'prop-types';

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

    // users are auto subscribed to notifications, we are interested in
    // notifications with messages, will throw an error otherwise, for
    // other purposes like notifying an user of a new review in a community
    // profile, we have to allow this class to subscribe to socket rooms via
    // the context passed down
    ws.addEventListener('message', (evt) => {
      // eslint-disable-next-line no-console
      console.debug('Websocket got message', evt.data);
      let message;
      try {
        message = JSON.parse(evt.data);
      } catch (e) {
        throw new Error('can\'t parse JSON');
      }
      if (!message.message || !message.message.type) {
        throw new Error('Socket message with no type');
      }
      this.pubsub.emit(message.message.type, message.message);
    });

    ws.addEventListener('close', this.onWSClose);

    _instantiated_ = true;

    this.ws = ws;
  }

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

  onWSClose = () => {
    const time = this.generateInterval(this.reconnectionAttempts);
    // eslint-disable-next-line no-console
    console.debug(`Websocket disconnected, reconnecting in ${time}ms`);
    this.timeoutID = setTimeout(() => {
      this.reconnectionAttempts += 1;
      this.setup();
    }, time);
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
