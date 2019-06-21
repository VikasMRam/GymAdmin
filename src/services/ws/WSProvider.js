import React, { Component } from 'react';
import { string, node } from 'prop-types';

import WSContext from 'sly/services/ws/WsContext';
import Pubsub from 'sly/services/ws/pubsub';
import { domain } from 'sly/config';

const NOTIFICATIONS_URI = `ws://${domain}/v0/platform/notifications`;

const pubsub = new Pubsub();

export default class WSProvider extends Component {
  static propTypes = {
    children: node.isRequired,
    wsUrl: string.isRequired,
  };

  state = {
    ws: null,
    pubsub: null,
  };

  componentDidMount = () => {
    const ws = new WebSocket(NOTIFICATIONS_URI);

    ws.addEventListener('open', () => {
      console.info(`ws connected to ${NOTIFICATIONS_URI}`);
    });

    ws.addEventListener('error', (error) => {
      throw error;
    });

    ws.addEventListener('message', (evt) => {
      // onmessage(evt.data);
      // let obj = JSON.parse(evt.data)
      console.log(evt);
      // console.log(obj)
    });
  };

  componentWillUnmont = () => {
    const { ws } = this.state;

  };

  render() {
    const { children } = this.props;
    return (
      <WSContext.Provider>
        {children}
      </WSContext.Provider>
    );
  }
}

