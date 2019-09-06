import React, { Component } from 'react';
import qs from 'query-string';
import { arrayOf, object } from 'prop-types';
import RefreshRedirect from 'sly/components/common/RefreshRedirect';
import { withUser, prefetch } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import DashboardAgentFamilyOverviewPage from 'sly/components/pages/DashboardAgentFamilyOverviewPage';
import { delayedExecutor, getSearchParams } from 'sly/services/helpers/search';
import { FAMILY_STAGE_ORDERED, STAGE_CLIENT_TYPE_MAP } from 'sly/constants/familyDetails';
import SlyEvent from 'sly/services/helpers/events';
import withBreakpoint from 'sly/components/helpers/breakpoint';
import { AGENT_DASHBOARD_FAMILIES_NEW_PATH } from 'sly/constants/dashboardAppPaths';

const onClientClick = (clientName, to) => {
  const event = {
    category: 'TableRow',
    action: 'click',
    label: clientName,
    value: to,
  };
  SlyEvent.getInstance().sendEvent(event);
};

const getPaginationData = ({ result, meta }) => {
  const count = result.length;
  const current = meta['page-number'];
  const size = meta['page-size'];
  const start = (current * size) + 1;
  const end = (current * size) + count;
  const paginationRangeString = count > 0 ? `${start}-${end} of` : '';
  const filteredCount = meta.filtered_count;
  const text = `Showing ${paginationRangeString} ${filteredCount} families`;
  const show = filteredCount > size;
  const prospectingCount = meta.prospecting_count;
  const connectedCount = meta.connected_count;
  const closedCount = meta.closed_count;
  return ({
    current,
    size,
    total: meta.filtered_count / meta['page-size'],
    totalCount: meta.total_count,
    filteredCount,
    text,
    show,
    prospectingCount,
    connectedCount,
    closedCount,
  });
};

const getPageParams = ({ match, location }) => {
  const searchParams = getSearchParams(match, location);
  const type = searchParams.type || 'Prospects';
  const typeStages = FAMILY_STAGE_ORDERED[type];
  const clientType = STAGE_CLIENT_TYPE_MAP[type];
  const clientName = searchParams.name;
  const { organization, provider, providerType } = searchParams;
  return {
    pageNumber: searchParams['page-number'],
    type,
    typeStages,
    clientType,
    clientName,
    organization,
    providerType,
    provider,
  };
};

// TODO: Fix Latest Note and Date Added column after api impl is done
@prefetch('clients', 'getClients', (getClients, { match, location }) => {
  const {
    clientType, pageNumber, clientName, organization, providerType, provider,
  } = getPageParams({ match, location });
  const fClientName = clientName ? `cs:${clientName}` : undefined;

  const filters = {
    'filter[client_type]': clientType,
    'filter[name]': fClientName, // FIXME: Arbit use of filter
    'filter[organization]': organization,
    'filter[provider_type]': providerType,
    'filter[provider]': provider,
    'page-number': pageNumber,
  };
  return getClients(filters);
})

@withUser

@withBreakpoint

export default class DashboardAgentFamilyOverviewPageContainer extends Component {
  static propTypes = {
    clients: arrayOf(clientPropType),
    status: object,
    match: object,
    location: object,
    history: object,
    breakpoint: object,
  };

  addClient = () => {
    const { history } = this.props;
    const clientPath = AGENT_DASHBOARD_FAMILIES_NEW_PATH;
    return history.push(clientPath);
  };

  handleSearchTextKeyUp = (event) => {
    const { value } = event.target;
    const { match, location, history } = this.props;
    const {
      type, pageNumber, organization, providerType, provider,
    } = getPageParams({ match, location });
    const filters = {
      type,
      name: value,
      organization,
      providerType,
      provider,
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
      clients, status, match, location, breakpoint,
    } = this.props;

    const params = getPageParams({ match, location });
    const { type } = params;
    const { clients: clientsStatus } = status;
    const {
      isLoading, hasStarted, error: clientsError,
    } = clientsStatus;

    if (clientsError) {
      return <RefreshRedirect to="/" />;
    }
    const isPageLoading = !hasStarted || isLoading;
    if (isPageLoading) {
      return (
        <DashboardAgentFamilyOverviewPage
          isPageLoading={isPageLoading}
          breakpoint={breakpoint}
          params={params}
        />
      );
    }
    const pagination = getPaginationData(clientsStatus);
    return (
      <DashboardAgentFamilyOverviewPage
        clients={clients}
        onClientClick={onClientClick}
        pagination={pagination}
        activeTab={type}
        breakpoint={breakpoint}
        onSearchTextKeyUp={this.handleSearchTextKeyUp}
        onAddNewClient={this.addClient}
        params={params}
      />
    );
  }
}
