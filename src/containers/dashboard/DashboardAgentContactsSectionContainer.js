import React, { Component } from 'react';
import { arrayOf, object, func } from 'prop-types';
import { withRouter } from 'react-router';

import { prefetch, withUser } from 'sly/services/newApi';
import contactPropType from 'sly/propTypes/contact';
import DashboardAgentContactsSection from 'sly/components/organisms/DashboardAgentContactsSection';
import { withRedirectTo } from 'sly/services/redirectTo';

const getPaginationData = ({ result, meta }) => {
  if (!result) return {};

  const count = result.length;
  const current = meta['page-number'];
  const size = meta['page-size'];
  const start = (current * size) + 1;
  const end = (current * size) + count;
  const paginationRangeString = count > 0 ? `${start}-${end} of` : '';
  const filteredCount = meta.filtered_count;
  const text = `Showing ${paginationRangeString} ${filteredCount} contacts`;
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

@withRedirectTo

@prefetch('contacts', 'getContacts', (req, { datatable, agentName }) => {
  if (agentName) {
    const qs = datatable.query;
    qs['filter[agent]'] = agentName;
    return req(qs);
  }
  return req(datatable.query);
})

export default class DashboardAgentContactsSectionContainer extends Component {
  static propTypes = {
    contacts: arrayOf(contactPropType),
    status: object,
    datatable: object,
    match: object.isRequired,
    location: object.isRequired,
    redirectTo: func.isRequired,
  };

  render() {
    const { contacts, status, redirectTo, match, location, datatable, ...props } = this.props;

    const { error, meta, hasFinished, result: contactsRaw } = status.contacts;

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    return (
      <DashboardAgentContactsSection
        {...props}
        isPageLoading={!hasFinished || !datatable.hasFinished}
        datatable={datatable}
        contacts={contacts}
        contactsRaw={contactsRaw}
        pagination={getPaginationData(status.contacts)}
        activeTab={match.params.taskType}
        meta={meta || {}}
        refetchContacts={this.props.status.contacts.refetch}
        match={match}
        redirectTo={redirectTo}
      />
    );
  }
}
