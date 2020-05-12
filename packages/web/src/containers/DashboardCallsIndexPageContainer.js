import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';

import { prefetch } from 'sly/web/services/api';
import voiceCallsPropType from 'sly/web/propTypes/calls';
import { ADMIN_DASHBOARD_CALL_DETAILS_PATH } from 'sly/web/constants/dashboardAppPaths';
import DashboardCallsIndexPage from 'sly/web/components/pages/DashboardCallsIndexPage';

const ADMIN_CALLS_OVERVIEW_TABLE_HEADINGS = [
  { text: 'Calling To' },
  { text: 'Calling From' },
  { text: 'Status' },
  { text: 'Assigned To' },
];

const convertCallsToTableContents = (voiceCalls) => {
  const contents = voiceCalls;

  return {
    headings: ADMIN_CALLS_OVERVIEW_TABLE_HEADINGS,
    contents,
    tableEmptyText: "It looks like you don't have any calls at the moment. Go work on other leads.",
  };
};

@prefetch('voiceCalls', 'getVoiceCalls', (req, { callParams }) => {
  return req(callParams);
})

export default class DashboardCallsIndexPageContainer extends Component {
  static propTypes = {
    voiceCalls: arrayOf(voiceCallsPropType),
    status: object,
  }
  render() {
    const {
      voiceCalls, status,
    } = this.props;

    const { voiceCalls: voiceCallStatus } = status;
    const { isLoading, error: voiceCallsError } = voiceCallStatus;

    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (voiceCallsError) {
      return <div>Error Loading voice calls</div>;
    }
    if (voiceCalls === null) {
      return <div>No Calls...</div>;
    }

    const tableContents = convertCallsToTableContents(voiceCalls);

    return (
      <DashboardCallsIndexPage tableContents={tableContents} />
    );
  }
}
