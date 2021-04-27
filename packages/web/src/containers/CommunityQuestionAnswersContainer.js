import React, { useCallback, useState, Component } from 'react';
import { useParams } from 'react-router-dom';
import { func } from 'prop-types';
import loadable from '@loadable/component';
import { withRouter } from 'react-router';

import Thankyou from 'sly/web/components/molecules/Thankyou';
import CommunityQuestionAnswers from 'sly/web/components/organisms/CommunityQuestionAnswers';
import { community as communityPropType } from 'sly/common/propTypes/community';
import SlyEvent from 'sly/web/services/helpers/events';
import withModal from 'sly/web/controllers/withModal';
import { prefetch } from 'sly/web/services/api';
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

const ModalContainer = ({ modalProps: { modalName, onCloseModal, ...restProps } }) => (
  <Modal onClose={onCloseModal}>
    {modalName === possibleModals.communityLeaveAnAnswer && <CommunityLeaveAnAnswerFormContainer {...restProps} />}
    {modalName === possibleModals.thankYou && <Thankyou {...restProps} />}
    {modalName === possibleModals.askQuestionToAgent && <AskQuestionToAgentFormContainer {...restProps} />}
  </Modal>
);

const CommunityQuestionAnswersContainer = () => {
  const [modalProps, setModalProps] = useState(null);

  const { communitySlug } = useParams();

  const { requestInfo: { normalized: community } } = usePrefetch('getCommunity', {
    id: communitySlug,
    include: 'similar-communities,questions,agents',
  });

  const sendEvent = useCallback((action, category) => {
    SlyEvent.getInstance().sendEvent({
      action,
      category,
      label: this.props.community.id,
    });
  }, []);

  const handleCloseModal = useCallback(() => setModalProps(null), []);

  const openAnswerQuestionModal = useCallback(question =>
      setModalProps({
        onSuccess: handleCloseModal,
        communitySlug: community.id,
        questionText: question.contentData,
        questionId: question.id,
        onClose: handleCloseModal,
        modalName: possibleModals.communityLeaveAnAnswer,
      })
    , []);

  const openAskQuestionModal = useCallback((question = {}) => {
    const { id, name } = community;
    const postSubmit = () => {
      handleCloseModal();
      if (community) {
        recordEntityCta(type, community.id);
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
      entityId: id,
      initialValues: { question: question.contentData },
      parentSlug: question.id,
      communityName: name,
      type: 'profile-content-question',
      category: 'community',
      postSubmit,
      modalName: possibleModals.askQuestionToAgent,
      onCloseModal: onClose,
    });
  }, []);

  return (
    <>
      <HeadingBoxSection hasNoHr heading={`Questions About ${community.name}`} pad="xLarge">
        <CommunityQuestionAnswers
          communityName={community.name}
          questions={community.questions}
          communityFaQs={community.communityFaQs}
          onLeaveAnswerClick={openAnswerQuestionModal}
          onAskQuestionClick={openAskQuestionModal}
        />
      </HeadingBoxSection>
      {modalProps && <ModalContainer modalProps={modalProps} />}
    </>
  );
};

CommunityQuestionAnswersContainer.typeHydrationId = 'CommunityQuestionAnswersContainer';

export default CommunityQuestionAnswersContainer;
