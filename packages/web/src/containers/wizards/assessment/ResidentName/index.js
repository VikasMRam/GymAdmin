import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { func, object } from 'prop-types';
import { withRouter } from 'react-router';

import { query } from 'sly/web/services/api';
import { WIZARD_STEP_COMPLETED } from 'sly/web/services/api/constants';
import { ResidentName } from 'sly/web/components/wizards/assesment';

const ReduxForm = reduxForm({
  form: 'ResidentNameForm',
  destroyOnUnmount: false,
})(ResidentName);

@withRouter
@query('createAction', 'createUuidAction')

export default class ResidentNameFormContainer extends Component {
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
          stepName: 'residentName',
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
