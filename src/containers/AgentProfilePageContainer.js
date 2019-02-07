import React from 'react';
import { object, func, bool } from 'prop-types';
import { connect } from 'react-redux';

import agentPropType from 'sly/propTypes/agent';
import AgentProfilePage from 'sly/components/pages/AgentProfilePage';
import { resourceDetailReadRequest, resourceCreateRequest } from 'sly/store/resource/actions';
import { getDetail } from 'sly/store/selectors';
import withServerState from 'sly/store/withServerState';

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

AgentProfilePageContainer.propTypes = {
  agent: agentPropType,
  user: object,
  userAction: object,
  postUserAction: func.isRequired,
};

export default withServerState(mapPropsToActions)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(AgentProfilePageContainer));
