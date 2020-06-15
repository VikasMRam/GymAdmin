import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { object, func } from 'prop-types';
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

const formName = 'DashboardCommunityAdminForm';

const ReduxForm = reduxForm({
  form: formName,
})(DashboardCommunityAdminForm);

const mapStateToProps = (state, { status }) => ({
  communityUser: getRelationship(state, status.community.result, 'user'),
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
    match: object.isRequired,
    status: object,
    initialUser: object,
    currentEdit: object,
  };

  state = {
    communityUser: null,
  };

  componentDidMount() {
    const { communityUser } = this.props;
    const { attributes } = communityUser;
    this.setState({ communityUser: {
      value: communityUser.id,
      label: attributes.name,
    }});
  }

  onSelectChange = (option) => {
    this.setState({communityUser: option});
  };


  handleSubmit = (values) => {
    const { match, updateCommunity, community, notifyError, notifyInfo } = this.props;
    const { id } = match.params;
    const { communityUser } = this.state;

    if (typeof values.status === 'string') {
      values.status = parseInt(values.status)
    }

    if (typeof values.slyScore === 'string') {
      values.slyScore = parseInt(values.slyScore)
    }

    return updateCommunity({ id }, {
      attributes: values,
      relationships: {
        user: {
          data: {
            type: 'User',
            id: communityUser.value,
          }
        },
      },
    })
      .then(() => notifyInfo(`Details for ${community.name} saved correctly`))
      .catch(() => notifyError(`Details for ${community.name} could not be saved`));
  };

  render() {
    const { community, status, user, currentEdit, ...props } = this.props;

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
        'propInfo.websiteMetaDescription'
      ],
    );

    patchFormInitialValues(initialValues, currentEdit);

    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        initialValues={initialValues}
        community={community}
        user={user}
        canEdit={canEdit}
        onSelectChange={this.onSelectChange}
        propUser={this.state.communityUser}
        {...props}
      />
    );
  }
}
