import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import { withRouter, generatePath } from 'react-router';

import { prefetch } from 'sly/web/services/api';
import clientPropType from 'sly/common/propTypes/client';
import { AGENT_DASHBOARD_FAMILIES_DETAILS_PATH } from 'sly/web/constants/dashboardAppPaths';
import DashboardAgentFamilyOverviewSection from 'sly/web/components/organisms/DashboardAgentFamilyOverviewSection';
import ModalController from 'sly/web/controllers/ModalController';
import NotificationController from 'sly/web/controllers/NotificationController';
import { withDatatable } from 'sly/web/services/datatable';

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
  const newCount = meta.new_count;
  const wonCount = meta.won_count;
  return ({
    current,
    size,
    total: meta.filtered_count / meta['page-size'],
    totalCount: meta.total_count,
    filteredCount,
    text,
    show,
    newCount,
    prospectingCount,
    connectedCount,
    closedCount,
    wonCount,
  });
};

@withRouter
@withDatatable('clients')
@prefetch('clients', 'getClients', (req, { datatable }) => req(datatable.query))

export default class DashboardAgentFamilyOverviewSectionContainer extends Component {
  static propTypes = {
    clients: arrayOf(clientPropType),
    status: object,
    history: object,
    datatable: object,
    match: object,
    location: object,
  };

  onAddFamilySuccess = (client) => {
    const { history, status } = this.props;
    const { id } = client;

    status.clients.refetch();
    history.push(generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id }));
  };

  render() {
    const {
      clients, status, datatable, match, location,
    } = this.props;

    const { error, hasFinished } = status.clients;

    // if (error) {
    //   throw new Error(JSON.stringify(error));
    // }

    const { meta } = status.clients;

    return (
      <NotificationController>
        {({ notifyInfo }) => (
          <ModalController>
            {({ show, hide }) => (
              <DashboardAgentFamilyOverviewSection
                isPageLoading={!hasFinished || !datatable.hasFinished}
                clients={clients || []}
                meta={meta || {}}
                pagination={getPaginationData(status.clients)}
                activeTab={match.params.clientType}
                datatable={datatable}
                showModal={show}
                hideModal={hide}
                notifyInfo={notifyInfo}
                onAddFamilySuccess={this.onAddFamilySuccess}
                location={location}
              />
            )}
          </ModalController>
        )}
      </NotificationController>
    );
  }
}
