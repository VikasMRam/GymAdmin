import React, { Component } from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';

import agentPropType from 'sly/propTypes/agent';
import AgentProfilePage from 'sly/components/pages/AgentProfilePage';
import { resourceDetailReadRequest } from 'sly/store/resource/actions';
import { getDetail } from 'sly/store/selectors';
import withServerState from 'sly/store/withServerState';
import { replaceLastSegment } from 'sly/services/helpers/url';

const mapStateToProps = (state, { match }) => ({
  agent: getDetail(state, 'agent', match.params.agentSlug),
});

const mapPropsToActions = ({ match }) => ({
  agent: resourceDetailReadRequest('agent', match.params.agentSlug),
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

@withServerState(
  mapPropsToActions,
  handleResponses,
)

@connect(mapStateToProps)

export default class AgentProfilePageContainer extends Component {
  static propTypes = {
    agent: agentPropType,
    history: object,
  };

  render() {
    const { agent, history } = this.props;
    const { location } = history;

    if (!agent) {
      return null;
    }

    return <AgentProfilePage agent={agent} location={location} />;
  }
}

