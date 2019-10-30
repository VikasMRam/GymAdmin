import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import ModalController from 'sly/controllers/ModalController';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withModal(ChildComponent) {
  const WithModal = props => (
    <ModalController>
      {({ show, hide }) => (
        <ChildComponent showModal={show} hideModal={hide} {...props} />
      )}
    </ModalController>
  );

  WithModal.displayName = `WithModal(${getDisplayName(ChildComponent)})`;
  WithModal.WrappedComponent = ChildComponent;

  hoistNonReactStatic(WithModal, ChildComponent);

  return WithModal;
}
