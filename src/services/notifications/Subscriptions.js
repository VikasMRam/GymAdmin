import React, { Component } from 'react';
import { node, shape, func } from 'prop-types';

import { Link } from 'sly/components/atoms';
import WSContext from 'sly/services/ws/WSContext';
import NotificationController from 'sly/controllers/NotificationController';
import withUser from 'sly/services/newApi/withUser';
import subscriptionList from 'sly/services/notifications/subscriptionList';

@withUser

class Notifications extends Component {
  static propTypes = {
    ws: shape({
      on: func.isRequired,
      off: func.isRequired,
    }).isRequired,
    notifyInfo: func.isRequired,
    children: node.isRequired,
  };

  componentDidMount() {
    const { ws } = this.props;
    Object.keys(subscriptionList).forEach((key) => {
      // no capture showing a notification is indeed the last resort
      ws.on(key, this.onMessage);
    });
  }

  componentWillUnmount() {
    const { ws } = this.props;
    Object.keys(subscriptionList).forEach((key) => {
      ws.off(key, this.onMessage);
    });
  }

  onMessage = (message) => {
    const { notifyInfo } = this.props;
    const makeLink = subscriptionList[message.type];
    const to = makeLink({
      message,
      ...this.props,
    });
    notifyInfo((
      <Link to={to}>
        {message.payload.notificationMessage}
      </Link>
    ));
  };

  render = () => this.props.children;
}

export default function Subscriptions({ children }) {
  return (
    <WSContext.Consumer>
      {ws => (
        <NotificationController>
          {({ notifyInfo }) => (
            <Notifications ws={ws} notifyInfo={notifyInfo}>
              {children}
            </Notifications>
          )}
        </NotificationController>
      )}
    </WSContext.Consumer>
  );
}

Subscriptions.propTypes = {
  children: node.isRequired,
};
