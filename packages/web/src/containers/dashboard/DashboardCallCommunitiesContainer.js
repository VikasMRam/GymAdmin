import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, object, func } from 'prop-types';
import { generatePath } from 'react-router';

import { normalizeResponse, prefetch, query } from 'sly/services/api';
import DashboardCommunityReferralSearch from 'sly/components/organisms/DashboardCommunityReferralSearch';


@prefetch('voiceCommunities', 'getCommunities', (req, { voiceCall }) => {
  const filters = {};
  filters['filter[phone]'] = voiceCall.toNumber;
  return req(filters);
})
@query('getCommunities', 'getCommunities')

export default class DashboardCallCommunitiesContainer extends Component {
  static propTypes = {
    id: string,
    voiceCall: object,
    query: object,
    communities: object,
    getCommunities: func,
    history: object,
  };
  state = {
    communities: null,
  };

  handleCommunitySearch = ({ name, geo }) => {
    const { getCommunities } = this.props;
    // const filters = this.getSearchFilters(nameOrZip);
    const filters = {};
    if (geo) {
      filters['filter[geo]'] = geo;
    } else if (name) {
      filters['filter[name]'] = name;
    }
    return getCommunities(filters).then((resp) => {
      const communities = normalizeResponse(resp.body);
      return this.setState({
        communities,
      });
    });
  };


  render() {
    // TODO: Fixme or shoot me in the head.
    const { voiceCommunities } = this.props;
    const { communities } = this.state;
    const finalCommunities = communities || voiceCommunities;
    const subtitle = "Communities Viewed Recently";
    if (!finalCommunities) {
      return <div>Loading...</div>;
    }
    return (
      <DashboardCommunityReferralSearch isAdminUser communities={finalCommunities} handleCommunitySearch={this.handleCommunitySearch} showAgentList />
    );
  }
}
