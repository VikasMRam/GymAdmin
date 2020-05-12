import { PureComponent } from 'react';
import { string, func, shape, arrayOf, oneOf } from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { connect } from 'react-redux';

import { TIMEOUT } from 'sly/web/constants/notifications';
import { add, remove } from 'sly/web/services/notifications/actions';

const mapStateToProps = state => ({
  messages: state.notifications.messages,
});

@connect(mapStateToProps, { add, remove })

export default class NotificationController extends PureComponent {
  static propTypes = {
    messages: arrayOf(shape({
      content: string,
      type: oneOf(['default', 'error']),
    })),
    add: func,
    remove: func,
    children: func,
  };

  addNotification = (message, type = 'default') => {
    const { add, remove } = this.props;
    const id = uniqueId('notificationMessage_');

    add({
      id,
      content: message,
      type,
    });

    setTimeout(() => remove(id), TIMEOUT);
  };

  notifyInfo = (message) => {
    this.addNotification(message);
  };

  notifyError = (message) => {
    this.addNotification(message, 'error');
  };

  render() {
    const { children, messages, remove } = this.props;
    const { notifyInfo, notifyError } = this;

    return children({
      messages, dismiss: remove, notifyInfo, notifyError,
    });
  }
}
