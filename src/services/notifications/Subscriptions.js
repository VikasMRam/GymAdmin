import React, { Component } from 'react';
import { node, shape, func } from 'prop-types';
import styled from 'styled-components';

import { assetPath } from 'sly/components/themes';
import userPropType from 'sly/propTypes/user';
import { PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';
import { userIs } from 'sly/services/helpers/role';
import { Link } from 'sly/components/atoms';
import WSContext from 'sly/services/ws/WSContext';
import NotificationController from 'sly/controllers/NotificationController';
import withUser from 'sly/services/api/withUser';
import subscriptionList from 'sly/services/notifications/subscriptionList';

const StyledLink = styled(Link)`
  display: block;
  color: unset;
`;

@withUser

class Notifications extends Component {
  static propTypes = {
    ws: shape({
      pubsub: shape({
        on: func.isRequired,
        off: func.isRequired,
      }),
    }).isRequired,
    notifyInfo: func.isRequired,
    children: node.isRequired,
    user: userPropType,
  };

  componentDidMount() {
    const { ws } = this.props;
    Object.keys(subscriptionList).forEach((key) => {
      // no capture showing a notification is indeed the last resort
      ws.pubsub.on(key, this.onMessage);
    });
    this.requestPermission();
  }

  componentDidUpdate(prevProps) {
    this.requestPermission(prevProps);
  }

  componentWillUnmount() {
    const { ws } = this.props;
    Object.keys(subscriptionList).forEach((key) => {
      ws.pubsub.off(key, this.onMessage);
    });
  }

  onMessage = (message) => {
    const { user } = this.props;
    if (userIs(user, PLATFORM_ADMIN_ROLE)) {
      return null;
    }
    const makeLink = subscriptionList[message.type];
    const to = makeLink({
      message,
      ...this.props,
    });

    return this.sendNotification({
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

    const notPermitted = window.Notification
      && Notification.permission !== checkPermission;

    if (user && !prevProps.user && notPermitted) {
      Notification.requestPermission((permission) => {
        if (Notification.permission !== permission) {
          try {
            Notification.permission = permission;
            // eslint-disable-next-line
          } catch (e) {}
        }
        resolve(permission);
      });
    } else {
      resolve('default');
    }
  });

  sendNotification = ({ to, message }) => {
    const { notifyInfo } = this.props;
    return this.requestPermission(this.props, true)
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
