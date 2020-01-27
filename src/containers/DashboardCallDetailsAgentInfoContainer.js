import React, { Component } from 'react';
import { string, object } from 'prop-types';
import { prefetch, query } from 'sly/services/newApi';

@prefetch('communities', 'getCommunities', (getCommunities, { callNumber }) => {
  const filters = {
    'filter[phone]': callNumber,
  };
  return getCommunities(filters);
})

export default class DashboardCallDetailsAgentInfoContainer extends Component {
  static propTypes = {
    callNumber: string,
    commynities: object,
  };
  render() {
    const { communities, callNumber } = this.props;

    const meta = { lookingFor: [], gender: [], timeToMove:[], monthlyBudget:[] };
    const possibleAgents = [];

    return (
      <div>
        <h2> The number was from ${callNumber} </h2>
        <hr />
        <possibleAgents />
      </div>

    );
  }
}
