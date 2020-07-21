import React, { Component } from 'react';
import { node } from 'prop-types';

import WSContext from 'sly/web/services/ws/WSContext';
import Pubsub from 'sly/web/services/ws/Pubsub';
import { apiUrl } from 'sly/web/config';
import withUser from 'sly/web/services/api/withUser';
import userPropType from 'sly/common/propTypes/user';

let _instantiated_ = false;

@withUser

export default class WSProvider extends Component {
  static propTypes = {
    user: userPropType,
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

  setup(enableGuestConnections) {
    // we import user just to be able to bail when we are not logged in
    if (!enableGuestConnections && !this.props.user) return;

    const wsUrl = apiUrl.replace(/^http/, 'ws');
    const wsUri = `${wsUrl}/platform/notifications`;
    const ws = new WebSocket(wsUri);

    ws.addEventListener('open', () => {
      // eslint-disable-next-line no-console
      console.debug(`Websocket connected to ${wsUri}`);
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

  componentDidUpdate = (prevProps) => {
    if (prevProps.user && !this.props.user) {
      // user logged out
      this.doDestroyWSConnection();
    }
    if (!prevProps.user && this.props.user) {
      // user logged in
      this.setup();
    }
  };

  componentWillUnmount = () => {
    this.doDestroyWSConnection();
  };

  doDestroyWSConnection = () => {
    clearTimeout(this.timeoutID);
    if (this.ws) {
      this.ws.removeEventListener('close', this.onWSClose);
      this.ws.close(1000, 'bye');
      this.ws = null;
    }
    _instantiated_ = false;
  };

  onWSClose = () => {
    // repeat connection
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
      <WSContext.Provider value={this}>
        {children}
      </WSContext.Provider>
    );
  }
}
