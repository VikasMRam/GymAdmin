import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import { withRouter } from 'react-router';

import { prefetch, withUser } from 'sly/services/newApi';
import agentPropType from 'sly/propTypes/agent';
import DashboardAgentsIndexSection from 'sly/components/organisms/DashboardAgentsIndexSection';
import ModalController from 'sly/controllers/ModalController';
import NotificationController from 'sly/controllers/NotificationController';

const getPaginationData = ({ result, meta }) => {
  if (!result) return {};

  const count = result.length;
  const current = meta['page-number'];
  const size = meta['page-size'];
  const start = (current * size) + 1;
  const end = (current * size) + count;
  const paginationRangeString = count > 0 ? `${start}-${end} of` : '';
  const filteredCount = meta.filtered_count;
  const text = `Showing ${paginationRangeString} ${filteredCount} agents`;
  const show = filteredCount > size;

  return ({
    current,
    size,
    total: meta.filtered_count / meta['page-size'],
    totalCount: meta.total_count,
    filteredCount,
    text,
    show,
  });
};

@withRouter
@withUser
@prefetch('agents', 'getAgents', (req, { datatable }) => {
  return req(datatable.query);
})

export default class DashboardAgentsIndexSectionContainer extends Component {
  static propTypes = {
    agents: arrayOf(agentPropType),
    status: object,
    history: object,
    datatable: object,
    match: object,
    location: object,
  };

  refetchAgents = () => {
    const { status } = this.props;
    status.agents.refetch();
  };

  render() {
    const { agents, status, match, location, datatable, ...props } = this.props;
    const { error, meta, hasFinished, result: rawAgents } = status.agents;

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    return (
      <NotificationController>
        {({ notifyInfo, notifyError }) => (
          <ModalController>
            {({ show, hide }) => (
              <DashboardAgentsIndexSection
                {...props}
                isPageLoading={!hasFinished || !datatable.hasFinished}
                datatable={datatable}
                agents={agents}
                rawAgents={rawAgents}
                pagination={getPaginationData(status.agents)}
                // onSearchTextKeyUp={this.handleSearchTextKeyUp}
                showModal={show}
                hideModal={hide}
                meta={meta || {}}
                notifyError={notifyError}
                notifyInfo={notifyInfo}
                refetchAgents={this.refetchAgents}
              />
            )}
          </ModalController>
        )}
      </NotificationController>
    );
  }
}
