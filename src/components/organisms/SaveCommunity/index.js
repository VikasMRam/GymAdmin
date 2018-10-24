import React, { Fragment } from 'react';
import { func, array, string, oneOf } from 'prop-types';

import {
  SAVE_COMMUNITY_STEPS_CREATE,
  SAVE_COMMUNITY_STEPS_DELETE,
  SAVE_COMMUNITY_STEPS_UPDATE,
  SAVE_COMMUNITY_STEPS_COMPLETE,
} from 'sly/constants/saveCommunitySteps';

import Modal from 'sly/components/molecules/Modal';
import SaveCommunityFormContainer from 'sly/containers/SaveCommunityFormContainer';
import ToastNotification from 'sly/components/molecules/ToastNotification';
import CommunitySaved from 'sly/components/organisms/CommunitySaved';

const SaveCommunity = ({
  notification,
  onNotificationClose,
  similarCommunities,
  mainImage,
  onModalClose,
  onSubmitSaveCommunityForm,
  currentStep,
}) => {
  let notificationMsg = '';
  switch (notification) {
    case 'deleted':
      notificationMsg = 'Community Removed.';
      break;
    case 'createFailed':
      notificationMsg = 'Failed to add community to favorites. Please try again.';
      break;
    case 'deleteFailed':
      notificationMsg = 'Failed to remove community from favorites. Please try again.';
      break;
    default:
  }

  return (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <Modal
        closeable
        noPadding={currentStep === SAVE_COMMUNITY_STEPS_UPDATE}
        layout={currentStep === SAVE_COMMUNITY_STEPS_COMPLETE ? 'single' : 'double'}
        onClose={onModalClose}
        isOpen={currentStep === SAVE_COMMUNITY_STEPS_UPDATE || currentStep === SAVE_COMMUNITY_STEPS_COMPLETE}
      >
        {currentStep === SAVE_COMMUNITY_STEPS_UPDATE &&
          <SaveCommunityFormContainer mainImage={mainImage} submitForm={onSubmitSaveCommunityForm} />}
        {currentStep === SAVE_COMMUNITY_STEPS_COMPLETE &&
          <CommunitySaved similarCommunities={similarCommunities} onDoneButtonClicked={onModalClose} />}
      </Modal>
      {notificationMsg &&
        <ToastNotification
          onClose={onNotificationClose}
        >
          {notificationMsg}
        </ToastNotification>
      }
    </Fragment>
  );
};

SaveCommunity.propTypes = {
  mainImage: string,
  notification: oneOf(['deleted', 'createFailed', 'deleteFailed']),
  onNotificationClose: func,
  similarCommunities: array,
  onModalClose: func,
  onSubmitSaveCommunityForm: func,
  currentStep: oneOf([
    SAVE_COMMUNITY_STEPS_CREATE,
    SAVE_COMMUNITY_STEPS_DELETE,
    SAVE_COMMUNITY_STEPS_UPDATE,
    SAVE_COMMUNITY_STEPS_COMPLETE,
  ]),
};

export default SaveCommunity;
