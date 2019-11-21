import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';

import agentPropType from 'sly/propTypes/agent';
import AgentRegionPage from 'sly/components/pages/AgentRegionPage';
import { titleize } from 'sly/services/helpers/strings';
import { getAgentUrl } from 'sly/services/helpers/url';
import SlyEvent from 'sly/services/helpers/events';
import { getSearchParamFromPlacesResponse, filterLinkPath } from 'sly/services/helpers/agents';
import { getAgentParams } from 'sly/services/helpers/search';
import prefetch from 'sly/services/newApi/prefetch';

@prefetch('agentsList', 'getAgents', (req, { match, location }) => req(getAgentParams(match, location)))

export default class AgentRegionPageContainer extends Component {
  static propTypes = {
    match: object,
    agentsList: arrayOf(agentPropType),
    history: object,
  };

  handleLocationSearch = (result) => {
    const { history } = this.props;
    const event = {
      action: 'submit', category: 'agentsSearch', label: result.formatted_address,
    };
    SlyEvent.getInstance().sendEvent(event);

    const searchParams = getSearchParamFromPlacesResponse(result);
    const { path } = filterLinkPath(searchParams);
    history.push(path);
  };

  render() {
    const {
      agentsList, match, history,
    } = this.props;

    const { location } = history;
    const citySlug = match.params.city;

    const newAgentsList = (agentsList || [])
      .filter(agent => agent.status > 0)
      .map((agent) => {
        const url = getAgentUrl(agent);
        const newAgent = { ...agent, url };
        return newAgent;
      });

    let locationName = null;
    if (citySlug) {
      locationName = titleize(citySlug);
      const cityParts = citySlug.split('-');
      if (cityParts.length > 1) {
        const state = cityParts.pop();
        const city = cityParts.join('-');
        locationName = `${titleize(city)} ${state.toUpperCase()}`;
      }
    } else {
      locationName = titleize(match.params.region);
    }

    const title = `${locationName} Partner Agents`;
    return (
      <AgentRegionPage
        onLocationSearch={this.handleLocationSearch}
        agentsList={newAgentsList}
        title={title}
        locationName={locationName}
        isRegionPage={!citySlug}
        location={location}
      />
    );
  }
}

