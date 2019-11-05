import React, { Component } from 'react';
import { func } from 'prop-types';
import loadable from '@loadable/component';

import CommunityQuestionAnswers from 'sly/components/organisms/CommunityQuestionAnswers';
import { community as communityPropType } from 'sly/propTypes/community';
import SlyEvent from 'sly/services/helpers/events';
import withModal from 'sly/controllers/withModal';

const CommunityLeaveAnAnswerFormContainer = loadable(() => import(/* webpackChunkName: "chunkCommunityLeaveAnAnswerFormContainer" */'sly/containers/CommunityLeaveAnAnswerFormContainer'));
const CommunityAskQuestionFormContainer = loadable(() => import(/* webpackChunkName: "chunkCommunityAskQuestionFormContainer" */'sly/containers/CommunityAskQuestionFormContainer'));

@withModal
export default class CommunityQuestionAnswersContainer extends Component {
  static typeHydrationId = 'CommunityQuestionAnswersContainer';
  static propTypes = {
    community: communityPropType,
    showModal: func,
    hideModal: func,
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
    const { community: { name, id, questions, communityFaQs } } = this.props;
    return (
      <CommunityQuestionAnswers
        communityName={name}
        communitySlug={id}
        questions={questions}
        communityFaQs={communityFaQs}
        onLeaveAnswerClick={this.openAnswerQuestionModal}
        onAskQuestionClick={this.openAskQuestionModal}
      />
    );
  }
}
