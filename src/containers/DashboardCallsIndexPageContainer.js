import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';

import { prefetch } from 'sly/services/newApi';
import voiceCallsPropType from 'sly/propTypes/calls';
import { ADMIN_DASHBOARD_CALLS_DETAILS_PATH } from 'sly/constants/dashboardAppPaths';
import DashboardCallsIndexPage from 'sly/components/pages/DashboardCallsIndexPage';

const ADMIN_CALLS_OVERVIEW_TABLE_HEADINGS = [
  { text: 'Calling From' },
  { text: 'Calling To' },
  { text: 'Status' },
  { text: 'Assigned To' },
];

const convertCallsToTableContents = (voiceCalls) => {
  const contents = voiceCalls.map((voiceCall) => {
    const {
      id, fromNumber, toNumber, status, assignedTo,
    } = voiceCall;
    let assignedToName = 'unassigned';
    if (assignedTo) {
      const { name } = assignedTo;
      assignedToName = name;
    }
    const rowItems = [];
    rowItems.push({ type: 'link', data: { text: fromNumber, href: ADMIN_DASHBOARD_CALLS_DETAILS_PATH.replace(':id', id) } });
    rowItems.push({ type: 'text', data: { text: toNumber } });
    rowItems.push({ type: 'text', data: { text: status } });
    rowItems.push({ type: 'text', data: { text: assignedToName } });
    return {
      id,
      rowItems,
    };
  });
  return {
    headings: ADMIN_CALLS_OVERVIEW_TABLE_HEADINGS,
    contents,
    tableEmptyText: "It looks like you don't have any calls at the moment. Go work on other leads.",
  };
};

@prefetch('voiceCalls', 'getVoiceCalls', (getVoiceCalls) => {
  return getVoiceCalls();
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
      return <div>Loading...</div>;
    }

    const tableContents = convertCallsToTableContents(voiceCalls);

    return (
      <DashboardCallsIndexPage tableContents={tableContents} />
    );
  }
}
