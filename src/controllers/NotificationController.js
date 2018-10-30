import { Component } from 'react';
import { string, func, shape, arrayOf, oneOf } from 'prop-types';

import { connectController } from 'sly/controllers';

// TODO: add timeout support
class NotificationController extends Component {
  static propTypes = {
    messages: arrayOf(shape({
      content: string,
      type: oneOf(['default', 'error']),
    })),
    set: func,
    children: func,
  };

  addNotification = (message, type = 'default') => {
    const { set, messages } = this.props;
    const messageObj = {
      content: message,
      type,
    };

    messages.unshift(messageObj);

    set({
      messages,
    });
  }

  notifyInfo = (message) => {
    this.addNotification(message);
  }

  notifyError = (message) => {
    this.addNotification(message, 'error');
  }

  handleDismiss = (message) => {
    const { set, messages } = this.props;
    const messageObjIndex = messages.findIndex(m => m.content === message);

    if (messageObjIndex !== -1) {
      messages.splice(messageObjIndex, 1);
      set({
        messages,
      });
    }
  }

  render() {
    const { children, messages } = this.props;
    const { notifyInfo, notifyError } = this;

    return children({
      messages, dismiss: this.handleDismiss, notifyInfo, notifyError,
    });
  }
}

const mapStateToProps = (state, { controller = {} }) => ({
  messages: controller.messages || [],
});

export default connectController(mapStateToProps)(NotificationController);
