import React, { Component } from 'react';
import { string, arrayOf, func, object } from 'prop-types';

import agentPropType from 'sly/propTypes/agent';
import AgentRegionPage from 'sly/components/pages/AgentRegionPage';
import { resourceListReadRequest, resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';
import { getList, getDetail } from 'sly/store/selectors';
import withServerState from 'sly/store/withServerState';
import { titleize } from 'sly/services/helpers/strings';
import { getAgentUrl } from 'sly/services/helpers/url';
import SlyEvent from 'sly/services/helpers/events';
import { getSearchParamFromPlacesResponse, filterLinkPath } from 'sly/services/helpers/agents';
import { getSearchParams } from 'sly/services/helpers/search';
import { connectController } from 'sly/controllers';

class AgentRegionPageContainer extends Component {
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
      agentsList, regionSlug, citySlug, postUserAction, userAction, pathName,
    } = this.props;
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
        postUserAction={postUserAction}
        userDetails={userAction.userDetails}
        pathName={pathName}
        isRegionPage={!citySlug}
      />
    );
  }
}

const mapStateToProps = (state, { match, location }) => {
  const { params } = match;
  const { region, city } = params;
  const { pathname } = location;
  const searchParams = getSearchParams(match, location);
  const userAction = getDetail(state, 'userAction') || {};
  return {
    regionSlug: region,
    citySlug: city,
    agentsList: getList(state, 'agent', searchParams),
    userAction,
    pathName: pathname,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
  };
};

const mapPropsToActions = ({ match, location }) => {
  const searchParams = getSearchParams(match, location);
  return {
    agent: resourceListReadRequest('agent', searchParams),
    userAction: resourceDetailReadRequest('userAction'),
  };
};

AgentRegionPageContainer.propTypes = {
  regionSlug: string.isRequired,
  citySlug: string,
  agentsList: arrayOf(agentPropType),
  postUserAction: func.isRequired,
  userAction: object,
  pathName: string.isRequired,
  history: object,
};

export default withServerState(mapPropsToActions)(connectController(
  mapStateToProps,
  mapDispatchToProps,
)(AgentRegionPageContainer));
