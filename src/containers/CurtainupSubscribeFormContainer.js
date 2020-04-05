import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { func } from 'prop-types';

import withNotification from 'sly/controllers/withNotification';
import { createValidator, email, usPhone, dependentRequired } from 'sly/services/validation';
import CurtainupSubscribeForm from 'sly/components/organisms/CurtainupSubscribeForm';

const validate = createValidator({
  phone: [usPhone, dependentRequired('email', 'Either Phone or Email is required')],
  email: [email, dependentRequired('phone', 'Either Email or Phone is required')],
});

const formName = 'CurtainupSubscribeForm';

const ReduxForm = reduxForm({
  form: formName,
  validate,
})(CurtainupSubscribeForm);

@withNotification

export default class CurtainupSubscribeFormContainer extends Component {
  static propTypes = {
    notifyInfo: func.isRequired,
  };

  handleSubmit = () => {
    // todo: after user action in api is done
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
