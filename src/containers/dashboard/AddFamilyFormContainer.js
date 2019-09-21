import React, { Component } from 'react';
import { object, func, arrayOf, string } from 'prop-types';
import { reduxForm } from 'redux-form';

import { query } from 'sly/services/newApi';
import { createValidator, dependentRequired, usPhone, email } from 'sly/services/validation';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import AddFamilyForm from 'sly/components/organisms/AddFamilyForm';
import DuplicateFamilies from 'sly/components/organisms/DuplicateFamilies';

const validate = createValidator({
  phone: [usPhone, dependentRequired('email', 'Either Phone or Email is required')],
  email: [email, dependentRequired('phone', 'Either Email or Phone is required')],
});

const ReduxForm = reduxForm({
  form: 'AddFamilyForm',
  validate,
})(AddFamilyForm);

@query('createClient', 'createClient')

@query('getClient', 'getClient')

export default class AddFamilyFormContainer extends Component {
  static propTypes = {
    status: object,
    createClient: func,
    getClient: func,
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

  handleStepChange = (data) => {
    console.log(data);
  };

  render() {
    const { duplicates } = this.state;
    const { lookingFor, timeToMove, onCancel } = this.props;

    return (
      <WizardController
        formName="AddFamilyForm"
        onStepChange={this.handleStepChange}
      >
        {({
          data, ...props
        }) => (
          <WizardSteps {...props}>
            <WizardStep
              component={ReduxForm}
              name="Add"
              lookingFor={lookingFor}
              timeToMove={timeToMove}
              onCancel={onCancel}
            />
            <WizardStep
              component={DuplicateFamilies}
              name="Duplicate"
              clients={duplicates}
            />
          </WizardSteps>
        )}
      </WizardController>
    );
  }
}
