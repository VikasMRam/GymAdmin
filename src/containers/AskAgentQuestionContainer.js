import React, { Component } from 'react';
import { func, object, string } from 'prop-types';
import loadable from '@loadable/component';
import { withRouter } from 'react-router';

import { assetPath } from 'sly/components/themes';
import { generateAskAgentQuestionContents } from 'sly/services/helpers/agents';
import SlyEvent from 'sly/services/helpers/events';
import withModal from 'sly/controllers/withModal';
import withNotification from 'sly/controllers/withNotification';
import { prefetch } from 'sly/services/newApi';

const CommunityAskQuestionAgentFormContainer = loadable(() =>
  import(/* webpackChunkName: "chunkCommunityAskQuestionAgentFormContainer" */ 'sly/containers/CommunityAskQuestionAgentFormContainer'),
);

const AskQuestionToAgentFormContainer = loadable(() =>
  import(/* webpackChunkName: "chunkAskQuestionToAgentFormContainer" */ 'sly/containers/AskQuestionToAgentFormContainer'),
);

@withRouter
@prefetch('community', 'getCommunity', (req, { match }) =>
  req({
    id: match.params.communitySlug,
    include: 'similar-communities,questions,agents',
  }),
)
@withModal
@withNotification

export default class AskAgentQuestionContainer extends Component {
  static typeHydrationId = 'AskAgentQuestionContainer';

  static propTypes = {
    type: string.isRequired,
    community: object.isRequired,
    notifyInfo: func.isRequired,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    children: func,
  };

  handleToggleAskAgentQuestionModal = (isAskAgentQuestionModalVisible) => {
    const { community: { id }, type } = this.props;
    const action = isAskAgentQuestionModalVisible ? 'close-modal' : 'open-modal';
    let category = 'AskAgentQuestion';
    if (type) {
      category += `-${type}`;
    }
    const event = {
      action,
      category,
      label: type === 'how-it-works' ? 'agent' : id,
    };

    SlyEvent.getInstance().sendEvent(event);
  };

  openAskAgentQuestionModal = () => {
    const { type, community, showModal, hideModal, notifyInfo } = this.props;
    const agentImageUrl = assetPath('images/agent-xLarge.png');
    const toggleAskAgentQuestionModal = () => {
      this.handleToggleAskAgentQuestionModal(true);
      hideModal();
    };
    const onClose = () => {
      this.handleToggleAskAgentQuestionModal(true);
    };

    if (type === 'how-it-works') {
      const postSubmit = () => {
        notifyInfo('Question sent successfully');
        toggleAskAgentQuestionModal();
      };
      const initialValues = {
        message: `I want to know about the senior living options in ${community.address.city}. Please give me a call or text with pricing and availability information`,
      };
      const modalComponentProps = {
        heading: 'How can your local senior living expert help?',
        initialValues,
        id: community.id,
        category: 'community',
        postSubmit,
      };

      showModal(<AskQuestionToAgentFormContainer {...modalComponentProps} />, onClose);
    } else {
      const { heading, description, placeholder, question } = generateAskAgentQuestionContents(
        community.name,
        community.address.city,
        type,
      );
      const modalComponentProps = {
        toggleAskAgentQuestionModal,
        notifyInfo,
        community,
        heading,
        description,
        agentImageUrl,
        placeholder,
        question,
      };

      showModal(<CommunityAskQuestionAgentFormContainer {...modalComponentProps} />, onClose);
    }

    this.handleToggleAskAgentQuestionModal(false);
  };

  render() {
    return this.props.children(this.openAskAgentQuestionModal);
  }
}
