import React, { Component } from 'react';
import { query, prefetch } from 'sly/services/newApi';
import { arrayOf, func } from 'prop-types';
import { adminCommunityPropType } from 'sly/propTypes/community';
import DashboardAdminSearchCommunityAgents from 'sly/components/organisms/DasboardAdminSearchCommunityAgents';

@prefetch('communities', 'getCommunities', (req, { query }) => {
  const modQ = {};
  Object.entries(query).forEach(([k, v]) => {
    modQ[`filter[${k}]`] = v;
  });
  return req({ ...modQ });
})

export default class DashboardAdminSearchContainer extends Component {
  static propTypes = {
    communities: arrayOf(adminCommunityPropType),
    handleCommunitySearch: func.isRequired,
  };

  render() {
    const { communities, handleCommunitySearch } = this.props;
    return (<DashboardAdminSearchCommunityAgents
      handleCommunitySearch={handleCommunitySearch}
      communities={communities}
    />);
  }
}
