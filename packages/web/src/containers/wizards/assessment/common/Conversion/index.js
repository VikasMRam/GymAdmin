import React, { Component } from 'react';
// import { reduxForm } from 'redux-form';
import { func, object } from 'prop-types';
import { withRouter } from 'react-router';

import { getWizardContentFromCta } from 'sly/web/services/helpers/wizard';
import { query } from 'sly/web/services/api';
import { WIZARD_STEP_COMPLETED, WIZARD_POSTCONVERSION_INFO } from 'sly/web/services/api/constants';
import { Conversion } from 'sly/web/components/wizards/assessment';
// import { createValidator, required } from 'sly/web/services/validation';

// const validate = createValidator({
//   adl: [required],
// });

// const ReduxForm = reduxForm({
//   form: 'ADLForm',
//   destroyOnUnmount: false,
//   validate,
// })(Conversion);

@withRouter
@query('createAction', 'createUuidAction')

export default class ConversionContainer extends Component {
  static propTypes = {
    createAction: func.isRequired,
    location: object.isRequired,
    onSubmit: func.isRequired,
    conversionInfo: object.isRequired,
    data: object,
  };

  postSubmit = () => {
    const { createAction, location: { pathname }, onSubmit, data } = this.props;
    return createAction({
      type: 'UUIDAction',
      attributes: {
        actionType: WIZARD_STEP_COMPLETED,
        actionPage: pathname,
        actionInfo: {
          wizardPostConversionInfo: WIZARD_POSTCONVERSION_INFO,
          stepName: 'step-8:Conversion',
          wizardName: 'assessmentWizard',
          data,
        },
      },
    })
      .then(onSubmit);
  };

  render() {
    const { conversionInfo = {} } = this.props;
    const { cta } = conversionInfo;
    const { signup } = getWizardContentFromCta(cta);
    return (
      <Conversion
        {...this.props}
        hasTip
        {...signup}
        onConversionSuccess={this.postSubmit}
      />
    );
  }
}
