import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import dayjs from 'dayjs';
import { Redirect } from 'react-router-dom';

import { prefetch } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import { FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH } from 'sly/constants/dashboardAppPaths';
import DashboardAgentFamilyOverviewPage from 'sly/components/pages/DashboardAgentFamilyOverviewPage';
import { getSearchParams } from 'sly/services/helpers/search';
import { getStageDetails } from 'sly/services/helpers/stage';
import { FAMILY_STAGE_ORDERED, STAGE_CLIENT_TYPE_MAP, FAMILY_STATUS_ON_HOLD } from 'sly/constants/familyDetails';

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
      id, clientInfo, uuidAux, stage, createdAt, updatedAt, status,
    } = client;
    const { level, palette } = getStageDetails(stage);
    const { name: clientName, slyMessage } = clientInfo;
    const { uuidInfo } = uuidAux;
    let residentName = '';
    if (uuidInfo) {
      const { residentInfo } = uuidInfo;
      const { fullName } = residentInfo;
      residentName = fullName;
    }
    const createdAtStr = dayjs(createdAt).format('MM/DD/YYYY');
    const updatedAtStr = dayjs(updatedAt).format('MM/DD/YYYY');
    const rowItems = [];
    const disabled = status === FAMILY_STATUS_ON_HOLD;
    const pausedTd = disabled ? { disabled, icon: 'pause', iconPalette: 'danger' } : {};
    const pausedType = disabled ? 'textIcon' : 'link';
    rowItems.push({ type: pausedType, data: { text: clientName, to: FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH.replace(':id', id), ...pausedTd } });
    rowItems.push({ type: 'text', data: { text: residentName, disabled } });
    rowItems.push({
      type: 'stage',
      data: {
        text: stage, currentStage: level, palette, disabled,
      },
    });
    rowItems.push({ type: 'doubleLine', data: { firstLine: slyMessage, secondLine: updatedAtStr, disabled } });
    rowItems.push({ type: 'text', data: { text: createdAtStr, disabled } });
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
      id, clientInfo, stage, status, updatedAt,
    } = client;
    const { level, palette } = getStageDetails(stage);
    const { name: clientName, slyMessage } = clientInfo;
    const updatedAtStr = dayjs(updatedAt).format('MM/DD/YYYY');
    const rowItems = [];
    const disabled = status === FAMILY_STATUS_ON_HOLD;
    const pausedTd = disabled ? { disabled, icon: 'pause', iconPalette: 'danger' } : {};
    rowItems.push({ type: 'doubleLine', data: { firstLine: slyMessage, secondLine: updatedAtStr } });
    rowItems.push({ type: 'stage', data: { text: stage, currentStage: level, palette } });
    return {
      heading: clientName,
      to: FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH.replace(':id', id),
      id,
      rowItems,
      ...pausedTd,
    };
  });
  return contents;
};

const getPaginationData = requestMeta => ({
  current: requestMeta['page-number'],
  size: requestMeta['page-size'],
  total: requestMeta.filtered_count / requestMeta['page-size'],
  totalCount: requestMeta.total_count,
  filteredCount: requestMeta.filtered_count,
});

const getPageParams = ({ match, location }) => {
  const searchParams = getSearchParams(match, location);
  const type = searchParams.type || 'Prospects';
  const typeStages = FAMILY_STAGE_ORDERED[type];
  const clientType = STAGE_CLIENT_TYPE_MAP[type];
  return {
    pageNumber: searchParams['page-number'],
    type,
    typeStages,
    clientType,
  };
};


// TODO: Fix Latest Note and Date Added column after api impl is done
@prefetch('clients', 'getClients', (getClients, { match, location }) => {
  const { clientType, pageNumber } = getPageParams({ match, location });
  const filters = {
    'filter[client_type]': clientType,
    'page-number': pageNumber,
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
    const { isLoading, meta: clientsMeta, error: clientsError } = clientsStatus;
    // const [error] = errors;
    // console.log(clients);
    // console.log(clientsStatus);
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (clientsError) {
      return <Redirect to="/" />;
    }
    if (clients === null) {
      return <div>Loading...</div>;
    }

    const tableContents = convertClientsToTableContents(clients);
    const mobileContents = convertClientsToMobileContents(clients);
    const pagination = getPaginationData(clientsMeta);
    const {
      current, size, filteredCount,
    } = pagination;
    const count = clients.length;
    const start = (current * size) + 1;
    const end = (current * size) + count;
    const paginationRangeString = count > 0 ? `${start}-${end} of` : '';
    const paginationString = `Showing ${paginationRangeString} ${filteredCount} families`;
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
