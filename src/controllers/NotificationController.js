import { Component } from 'react';
import { string, func, shape, arrayOf, oneOf } from 'prop-types';

import { TIMEOUT } from 'sly/constants/notifications';
import { connectController } from 'sly/controllers';

class NotificationController extends Component {
  static propTypes = {
    messages: arrayOf(shape({
      content: string,
      type: oneOf(['default', 'error']),
    })),
    set: func,
    children: func,
  };

  componentWillUnmount() {
    const { timeoutRef } = this;

    if (timeoutRef) {
      clearInterval(timeoutRef);
    }
  }

  addNotification = (message, type = 'default') => {
    const { handleDismiss } = this;
    const { set, messages } = this.props;
    const messageObj = {
      content: message,
      type,
    };

    messages.unshift(messageObj);

    set({
      messages,
    });
    this.timeoutRef = setTimeout(() => handleDismiss(message), TIMEOUT);
  };

  notifyInfo = (message) => {
    this.addNotification(message);
  };

  notifyError = (message) => {
    this.addNotification(message, 'error');
  };

  handleDismiss = (message) => {
    const { set, messages } = this.props;
    const messageObjIndex = messages.findIndex(m => m.content === message);

    if (messageObjIndex !== -1) {
      messages.splice(messageObjIndex, 1);
      set({
        messages,
      });
    }
  };

  render() {
    const { children, messages } = this.props;
    const { notifyInfo, notifyError, handleDismiss } = this;

    return children({
      messages, dismiss: handleDismiss, notifyInfo, notifyError,
    });
  }
}

const mapStateToProps = (state, { controller = {} }) => ({
  messages: controller.messages || [],
});

export default connectController(mapStateToProps)(NotificationController);
