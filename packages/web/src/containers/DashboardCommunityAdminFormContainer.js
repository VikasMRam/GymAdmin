import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func, shape } from 'prop-types';
import pick from 'lodash/pick';
import { connect } from 'react-redux';

import { withRouter } from 'react-router';
import clientPropType from 'sly/common/propTypes/client';
import userProptype from 'sly/common/propTypes/user';
import { query, prefetch, getRelationship } from 'sly/web/services/api';
import withUser from 'sly/web/services/api/withUser';
import { userIs } from 'sly/web/services/helpers/role';
import { PLATFORM_ADMIN_ROLE, PROVIDER_OD_ROLE } from 'sly/common/constants/roles';
import DashboardCommunityAdminForm from 'sly/web/components/organisms/DashboardCommunityAdminForm';
import { patchFormInitialValues } from 'sly/web/services/edits';
import { rgsAuxAttributes } from 'sly/common/propTypes/community';
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
    const { rgsAux, user, status, tags, ...attributes } = values;

    attributes.status = parseFloat(status);

    const relationships = {
      user: { data: {
        type: 'User',
          id: user.value,
      } },
      rgsAux: { data: {
        attributes: rgsAux,
      } },
    };

    if (tags) {
      const jsonapiTags = tags.map(({ label, value }) => ({ type: 'Tag', id: value, attributes: { name: label } }));
      relationships.tags = { data : jsonapiTags }
    }

    return updateCommunity({ id }, {
      attributes,
      relationships,
    })
      .then(() => notifyInfo(`Details for ${community.name} saved correctly`))
      .catch(() => notifyError(`Details for ${community.name} could not be saved`));
  };

  render() {
    const { community, rgsAux, communityUser, status, user, currentValues, currentEdit, ...props } = this.props;
    const { tags: modelTags } = community;
    const tags = modelTags.map(({ id, name }) => ({ label: name, value: id }));


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
      tags,
    });

    patchFormInitialValues(initialValues, currentEdit);

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
