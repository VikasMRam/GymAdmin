import React, { Component } from 'react';
import { node, shape, func } from 'prop-types';
import styled from 'styled-components';

import { assetPath } from 'sly/components/themes';
import { Link } from 'sly/components/atoms';
import WSContext from 'sly/services/ws/WSContext';
import NotificationController from 'sly/controllers/NotificationController';
import withUser from 'sly/services/newApi/withUser';
import subscriptionList from 'sly/services/notifications/subscriptionList';

const StyledLink = styled(Link)`
  display: block;
  color: unset;
`;

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
    const { ws, user } = this.props;
    Object.keys(subscriptionList).forEach((key) => {
      // no capture showing a notification is indeed the last resort
      ws.on(key, this.onMessage);
    });
    this.requestPermission();
  }

  componentDidUpdate(prevProps) {
    this.requestPermission(prevProps);
  }

  componentWillUnmount() {
    const { ws } = this.props;
    Object.keys(subscriptionList).forEach((key) => {
      ws.off(key, this.onMessage);
    });
  }

  onMessage = (message) => {
    const makeLink = subscriptionList[message.type];
    const to = makeLink({
      message,
      ...this.props,
    });

    this.sendNotification({
      to,
      message: message.payload.notificationMessage,
    });
  };

  requestPermission = (prevProps = {}, eager = false) => new Promise((resolve) => {
    if (Notification.permission === 'granted') {
      resolve('granted');
    }

    const { user } = this.props;
    // on first render if logged or just after logging we check against not granted
    // on send notification we check against not denied
    const checkPermission = eager
      ? 'denied'
      : 'granted';

    const winNot = window.Notification
      && Notification.permission !== checkPermission;

    if (user && !prevProps.user && winNot) {
      Notification.requestPermission((permission) => {
        if (Notification.permission !== permission) {
          Notification.permission = permission;
        }
        resolve(permission);
      });
    } else {
      resolve('denied');
    }
  });

  sendNotification = ({ to, message }) => {
    const { notifyInfo } = this.props;
    this.requestPermission(this.props, true)
      .then((permission) => {
        if (permission === 'granted') {
          const notification = new Notification('Seniorly', {
            icon: assetPath('logomark-4x.png'),
            badge: assetPath('logomark-2x.png'),
            body: message,
          });
          setTimeout(() => {
            notification.close();
          }, 30000);
        } else {
          notifyInfo((
            <StyledLink to={to}>
              {message}
            </StyledLink>
          ));
        }
      })
      .catch(console.error);
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

Subscriptions.WrappedComponent = Notifications.WrappedComponent;
