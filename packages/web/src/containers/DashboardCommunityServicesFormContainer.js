import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';
import pick from 'lodash/pick';
import defaultsDeep from 'lodash/defaultsDeep';
import { withRouter } from 'react-router';

import clientPropType from 'sly/common/propTypes/client';
import userProptype from 'sly/common/propTypes/user';
import { query, prefetch } from 'sly/web/services/api';
import DashboardCommunityServicesForm from 'sly/web/components/organisms/DashboardCommunityServicesForm';
import withUser from 'sly/web/services/api/withUser';
import { userIs } from 'sly/web/services/helpers/role';
import { PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE } from 'sly/common/constants/roles';
import { patchFormInitialValues } from 'sly/web/services/edits';

const formName = 'DashboardCommunityServicesForm';

const ReduxForm = reduxForm({
  form: formName,
})(DashboardCommunityServicesForm);

@query('updateCommunity', 'updateCommunity')
@withUser
@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.id,
  include: 'suggested-edits',
}))

export default class DashboardCommunityServicesFormContainer extends Component {
  static propTypes = {
    updateCommunity: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    user: userProptype,
    community: clientPropType.isRequired,
    status: object,
    currentEdit: object,
  };

  handleSubmit = (values) => {
    const { status, updateCommunity, notifyError, notifyInfo } = this.props;
    const rawCommunity = status.community.result;
    const { id, attributes } = rawCommunity;

    return updateCommunity({ id }, {
      attributes: values,
    })
      .then(() => notifyInfo(`Details for ${attributes.name} saved correctly`))
      .catch(() => notifyError(`Details for ${attributes.name} could not be saved`));
  };

  render() {
    const { community, status, user, currentEdit, ...props } = this.props;
    const { propInfo } = community;
    const { typeCare } = propInfo;

    const canEdit = !currentEdit?.isPendingForAdmin
      && userIs(user, PLATFORM_ADMIN_ROLE | PROVIDER_OD_ROLE);

    const initialValues = pick(
      status.community.result.attributes,
      [
        'propInfo.careServices',
        'propInfo.personalSpace',
        'propInfo.communitySpace',
        'propInfo.communitySpaceOther',
        'propInfo.communityDescription',
        'propInfo.nonCareServices',
        'propInfo.nonCareServicesOther',
        'propInfo.careServicesOther',
      ],
    );

    patchFormInitialValues(initialValues, currentEdit);

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
        user={user}
        canEdit={canEdit}
        typeCare={typeCare}
        community={community}
        {...props}
      />
    );
  }
}
