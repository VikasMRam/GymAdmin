import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router-dom';

import ModalController from 'sly/controllers/ModalController';
import Modal from 'sly/components/molecules/Modal';
import FilthyRedirect from 'sly/components/FilthyRedirect';

const ModalContainer = ({ location, match }) => (
  <ModalController>
    {({
      isModalOpen, modalContent, modalOnClose, modalType, hide, show,
    }) => (
      <Fragment>
        <FilthyRedirect isModalOpen={isModalOpen} showModal={show} location={location} match={match} />
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
      </Fragment>
    )}
  </ModalController>
);

ModalContainer.propTypes = {
  location: object,
  match: object,
};

export default withRouter(ModalContainer);
