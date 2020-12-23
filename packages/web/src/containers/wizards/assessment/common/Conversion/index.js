import React, { Component } from 'react';
// import { reduxForm } from 'redux-form';
import { func, object } from 'prop-types';
import { withRouter } from 'react-router';

import { getConversionContent } from 'sly/web/services/helpers/conversion';
import { query } from 'sly/web/services/api';
import { WIZARD_STEP_COMPLETED } from 'sly/web/services/api/constants';
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
  };

  postSubmit = (data) => {
    const { createAction, location: { pathname }, onSubmit } = this.props;

    // console.log('l:', location);
    console.log('p:', pathname);
    // onSubmit();
    return createAction({
      type: 'UUIDAction',
      attributes: {
        actionType: WIZARD_STEP_COMPLETED,
        actionPage: pathname,
        actionInfo: {
          stepName: 'step-9:Conversion',
          wizardName: 'assessmentWizard',
          data,
        },
      },
    })
      .then(onSubmit);
  };

  render() {
    const { conversionInfo = {} } = this.props;
    const { entry } = conversionInfo;
    const { heading, description } = getConversionContent(entry, 'signup');
    return (
      <Conversion
        {...this.props}
        hasTip
        heading={heading}
        description={description}
        onConversionSuccess={this.postSubmit}
      />
    );
  }
}
