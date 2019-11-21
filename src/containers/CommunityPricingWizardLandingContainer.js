import React, { Component } from 'react';
import { object, arrayOf, func, string } from 'prop-types';
import { generatePath } from 'react-router';

import conversationPropType from 'sly/propTypes/conversation/conversation';
import userPropType from 'sly/propTypes/user';
import { CONVERSATION_PARTICIPANT_TYPE_USER } from 'sly/constants/conversations';
import { FAMILY_DASHBOARD_MESSAGE_DETAILS_PATH, FAMILY_DASHBOARD_PROFILE_PATH } from 'sly/constants/dashboardAppPaths';
import { prefetch, withUser } from 'sly/services/newApi';
import CommunityPricingWizardLanding from 'sly/components/organisms/CommunityPricingWizardLanding';

@withUser

@prefetch('conversations', 'getConversations', (req, { user: { id } }) =>
  req({
    participant_id: id,
    participant_type: CONVERSATION_PARTICIPANT_TYPE_USER,
  })
)

export default class CommunityPricingWizardLandingContainer extends Component {
  static propTypes = {
    conversations: arrayOf(conversationPropType),
    user: userPropType.isRequired,
    status: object,
    onBeginClick: func,
    buttonText: string,
  };

  handleBeginClick = () => {
    const { conversations, onBeginClick } = this.props;
    let redirectLink = FAMILY_DASHBOARD_PROFILE_PATH;
    if (conversations.length) {
      redirectLink = generatePath(FAMILY_DASHBOARD_MESSAGE_DETAILS_PATH, { id: conversations[0].id });
    }

    onBeginClick({ redirectLink });
  };

  getHasFinished = () => {
    const { status } = this.props;
    const { hasFinished: converstionsHasFinished } = status.conversations;
    const { hasFinished: userHasFinished } = status.user;

    return converstionsHasFinished && userHasFinished;
  };

  render() {
    const { user, buttonText } = this.props;

    if (!this.getHasFinished()) {
      return null;
    }

    return (
      <CommunityPricingWizardLanding
        user={user}
        buttonText={buttonText}
        onBeginClick={this.handleBeginClick}
      />
    );
  }
}
