import React, { Component } from 'react';
import { func } from 'prop-types';
import { Redirect, generatePath } from 'react-router-dom';
import { reduxForm } from 'redux-form';

import { domain } from 'sly/web/config';
import clientPropType from 'sly/web/propTypes/client';
import conversationPropType from 'sly/web/propTypes/conversation/conversation';
import userPropType from 'sly/web/propTypes/user';
import {
  AGENT_DASHBOARD_FAMILIES_DETAILS_PATH,
  FAMILY_DETAILS,
  MESSAGES,
} from 'sly/web/constants/dashboardAppPaths';
import { withUser } from 'sly/web/services/api';
import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import AcceptAndContactFamilyForm from 'sly/web/components/organisms/AcceptAndContactFamilyForm';
import AcceptFamilyContactDetails from 'sly/web/components/organisms/AcceptFamilyContactDetails';

const AcceptAndContactFamilyFormRedux = reduxForm({
  form: 'AcceptAndContactFamilyForm',
})(AcceptAndContactFamilyForm);

@withUser

export default class AcceptAndContactFamilyContainer extends Component {
  static propTypes = {
    onCancel: func,
    client: clientPropType,
    refetchConversations: func,
    conversation: conversationPropType,
    user: userPropType.isRequired,
  };

  state = {
    contactType: null,
    redirectToFamilyDetails: false,
    redirectToMessages: false,
  };

  handleComplete = () => {
    const { onCancel } = this.props;

    onCancel();
    return this.setState({
      redirectToFamilyDetails: true,
    });
  };


  handleStepChange = ({ data }) => {
    const { contactType } = data;
    if (contactType === 'message') {
      const { onCancel, refetchConversations } = this.props;

      return refetchConversations()
        .then(onCancel)
        .then(() =>
          this.setState({
            redirectToMessages: true,
          }));
    }

    return this.setState({
      contactType,
    });
  };

  render() {
    const { onCancel, client } = this.props;
    // Reenable after messages
    // const { conversation, user } = this.props;
    const { contactType, redirectToFamilyDetails, redirectToMessages } = this.state;
    const { id, clientInfo } = client;
    const { phoneNumber } = clientInfo;
    const { email } = clientInfo;
    // const { id: userId } = user;

    if (redirectToFamilyDetails) {
      return <Redirect to={generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: FAMILY_DETAILS })} />;
    }
    if (redirectToMessages) {
      return <Redirect to={generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: MESSAGES })} />;
    }

    if (phoneNumber) {
      return (
        <AcceptFamilyContactDetails
          handleSubmit={this.handleComplete}
          label="Phone number"
          detail={{ type: 'phone', value: phoneNumber }}
        />
      );
    }
    /* REENABLE AFTER MESSAGES DONE
    if (conversation && conversation.conversationParticipants && Array.isArray(conversation.conversationParticipants)) {
      const userParticipant = conversation.conversationParticipants
        .find(participant => participant && participant.participantID === userId);
      if (userParticipant && userParticipant.participantID) {
        const { participantID } = userParticipant;
        email = `messaging+${participantID}@conversation.${domain}`;
      }
    }
    */
    const detail = {
      type: contactType,
      value: contactType === 'phone' ? phoneNumber : email,
    };

    return (
      <WizardController
        onStepChange={this.handleStepChange}
        onComplete={this.handleComplete}
        formName="AcceptAndContactFamilyForm"
      >
        {props => (
          <WizardSteps {...props}>
            <WizardStep
              name="Contact"
              component={AcceptAndContactFamilyFormRedux}
              onCancelClick={onCancel}
              contactTypes={['email']}
            />
            <WizardStep
              name="Details"
              component={AcceptFamilyContactDetails}
              handleSubmit={this.handleComplete}
              label={contactType === 'phone' ? 'Phone number' : 'Email'}
              detail={detail}
            />
          </WizardSteps>
        )}
      </WizardController>
    );
  }
}
