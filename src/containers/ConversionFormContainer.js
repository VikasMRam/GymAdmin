import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { REQUEST_CALLBACK } from 'sly/services/api/actions';

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
  submit = data => {
    const { submit, propertySlug } = this.props;
    submit({
      action: REQUEST_CALLBACK,
      value: {
        user: { ...data },
        propertyIds: [propertySlug],
      }
    });
  }

  render() {
    const { submit, ...props } = this.props;
    return <ReduxForm onSubmit={this.submit} {...props} />;
  }
}

const mapDispatchToProps = (dispatch, { propertySlug, next }) => ({
  submit: data => {
    data.slug = propertySlug;
    return dispatch(resourceCreateRequest('userAction', data)).then(next);
  },
});

export default connect(null, mapDispatchToProps)(ConversionFormContainer);

