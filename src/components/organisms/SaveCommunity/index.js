import React from 'react';
import { func, array, string, oneOf } from 'prop-types';

import {
  SAVE_COMMUNITY_STEPS_CREATE,
  SAVE_COMMUNITY_STEPS_DELETE,
  SAVE_COMMUNITY_STEPS_UPDATE,
  SAVE_COMMUNITY_STEPS_COMPLETE,
} from 'sly/constants/saveCommunitySteps';
import Modal from 'sly/components/molecules/Modal';
import SaveCommunityFormContainer from 'sly/containers/SaveCommunityFormContainer';
import CommunitySaved from 'sly/components/organisms/CommunitySaved';

const SaveCommunity = ({
  similarCommunities,
  mainImage,
  onModalClose,
  onSubmitSaveCommunityForm,
  currentStep,
}) => (
  <Modal
    closeable
    onClose={onModalClose}
    isOpen={currentStep === SAVE_COMMUNITY_STEPS_UPDATE || currentStep === SAVE_COMMUNITY_STEPS_COMPLETE}
  >
    {currentStep === SAVE_COMMUNITY_STEPS_UPDATE &&
      <SaveCommunityFormContainer mainImage={mainImage} submitForm={onSubmitSaveCommunityForm} />}
    {currentStep === SAVE_COMMUNITY_STEPS_COMPLETE &&
      <CommunitySaved similarCommunities={similarCommunities} onDoneButtonClicked={onModalClose} />}
  </Modal>
);

SaveCommunity.propTypes = {
  mainImage: string,
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
