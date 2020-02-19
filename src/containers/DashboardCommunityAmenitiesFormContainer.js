import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';
import pick from 'lodash/pick';
import defaultsDeep from 'lodash/defaultsDeep';
import { withRouter } from 'react-router';

import clientPropType from 'sly/propTypes/client';
import userProptype from 'sly/propTypes/user';
import { query, prefetch } from 'sly/services/newApi';
import withUser from 'sly/services/newApi/withUser';
import { userIs } from 'sly/services/helpers/role';
import { PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';
import DashboardCommunityAmenitiesForm from 'sly/components/organisms/DashboardCommunityAmenitiesForm';

const formName = 'DashboardCommunityAmenitiesForm';

const ReduxForm = reduxForm({
  form: formName,
})(DashboardCommunityAmenitiesForm);

@query('updateCommunity', 'updateCommunity')
@withUser
@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.id,
}))

export default class DashboardCommunityAmenitiesFormContainer extends Component {
  static propTypes = {
    updateCommunity: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    user: userProptype,
    community: clientPropType.isRequired,
    currentValues: object.isRequired,
    match: object.isRequired,
    status: object,
  };

  handleSubmit = (values) => {
    const { match, updateCommunity } = this.props;
    const { id } = match.params;

    return updateCommunity({ id }, {
      attributes: values,
    });
  };

  render() {
    const { community, status, user, currentValues, ...props } = this.props;

    const canEdit = userIs(user, PLATFORM_ADMIN_ROLE);

    const initialValues = pick(
      status.community.result.attributes,
      [
        'propInfo.profileServices',
        'propInfo.communitySpace',
        'propInfo.communitySpaceOther',
      ],
    );

    // passes by ref
    defaultsDeep(initialValues, {
      propInfo: {
        profileServices: [],
      },
    });

    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        community={community}
        user={user}
        canEdit={canEdit}
        {...props}
      />
    );
  }
}
