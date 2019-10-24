import React, { Component } from 'react';
import { func } from 'prop-types';
import { Redirect, generatePath } from 'react-router-dom';
import { reduxForm } from 'redux-form';

import { domain } from 'sly/config';
import clientPropType from 'sly/propTypes/client';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import userPropType from 'sly/propTypes/user';
import {
  AGENT_DASHBOARD_FAMILIES_DETAILS_PATH,
  FAMILY_DETAILS,
  MESSAGES,
} from 'sly/constants/dashboardAppPaths';
import { withUser } from 'sly/services/newApi';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import AcceptAndContactFamilyForm from 'sly/components/organisms/AcceptAndContactFamilyForm';
import AcceptFamilyContactDetails from 'sly/components/organisms/AcceptFamilyContactDetails';

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
    const { onCancel, client, conversation, user } = this.props;
    const { contactType, redirectToFamilyDetails, redirectToMessages } = this.state;
    const { id, clientInfo } = client;
    const { phoneNumber } = clientInfo;
    let { email } = clientInfo;
    const { id: userId } = user;

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

    if (conversation && conversation.conversationParticipants && Array.isArray(conversation.conversationParticipants)) {
      const userParticipant = conversation.conversationParticipants
        .find(participant => participant && participant.participantID === userId);
      if (userParticipant && userParticipant.participantID) {
        const { participantID } = userParticipant;
        email = `messaging+${participantID}@conversation.${domain}`;
      }
    }
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
              contactTypes={['email', 'message']}
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
