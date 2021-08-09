import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { func, object, string } from 'prop-types';
import { withRouter } from 'react-router';

import { query } from 'sly/web/services/api';
import { WIZARD_STEP_COMPLETED } from 'sly/web/services/api/constants';
import ResidentName from 'sly/web/assessment/steps/ResidentName';

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
    whatToDoNext: string,
    onSkipClick: func.isRequired,
    stepName: string.isRequired,
  };

  static defaultProps = {
    stepName: 'step-12:ResidentName',
  };

  componentDidMount() {
    const { whatToDoNext, onSkipClick } = this.props;

    if (whatToDoNext === 'no-thanks') {
      onSkipClick();
    }
  }

  handleSubmit = (data) => {
    const { createAction, location: { pathname }, onSubmit, stepName } = this.props;
    const fullName = data.fullName.replace(/\s\s+/g, ' ').trim();
    const nameComponents = fullName.split(' ');
    const firstName = nameComponents[0];
    const lastName = nameComponents.length > 1 ? nameComponents.slice(1).join(' ') : '';

    data.resident = {
      firstName,
      lastName,
    };
    return createAction({
      type: 'UUIDAction',
      attributes: {
        actionType: WIZARD_STEP_COMPLETED,
        actionPage: pathname,
        actionInfo: {
          wizardPostConversionInfo: true,
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
