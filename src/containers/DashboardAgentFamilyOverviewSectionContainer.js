import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';

import { prefetch } from 'sly/services/newApi';
import clientPropType from 'sly/propTypes/client';
import withBreakpoint from 'sly/components/helpers/breakpoint';
import DashboardAgentFamilyOverviewSection from 'sly/components/organisms/DashboardAgentFamilyOverviewSection';
import { withRouter } from 'react-router';

const getPaginationData = ({ result, meta }) => {
  if (!result) return {};

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

@withRouter

@prefetch('clients', 'getClients', (req, { datatable }) => req(datatable.query))

@withBreakpoint

export default class DashboardAgentFamilyOverviewSectionContainer extends Component {
  static propTypes = {
    clients: arrayOf(clientPropType),
    status: object,
    match: object,
    location: object,
    history: object,
    breakpoint: object,
    datatable: object,
  };

  render() {
    const {
      clients, status, breakpoint, datatable, match, location,
    } = this.props;

    const { error, hasFinished } = status.clients;

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    const { pathName, search } = location;

    return (
      <DashboardAgentFamilyOverviewSection
        isPageLoading={!hasFinished || !datatable.hasFinished}
        clients={clients}
        pagination={getPaginationData(status.clients)}
        activeTab={match.params.clientType}
        breakpoint={breakpoint}
        onSearchTextKeyUp={this.handleSearchTextKeyUp}
        datatable={datatable}
        basePath={`${pathName}${search}`}
      />
    );
  }
}
