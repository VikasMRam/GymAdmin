import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import dayjs from 'dayjs';

import { prefetch } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import { FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH } from 'sly/constants/dashboardAppPaths';
import DashboardAgentFamilyOverviewPage from 'sly/components/pages/DashboardAgentFamilyOverviewPage';
import { getSearchParams } from 'sly/services/helpers/search';
import { getStageDetails } from 'sly/services/helpers/stage';
import { FAMILY_STAGE_ORDERED } from 'sly/constants/familyDetails';

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
    const { level, palette } = getStageDetails(stage);
    const { name: clientName, slyMessage } = clientInfo;
    const { uuidInfo } = uuidAux;
    const { residentInfo } = uuidInfo;
    const { fullName: residentName } = residentInfo;
    const createdAtStr = dayjs(createdAt).format('MM/DD/YYYY');
    const updatedAtStr = dayjs(updatedAt).format('MM/DD/YYYY');
    const rowItems = [];
    rowItems.push({ type: 'link', data: { text: clientName, href: FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH.replace(':id', id) } });
    rowItems.push({ type: 'text', data: { text: residentName } });
    rowItems.push({ type: 'stage', data: { text: stage, currentStage: level, palette } });
    rowItems.push({ type: 'doubleLine', data: { firstLine: slyMessage, secondLine: updatedAtStr } });
    rowItems.push({ type: 'text', data: { text: createdAtStr } });
    return {
      id,
      rowItems,
    };
  });
  return {
    headings: AGENT_FAMILY_OVERVIEW_TABLE_HEADINGS,
    contents,
    tableEmptyText: "It looks like you don't have any families that match the filters you've set.",
  };
};

const convertClientsToMobileContents = (clients) => {
  const contents = clients.map((client) => {
    const {
      id, clientInfo, stage, updatedAt,
    } = client;
    const { level, palette } = getStageDetails(stage);
    const { name: clientName, slyMessage } = clientInfo;
    const updatedAtStr = dayjs(updatedAt).format('MM/DD/YYYY');
    const rowItems = [];
    rowItems.push({ type: 'doubleLine', data: { firstLine: slyMessage, secondLine: updatedAtStr } });
    rowItems.push({ type: 'stage', data: { text: stage, currentStage: level, palette } });
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

const getPageParams = ({ match, location }) => {
  const searchParams = getSearchParams(match, location);
  const type = searchParams.type || 'Prospects';
  const typeStages = FAMILY_STAGE_ORDERED[type];
  return {
    'page-number': searchParams['page-number'],
    type,
    typeStages,
  };
};


// TODO: Fix Latest Note and Date Added column after api impl is done
@prefetch('clients', 'getClients', (getClients, { match, location }) => {
  const { typeStages } = getPageParams({ match, location });
  const filters = {
    'filter[stage]': typeStages,
  };
  return getClients(filters);
})
export default class DashboardAgentFamilyOverviewPageContainer extends Component {
  static propTypes = {
    clients: arrayOf(clientPropType),
    status: object,
    match: object,
    location: object,
  }
  render() {
    const {
      clients, status, match, location,
    } = this.props;
    const params = getPageParams({ match, location });
    const { type } = params;
    const { clients: clientsStatus } = status;
    const { isLoading, meta: clientsMeta } = clientsStatus;
    // const [error] = errors;
    // console.log(clients);
    // console.log(clientsStatus);
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (clients === null) {
      return <div>Loading...</div>;
    }

    const tableContents = convertClientsToTableContents(clients);
    const mobileContents = convertClientsToMobileContents(clients);
    const pagination = getPaginationData(clientsMeta);
    const { current, size, totalCount } = pagination;
    const count = clients.length;
    const start = (current * size) + 1;
    const end = (current * size) + count;
    const paginationRangeString = count > 0 ? `${start}-${end} of` : '';
    const paginationString = `Showing ${paginationRangeString} ${totalCount} families`;
    return (
      <DashboardAgentFamilyOverviewPage
        mobileContents={mobileContents}
        tableContents={tableContents}
        pagination={pagination}
        paginationString={paginationString}
        activeTab={type}
      />
    );
  }
}
