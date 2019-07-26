import React, { Component, Fragment } from 'react';
import { func, arrayOf } from 'prop-types';
import { adminCommunityPropType } from 'sly/propTypes/community';
import DashboardCommunitySearchBox from 'sly/components/organisms/DashboardCommunitySearchBox';
import DashboardAdminCommunityAgentList from 'sly/components/organisms/DashboardAdminCommunityAgentList';

export default class DashboardAdminSearchCommunityAgents extends Component {
  static propTypes = {
    handleSubmit: func.isRequired,
    communities: arrayOf(adminCommunityPropType),
  };

  render() {
    const { handleSubmit, communities } = this.props;
    return (
      <Fragment>
        <DashboardCommunitySearchBox handleSubmit={handleSubmit} />
        <DashboardAdminCommunityAgentList communitiesWithAgents={communities} />
      </Fragment>
    );
  }
}
