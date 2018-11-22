import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { func, object } from 'prop-types';

import AdvancedInfoForm from 'sly/components/organisms/AdvancedInfoForm';

const ReduxForm = reduxForm({
  form: 'advancedInfo',
  initialValues: {
    type_of_care: [],
    type_of_room: [],
    time_to_move: [],
    budget: [],
  },
})(AdvancedInfoForm);

export default class AdvancedInfoFormContainer extends Component {
  static propTypes = {
    community: object,
    submitAdvancedInfo: func.isRequired,
  };

  render() {
    const { submitAdvancedInfo, ...props } = this.props;
    return (
      <ReduxForm
        onSubmit={submitAdvancedInfo}
        {...props}
      />
    );
  }
}

