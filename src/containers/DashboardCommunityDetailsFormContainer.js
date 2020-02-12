import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';
import pick from 'lodash/pick';

import { required, createValidator, email, usPhone, dependentRequired } from 'sly/services/validation';
import clientPropType from 'sly/propTypes/client';
import userProptype from 'sly/propTypes/user';
import { query, prefetch } from 'sly/services/newApi';
import DashboardCommunityDetailsForm from 'sly/components/organisms/DashboardCommunityDetailsForm';
import { withRouter } from 'react-router';
import withUser from 'sly/services/newApi/withUser';
import { userIs } from 'sly/services/helpers/role';
import { PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';

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
@withUser
@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.id,
}))

export default class DashboardCommunityDetailsFormContainer extends Component {
  static propTypes = {
    updateCommunity: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    user: userProptype,
    community: clientPropType.isRequired,
    status: object,
  };

  handleSubmit = (data) => {
    console.log('submit data', data);
  };

  render() {
    const { community, status, user, ...props } = this.props;

    const canEdit = userIs(user, PLATFORM_ADMIN_ROLE);
    const initialValues = pick(
      status.community.result.attributes,
      [
        'name',
        'propInfo.communityPhone',
        'propInfo.ownerName',
        'propInfo.ownerEmail',
        'propInfo.typeCare',
        'propInfo.respiteAllowed',
      ],
    );

    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        user={user}
        canEdit={canEdit}
        {...props}
      />
    );
  }
}
