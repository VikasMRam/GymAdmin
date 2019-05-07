import React, { Fragment, Component } from 'react';
import { string } from 'prop-types';
import { prefetch, query } from 'sly/services/newApi';
import AgentSummary from 'sly/components/molecules/AgentSummary';


@query('communities', 'getCommunities', (getCommunities, { callNumber }) => {

  const filters = {
    'filter[phone]': callNumber,
  };
  return getCommunities(filters);
})

export default class DashboardCallDetailsAgentInfoContainer extends Component {
  static propTypes = {
    callNumber: string,
  };
  render() {
    const { communities } = this.props;
    console.log( "Seeing props",communities);

    const meta = { lookingFor: [], gender: [], timeToMove:[], monthlyBudget:[] };
    return (
      <div>Agent summary</div>
    );
  }
}
