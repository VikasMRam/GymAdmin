import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { func, string } from 'prop-types';
import loadable from '@loadable/component';

import { generateAskAgentQuestionContents } from 'sly/web/services/helpers/agents';
import { AA_CONSULTATION_REQUESTED, AGENT_ASK_QUESTIONS, PROFILE_ASK_QUESTION } from 'sly/web/services/api/constants';
import Thankyou from 'sly/web/components/molecules/Thankyou';
import SlyEvent from 'sly/web/services/helpers/events';
import { usePrefetch } from 'sly/web/services/api';
import { recordEntityCta } from 'sly/web/services/helpers/localStorage';
import Modal, { HeaderWithClose, ModalBody } from 'sly/web/components/atoms/NewModal';

const possibleModals = {
  thankYouModal: 'ThankYou',
  askQuestionToAgentModal: 'AskQuestionToAgentFormContainer',
};

const AskQuestionToAgentFormContainer = loadable(() => import(/* webpackChunkName: "chunkAskQuestionToAgentFormContainer" */'sly/web/containers/AskQuestionToAgentFormContainer'));

const AskAgentQuestionContainer = ({ type, children }) => {
  const [modalProps, setModalProps] = useState(null);

  const { communitySlug } = useParams();

  const { requestInfo: { normalized: community } } = usePrefetch('getCommunity', {
    id: communitySlug,
    include: 'similar-communities,questions,agents',
  });

  const onCloseModal = useCallback(beforeCloseModal => () => {
    beforeCloseModal?.();
    setModalProps(null);
  }, []);

  const handleToggleAskAgentQuestionModal = useCallback((isAskAgentQuestionModalVisible, subType) => {
    const action = isAskAgentQuestionModalVisible ? 'close-modal' : 'open-modal';
    let category = 'AskAgentQuestion';
    if (type) category += `-${type}`;

    if (subType && typeof subType === 'string') category += `-${subType}`;

    const event = { action, category, label: type === 'how-it-works-banner-notification' ? 'agent' : community.id };

    SlyEvent.getInstance().sendEvent(event);
  }, [community.id]);

  const openAskAgentQuestionModal = useCallback((subType) => {
    const toggleAskAgentQuestionModal = () => {
      handleToggleAskAgentQuestionModal(true, subType);
      onCloseModal();
    };
    const beforeCloseModal = () => handleToggleAskAgentQuestionModal(true, subType);

    const postSubmit = () => {
      toggleAskAgentQuestionModal();
      if (community) recordEntityCta(type, community.id);

      setModalProps({ name: possibleModals.thankYouModal });
    };

    const askQuestionModalDefaultProps = {
      name: possibleModals.askQuestionToAgentModal,
      beforeCloseModal,
      entityId: community.id,
      category: 'community',
      postSubmit,
      type,
    };

    if (type === 'how-it-works-banner-notification' || type === 'side-column-get-help-now') {
      let initialValues = {};
      if (type === 'how-it-works-banner-notification') {
        initialValues = {
          message: `I want to know about the senior living options in ${community.address.city}. Please give me a call or text with pricing and availability information`,
        };
      }

      setModalProps({
        heading: "Let's Begin Your Senior Living Search",
        initialValues,
        showMessageFieldFirst: true,
        ...askQuestionModalDefaultProps,
      });
    } else if (type === 'aa-sidebar' || type === 'aa-footer') {
      const initialValues = {};

      setModalProps({
        heading: 'We understand selling your home is a big deal.',
        description: 'Tell us how to connect with you and our team will reach out to share how we work with real estate agents.',
        initialValues,
        hideMessage: true,
        actionType: AA_CONSULTATION_REQUESTED,
        ...askQuestionModalDefaultProps,
      });
    } else {
      const { heading, description, placeholder, question } = generateAskAgentQuestionContents(
        community.name,
        community.address.city,
        type,
      );
      let actionType = AGENT_ASK_QUESTIONS;
      if (type === 'profile-content-question') actionType = PROFILE_ASK_QUESTION;
      setModalProps({
        toggleAskAgentQuestionModal,
        heading,
        description,
        placeholder,
        question,
        actionType,
        ...askQuestionModalDefaultProps,
      });
    }

    handleToggleAskAgentQuestionModal(false, subType);
  }, [type, community]);

  const { name: modalName, beforeCloseModal, ...restModalProps } = modalProps || {};

  return (
    <>
      {children(openAskAgentQuestionModal)}
      <Modal isOpen={!!modalProps} onClose={onCloseModal(beforeCloseModal)}>
        <HeaderWithClose onClose={onCloseModal()}>Get help from an expert</HeaderWithClose>
        <ModalBody>
          {modalName === possibleModals.thankYouModal && (
            <Thankyou
              heading="Success!"
              subheading="Your request has been sent and we will connect with you shortly."
              onClose={onCloseModal()}
              doneText="Finish"
            />
          )}
          {modalName === possibleModals.askQuestionToAgentModal && (
            <AskQuestionToAgentFormContainer {...restModalProps} />
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

AskAgentQuestionContainer.typeHydrationId = 'AskAgentQuestionContainer';

AskAgentQuestionContainer.propTypes = {
  type: string.isRequired,
  children: func,
};

export default AskAgentQuestionContainer;
