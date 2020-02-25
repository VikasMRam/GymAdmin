import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';
import pick from 'lodash/pick';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { required, createValidator, email, usPhone, dependentRequired } from 'sly/services/validation';
import clientPropType from 'sly/propTypes/client';
import userProptype from 'sly/propTypes/user';
import { query, prefetch, getRelationship, invalidateRequests } from 'sly/services/newApi';
import DashboardCommunityDetailsForm from 'sly/components/organisms/DashboardCommunityDetailsForm';
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

const mapStateToProps = (state, { status }) => ({
  address: getRelationship(state, status.community.result, 'address'),
});

@query('updateCommunity', 'updateCommunity')
@withUser
@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.id,
}))
@connect(mapStateToProps, {
  invalidateCommunity: ({ id }) => invalidateRequests('getCommunity', { id }),
})

export default class DashboardCommunityDetailsFormContainer extends Component {
  static propTypes = {
    updateCommunity: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    user: userProptype,
    community: clientPropType.isRequired,
    match: object.isRequired,
    status: object,
    address: object,
    invalidateCommunity: func,
  };

  handleSubmit = (values) => {
    const { match, updateCommunity, invalidateCommunity } = this.props;
    const { id } = match.params;

    const { attributes, relationships } = values;
    const { address } = relationships;
    return updateCommunity({ id }, {
      attributes,
      relationships: {
        address: { data: address },
      },
    }).then(() => invalidateCommunity({ id }));
  };

  render() {
    const { community, status, user, address, ...props } = this.props;

    const canEdit = userIs(user, PLATFORM_ADMIN_ROLE);
    const initialValues = pick(
      status.community.result,
      [
        'attributes.name',
        'attributes.propInfo.communityPhone',
        'attributes.propInfo.licenseNumber',
        'attributes.propInfo.ownerName',
        'attributes.propInfo.ownerEmail',
        'attributes.propInfo.typeCare',
        'attributes.propInfo.respiteAllowed',
      ],
    );
    initialValues.relationships = {
      address,
    };
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
