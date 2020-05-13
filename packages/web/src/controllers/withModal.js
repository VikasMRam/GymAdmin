import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

import ModalController from 'sly/web/controllers/ModalController';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function withModal(ChildComponent) {
  const WithModal = props => (
    <ModalController>
      {({ show, hide, isModalOpen }) => (
        <ChildComponent showModal={show} hideModal={hide} isModalOpen={isModalOpen} {...props} />
      )}
    </ModalController>
  );

  WithModal.displayName = `WithModal(${getDisplayName(ChildComponent)})`;
  WithModal.WrappedComponent = ChildComponent;

  hoistNonReactStatic(WithModal, ChildComponent);

  return WithModal;
}
