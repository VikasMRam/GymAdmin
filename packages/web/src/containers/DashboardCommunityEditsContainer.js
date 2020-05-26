import React, { Component } from 'react';
import { object, func, arrayOf } from 'prop-types';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import clientPropType from 'sly/web/propTypes/client';
import userProptype from 'sly/web/propTypes/user';
import { query } from 'sly/web/services/api';
import withUser from 'sly/web/services/api/withUser';
import { userIs } from 'sly/web/services/helpers/role';
import { PLATFORM_ADMIN_ROLE } from 'sly/web/constants/roles';
import DashboardCommunityEditsList from 'sly/web/components/organisms/DashboardCommunityEditsList';
import DashboardCommunityEditsDetail from 'sly/web/components/organisms/DashboardCommunityEditsDetail';

@query('updateCommunity', 'updateCommunity')
@query('approveEdit', 'approveEdit')
@query('rejectEdit', 'rejectEdit')
@withUser
@withRouter

export default class DashboardCommunityEditsContainer extends Component {
  static propTypes = {
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    user: userProptype,
    community: clientPropType.isRequired,
    currentEdit: object,
    match: object.isRequired,
    status: object,
    suggestedEdits: arrayOf(object).isRequired,
    approveEdit: func,
    rejectEdit: func,
  };

  render() {
    const {
      community,
      user,
      currentEdit,
      approveEdit,
      rejectEdit,
      suggestedEdits,
      match,
    } = this.props;

    // eslint-disable-next-line no-bitwise
    const canEdit = userIs(user, PLATFORM_ADMIN_ROLE);
    const pathForEdits = (chunk = '') => `${match.url}${chunk}`;
    return (
      <Switch>
        <Route
          path={pathForEdits('/:editId')}
          render={props => (
            <DashboardCommunityEditsDetail
              {...props}
              community={community}
              canEdit={canEdit}
              currentEdit={currentEdit}
              approveEdit={approveEdit}
              rejectEdit={rejectEdit}
            />
          )}
        />
        <Route
          path={pathForEdits()}
          render={props => (
            <DashboardCommunityEditsList
              {...props}
              community={community}
              suggestedEdits={suggestedEdits}
            />
          )}
        />
      </Switch>
    );
  }
}
