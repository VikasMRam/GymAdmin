import React, { Fragment, Component } from 'react';
import { string, object } from 'prop-types';
import { prefetch, query } from 'sly/services/newApi';
import DashboardCallDetailsPage from 'sly/components/pages/DashboardCallDetailsPage';


@prefetch('voiceCall', 'getVoiceCall', (req, { match }) => req({
  id: match.params.id,
}))

export default class DashboardCallDetailsPageContainer extends Component {
  static propTypes = {
    id: string,
    voiceCall: object,
  };

  state = {
    communityFilter: {},
  };

  render() {
    const { voiceCall } = this.props;
    const { communityFilter } = this.state;
    const meta = {
      lookingFor: [], gender: ['Female', 'Male'], timeToMove: ['1+ Months'], monthlyBudget: [],
    };
    // const communityFilter = { phone: voiceCall.toNumber };
    return (
      <DashboardCallDetailsPage meta={meta} voiceCall={voiceCall} communityFilter={communityFilter} />
    );
  }
}
