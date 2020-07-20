import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';
import pick from 'lodash/pick';
import defaultsDeep from 'lodash/defaultsDeep';
import { withRouter } from 'react-router';

import clientPropType from 'sly/common/propTypes/client';
import userProptype from 'sly/common/propTypes/user';
import { query, prefetch } from 'sly/web/services/api';
import withUser from 'sly/web/services/api/withUser';
import { userIs } from 'sly/web/services/helpers/role';
import { PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE } from 'sly/web/constants/roles';
import DashboardCommunityPricingForm from 'sly/web/components/organisms/DashboardCommunityPricingForm';
import { connect } from 'react-redux';
import { patchFormInitialValues } from 'sly/web/services/edits';

const formName = 'DashboardCommunityPricingForm';

const ReduxForm = reduxForm({
  form: formName,
})(DashboardCommunityPricingForm);

@query('updateCommunity', 'updateCommunity')
@withUser
@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.id,
  include: 'suggested-edits',
}))
@connect(state => ({
  currentValues: state.form[formName]?.values,
}))

export default class DashboardCommunityPricingFormContainer extends Component {
  static propTypes = {
    updateCommunity: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    user: userProptype,
    community: clientPropType.isRequired,
    currentValues: object.isRequired,
    match: object.isRequired,
    currentEdit: object,
    status: object,
  };

  handleSubmit = (values) => {
    const { match, updateCommunity, community, notifyError, notifyInfo } = this.props;
    const { id } = match.params;

    return updateCommunity({ id }, {
      attributes: values,
    })
      .then(() => notifyInfo(`Details for ${community.name} saved correctly`))
      .catch(() => notifyError(`Details for ${community.name} could not be saved`));
  };

  render() {
    const { community, status, currentEdit, user, currentValues, ...props } = this.props;

    const canEdit = !currentEdit?.isPendingForAdmin
      && userIs(user, PLATFORM_ADMIN_ROLE | PROVIDER_OD_ROLE);

    const initialValues = pick(
      status.community.result.attributes,
      [
        'propInfo.ratesText',
        'propInfo.sharedSuiteRate',
        'propInfo.privateSuiteRate',
        'propInfo.studioApartmentRate',
        'propInfo.oneBedroomApartmentRate',
        'propInfo.twoBedroomApartmentRate',
        'propInfo.alCareRate',
        'propInfo.mcCareRate',
        'propInfo.isCareCostIncluded',
        'propInfo.isUtilitiesIncluded',
      ],
    );

    patchFormInitialValues(initialValues, currentEdit);

    // passes by ref
    defaultsDeep(initialValues, {
      propInfo: {
        isCareCostIncluded: false,
      },
    });

    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        currentValues={currentValues}
        user={user}
        canEdit={canEdit}
        {...props}
      />
    );
  }
}
