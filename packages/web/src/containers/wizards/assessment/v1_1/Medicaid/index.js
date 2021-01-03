import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { func, object } from 'prop-types';
import * as immutable from 'object-path-immutable';
import { withRouter } from 'react-router';

import { prefetch, query } from 'sly/web/services/api';
import { WIZARD_STEP_COMPLETED } from 'sly/web/services/api/constants';
import { Medicaid } from 'sly/web/components/wizards/assessment';
import { createValidator, required } from 'sly/web/services/validation';

const validate = createValidator({
  medicaid: [required],
});

const ReduxForm = reduxForm({
  form: 'MedicaidForm',
  destroyOnUnmount: false,
  validate,
})(Medicaid);

@withRouter
@prefetch('uuidAux', 'getUuidAux', req => req({ id: 'me' }))
@query('createAction', 'createUuidAction')
@query('updateUuidAux', 'updateUuidAux')

export default class MedicaidFormContainer extends Component {
  static propTypes = {
    createAction: func.isRequired,
    location: object.isRequired,
    onSubmit: func.isRequired,
    status: object,
    updateUuidAux: func,
  };

  updateFinancialInfo = (medicaidChoice) => {
    const { updateUuidAux, status } = this.props;
    if (medicaidChoice === 'yes') {
      const { uuidAux: { result: rawUuidAux } } =  status;
      const sendUuidAux = immutable.set(rawUuidAux, 'attributes.uuidInfo.financialInfo.medicaid', true);
      return updateUuidAux({ id: sendUuidAux.id }, sendUuidAux);
    }
    return Promise.resolve();
  };

  handleSubmit = (data) => {
    const { createAction, location: { pathname }, onSubmit } = this.props;
    const { medicaid } = data;
    return Promise.all([createAction({
      type: 'UUIDAction',
      attributes: {
        actionType: WIZARD_STEP_COMPLETED,
        actionPage: pathname,
        actionInfo: {
          stepName: 'step-6:Medicaid',
          wizardName: 'assessmentWizard',
          data,
        },
      },
    }), this.updateFinancialInfo(medicaid)])
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
