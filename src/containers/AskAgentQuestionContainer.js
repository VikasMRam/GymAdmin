import React, { Component } from 'react';
import { func, object, string } from 'prop-types';
import loadable from '@loadable/component';
import { withRouter } from 'react-router';

import { assetPath } from 'sly/components/themes';
import { generateAskAgentQuestionContents } from 'sly/services/helpers/agents';
import SlyEvent from 'sly/services/helpers/events';
import withModal from 'sly/controllers/withModal';
import withNotification from 'sly/controllers/withNotification';
import { prefetch } from 'sly/services/api';

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

  handleToggleAskAgentQuestionModal = (isAskAgentQuestionModalVisible, subType) => {
    const { community: { id }, type } = this.props;
    const action = isAskAgentQuestionModalVisible ? 'close-modal' : 'open-modal';
    let category = 'AskAgentQuestion';
    if (type) {
      category += `-${type}`;
    }

    if (subType && typeof subType === 'string') {
      category += `-${subType}`;
    }
    const event = {
      action,
      category,
      label: type === 'how-it-works-banner-notification' ? 'agent' : id,
    };

    SlyEvent.getInstance().sendEvent(event);
  };

  openAskAgentQuestionModal = (subType) => {
    const { type, community, showModal, hideModal, notifyInfo } = this.props;
    const toggleAskAgentQuestionModal = () => {
      this.handleToggleAskAgentQuestionModal(true, subType);
      hideModal();
    };
    const onClose = () => {
      this.handleToggleAskAgentQuestionModal(true, subType);
    };

    if (type === 'how-it-works-banner-notification' || type === 'side-column-get-help-now') {
      const postSubmit = () => {
        notifyInfo('Question sent successfully');
        toggleAskAgentQuestionModal();
      };
      let initialValues = {};
      if (type === 'how-it-works-banner-notification') {
        initialValues = {
          message: `I want to know about the senior living options in ${community.address.city}. Please give me a call or text with pricing and availability information`,
        };
      }
      const modalComponentProps = {
        heading: "Let's Begin Your Senior Living Search",
        initialValues,
        entityId: community.id,
        category: 'community',
        showMessageFieldFirst: true,
        postSubmit,
        type,
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
        placeholder,
        question,
        type,
      };

      showModal(<CommunityAskQuestionAgentFormContainer {...modalComponentProps} />, onClose);
    }

    this.handleToggleAskAgentQuestionModal(false, subType);
  };

  render() {
    return this.props.children(this.openAskAgentQuestionModal);
  }
}
