import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { object, func, bool } from 'prop-types';

import { getDetail } from 'sly/store/selectors';

import {
  createValidator,
  createBooleanValidator,
  notProvided,
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

const hasOnlyEmail = createBooleanValidator({
  fullName: [notProvided],
  email: [required, email],
  phone: [notProvided],
});

const ReduxForm = reduxForm({
  form: 'ConversionForm',
  destroyOnUnmount: false,
  // required to refresh when initialValues change. Ref: https://redux-form.com/6.7.0/examples/initializefromstate/
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate,
})(ConversionForm);

class ConversionFormContainer extends Component {
  static propTypes = {
    community: object,
    gotoWhatNext: func.isRequired,
    userDetails: object,
    submitExpressConversion: func.isRequired,
    submitRegularConversion: func.isRequired,
    express: bool.isRequired,
  };

  static defaultProps = {
    express: false,
  };

  render() {
    const {
      submitExpressConversion,
      submitRegularConversion,
      gotoWhatNext,
      userDetails,
      community,
      express,
      ...props
    } = this.props;

    const { email, fullName, phone } = userDetails;
    const initialValues = {
      email,
      phone,
      full_name: fullName,
    };
    let agent = null;
    let contact = null;
    if (community) {
      const { agents, contacts } = community;
      agent = agents[0];
      contact = contacts[0];
    }
    const submitConversion = express
      ? submitExpressConversion
      : submitRegularConversion;

    return (
      <ReduxForm
        initialValues={initialValues}
        onSubmit={submitConversion}
        agent={agent}
        contact={contact}
        gotoWhatNext={gotoWhatNext}
        community={community}
        hasOnlyEmail={hasOnlyEmail(userDetails)}
        {...props}
      />
    );
  }
}

const mapStateToProps = state => ({
  userDetails: (getDetail(state, 'userAction') || {}).userDetails || {},
});

export default connect(mapStateToProps)(ConversionFormContainer);

