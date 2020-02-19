import React, { Component } from 'react';
import { func } from 'prop-types';

import { assetPath } from 'sly/components/themes';
import SlyEvent from 'sly/services/helpers/events';
import withNotification from 'sly/controllers/withNotification';
import AskAgentAdTile from 'sly/components/organisms/AskAgentAdTile';
import Modal, { HeaderWithClose, PaddedHeaderWithCloseBody } from 'sly/components/atoms/NewModal';
import TalkToAgentFormContainer from 'sly/containers/TalkToAgentFormContainer';

@withNotification

export default class AskAgentAdTileContainer extends Component {
  static propTypes ={
    notifyInfo: func.isRequired,
  };

  state = {
    isModalOpen: false,
  };

  handleAskExpertQuestionClick = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'click-ask-our-experts-question-button',
      category: 'AskAgentAdTile',
    });
    this.setState({
      isModalOpen: true,
    });
  };

  handleClose = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'close-ask-agent-question-modal',
      category: 'AskAgentAdTile',
    });
    this.setState({
      isModalOpen: false,
    });
  };

  handleComplete = () => {
    const { notifyInfo } = this.props;

    notifyInfo('We have received your request and we will get back to you soon.');
    this.handleClose();
  };

  render() {
    const { isModalOpen } = this.state;

    return (
      <>
        <AskAgentAdTile title="ad title here" onAskExpertQuestionClick={this.handleAskExpertQuestionClick} {...this.props} />
        {isModalOpen &&
          <Modal onClose={this.handleClose}>
            <HeaderWithClose />
            <PaddedHeaderWithCloseBody>
              <TalkToAgentFormContainer
                heading="Our Local Senior Living Experts can help you with your search."
                image={assetPath('images/agents.png')}
                buttonKind="regular"
                hasLocation={false}
                postSubmit={this.handleComplete}
                showMessageFieldFirst
              />
            </PaddedHeaderWithCloseBody>
          </Modal>
        }
      </>
    );
  }
}
