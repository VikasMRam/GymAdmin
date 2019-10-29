import React, { Component } from 'react';
import { object, string } from 'prop-types';
import { assetPath } from 'sly/components/themes';
import ModalController from 'sly/controllers/ModalController';
import NotificationController from 'sly/controllers/NotificationController';
import { generateAskAgentQuestionContents } from 'sly/services/helpers/agents';
import CommunityAskQuestionAgentFormContainer from 'sly/containers/CommunityAskQuestionAgentFormContainer';
import SlyEvent from 'sly/services/helpers/events';
import Button from 'sly/components/atoms/Button';

class AskAgentQuestionContainer extends Component {
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

function withNotificationAndModal(Component) {
  return ({ ...props }) => (
    <NotificationController>
      {({ notifyInfo }) => (
        <ModalController>
          {({ show: showModal, hide: hideModal }) => (
            <Component {...{ notifyInfo, showModal, hideModal }} {...props} />
          )}
        </ModalController>
      )}
    </NotificationController>
  );
}

const WiredAskAgentQuestionContainer = withNotificationAndModal(
  AskAgentQuestionContainer
);
WiredAskAgentQuestionContainer.propTypes = {
  type: string.isRequired,
  community: object.isRequired,
};

export default WiredAskAgentQuestionContainer;
