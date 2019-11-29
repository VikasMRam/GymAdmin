import React, { Component } from 'react';
import { object, func } from 'prop-types';
import { reduxForm } from 'redux-form';
import immutable from 'object-path-immutable';

import { query } from 'sly/services/newApi';
import { createValidator, dependentRequired, usPhone, email, required } from 'sly/services/validation';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import { CLIENT_RESOURCE_TYPE, UUIDAUX_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
import { newClient } from 'sly/constants/payloads/client';
import { normJsonApi } from 'sly/services/helpers/jsonApi';
import { FAMILY_STAGE_CONTACT1 } from 'sly/constants/familyDetails';
import AddFamilyForm from 'sly/components/organisms/AddFamilyForm';
import DuplicateFamilies from 'sly/components/organisms/DuplicateFamilies';

const validate = createValidator({
  name: [required],
  preferredLocation: [required],
  source: [required],
  phone: [usPhone, dependentRequired('email', 'Either Phone or Email is required')],
  email: [email, dependentRequired('phone', 'Either Email or Phone is required')],
});

const AddFamilyReduxForm = reduxForm({
  form: 'AddFamilyForm',
  destroyOnUnmount: false,
  validate,
})(AddFamilyForm);

const DuplicateFamiliesReduxForm = reduxForm({
  form: 'DuplicateFamilies',
  validate,
})(DuplicateFamilies);

@query('createClient', 'createClient')

@query('getClients', 'getClients')

export default class AddFamilyFormContainer extends Component {
  static propTypes = {
    status: object,
    createClient: func,
    getClients: func,
    notifyInfo: func,
    onSuccess: func,
    updateTask: func,
    initialValues: object,
    onCancel: func.isRequired,
  };

  state = {
    duplicates: [],
    currentClient: {},
  };

  handleStepChange = ({ data, doSubmit }) => {
    const { getClients } = this.props;
    const { email, phone } = data;

    return getClients({
      exp: 'or',
      'filter[email]': email,
      'filter[phone]': phone,
    })
      .then((data) => {
        const matchingClients = normJsonApi(data);
        if (matchingClients.length) {
          const currentClient = immutable(newClient.data.attributes)
            .set('clientInfo.email', email)
            .set('clientInfo.phoneNumber', phone)
            .value();

          return this.setState({
            currentClient,
            duplicates: matchingClients,
          });
        }
        return doSubmit();
      });
  };

  handleAddFamily = (data) => {
    const {
      createClient, onCancel, notifyInfo, onSuccess,
    } = this.props;
    const {
      name, phone, email, source, notes, residentName, preferredLocation, timeToMove, lookingFor,
    } = data;
    const am =[];
    if (source === 'Direct Call') {
      am.push('PhoneConnect')
    }
    const payload = {
      type: CLIENT_RESOURCE_TYPE,
      attributes: {
        clientInfo: {
          name,
          phoneNumber: phone,
          email,
          referralSource: source,
          slyMessage: notes,
          additionalMetadata: am,
        },
        stage: FAMILY_STAGE_CONTACT1,
      },
      relationships: {
        uuidAux: {
          data: {
            id: null,
            type: UUIDAUX_RESOURCE_TYPE,
            attributes: {
              uuidInfo: {
                residentInfo: {
                  fullName: residentName,
                },
                housingInfo: {},
              },
            },
          },
        },
      },
    };
    if (preferredLocation) {
      const [city, state] = preferredLocation.split(',');
      payload.relationships.uuidAux.data.attributes.uuidInfo.locationInfo = {
        city,
        state,
      };
    }
    if (timeToMove) {
      payload.relationships.uuidAux.data.attributes.uuidInfo.housingInfo.moveTimeline = timeToMove;
    }
    if (lookingFor) {
      payload.relationships.uuidAux.data.attributes.uuidInfo.housingInfo.lookingFor = lookingFor;
    }

    return createClient(payload)
      .then((resp) => {
        onCancel();
        notifyInfo('Family added successfully');
        if (onSuccess) {
          onSuccess(normJsonApi(resp));
        }
      });
  };

  render() {
    const { duplicates, currentClient } = this.state;
    const { initialValues, onCancel } = this.props;

    return (
      <WizardController
        formName="AddFamilyForm"
        onStepChange={this.handleStepChange}
        onComplete={this.handleAddFamily}
      >
        {({
          data, ...props
        }) => (
          <WizardSteps {...props}>
            <WizardStep
              component={AddFamilyReduxForm}
              name="Add"
              initialValues={initialValues}
              onCancel={onCancel}
            />
            <WizardStep
              component={DuplicateFamiliesReduxForm}
              name="Duplicate"
              currentClient={currentClient}
              clients={duplicates}
              description="Looks like there are leads with matching phone numbers and/or emails. If you still want to proceed, click Add Family below."
              hasButton
            />
          </WizardSteps>
        )}
      </WizardController>
    );
  }
}
