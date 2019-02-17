import React from 'react';
import { object, func, bool } from 'prop-types';
import { connect } from 'react-redux';

import agentPropType from 'sly/propTypes/agent';
import AgentProfilePage from 'sly/components/pages/AgentProfilePage';
import { resourceDetailReadRequest, resourceCreateRequest } from 'sly/store/resource/actions';
import { getDetail } from 'sly/store/selectors';
import withServerState from 'sly/store/withServerState';
import { replaceLastSegment } from 'sly/services/helpers/url';

const AgentProfilePageContainer = ({
  agent, user, userAction, postUserAction,
}) => {
  if (!agent || !userAction) {
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
    userAction: getDetail(state, 'userAction') || {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
  };
};

const mapPropsToActions = ({ match }) => ({
  agent: resourceDetailReadRequest('agent', getAgentSlug(match)),
  userAction: resourceDetailReadRequest('userAction'),
});

const handleResponses = (responses, { location }, redirect) => {
  const { agent } = responses;
  agent(null, (error) => {
    if (error.response.status === 404) {
      // Not found so redirect to city page
      redirect(replaceLastSegment(location.pathname), 301);
      return null;
    }
    return Promise.reject(error);
  });
};

AgentProfilePageContainer.propTypes = {
  agent: agentPropType,
  user: object,
  userAction: object,
  postUserAction: func.isRequired,
};

export default withServerState(
  mapPropsToActions,
  handleResponses,
)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AgentProfilePageContainer));
