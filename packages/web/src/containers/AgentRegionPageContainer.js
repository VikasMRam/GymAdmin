import React, { Component } from 'react';
import { arrayOf, object, func } from 'prop-types';

import agentPropType from 'sly/web/propTypes/agent';
import { titleize } from 'sly/web/services/helpers/strings';
import { getAgentUrl } from 'sly/web/services/helpers/url';
import withNotification from 'sly/web/controllers/withNotification';
import SlyEvent from 'sly/web/services/helpers/events';
import { getSearchParamFromPlacesResponse, filterLinkPath } from 'sly/web/services/helpers/agents';
import { getAgentParams } from 'sly/web/services/helpers/search';
import prefetch from 'sly/web/services/api/prefetch';
import AgentRegionPage from 'sly/web/components/pages/AgentRegionPage';

@prefetch('agentsList', 'getAgents', (req, { match, location }) => req(getAgentParams(match, location)))
@withNotification

export default class AgentRegionPageContainer extends Component {
  static propTypes = {
    match: object,
    agentsList: arrayOf(agentPropType),
    history: object,
    notifyInfo: func.isRequired,
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

  handleConsultationRequested = () => {
    const { notifyInfo } = this.props;

    notifyInfo('We have received your request and we will get back to you soon.');
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
        onConsultationRequested={this.handleConsultationRequested}
      />
    );
  }
}

