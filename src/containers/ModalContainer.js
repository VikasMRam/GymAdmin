import React from 'react';

import ModalController from 'sly/controllers/ModalController';
import Modal from 'sly/components/molecules/Modal';

const ModalContainer = () => (
  <ModalController>
    {({
      isModalOpen, modalContent, modalOnClose, modalType, hide,
    }) => (
      <Modal
        closeable
        layout={modalType}
        isOpen={isModalOpen}
        onClose={() => {
          if (modalOnClose) {
            modalOnClose();
          }
          hide();
        }}
      >
        {modalContent}
      </Modal>
    )}
  </ModalController>
);

export default ModalContainer;
