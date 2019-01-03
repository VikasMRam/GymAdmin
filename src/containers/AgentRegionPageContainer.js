import React from 'react';
import { string, arrayOf, func, object } from 'prop-types';

import agentPropType from 'sly/propTypes/agent';
import AgentRegionPage from 'sly/components/pages/AgentRegionPage';
import { resourceListReadRequest, resourceCreateRequest, resourceDetailReadRequest } from 'sly/store/resource/actions';
import { getList, getDetail } from 'sly/store/selectors';
import withServerState from 'sly/store/withServerState';
import { titleize } from 'sly/services/helpers/strings';
import { getAgentUrl } from 'sly/services/helpers/url';

const AgentRegionPageContainer = ({
  agentsList, regionSlug, citySlug, postUserAction, userAction, pathName,
}) => {
  if (!userAction) {
    return null;
  }
  agentsList.map((agent) => {
    const url = getAgentUrl(agent);
    agent.url = url;
    return agent;
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
      agentsList={agentsList}
      title={title}
      locationName={locationName}
      postUserAction={postUserAction}
      userDetails={userAction.userDetails}
      pathName={pathName}
    />
  );
};

const mapStateToProps = (state, { match, location }) => {
  const { params } = match;
  const { region, city } = params;
  const { pathname } = location;
  return {
    regionSlug: region,
    citySlug: city,
    agentsList: getList(state, 'agent', { region, city }),
    userAction: getDetail(state, 'userAction'),
    pathName: pathname,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
  };
};

const fetchData = (dispatch, { match }) => {
  const { params } = match;
  const { region, city } = params;
  return Promise.all([
    dispatch(resourceListReadRequest('agent', { region, city })),
    dispatch(resourceDetailReadRequest('userAction')),
  ]);
};

const handleError = (err) => {
  if (err.response) {
    if (err.response.status !== 200) {
      if (err.location) {
        const redUrl = err.location.split('/');
        return {
          errorCode: err.response.status,
          redirectUrl: redUrl[redUrl.length - 1],
        };
      }
      return { errorCode: err.response.status };
    }
    return { errorCode: null };
  }
  throw err;
};

AgentRegionPageContainer.propTypes = {
  regionSlug: string.isRequired,
  citySlug: string,
  agentsList: arrayOf(agentPropType),
  postUserAction: func.isRequired,
  userAction: object,
  pathName: string.isRequired,
};

export default withServerState({
  mapStateToProps,
  mapDispatchToProps,
  fetchData,
  handleError,
})(AgentRegionPageContainer);
