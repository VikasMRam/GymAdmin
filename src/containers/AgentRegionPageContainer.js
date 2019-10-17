import React, { Component } from 'react';
import { string, arrayOf, object } from 'prop-types';

import withServerState from 'sly/store/withServerState';
import { resourceListReadRequest } from 'sly/store/resource/actions';
import agentPropType from 'sly/propTypes/agent';
import AgentRegionPage from 'sly/components/pages/AgentRegionPage';
import { getList } from 'sly/store/selectors';
import { titleize } from 'sly/services/helpers/strings';
import { getAgentUrl } from 'sly/services/helpers/url';
import SlyEvent from 'sly/services/helpers/events';
import { getSearchParamFromPlacesResponse, filterLinkPath } from 'sly/services/helpers/agents';
import { getAgentParams } from 'sly/services/helpers/search';
import { connectController } from 'sly/controllers';

const mapStateToProps = (state, { match, location }) => {
  const { params } = match;
  const { region, city } = params;
  const searchParams = getAgentParams(match, location);
  return {
    regionSlug: region,
    citySlug: city,
    agentsList: getList(state, 'agent', searchParams),
  };
};

const mapPropsToActions = ({ match, location }) => {
  const searchParams = getAgentParams(match, location);
  return {
    agent: resourceListReadRequest('agent', searchParams),
  };
};

@connectController(mapStateToProps)

@withServerState(mapPropsToActions)

export default class AgentRegionPageContainer extends Component {
  static propTypes = {
    regionSlug: string.isRequired,
    citySlug: string,
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
      agentsList, regionSlug, citySlug, history,
    } = this.props;

    const { location } = history;

    const newAgentsList = agentsList
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
      locationName = titleize(regionSlug);
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

