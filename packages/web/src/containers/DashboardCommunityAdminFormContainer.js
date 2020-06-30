import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func, shape } from 'prop-types';
import pick from 'lodash/pick';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import clientPropType from 'sly/web/propTypes/client';
import userProptype from 'sly/web/propTypes/user';
import { query, prefetch, getRelationship } from 'sly/web/services/api';
import withUser from 'sly/web/services/api/withUser';
import { userIs } from 'sly/web/services/helpers/role';
import { PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE } from 'sly/web/constants/roles';
import DashboardCommunityAdminForm from 'sly/web/components/organisms/DashboardCommunityAdminForm';
import { patchFormInitialValues } from 'sly/web/services/edits';
import { rgsAuxAttributes } from 'sly/web/propTypes/community';
import defaultsDeep from 'lodash/defaultsDeep';

const formName = 'DashboardCommunityAdminForm';

const ReduxForm = reduxForm({
  form: formName,
})(DashboardCommunityAdminForm);

const mapStateToProps = (state, { status }) => ({
  rgsAux: getRelationship(state, status.community.result, 'rgsAux'),
  communityUser: getRelationship(state, status.community.result, 'user'),
  currentValues: state.form[formName]?.values,
});

@query('updateCommunity', 'updateCommunity')
@withUser
@withRouter
@prefetch('community', 'getCommunity', (req, { match }) => req({
  id: match.params.id,
  include: 'suggested-edits',
}))
@connect(mapStateToProps)

export default class DashboardCommunityAdminFormContainer extends Component {
  static propTypes = {
    updateCommunity: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    user: userProptype,
    community: clientPropType.isRequired,
    communityUser: userProptype,
    currentValues: object,
    rgsAux: shape({
      attributes: rgsAuxAttributes,
    }),
    match: object.isRequired,
    status: object,
    initialUser: object,
    currentEdit: object,
  };

  handleSubmit = (values) => {
    const { match, updateCommunity, community, notifyError, notifyInfo } = this.props;
    const { id } = match.params;
    const { rgsAux, user, ...attributes } = values;

    console.log('attributes', attributes);

    return updateCommunity({ id }, {
      attributes,
      relationships: {
        user: { data: {
          type: 'User',
          id: user.value,
        } },
        rgsAux: { data: {
          attributes: rgsAux,
        } },
      },
    })
      .then(() => notifyInfo(`Details for ${community.name} saved correctly`))
      .catch(() => notifyError(`Details for ${community.name} could not be saved`));
  };

  render() {
    const { community, rgsAux, communityUser, status, user, currentValues, currentEdit, ...props } = this.props;

    const canEdit = !currentEdit?.isPendingForAdmin
      && userIs(user, PLATFORM_ADMIN_ROLE | PROVIDER_OD_ROLE);

    const initialValues = pick(
      status.community.result.attributes,
      [
        'propInfo.covidInfoTitle',
        'propInfo.covidInfoDescription',
        'propInfo.promoTitle',
        'propInfo.promoDescription',
        'propInfo.adminNotes',
        'slyScore',
        'status',
        'propInfo.websiteTitle',
        'propInfo.websiteMetaDescription',
      ],
    );

    // passes by ref
    defaultsDeep(initialValues, {
      user: {
        value: communityUser.id,
        label: communityUser.attributes.name,
      },
      rgsAux: rgsAux.attributes,
    });

    patchFormInitialValues(initialValues, currentEdit);

    console.log('render', { currentEdit, rgsAux, currentValues, initialValues });

    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        community={community}
        currentValues={currentValues}
        user={user}
        canEdit={canEdit}
        {...props}
      />
    );
  }
}
