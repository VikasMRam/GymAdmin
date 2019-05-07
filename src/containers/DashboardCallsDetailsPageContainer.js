import React, { Fragment, Component } from 'react';
import { string } from 'prop-types';
import { prefetch, query } from 'sly/services/newApi';
import DashboardCallsDetailsPage from 'sly/components/pages/DashboardCallsDetailsPage';


@prefetch('voiceCall', 'getVoiceCall', (req, { match }) => req({
  id: match.params.id,
}))

export default class DashboardCallsDetailsPageContainer extends Component {
  static propTypes = {
    id: string,
  };
  render() {
    const { voiceCall, match } = this.props;
    console.log("Seeing the voice call id and details here", voiceCall);
    const meta = { lookingFor: [], gender: [], timeToMove:[], monthlyBudget:[] };
    // const { result: rawClient, meta } = status.voi;

    return (
      <DashboardCallsDetailsPage meta={meta} voiceCall />
    );
  }
}
