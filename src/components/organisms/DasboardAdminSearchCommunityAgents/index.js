import React, { Component, Fragment } from 'react';
import { func, arrayOf } from 'prop-types';
import { adminCommunityPropType } from 'sly/propTypes/community';
import DashboardCommunitySearchBox from 'sly/components/organisms/DashboardCommunitySearchBox';
import DashboardAdminCommunityAgentList from 'sly/components/organisms/DashboardAdminCommunityAgentList';

export default class DashboardAdminSearchCommunityAgents extends Component {
  static propTypes = {
    handleCommunitySearch: func.isRequired,
    communities: arrayOf(adminCommunityPropType),
  };

  render() {
    const { handleCommunitySearch, communities } = this.props;
    return (
      <Fragment>
        <DashboardCommunitySearchBox handleSubmit={handleCommunitySearch} />
        <DashboardAdminCommunityAgentList communitiesWithAgents={communities || []} />
      </Fragment>
    );
  }
}
