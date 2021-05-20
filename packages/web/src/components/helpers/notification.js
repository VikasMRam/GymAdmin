import React, { useState, useCallback, useContext, Component } from 'react';
import uniqueId from 'lodash/uniqueId';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { node } from 'prop-types';

import { TIMEOUT } from 'sly/web/constants/notifications';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';
}

const NotificationContext = React.createContext({
  messages: [],
  notifyError: () => {},
  notifyInfo: () => {},
  dismiss: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const dismiss = useCallback(
    id => setMessages(prevMessages => prevMessages.filter(item => item.id !== id)), [],
  );
  const addNotification = useCallback((message, type = 'default') => {
    const id = uniqueId('notificationMessage_');
    setMessages(prevMessages => [...prevMessages, { content: message, type, id }]);

    setTimeout(() => dismiss(id), TIMEOUT);
  }, []);
  const notifyInfo = useCallback(message => addNotification(message), []);
  const notifyError = useCallback(message => addNotification(message, 'error'), []);

  return (
    <NotificationContext.Provider
      value={{ messages, notifyError, notifyInfo, dismiss }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: node,
};

export const useNotification = () => {
  return  useContext(NotificationContext);
};

export default function withNotification(ChildComponent) {
  class WithNotification extends Component {
    static displayName = `withNotification(${getDisplayName(ChildComponent)})`;
    static WrappedComponent = ChildComponent;

    render = () => (
      <NotificationContext.Consumer>
        {notification => <ChildComponent {...{ ...notification, ...this.props }} />}
      </NotificationContext.Consumer>
    );
  }

  hoistNonReactStatic(WithNotification, ChildComponent);

  return WithNotification;
}
