import React, { Component } from 'react';
import { object, arrayOf, func, string } from 'prop-types';
import { generatePath } from 'react-router';
import { branch } from 'recompose';

import conversationPropType from 'sly/common/propTypes/conversation/conversation';
import userPropType from 'sly/common/propTypes/user';
import { CONVERSATION_PARTICIPANT_TYPE_USER } from 'sly/web/constants/conversations';
import { prefetch, withUser } from 'sly/web/services/api';
import { FAMILY_DASHBOARD_MESSAGE_DETAILS_PATH, DASHBOARD_ACCOUNT_PATH } from 'sly/web/constants/dashboardAppPaths';
import CommunityPricingWizardLanding from 'sly/web/components/organisms/CommunityPricingWizardLanding';

@withUser

@branch(
  props => props.user,
  prefetch('conversations', 'getConversations', (req, { user: { id } }) =>
    req({
      participant_id: id,
      participant_type: CONVERSATION_PARTICIPANT_TYPE_USER,
    }),
  ),
)

export default class CommunityPricingWizardLandingContainer extends Component {
  static propTypes = {
    conversations: arrayOf(conversationPropType),
    user: userPropType,
    status: object,
    onBeginClick: func,
    buttonText: string,
  };

  handleBeginClick = () => {
    const { conversations, onBeginClick } = this.props;
    let redirectLink = DASHBOARD_ACCOUNT_PATH;
    if (conversations && conversations.length) {
      redirectLink = generatePath(FAMILY_DASHBOARD_MESSAGE_DETAILS_PATH, { id: conversations[0].id });
    }

    onBeginClick({ redirectLink });
  };

  getHasFinished = () => {
    const { status } = this.props;
    let converstionsHasFinished = true;
    let userHasFinished = true;
    if (status.conversations) {
      ({ hasFinished: converstionsHasFinished } = status.conversations);
    }
    if (status.user) {
      ({ hasFinished: userHasFinished } = status.user);
    }

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
