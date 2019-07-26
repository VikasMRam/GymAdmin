import React, { Component } from 'react';
import { query, prefetch } from 'sly/services/newApi';
import { shapeOf } from 'prop-types';

import DashboardAdminSearchCommunityAgents from 'sly/components/organisms/DasboardAdminSearchCommunityAgents';

@prefetch('communities', 'getCommunities', (req, { filter }) => req({ ...filter }))

export default class DashboardAdminSearchContainer extends Component {

  static propTypes = {
    filter: shapeOf({

    }),
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('Handle Submit called');
  };
  render() {
    const { communities } = this.props;
    return
    ( <DashboardAdminSearchCommunityAgents
        handleSubmit={this.handleSubmit}
        communities={communities}
      />
    );
  }
}
