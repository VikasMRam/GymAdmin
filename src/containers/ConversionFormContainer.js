import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';

import { getDetail } from 'sly/store/selectors';

import {
  resourceCreateRequest,
} from 'sly/store/resource/actions';

import {
  createValidator,
  required,
  email,
  usPhone,
} from 'sly/services/validation';

import ConversionForm from 'sly/components/organisms/ConversionForm';

const validate = createValidator({
  full_name: [required],
  email: [required, email],
  phone: [required, usPhone],
});

const ReduxForm = reduxForm({
  form: 'ConversionForm',
  destroyOnUnmount: false,
  validate,
})(ConversionForm);

class ConversionFormContainer extends Component {
  static propTypes = {
    community: object.isRequired,
    submitConversion: func.isRequired,
  };

  render() {
    const { submitConversion, userDetails, ...props } = this.props;
    const { email, fullName, phone } = userDetails;
    const initialValues = {
      email,
      phone,
      full_name: fullName,
    };
    return (
      <ReduxForm
        initialValues={initialValues}
        onSubmit={submitConversion}
        {...props}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userDetails: (getDetail(state, 'userAction') || {}).userDetails || {},
});

export default connect(mapStateToProps)(ConversionFormContainer);

