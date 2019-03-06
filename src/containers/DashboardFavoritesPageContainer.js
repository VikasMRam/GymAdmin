import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';

import { query, withApi } from 'sly/services/newApi';
import DashboardFavoritesPage from 'sly/components/pages/DashboardFavoritesPage';

@query('userSaves', 'getUserSaves', getUserSaves => getUserSaves())

class DashboardFavoritesPageContainer extends Component {
  static propTypes = {
    userSaves: arrayOf(object),
  };

  render() {
    const { userSaves } = this.props;

    return (
      <DashboardFavoritesPage userSaves={userSaves} />
    );
  }
}

export default withApi(DashboardFavoritesPageContainer);
