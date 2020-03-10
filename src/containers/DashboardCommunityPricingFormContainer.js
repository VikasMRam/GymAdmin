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
import DashboardCommunityPricingForm from 'sly/components/organisms/DashboardCommunityPricingForm';
import { connect } from 'react-redux';

const formName = 'DashboardCommunityPricingForm';

const ReduxForm = reduxForm({
  form: formName,
})(DashboardCommunityPricingForm);

@query('updateCommunity', 'updateCommunity')
@withUser
@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.id,
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
    const { community, status, user, currentValues, ...props } = this.props;

    const canEdit = userIs(user, PLATFORM_ADMIN_ROLE);

    const initialValues = pick(
      status.community.result.attributes,
      [
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
