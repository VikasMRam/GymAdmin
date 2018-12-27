import React from 'react';
import { string, arrayOf } from 'prop-types';

import agentPropType from 'sly/propTypes/agent';
import AgentRegionPage from 'sly/components/pages/AgentRegionPage';
import { resourceListReadRequest } from 'sly/store/resource/actions';
import { getList } from 'sly/store/selectors';
import withServerState from 'sly/store/withServerState';
import { titleize } from 'sly/services/helpers/strings';

const AgentRegionPageContainer = ({ agentsList, regionSlug }) => <AgentRegionPage agentsList={agentsList} title={`${titleize(regionSlug)} Partner Agents`} />;

const mapStateToProps = (state, { match }) => {
  const { params } = match;
  const { region } = params;
  return {
    regionSlug: region,
    agentsList: getList(state, 'agent', { region }),
  };
};

const mapDispatchToProps = () => {
  return {};
};

const fetchData = (dispatch, { match }) => {
  const { params } = match;
  const { region } = params;
  return Promise.all([
    dispatch(resourceListReadRequest('agent', { region })),
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
  regionSlug: string,
  agentsList: arrayOf(agentPropType),
};

export default withServerState({
  mapStateToProps,
  mapDispatchToProps,
  fetchData,
  handleError,
})(AgentRegionPageContainer);
