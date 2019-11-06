import React, { Component } from 'react';
import { func } from 'prop-types';
import loadable from '@loadable/component';
import withRouter from 'react-router/withRouter';

import CommunityQuestionAnswers from 'sly/components/organisms/CommunityQuestionAnswers';
import { community as communityPropType } from 'sly/propTypes/community';
import SlyEvent from 'sly/services/helpers/events';
import withModal from 'sly/controllers/withModal';
import { prefetch } from 'sly/services/newApi';

const CommunityLeaveAnAnswerFormContainer = loadable(() => import(/* webpackChunkName: "chunkCommunityLeaveAnAnswerFormContainer" */'sly/containers/CommunityLeaveAnAnswerFormContainer'));
const CommunityAskQuestionFormContainer = loadable(() => import(/* webpackChunkName: "chunkCommunityAskQuestionFormContainer" */'sly/containers/CommunityAskQuestionFormContainer'));

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
    const { showModal, community: { id, name } } = this.props;

    this.sendEvent('open-modal', 'AskQuestion');

    const onClose = () => this.sendEvent('close-modal', 'AskQuestion');
    showModal(
      <CommunityAskQuestionFormContainer
        showModal={showModal}
        communitySlug={id}
        initialValues={{ question: question.contentData }}
        parentSlug={question.id}
        communityName={name}
      />,
      onClose
    );
  };

  render() {
    const { community: { name, questions, communityFaQs } } = this.props;
    return (
      <CommunityQuestionAnswers
        communityName={name}
        questions={questions}
        communityFaQs={communityFaQs}
        onLeaveAnswerClick={this.openAnswerQuestionModal}
        onAskQuestionClick={this.openAskQuestionModal}
      />
    );
  }
}
