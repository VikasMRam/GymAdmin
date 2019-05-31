import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import dayjs from 'dayjs';

import RefreshRedirect from 'sly/components/common/RefreshRedirect';
import { withUser, prefetch } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import {FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH, SUMMARY} from 'sly/constants/dashboardAppPaths';
import DashboardAgentFamilyOverviewPage from 'sly/components/pages/DashboardAgentFamilyOverviewPage';
import { getSearchParams } from 'sly/services/helpers/search';
import { getStageDetails } from 'sly/services/helpers/stage';
import { FAMILY_STAGE_ORDERED, STAGE_CLIENT_TYPE_MAP, FAMILY_STATUS_ON_HOLD } from 'sly/constants/familyDetails';
import SlyEvent from 'sly/services/helpers/events';

const AGENT_FAMILY_OVERVIEW_TABLE_HEADINGS = [
  { text: 'Contact Name' },
  { text: 'Resident Name' },
  { text: 'Stage' },
  { text: 'Latest Activity' },
  { text: 'Date Added' },
];

const onClientDetailTableRowLinkClick = (clientName, to) => {
  const event = {
    category: 'TableRow',
    action: 'click',
    label: clientName,
    value: to,
  };
  SlyEvent.getInstance().sendEvent(event);
};

const onClientDetailTableRowCardHeadingLinkClick = (clientName, to) => {
  const event = {
    category: 'TableRowCard',
    action: 'click',
    label: clientName,
    value: to,
  };
  SlyEvent.getInstance().sendEvent(event);
};

const convertClientsToTableContents = (clients) => {
  const contents = clients.map((client) => {
    const {
      id, clientInfo, uuidAux, stage, status, createdAt, notes,
    } = client;
    const { level, palette } = getStageDetails(stage);
    const { name: clientName } = clientInfo;
    const { uuidInfo } = uuidAux;
    let residentName = '';
    if (uuidInfo) {
      const { residentInfo } = uuidInfo;
      const { fullName } = residentInfo;
      residentName = fullName;
    }
    const createdAtStr = dayjs(createdAt).format('MM/DD/YYYY');
    const rowItems = [];
    const disabled = status === FAMILY_STATUS_ON_HOLD;
    const pausedTd = disabled ? { disabled, icon: 'pause', iconPalette: 'danger' } : {};
    const pausedType = disabled ? 'textIcon' : 'link';
    const to = FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH.replace(':id/:tab?', id);
    rowItems.push({
      type: pausedType,
      data: {
        text: clientName,
        to,
        onClick: () => onClientDetailTableRowLinkClick(clientName, to),
        ...pausedTd,
      },
    });
    rowItems.push({ type: 'text', data: { text: residentName, disabled } });
    rowItems.push({
      type: 'stage',
      data: {
        text: stage, currentStage: level, palette, disabled,
      },
    });
    if (notes.length > 0) {
      const latestNote = notes[notes.length - 1];
      const { body, createdAt } = latestNote;
      const latestNoteCreatedAtStr = dayjs(createdAt).format('MM/DD/YYYY');
      rowItems.push({ type: 'doubleLine', data: { firstLine: body, secondLine: latestNoteCreatedAtStr, disabled } });
    } else {
      rowItems.push({ type: 'text', data: { text: '', disabled } });
    }
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
      id, clientInfo, stage, status, notes,
    } = client;
    const { level, palette } = getStageDetails(stage);
    const { name: clientName } = clientInfo;
    const rowItems = [];
    const disabled = status === FAMILY_STATUS_ON_HOLD;
    const pausedTd = disabled ? { disabled, icon: 'pause', iconPalette: 'danger' } : {};
    if (notes.length > 0) {
      const latestNote = notes[notes.length - 1];
      const { body, createdAt } = latestNote;
      const latestNoteCreatedAtStr = dayjs(createdAt).format('MM/DD/YYYY');
      rowItems.push({ type: 'doubleLine', data: { firstLine: body, secondLine: latestNoteCreatedAtStr } });
    }
    rowItems.push({ type: 'stage', data: { text: stage, currentStage: level, palette } });
    const to = FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH.replace(':id', id).replace(':tab?', SUMMARY);
    return {
      heading: clientName,
      onHeadingClick: () => onClientDetailTableRowCardHeadingLinkClick(clientName, to),
      to,
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

@withUser

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
      return <RefreshRedirect to="/" />;
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
    const showPagination = filteredCount > size;
    return (
      <DashboardAgentFamilyOverviewPage
        mobileContents={mobileContents}
        tableContents={tableContents}
        pagination={pagination}
        paginationString={paginationString}
        showPagination={showPagination}
        activeTab={type}
      />
    );
  }
}
