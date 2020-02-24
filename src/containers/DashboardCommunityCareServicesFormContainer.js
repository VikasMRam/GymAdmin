import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';
import pick from 'lodash/pick';
import { withRouter } from 'react-router';
import * as immutable from 'object-path-immutable';

import clientPropType from 'sly/propTypes/client';
import userProptype from 'sly/propTypes/user';
import { query, prefetch } from 'sly/services/newApi';
import DashboardCommunityCareServicesForm from 'sly/components/organisms/DashboardCommunityCareServicesForm';
import withUser from 'sly/services/newApi/withUser';
import { userIs } from 'sly/services/helpers/role';
import { PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';

const formName = 'DashboardCommunityCareServicesForm';

const ReduxForm = reduxForm({
  form: formName,
})(DashboardCommunityCareServicesForm);

@query('updateCommunity', 'updateCommunity')
@withUser
@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.id,
}))

export default class DashboardCommunityCareServicesFormContainer extends Component {
  static propTypes = {
    updateCommunity: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    user: userProptype,
    community: clientPropType.isRequired,
    status: object,
  };

  handleSubmit = (values) => {
    const { status, updateCommunity } = this.props;
    const rawCommunity = status.community.result;
    const { id } = rawCommunity;

    return updateCommunity({ id }, {
      attributes: values,
    });
  };

  render() {
    const { community, status, user, ...props } = this.props;
    // console.log(status);
    // console.log(JSON.stringify(community));
    const canEdit = userIs(user, PLATFORM_ADMIN_ROLE);
    const initialValues = pick(
      status.community.result.attributes,
      [
        'propInfo.careServices',
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
