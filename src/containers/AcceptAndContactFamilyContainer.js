import React, { Component } from 'react';
import { object, func } from 'prop-types';
import immutable from 'object-path-immutable';
import pick from 'lodash/pick';

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
    refetchClient: func,
    goToFamilyDetails: func,
  };

  state = { contactType: null };

  handleUpdateStage = (contactType, next) => {
    const {
      updateClient, client, rawClient, notifyError, refetchClient,
    } = this.props;
    const { id } = client;
    const [, contactStatus] = FAMILY_STAGE_ORDERED.Prospects;
    const newClient = immutable(pick(rawClient, ['id', 'type', 'attributes.stage']))
      .set('attributes.stage', contactStatus)
      .value();
    const clientPromise = () => refetchClient();

    return updateClient({ id }, newClient)
      .then(() => {
        this.setState({
          contactType,
        });
        next();
      })
      .then(clientPromise)
      .catch((r) => {
        // TODO: Need to set a proper way to handle server side errors
        const { body } = r;
        const errorMessage = body.errors.map(e => e.title).join('. ');
        console.error(errorMessage);
        notifyError('Failed to update stage. Please try again.');
      });
  };

  handleAcceptFamilySubmit = () => {
    const { onCancel, goToFamilyDetails } = this.props;
    withPreventDefault(onCancel);
    goToFamilyDetails();
  };

  render() {
    const { handleUpdateStage } = this;
    const { onCancel, client } = this.props;
    const { clientInfo } = client;
    const { email, phoneNumber } = clientInfo;
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
              onCallClick={phoneNumber ? () => handleUpdateStage('phone', next) : null}
              onEmailClick={email ? () => handleUpdateStage('email', next) : null}
            />
            <WizardStep
              component={AcceptFamilyContactDetails}
              name="Details"
              handleSubmit={this.handleAcceptFamilySubmit}
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
