import { Component } from 'react';
import { string, func, shape, arrayOf, oneOf } from 'prop-types';
import uniqueId from 'lodash/uniqueId';

import { TIMEOUT } from 'sly/constants/notifications';
import { connectController } from 'sly/controllers';

// FIXME: Copied from NotificationController, find a way to reuse
class BannerNotificationController extends Component {
  static propTypes = {
    messages: arrayOf(shape({
      content: string,
      type: oneOf(['default', 'error', 'green', 'warning']),
    })),
    set: func,
    get: func,
    children: func,
  };

  addNotification = (message, type = 'default') => {
    const { handleDismiss } = this;
    const { set, messages } = this.props;
    const id = uniqueId('bannerNotificationMessage_');
    const messageObj = {
      id,
      content: message,
      type,
    };

    set({
      messages: [messageObj, ...messages],
    });

    setTimeout(() => handleDismiss(id), TIMEOUT);
  };

  notifyInfo = (message) => {
    this.addNotification(message);
  };

  notifySuccess = (message) => {
    this.addNotification(message, 'green');
  };

  notifyWarning = (message) => {
    this.addNotification(message, 'warning');
  };

  notifyError = (message) => {
    this.addNotification(message, 'error');
  };

  handleDismiss = (id) => {
    const { set, get } = this.props;
    // necessary due to the asynchronous nature
    const { messages = [] } = get();
    const index = messages.findIndex(m => m.id === id);

    if (index !== -1) {
      set({
        messages: [...messages.slice(0, index), ...messages.slice(index + 1)],
      });
    }
  };

  render() {
    const { children, messages } = this.props;
    const {
      notifyInfo, notifyError, notifySuccess, handleDismiss,
    } = this;

    return children({
      messages, dismiss: handleDismiss, notifyInfo, notifyError, notifySuccess,
    });
  }
}

const mapStateToProps = (state, { controller = {} }) => ({
  messages: controller.messages || [],
});

export default connectController(mapStateToProps)(BannerNotificationController);
