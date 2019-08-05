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
  return req({ ...modQ, include: 'agents' });
})

export default class DashboardAdminSearchContainer extends Component {
  static propTypes = {
    communities: arrayOf(adminCommunityPropType),
    handleCommunitySearch: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
  };

  render() {
    const {
      communities, handleCommunitySearch, notifyInfo, notifyError
    } = this.props;
    return (<DashboardAdminSearchCommunityAgents
      handleCommunitySearch={handleCommunitySearch}
      communities={communities}
      notifyInfo={notifyInfo}
      notifyError={notifyError}
    />);
  }
}
