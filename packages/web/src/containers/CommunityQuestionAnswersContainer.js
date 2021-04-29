import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import loadable from '@loadable/component';

import Thankyou from 'sly/web/components/molecules/Thankyou';
import CommunityQuestionAnswers from 'sly/web/components/organisms/CommunityQuestionAnswers';
import SlyEvent from 'sly/web/services/helpers/events';
import { PROFILE_ASK_QUESTION } from 'sly/web/services/api/constants';
import { recordEntityCta } from 'sly/web/services/helpers/localStorage';
import HeadingBoxSection from 'sly/web/components/molecules/HeadingBoxSection';
import Modal from 'sly/web/components/atoms/NewModal';
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

  const { requestInfo: { normalized: community } } = usePrefetch('getCommunity', {
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
      modalName: possibleModals.communityLeaveAnAnswer,
    })
  , [communityId]);

  const openAskQuestionModal = useCallback((question = {}) => {
    const postSubmit = () => {
      handleCloseModal();
      if (community) {
        recordEntityCta(type, communityId); // TODO: type is not defined
      }
      setModalProps({
        heading: 'Success!',
        subheading: 'Your question has been sent and we will connect with you shortly',
        onClose: handleCloseModal,
        doneText: 'Finish',
        modalName: possibleModals.thankYou,
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

  const { modalName, onCloseModal, ...restModalProps } = modalProps;

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
      {modalProps && (
        <Modal onClose={onCloseModal}>
          {modalName === possibleModals.communityLeaveAnAnswer && <CommunityLeaveAnAnswerFormContainer {...restModalProps} />}
          {modalName === possibleModals.thankYou && <Thankyou {...restModalProps} />}
          {modalName === possibleModals.askQuestionToAgent && <AskQuestionToAgentFormContainer {...restModalProps} />}
        </Modal>
      )}
    </>
  );
};

CommunityQuestionAnswersContainer.typeHydrationId = 'CommunityQuestionAnswersContainer';

export default CommunityQuestionAnswersContainer;
