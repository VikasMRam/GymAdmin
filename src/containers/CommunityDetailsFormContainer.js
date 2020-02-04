import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';

import { required, createValidator, email, usPhone, dependentRequired } from 'sly/services/validation';
import clientPropType from 'sly/propTypes/client';
import { query, prefetch } from 'sly/services/newApi';
import DashboardCommunityDetailsForm from 'sly/components/organisms/DashboardCommunityDetailsForm';
import { withRouter } from 'react-router';

const validate = createValidator({
  name: [required],
  phone: [usPhone, dependentRequired('email', 'Either Phone or Email is required')],
  email: [email, dependentRequired('phone', 'Either Email or Phone is required')],
});

const formName = 'DashboardCommunityDetailsForm';

const ReduxForm = reduxForm({
  form: formName,
  validate,
})(DashboardCommunityDetailsForm);

@query('updateCommunity', 'updateCommunity')

@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.id,
}))

export default class FamilyDetailsFormContainer extends Component {
  static propTypes = {
    updateCommunity: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    community: clientPropType.isRequired,
    status: object,
  };

  handleSubmit = (data) => {
  };

  render() {
    const { community, ...props } = this.props;
    const initialValues = {
    };

    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        community={community}
        {...props}
      />
    );
  }
}
