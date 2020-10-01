import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { func, object, string } from 'prop-types';
import { withRouter } from 'react-router';

import { query } from 'sly/web/services/api';
import { WIZARD_STEP_COMPLETED } from 'sly/web/services/api/constants';
import { Timing } from 'sly/web/components/wizards/assessment';
import { createValidator, required } from 'sly/web/services/validation';

const validate = createValidator({
  timing: [required],
});

const ReduxForm = reduxForm({
  form: 'TimingForm',
  destroyOnUnmount: false,
  validate,
})(Timing);

@withRouter
@query('createAction', 'createUuidAction')

export default class TimingFormContainer extends Component {
  static propTypes = {
    createAction: func.isRequired,
    location: object.isRequired,
    onSubmit: func.isRequired,
    stepName: string.isRequired,
  };

  static defaultProps = {
    stepName: 'step-1:Timing',
  };

  handleSubmit = (data) => {
    const { createAction, location: { pathname }, onSubmit, stepName } = this.props;

    return createAction({
      type: 'UUIDAction',
      attributes: {
        actionType: WIZARD_STEP_COMPLETED,
        actionPage: pathname,
        actionInfo: {
          stepName,
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
