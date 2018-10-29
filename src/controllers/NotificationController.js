import { Component } from 'react';
import { string, func, shape, oneOf } from 'prop-types';

import { connectController } from 'sly/controllers';

// TODO: add timeout support
class NotificationController extends Component {
  static propTypes = {
    message: shape({
      content: string,
      type: oneOf(['default', 'error']),
    }),
    set: func,
    unset: func,
    children: func,
  };

  addNotification = (message, type = 'default') => {
    const { set } = this.props;
    const messageObj = {
      content: message,
      type,
    };

    set({
      message: messageObj,
    });
  }

  notifyInfo = (message) => {
    this.addNotification(message);
  }

  notifyError = (message) => {
    this.addNotification(message, 'error');
  }

  handleClose = () => {
    const { unset } = this.props;

    unset('message');
  }

  render() {
    const { message, children } = this.props;
    const { notifyInfo, notifyError } = this;

    return children({
      message, dismiss: this.handleClose, notifyInfo, notifyError,
    });
  }
}

const mapStateToProps = (state, { controller = {} }) => ({
  message: controller.message || {},
});

export default connectController(mapStateToProps)(NotificationController);
