import React from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router-dom';

import ModalController from 'sly/controllers/ModalController';
import Modal from 'sly/components/molecules/Modal';
import FilthyRedirect from 'sly/components/FilthyRedirect';

const ModalContainer = ({ location, match }) => (
  <ModalController>
    {({
      isModalOpen, isModalCloseable, modalContent, modalOnClose, modalType, hide, show,
    }) => (
      <>
        <FilthyRedirect isModalOpen={isModalOpen} showModal={show} location={location} match={match} />
        <Modal
          closeable={isModalCloseable}
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
      </>
    )}
  </ModalController>
);

ModalContainer.propTypes = {
  location: object,
  match: object,
};
ModalContainer.typeHydrationId = 'ModalContainer';

export default withRouter(ModalContainer);
