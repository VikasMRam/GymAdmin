import { PureComponent } from 'react';
import { string, func, shape, arrayOf, oneOf } from 'prop-types';
import uniqueId from 'lodash/uniqueId';

import { TIMEOUT } from 'sly/constants/notifications';
import { connectController } from 'sly/controllers';

const emptyArray = [];

const mapStateToProps = (state, { controller = {} }) => ({
  messages: controller.messages || emptyArray,
});

@connectController(mapStateToProps)

export default class NotificationController extends PureComponent {
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
    const id = uniqueId('notificationMessage_');
    const messageObj = {
      id,
      content: message,
      type,
    };

    set({
      messages: [messageObj, ...messages],
    });
    this.timeoutRef = setTimeout(() => this.handleDismiss(id), TIMEOUT);
  };

  notifyInfo = (message) => {
    this.addNotification(message);
  };

  notifyError = (message) => {
    this.addNotification(message, 'error');
  };

  handleDismiss = (id) => {
    const { set, messages } = this.props;

    const index = messages.findIndex(m => m.id === id);
    if (index !== -1) {
      set({
        messages: [...messages.slice(0, index), ...messages.slice(index + 1)],
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
