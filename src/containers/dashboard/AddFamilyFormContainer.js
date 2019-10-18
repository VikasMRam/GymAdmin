import React, { Component } from 'react';
import { object, func, arrayOf, string } from 'prop-types';
import { reduxForm } from 'redux-form';

import { query } from 'sly/services/newApi';
import { createValidator, dependentRequired, usPhone, email, required } from 'sly/services/validation';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import { CLIENT_RESOURCE_TYPE, UUIDAUX_RESOURCE_TYPE } from 'sly/constants/resourceTypes';
import { normJsonApi } from 'sly/services/helpers/jsonApi';
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
    lookingFor: arrayOf(string).isRequired,
    timeToMove: arrayOf(string).isRequired,
    onCancel: func.isRequired,
  };

  state = {
    duplicates: [],
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
          return this.setState({
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
    const payload = {
      type: CLIENT_RESOURCE_TYPE,
      attributes: {
        clientInfo: {
          name,
          phoneNumber: phone,
          email,
          referralSource: source,
          slyMessage: notes,
        },
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
    const { duplicates } = this.state;
    const { lookingFor, timeToMove, onCancel } = this.props;

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
              lookingFor={lookingFor}
              timeToMove={timeToMove}
              onCancel={onCancel}
            />
            <WizardStep
              component={DuplicateFamiliesReduxForm}
              name="Duplicate"
              clients={duplicates}
            />
          </WizardSteps>
        )}
      </WizardController>
    );
  }
}
