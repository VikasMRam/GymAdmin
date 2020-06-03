import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { func, object } from 'prop-types';
import { withRouter } from 'react-router';

import { query } from 'sly/web/services/api';
import { WIZARD_STEP_COMPLETED } from 'sly/web/services/api/constants';
import { Dementia } from 'sly/web/components/wizards/assesment';
import { createValidator, required } from 'sly/web/services/validation';

const validate = createValidator({
  forgetful: [required],
});

const ReduxForm = reduxForm({
  form: 'DementiaForm',
  destroyOnUnmount: false,
  validate,
})(Dementia);

@withRouter
@query('createAction', 'createUuidAction')

export default class DementiaFormContainer extends Component {
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
          stepName: 'dementia',
          wizardName: 'assesmentWizard',
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
