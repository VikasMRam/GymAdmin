import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { func, object } from 'prop-types';
import { withRouter } from 'react-router';

import { query } from 'sly/web/services/api';
import { WIZARD_STEP_COMPLETED } from 'sly/web/services/api/constants';
import { Services } from 'sly/web/components/wizards/assessment';
import { createValidator, required } from 'sly/web/services/validation';

const validate = createValidator({
  services: [required],
});

const ReduxForm = reduxForm({
  form: 'Services',
  destroyOnUnmount: false,
  validate,
})(Services);

@withRouter
@query('createAction', 'createUuidAction')

export default class ServicesFormContainer extends Component {
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
          stepName: 'step-7:Services',
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
