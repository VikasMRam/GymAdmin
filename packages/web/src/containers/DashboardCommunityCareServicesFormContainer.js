import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';
import pick from 'lodash/pick';
import { withRouter } from 'react-router';

import clientPropType from 'sly/web/propTypes/client';
import userProptype from 'sly/web/propTypes/user';
import { query, prefetch } from 'sly/web/services/api';
import DashboardCommunityCareServicesForm from 'sly/web/components/organisms/DashboardCommunityCareServicesForm';
import withUser from 'sly/web/services/api/withUser';
import { userIs } from 'sly/web/services/helpers/role';
import { PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE } from 'sly/web/constants/roles';
import { patchFormInitialValues } from 'sly/web/services/edits';

const formName = 'DashboardCommunityCareServicesForm';

const ReduxForm = reduxForm({
  form: formName,
})(DashboardCommunityCareServicesForm);

@query('updateCommunity', 'updateCommunity')
@withUser
@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.id,
  include: 'suggested-edits',
}))

export default class DashboardCommunityCareServicesFormContainer extends Component {
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
      ],
    );

    patchFormInitialValues(initialValues, currentEdit);

    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        user={user}
        canEdit={canEdit}
        typeCare={typeCare}
        {...props}
      />
    );
  }
}
