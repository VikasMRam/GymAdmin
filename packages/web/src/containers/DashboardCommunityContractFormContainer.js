import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func, shape } from 'prop-types';
import pick from 'lodash/pick';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import clientPropType from 'sly/propTypes/client';
import userProptype from 'sly/propTypes/user';
import { query, prefetch, getRelationship } from 'sly/services/api';
import withUser from 'sly/services/api/withUser';
import { userIs } from 'sly/services/helpers/role';
import { PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';
import DashboardCommunityContractForm from 'sly/components/organisms/DashboardCommunityContractForm';
import { rgsAuxAttributes } from 'sly/propTypes/community';

const formName = 'DashboardCommunityContractForm';

const ReduxForm = reduxForm({
  form: formName,
})(DashboardCommunityContractForm);

@query('updateCommunity')
@withUser
@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.id,
}))
@connect((state, { status }) => ({
  rgsAux: getRelationship(state, status.community.result, 'rgsAux'),
  currentValues: state.form[formName]?.values,
  state,
}))

export default class DashboardCommunityContractFormContainer extends Component {
  static propTypes = {
    updateCommunity: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    user: userProptype,
    community: clientPropType.isRequired,
    currentValues: object.isRequired,
    match: object.isRequired,
    rgsAux: shape({
      attributes: rgsAuxAttributes,
    }),
    status: object,
  };

  handleSubmit = (values) => {
    const { community, updateCommunity, notifyError, notifyInfo } = this.props;
    const { id } = community;
    const { relationships } = values;
    const { rgsAux } = relationships;
    return updateCommunity({ id }, {
      attributes: community,
      relationships: {
        rgsAux: { data: rgsAux },
      },
    })
      .then(() => notifyInfo(`Details for ${community.name} saved correctly`))
      .catch(() => notifyError(`Details for ${community.name} could not be saved`));
  };

  render() {
    const { community, status, user, currentValues, rgsAux, ...props } = this.props;

    const canEdit = userIs(user, PLATFORM_ADMIN_ROLE);

    const initialValues = pick(
      status.community.result,
      [],
    );
    initialValues.relationships = {
      rgsAux,
    };

    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        currentValues={currentValues}
        community={community}
        user={user}
        canEdit={canEdit}
        {...props}
      />
    );
  }
}
