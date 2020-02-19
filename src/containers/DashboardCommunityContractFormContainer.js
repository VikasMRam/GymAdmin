import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func, shape } from 'prop-types';
import pick from 'lodash/pick';
import defaultsDeep from 'lodash/defaultsDeep';
import { withRouter } from 'react-router';
import { branch } from 'recompose';

import clientPropType from 'sly/propTypes/client';
import userProptype from 'sly/propTypes/user';
import { query, prefetch, getRelationship } from 'sly/services/newApi';
import withUser from 'sly/services/newApi/withUser';
import { userIs } from 'sly/services/helpers/role';
import { PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';
import DashboardCommunityContractForm from 'sly/components/organisms/DashboardCommunityContractForm';
import { connect } from 'react-redux';
import { rgsAuxAttributes } from 'sly/propTypes/community';

const formName = 'DashboardCommunityContractForm';

const ReduxForm = reduxForm({
  form: formName,
})(DashboardCommunityContractForm);

@query('updateCommunity')
@query('updateRgsAux')
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
    updateRgsAux: func.isRequired,
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
    const { match, updateRgsAux } = this.props;
    const { id } = match.params;

    return updateRgsAux({ id }, {
      attributes: values,
    });
  };

  render() {
    const { community, status, user, currentValues, rgsAux, ...props } = this.props;

    const canEdit = userIs(user, PLATFORM_ADMIN_ROLE);

    const initialValues = pick(
      rgsAux.attributes,
      [
        'rgsInfo.contract_info',
      ],
    );

    // passes by ref
    defaultsDeep(initialValues, {
      rgsInfo: {
        contract_info: {
          hasContract: false,
          contractType: 'Percentage',
          notes: '',
        },
      },
    });

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
