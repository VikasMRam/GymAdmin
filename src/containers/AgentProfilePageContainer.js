import React from 'react';
import { object, func, bool } from 'prop-types';

import agentPropType from 'sly/propTypes/agent';
import AgentProfilePage from 'sly/components/pages/AgentProfilePage';
import { resourceDetailReadRequest, resourceCreateRequest } from 'sly/store/resource/actions';
import { getDetail, isResourceDetailRequestComplete } from 'sly/store/selectors';
import withServerState from 'sly/store/withServerState';

const AgentProfilePageContainer = ({
  agent, user, userAction, isUserFetchDone, postUserAction,
}) => {
  if (!agent || !userAction || !isUserFetchDone) {
    return null;
  }
  return (
    <AgentProfilePage
      agent={agent}
      user={user}
      userDetails={userAction.userDetails}
      postUserAction={postUserAction}
    />
  );
};

const getAgentSlug = match => match.params.agentSlug;
const mapStateToProps = (state, { match }) => {
  const agentSlug = getAgentSlug(match);
  return {
    user: getDetail(state, 'user', 'me'),
    agent: getDetail(state, 'agent', agentSlug),
    userAction: getDetail(state, 'userAction'),
    isUserFetchDone: isResourceDetailRequestComplete(state, 'user'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
  };
};

const fetchData = (dispatch, { match }) =>
  Promise.all([
    dispatch(resourceDetailReadRequest('agent', getAgentSlug(match))),
    dispatch(resourceDetailReadRequest('userAction')),
  ]);

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

AgentProfilePageContainer.propTypes = {
  agent: agentPropType,
  user: object,
  userAction: object,
  postUserAction: func.isRequired,
  isUserFetchDone: bool,
};

export default withServerState({
  mapStateToProps,
  mapDispatchToProps,
  fetchData,
  handleError,
})(AgentProfilePageContainer);
