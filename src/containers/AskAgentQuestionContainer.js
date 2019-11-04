import React, { Component } from 'react';
import { func, object, string } from 'prop-types';
import loadable from "@loadable/component";
import { assetPath } from 'sly/components/themes';
import { generateAskAgentQuestionContents } from 'sly/services/helpers/agents';
import SlyEvent from 'sly/services/helpers/events';
import withModal from "sly/controllers/withModal";
import withNotification from "sly/controllers/withNotification";

const CommunityAskQuestionAgentFormContainer = loadable(() => import(/* webpackChunkName: "chunkCommunityAskQuestionAgentFormContainer" */'sly/containers/CommunityAskQuestionAgentFormContainer'));

@withModal
@withNotification
export default class AskAgentQuestionContainer extends Component {
  static propTypes = {
    type: string.isRequired,
    community: object.isRequired,
    notifyInfo: func.isRequired,
    showModal: func.isRequired,
    hideModal: func.isRequired,
  };

  handleToggleAskAgentQuestionModal = (isAskAgentQuestionModalVisible) => {
    const { community, type } = this.props;
    const action = isAskAgentQuestionModalVisible
      ? 'close-modal'
      : 'open-modal';
    let category = 'AskAgentQuestion';
    if (type) {
      category += `-${type}`;
    }
    const event = {
      action,
      category,
      label: community.id,
    };

    SlyEvent.getInstance().sendEvent(event);
  };

  openAskAgentQuestionModal = () => {
    const { type, community, showModal, hideModal, notifyInfo } = this.props;

    const agentImageUrl = assetPath('images/agent-xLarge.png');
    const {
      heading,
      description,
      placeholder,
      question,
    } = generateAskAgentQuestionContents(
      community.name,
      community.address.city,
      type
    );
    const toggleAskAgentQuestionModal = () => {
      this.handleToggleAskAgentQuestionModal(true);
      hideModal();
    };

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
    const onClose = () => {
      this.handleToggleAskAgentQuestionModal(true);
    };

    this.handleToggleAskAgentQuestionModal(false);
    showModal(
      <CommunityAskQuestionAgentFormContainer {...modalComponentProps} />,
      onClose
    );
  };

  render() {
    return this.props.children(this.openAskAgentQuestionModal);
  }
}
