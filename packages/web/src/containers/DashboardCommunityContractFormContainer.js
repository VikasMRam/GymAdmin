import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func, shape } from 'prop-types';
import pick from 'lodash/pick';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import clientPropType from 'sly/web/propTypes/client';
import userProptype from 'sly/web/propTypes/user';
import { query, prefetch, getRelationship } from 'sly/web/services/api';
import withUser from 'sly/web/services/api/withUser';
import { userIs } from 'sly/web/services/helpers/role';
import { PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE } from 'sly/web/constants/roles';
import DashboardCommunityContractForm from 'sly/web/components/organisms/DashboardCommunityContractForm';
import { rgsAuxAttributes } from 'sly/web/propTypes/community';
import { patchFormInitialValues } from 'sly/web/services/edits';

const formName = 'DashboardCommunityContractForm';

const ReduxForm = reduxForm({
  form: formName,
})(DashboardCommunityContractForm);

@query('updateCommunity')
@withUser
@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.id,
  include: 'suggested-edits',
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
    currentValues: object,
    match: object.isRequired,
    rgsAux: shape({
      attributes: rgsAuxAttributes,
    }),
    status: object,
    currentEdit: object,
  };

  handleSubmit = (values) => {
    const { community, updateCommunity, notifyError, notifyInfo } = this.props;
    const { id } = community;
    const { rgsAux, ...attributes } = values;
    return updateCommunity({ id }, {
      attributes,
      relationships: {
        rgsAux: { data: {
          attributes: rgsAux
        } },
      },
    })
      .then(() => notifyInfo(`Details for ${community.name} saved correctly`))
      .catch(() => notifyError(`Details for ${community.name} could not be saved`));
  };

  render() {
    const { community, status, user, currentValues, rgsAux, currentEdit, ...props } = this.props;

    const canEdit = !currentEdit?.isPendingForAdmin
      && userIs(user, PLATFORM_ADMIN_ROLE | PROVIDER_OD_ROLE);

    const initialValues = pick(
      status.community.result.attributes,
      [],
    );

    initialValues.rgsAux = rgsAux.attributes;

    patchFormInitialValues(initialValues, currentEdit);

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
