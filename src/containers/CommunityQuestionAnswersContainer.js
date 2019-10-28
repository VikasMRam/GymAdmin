import React, { Component } from 'react';
import { func } from 'prop-types';

import CommunityQuestionAnswers from 'sly/components/organisms/CommunityQuestionAnswers';
import { community as communityPropType } from 'sly/propTypes/community';
import CommunityLeaveAnAnswerFormContainer from 'sly/containers/CommunityLeaveAnAnswerFormContainer';
import CommunityAskQuestionFormContainer from 'sly/containers/CommunityAskQuestionFormContainer';
import SlyEvent from 'sly/services/helpers/events';
import withModal from "sly/controllers/withModal";

@withModal
export default class CommunityQuestionAnswersContainer extends Component {
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
    const { showModal, community } = this.props;

    this.sendEvent('open-modal', 'AskQuestion');

    const onClose = () => this.sendEvent('close-modal', 'AskQuestion');
    showModal(
      <CommunityAskQuestionFormContainer
        communitySlug={community.id}
        initialValues={{ question: question.contentData }}
        parentSlug={question.id}
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
