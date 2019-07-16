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
  render(){
    const { voiceCall } = this.props;
    const meta = { lookingFor: [], gender: ['Female', 'Male'], timeToMove:['1+ Months'], monthlyBudget:[] };
    // const {
    //   voiceCall, status,
    // } = this.props;

    // const { voiceCalls: voiceCallStatus } = status;
    // const { isLoading, error: voiceCallsError } = voiceCallStatus;

    // if (isLoading) {
    //   return <div>Loading...</div>;
    // }
    // if (voiceCallsError) {
    //   return <div>Error Loading voice calls</div>;
    // }

    return (
      <DashboardCallDetailsPage meta={meta} voiceCall={voiceCall} />
    );
  }
}
