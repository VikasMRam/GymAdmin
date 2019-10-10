import React, { Component } from 'react';
import { object, func } from 'prop-types';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';

import { domain } from 'sly/config';
import { query } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import userPropType from 'sly/propTypes/user';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import { withPreventDefault } from 'sly/services/helpers/forms';
import { FAMILY_STAGE_ORDERED } from 'sly/constants/familyDetails';
import AcceptAndContactFamilyForm from 'sly/components/organisms/AcceptAndContactFamilyForm';
import AcceptFamilyContactDetails from 'sly/components/organisms/AcceptFamilyContactDetails';

@query('updateClient', 'updateClient')

class AcceptAndContactFamilyContainer extends Component {
  static propTypes = {
    onCancel: func,
    client: clientPropType,
    rawClient: object,
    notifyError: func.isRequired,
    updateClient: func,
    refetchClient: func,
    goToFamilyDetails: func,
    goToMessagesTab: func,
    refetchConversations: func,
    conversation: conversationPropType,
    user: userPropType,
  };

  state = { contactType: null };

  handleUpdateStage = (contactType) => {
    const {
      updateClient, client, rawClient, refetchClient,
    } = this.props;
    const { id } = client;
    const [, contactStatus] = FAMILY_STAGE_ORDERED.Prospects;
    const newClient = immutable(pick(rawClient, ['id', 'type', 'attributes.stage']))
      .set('attributes.stage', contactStatus)
      .value();

    return updateClient({ id }, newClient)
      .then(() => refetchClient())
      .then(() => {
        this.setState({
          contactType,
        });
      })
      .catch((r) => {
        this.handleError(r, 'Failed to update stage. Please try again.');
      });
  };

  handleAcceptFamilySubmit = () => {
    const { onCancel, goToFamilyDetails } = this.props;
    withPreventDefault(onCancel);
    goToFamilyDetails();
  };

  handleError = (r, message) => {
    const { notifyError } = this.props;
    // TODO: Need to set a proper way to handle server side errors
    const { body } = r;
    const errorMessage = body.errors.map(e => e.title).join('. ');
    console.error(errorMessage);
    notifyError(message);
  }

  handleCallOrEmailClick = (contactType, next) => {
    this.handleUpdateStage(contactType)
      .then(() => next());
  }

  handleMessageClick = (contactType) => {
    const { onCancel, refetchConversations, goToMessagesTab } = this.props;
    this.handleUpdateStage(contactType)
      .then(() => refetchConversations())
      .then(() => onCancel())
      .then(() => goToMessagesTab());
  }

  render() {
    const { handleCallOrEmailClick, handleMessageClick, handleAcceptFamilySubmit } = this;
    const { onCancel, client, conversation, user } = this.props;
    const { clientInfo } = client;
    const { phoneNumber } = clientInfo;
    const { contactType } = this.state;
    
    const { id: userId } = user; 
    const userParticipant = conversation.conversationParticipants.find(participant => participant.participantID === userId);
    const { participantID } = userParticipant;
    const email = "messaging+"+participantID+"@conversation."+domain;
    const detail = {
      type: contactType,
      value: contactType === 'phone' ? phoneNumber : email,
    };

    return (
      <WizardController>
        {({
          data, next, previous, ...props
        }) => {
          const wizardStepComponents = [];
          if (phoneNumber) {
            wizardStepComponents.push(
              <WizardStep
                component={AcceptFamilyContactDetails}
                name="Details"
                handleSubmit={() => handleCallOrEmailClick('phone', next)}
                label="Phone number"
                detail={{ type: 'phone', value: phoneNumber }}
              />
            );
          } else {
            wizardStepComponents.push(
              <WizardStep
                component={AcceptAndContactFamilyForm}
                name="Contact"
                onCancelClick={onCancel}
                onEmailClick={email ? () => handleCallOrEmailClick('email', next) : null}
                onMessageClick={() => handleMessageClick(null)}
              />
            );
            wizardStepComponents.push(
              <WizardStep
                component={AcceptFamilyContactDetails}
                name="Details"
                handleSubmit={handleAcceptFamilySubmit}
                label={contactType === 'phone' ? 'Phone number' : 'Email'}
                detail={detail}
              />
            );
          }
          return <WizardSteps {...props}>{wizardStepComponents}</WizardSteps>;
        }}
      </WizardController>
    );
  }
}

export default AcceptAndContactFamilyContainer;
