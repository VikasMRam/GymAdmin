import React from 'react';
import { string, arrayOf } from 'prop-types';

import agentPropType from 'sly/propTypes/agent';
import AgentRegionPage from 'sly/components/pages/AgentRegionPage';
import { resourceListReadRequest } from 'sly/store/resource/actions';
import { getList } from 'sly/store/selectors';
import withServerState from 'sly/store/withServerState';
import { titleize } from 'sly/services/helpers/strings';

const AgentRegionPageContainer = ({ agentsList, regionSlug, citySlug }) => {
  let locationName = null;
  if (citySlug) {
    locationName = titleize(citySlug);
  } else {
    locationName = titleize(regionSlug);
  }
  const title = `${locationName} Partner Agents`;
  return <AgentRegionPage agentsList={agentsList} title={title} locationName={locationName} />;
};

const mapStateToProps = (state, { match }) => {
  const { params } = match;
  const { region, city } = params;
  return {
    regionSlug: region,
    citySlug: city,
    agentsList: getList(state, 'agent', { region, city }),
  };
};

const mapDispatchToProps = () => {
  return {};
};

const fetchData = (dispatch, { match }) => {
  const { params } = match;
  const { region, city } = params;
  return Promise.all([
    dispatch(resourceListReadRequest('agent', { region, city })),
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
};

export default withServerState({
  mapStateToProps,
  mapDispatchToProps,
  fetchData,
  handleError,
})(AgentRegionPageContainer);
