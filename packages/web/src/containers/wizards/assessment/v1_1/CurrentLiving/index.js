import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { func, object } from 'prop-types';
import { withRouter } from 'react-router';

import { query } from 'sly/web/services/api';
import { WIZARD_STEP_COMPLETED } from 'sly/web/services/api/constants';
import { CurrentLiving } from 'sly/web/components/wizards/assessment';
import { createValidator, required } from 'sly/web/services/validation';

const validate = createValidator({
  currentLiving: [required],
});

const ReduxForm = reduxForm({
  form: 'CurrentLivingForm',
  destroyOnUnmount: false,
  validate,
})(CurrentLiving);

@withRouter
@query('createAction', 'createUuidAction')

export default class CurrentLivingFormContainer extends Component {
  static propTypes = {
    createAction: func.isRequired,
    location: object.isRequired,
    onSubmit: func.isRequired,
  };

  handleSubmit = (data) => {
    const { createAction, location: { pathname }, onSubmit } = this.props;

    return createAction({
      type: 'UUIDAction',
      attributes: {
        actionType: WIZARD_STEP_COMPLETED,
        actionPage: pathname,
        actionInfo: {
          stepName: 'currentLiving',
          wizardName: 'assessmentWizard',
          data,
        },
      },
    })
      .then(onSubmit);
  };

  render() {
    return (
      <ReduxForm
        {...this.props}
        onSubmit={this.handleSubmit}
      />
    );
  }
}
