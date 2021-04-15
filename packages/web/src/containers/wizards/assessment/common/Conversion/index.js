import React, { Component } from 'react';
// import { reduxForm } from 'redux-form';
import { func, object, string } from 'prop-types';
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
    experimentDescription: string,
    stepName: string,
  };

  static defaultProps = {
    stepName: 'step-8:Conversion',
  };

  postSubmit = () => {
    const { createAction, location: { pathname }, conversionInfo, onSubmit, data, stepName } = this.props;
    return createAction({
      type: 'UUIDAction',
      attributes: {
        actionType: WIZARD_STEP_COMPLETED,
        actionPage: pathname,
        actionInfo: {
          wizardPostConversionInfo: WIZARD_POSTCONVERSION_INFO,
          stepName,
          wizardName: 'assessmentWizard',
          data: {
            ...data,
            ...conversionInfo,
          },
        },
      },
    })
      .then(onSubmit);
  };

  render() {
    const { conversionInfo = {}, experimentDescription } = this.props;
    const { cta } = conversionInfo;
    const { signup } = getWizardContentFromCta(cta);
    if (experimentDescription) {
      signup.description = experimentDescription;
    }
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
