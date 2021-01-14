import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { func, object, string } from 'prop-types';
import { withRouter } from 'react-router';

import { query } from 'sly/web/services/api';
import { WIZARD_STEP_COMPLETED } from 'sly/web/services/api/constants';
import { Who } from 'sly/web/components/wizards/assessment';
import { createValidator, required } from 'sly/web/services/validation';

const validate = createValidator({
  lookingFor: [required],
});

const ReduxForm = reduxForm({
  form: 'WhoForm',
  destroyOnUnmount: false,
  validate,
})(Who);

@withRouter
@query('createAction', 'createUuidAction')

export default class WhoFormContainer extends Component {
  static propTypes = {
    createAction: func.isRequired,
    location: object.isRequired,
    onSubmit: func.isRequired,
    stepName: string.isRequired,
  };

  static defaultProps = {
    stepName: 'step-2:Who',
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
