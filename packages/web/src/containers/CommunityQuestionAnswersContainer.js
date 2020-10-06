import React, { Component } from 'react';
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

const CommunityLeaveAnAnswerFormContainer = loadable(() => import(/* webpackChunkName: "chunkCommunityLeaveAnAnswerFormContainer" */'sly/web/containers/CommunityLeaveAnAnswerFormContainer'));
const AskQuestionToAgentFormContainer = loadable(() => import(/* webpackChunkName:
 "chunkAskQuestionToAgentFormContainer" */'sly/web/containers/AskQuestionToAgentFormContainer'));

@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.communitySlug,
  include: 'similar-communities,questions,agents',
}))

@withModal
export default class CommunityQuestionAnswersContainer extends Component {
  static typeHydrationId = 'CommunityQuestionAnswersContainer';
  static propTypes = {
    community: communityPropType.isRequired,
    showModal: func.isRequired,
    hideModal: func.isRequired,
  };

  sendEvent = (action, category) => {
    SlyEvent.getInstance().sendEvent({
      action,
      category,
      label: this.props.community.id,
    });
  };

  openAnswerQuestionModal = (question) => {
    const { showModal, hideModal, community } = this.props;

    showModal(
      <CommunityLeaveAnAnswerFormContainer
        onSuccess={hideModal}
        communitySlug={community.id}
        questionText={question.contentData}
        questionId={question.id}
      />
    );
  };

  openAskQuestionModal = (question = {}) => {
    const { showModal, hideModal, community: { id, name } } = this.props;
    const postSubmit = () => {
      // notifyInfo('Request sent successfully');
      hideModal();
      if (community) {
        recordEntityCta(type,community.id);
      }
      showModal(<Thankyou heading={"Success!"} subheading={'Your question has been sent and we will connect with' +
      ' you shortly'} onClose={hideModal} doneText='Finish'/>);
    };
    this.sendEvent('open-modal', 'AskQuestion');

    const onClose = () => this.sendEvent('close-modal', 'AskQuestion');
    showModal(
      <AskQuestionToAgentFormContainer
        showModal={showModal}
        actionType={PROFILE_ASK_QUESTION}
        entityId={id}
        initialValues={{ question: question.contentData }}
        parentSlug={question.id}
        communityName={name}
        type='profile-content-question'
        category={'community'}
        postSubmit={postSubmit}
      />,
      onClose
    );
  };

  render() {
    const { community: { name, questions, communityFaQs } } = this.props;

    const filteredQuestions = questions ? questions.filter((q) => {
      const { contents = [] } = q;
      return contents.length > 0;
    }) : questions;

    if (!filteredQuestions || !filteredQuestions.length) {
      return null;
    }

    return (
      <HeadingBoxSection hasNoHr heading={`Questions About ${name}`} pad="xLarge">
        <CommunityQuestionAnswers
          communityName={name}
          questions={questions}
          communityFaQs={communityFaQs}
          onLeaveAnswerClick={this.openAnswerQuestionModal}
          onAskQuestionClick={this.openAskQuestionModal}
        />
      </HeadingBoxSection>
    );
  }
}
