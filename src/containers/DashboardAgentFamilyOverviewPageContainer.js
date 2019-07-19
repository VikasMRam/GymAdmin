import React, { Component } from 'react';
import qs from 'querystring';
import { arrayOf, object } from 'prop-types';

import RefreshRedirect from 'sly/components/common/RefreshRedirect';
import { withUser, prefetch } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import DashboardAgentFamilyOverviewPage from 'sly/components/pages/DashboardAgentFamilyOverviewPage';
import { delayedExecutor, getSearchParams } from 'sly/services/helpers/search';
import { FAMILY_STAGE_ORDERED, STAGE_CLIENT_TYPE_MAP } from 'sly/constants/familyDetails';
import SlyEvent from 'sly/services/helpers/events';

const onClientClick = (clientName, to) => {
  const event = {
    category: 'TableRow',
    action: 'click',
    label: clientName,
    value: to,
  };
  SlyEvent.getInstance().sendEvent(event);
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
  const clientName = searchParams.name;
  return {
    pageNumber: searchParams['page-number'],
    type,
    typeStages,
    clientType,
    clientName,
  };
};

// TODO: Fix Latest Note and Date Added column after api impl is done
@prefetch('clients', 'getClients', (getClients, { match, location }) => {
  const { clientType, pageNumber, clientName } = getPageParams({ match, location });
  const filters = {
    'filter[client_type]': clientType,
    'filter[name]': clientName,
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
    history: object,
  }

  handleSearchTextKeyUp = (event) => {
    const { value } = event.target;
    const { match, location, history } = this.props;
    const { type, pageNumber } = getPageParams({ match, location });
    const filters = {
      type,
      name: value,
    };
    if (pageNumber) {
      filters.pageNumber = pageNumber;
    }
    this.sendQuery(history, qs.stringify(filters));
  };

  sendQuery = delayedExecutor((history, filtersQs) => {
    history.push({ search: `?${filtersQs}` });
  }, 'familyOverviewSearch', 500);

  render() {
    const {
      clients, status, match, location,
    } = this.props;

    const params = getPageParams({ match, location });
    const { type } = params;
    const { clients: clientsStatus } = status;
    const {
      isLoading, hasStarted, meta: clientsMeta, error: clientsError,
    } = clientsStatus;
    // const [error] = errors;
    // console.log(clients);
    // console.log(clientsStatus);
    if (clientsError) {
      return <RefreshRedirect to="/" />;
    }
    const isPageLoading = !hasStarted || isLoading;
    if (isPageLoading) {
      return (
        <DashboardAgentFamilyOverviewPage
          isPageLoading={isPageLoading}
        />
      );
    }
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
        clients={clients}
        onClientClick={onClientClick}
        pagination={pagination}
        paginationString={paginationString}
        showPagination={showPagination}
        activeTab={type}
        onSearchTextKeyUp={this.handleSearchTextKeyUp}
      />
    );
  }
}
