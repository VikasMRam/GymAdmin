import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import NotificationController from 'sly/web/controllers/NotificationController';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withNotification(ChildComponent) {
  const WithNotification = props => (
    <NotificationController>
      {({ notifyInfo, notifyError }) => (
        <ChildComponent
          notifyInfo={notifyInfo}
          notifyError={notifyError}
          {...props}
        />
      )}
    </NotificationController>
  );

  WithNotification.displayName = `WithNotification(${getDisplayName(
    ChildComponent,
  )})`;
  WithNotification.WrappedComponent = ChildComponent;

  hoistNonReactStatic(WithNotification, ChildComponent);

  return WithNotification;
}
