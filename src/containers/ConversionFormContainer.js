import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { object } from 'prop-types';

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
  static propTypes = {
    community: object.isRequired,
  };

  submit = data => {
    const { submit, community, next } = this.props;
    submit({
      action: REQUEST_CALLBACK,
      value: {
        user: { ...data },
        propertyIds: [community.id],
      }
    }).then(next);
  }

  render() {
    const { submit, ...props } = this.props;
    return <ReduxForm onSubmit={this.submit} {...props} />;
  }
}

const mapDispatchToProps = dispatch => ({
  submit: data => {
    return dispatch(resourceCreateRequest('userAction', data));
  },
});

export default connect(null, mapDispatchToProps)(ConversionFormContainer);

