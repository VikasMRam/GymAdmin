import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import dayjs from 'dayjs';

import { prefetch } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import { FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH } from 'sly/constants/dashboardAppPaths';
import DashboardAgentFamilyOverviewPage from 'sly/components/pages/DashboardAgentFamilyOverviewPage';
import { getSearchParams } from 'sly/services/helpers/search';

const STAGE_NAME_LEVEL_MAP = {
  New: 1,
  '1st Contact Attempt': 2,
  '2nd Contact Attempt': 3,
  '3rd+ Contact Attempt': 4,
};

const AGENT_FAMILY_OVERVIEW_TABLE_HEADINGS = [
  { text: 'Contact Name' },
  { text: 'Resident Name' },
  { text: 'Stage', sort: 'asc' },
  { text: 'Latest Note' },
  { text: 'Date Added' },
];

const convertClientsToTableContents = (clients) => {
  const contents = clients.map((client) => {
    const {
      id, clientInfo, uuidAux, stage, createdAt, updatedAt,
    } = client;
    const { name: clientName, slyMessage } = clientInfo;
    const { uuidInfo } = uuidAux;
    const { residentInfo } = uuidInfo;
    const { fullName: residentName } = residentInfo;
    const createdAtStr = dayjs(createdAt).format('MM/DD/YYYY');
    const updatedAtStr = dayjs(updatedAt).format('MM/DD/YYYY');
    const rowItems = [];
    rowItems.push({ type: 'link', data: { text: clientName, href: FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH.replace(':id', id) } });
    rowItems.push({ type: 'text', data: { text: residentName } });
    rowItems.push({ type: 'stage', data: { text: stage, currentStage: STAGE_NAME_LEVEL_MAP[stage] } });
    rowItems.push({ type: 'doubleLine', data: { firstLine: slyMessage, secondLine: updatedAtStr } });
    rowItems.push({ type: 'text', data: { text: createdAtStr } });
    return {
      id,
      rowItems,
    };
  });
  return { headings: AGENT_FAMILY_OVERVIEW_TABLE_HEADINGS, contents };
};

const convertClientsToMobileContents = (clients) => {
  const contents = clients.map((client) => {
    const {
      id, clientInfo, stage, updatedAt,
    } = client;
    const { name: clientName, slyMessage } = clientInfo;
    const updatedAtStr = dayjs(updatedAt).format('MM/DD/YYYY');
    const rowItems = [];
    rowItems.push({ type: 'doubleLine', data: { firstLine: slyMessage, secondLine: updatedAtStr } });
    rowItems.push({ type: 'stage', data: { text: stage, currentStage: STAGE_NAME_LEVEL_MAP[stage] } });
    return {
      heading: clientName,
      href: FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH.replace(':id', id),
      id,
      rowItems,
    };
  });
  return contents;
};

const getPaginationData = requestMeta => ({
  current: requestMeta['page-number'],
  size: requestMeta['page-size'],
  total: requestMeta.total_count / requestMeta['page-size'],
  totalCount: requestMeta.total_count,
});


// TODO: Fix Latest Note and Date Added column after api impl is done
@prefetch('clients', 'getClients', (getClients, { match, location }) => {
  const searchParams = getSearchParams(match, location);
  return getClients(searchParams);
})
export default class DashboardAgentFamilyOverviewPageContainer extends Component {
  static propTypes = {
    clients: arrayOf(clientPropType),
    status: object,
    meta: object,
  }
  render() {
    console.log(this.props);
    const { clients, status } = this.props;
    const { clients: clientsStatus } = status;
    const { isLoading, meta: clientsMeta } = clientsStatus;
    // const [error] = errors;
    // console.log(clients);
    // console.log(clientsStatus);
    if (isLoading) {
      return <div>Loading...</div>;
    }

    const tableContents = convertClientsToTableContents(clients);
    const mobileContents = convertClientsToMobileContents(clients);
    const pagination = getPaginationData(clientsMeta);
    const { current, size, totalCount } = pagination;
    const count = clients.length;
    const start = (current * size) + 1;
    const end = (current * size) + count;
    const paginationString = `Showing ${start}-${end} of ${totalCount} families`;
    return (
      <DashboardAgentFamilyOverviewPage mobileContents={mobileContents} tableContents={tableContents} pagination={pagination} paginationString={paginationString} />
    );
  }
}
