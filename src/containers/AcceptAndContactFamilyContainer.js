import React, { Component } from 'react';
import { object, func } from 'prop-types';
import produce from 'immer';

import { query } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
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
  };

  state = { contactType: null };

  handleUpdateStage = (contactType, next) => {
    const {
      updateClient, client, rawClient, notifyError,
    } = this.props;
    const { id } = client;

    return updateClient({ id }, produce(rawClient, (draft) => {
      const [, contactStatus] = FAMILY_STAGE_ORDERED.Prospects;
      draft.attributes.stage = contactStatus;
    }))
      .then(() => {
        this.setState({
          contactType,
        });
        next();
      })
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        console.error(errorMessage);
        notifyError('Failed to update stage. Please try again.');
      });
  };

  render() {
    const { handleUpdateStage } = this;
    const { onCancel, client } = this.props;
    const { clientInfo, admin } = client;
    const { phoneNumber } = admin;
    const { email } = clientInfo;
    const { contactType } = this.state;
    const detail = {
      type: contactType,
      value: contactType === 'phone' ? phoneNumber : email,
    };

    return (
      <WizardController>
        {({
          data, next, previous, ...props
        }) => (
          <WizardSteps {...props}>
            <WizardStep
              component={AcceptAndContactFamilyForm}
              name="Contact"
              onCancelClick={onCancel}
              onCallClick={() => handleUpdateStage('phone', next)}
              onEmailClick={() => handleUpdateStage('email', next)}
            />
            <WizardStep
              component={AcceptFamilyContactDetails}
              name="Details"
              handleSubmit={withPreventDefault(onCancel)}
              label={contactType === 'phone' ? 'Phone number' : 'Email'}
              detail={detail}
            />
          </WizardSteps>
        )}
      </WizardController>
    );
  }
}

export default AcceptAndContactFamilyContainer;
