import React, { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import loadable from '@loadable/component';

import Thankyou from 'sly/web/components/molecules/Thankyou';
import CommunityQuestionAnswers from 'sly/web/components/organisms/CommunityQuestionAnswers';
import SlyEvent from 'sly/web/services/helpers/events';
import { PROFILE_ASK_QUESTION } from 'sly/web/services/api/constants';
import { recordEntityCta } from 'sly/web/services/helpers/localStorage';
import HeadingBoxSection from 'sly/web/components/molecules/HeadingBoxSection';
import Modal, { HeaderWithClose, ModalBody } from 'sly/web/components/atoms/NewModal';
import { usePrefetch } from 'sly/web/services/api/prefetch';

const CommunityLeaveAnAnswerFormContainer = loadable(() => import(/* webpackChunkName: "chunkCommunityLeaveAnAnswerFormContainer" */'sly/web/containers/CommunityLeaveAnAnswerFormContainer'));
const AskQuestionToAgentFormContainer = loadable(() => import(/* webpackChunkName: "chunkAskQuestionToAgentFormContainer" */'sly/web/containers/AskQuestionToAgentFormContainer'));

const possibleModals = {
  communityLeaveAnAnswer: 'CommunityLeaveAnAnswerFormContainer',
  thankYou: 'Thankyou',
  askQuestionToAgent: 'AskQuestionToAgentFormContainer',
};

const CommunityQuestionAnswersContainer = () => {
  const [modalProps, setModalProps] = useState(null);

  const { communitySlug } = useParams();

  const { requestInfo: { normalized: community }, fetch } = usePrefetch('getCommunity', {
    id: communitySlug,
    include: 'similar-communities,questions,agents',
  });

  const { id: communityId, name: communityName, questions: communityQuestions, communityFaQs } = community;

  const sendEvent = useCallback((action, category) => {
    SlyEvent.getInstance().sendEvent({
      action,
      category,
      label: communityId,
    });
  }, [communityId]);

  const handleCloseModal = useCallback(() => setModalProps(null), []);

  const openAnswerQuestionModal = useCallback(question =>
    setModalProps({
      onSuccess: handleCloseModal,
      communitySlug: communityId,
      questionText: question.contentData,
      questionId: question.id,
      onClose: handleCloseModal,
      onCloseModal: handleCloseModal,
      modalName: possibleModals.communityLeaveAnAnswer,
    })
  , [communityId]);

  const openAskQuestionModal = useCallback((question = {}) => {
    const postSubmit = () => {
      handleCloseModal();
      if (community) {
        recordEntityCta('Community', communityId);
      }
      setModalProps({
        heading: 'Success!',
        subheading: 'Your question has been sent and we will connect with you shortly',
        onClose: () => { fetch(); handleCloseModal(); },
        doneText: 'Finish',
        modalName: possibleModals.thankYou,
        onCloseModal: handleCloseModal,
      });
    };
    sendEvent('open-modal', 'AskQuestion');

    const onClose = () => { sendEvent('close-modal', 'AskQuestion'); handleCloseModal(); };
    setModalProps({
      actionType: PROFILE_ASK_QUESTION,
      entityId: communityId,
      initialValues: { question: question.contentData },
      parentSlug: question.id,
      communityName,
      type: 'profile-content-question',
      category: 'community',
      postSubmit,
      modalName: possibleModals.askQuestionToAgent,
      onCloseModal: onClose,
    });
  }, [community]);

  const { modalName, onCloseModal, ...restModalProps } = modalProps || {};

  const filteredQuestions = useMemo(() => communityQuestions?.filter(({ contents }) => contents?.length > 0),
    [communityQuestions]);

  if (!filteredQuestions?.length) { // TODO: We need this check?
    // return null;
  }

  return (
    <>
      <HeadingBoxSection hasNoHr heading={`Questions About ${communityName}`} pad="xLarge">
        <CommunityQuestionAnswers
          communityName={communityName}
          questions={communityQuestions}
          communityFaQs={communityFaQs}
          onLeaveAnswerClick={openAnswerQuestionModal}
          onAskQuestionClick={openAskQuestionModal}
        />
      </HeadingBoxSection>
      <Modal isOpen={!!modalProps} onClose={onCloseModal}>
        <HeaderWithClose onClose={onCloseModal} />
        <ModalBody>
          {modalName === possibleModals.communityLeaveAnAnswer && <CommunityLeaveAnAnswerFormContainer {...restModalProps} />}
          {modalName === possibleModals.thankYou && <Thankyou {...restModalProps} />}
          {modalName === possibleModals.askQuestionToAgent && <AskQuestionToAgentFormContainer {...restModalProps} />}
        </ModalBody>
      </Modal>
    </>
  );
};

CommunityQuestionAnswersContainer.typeHydrationId = 'CommunityQuestionAnswersContainer';

export default React.memo(CommunityQuestionAnswersContainer);
