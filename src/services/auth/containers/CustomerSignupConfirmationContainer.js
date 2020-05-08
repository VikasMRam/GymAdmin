import React, { Component } from 'react';
import { func, object } from 'prop-types';

import { withUser } from 'sly/services/api';
import CustomerSingupConfirmation from 'sly/services/auth/components/CustomerSignupConfirmation'

@withUser
export default class CustomerSignupConfirmationContainer extends Component {
  static propTypes = {
    onSubmit: func,
    user: object,
  };


  render() {
    const { onSubmit, user } = this.props;

    return (
      <CustomerSingupConfirmation onSubmit={onSubmit} user={user}/>
    );
  }
}
