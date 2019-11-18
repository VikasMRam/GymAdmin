import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import { withRouter } from 'react-router';

import { prefetch, withUser } from 'sly/services/newApi';
import contactPropType from 'sly/propTypes/contact';
import ModalController from 'sly/controllers/ModalController';
import NotificationController from 'sly/controllers/NotificationController';
import DashboardAgentContactsSection from 'sly/components/organisms/DashboardAgentContactsSection';

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

@prefetch('contacts', 'getContacts', (req, { datatable }) => req(datatable.query))

export default class DashboardAgentTasksSectionContainer extends Component {
  static propTypes = {
    contacts: arrayOf(contactPropType),
    status: object,
    history: object,
    datatable: object,
    match: object,
    location: object,
  };

  render() {
    const { contacts, status, match, location, datatable, ...props } = this.props;

    const { error, meta, hasFinished, result: contactsRaw } = status.contacts;

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    return (
      <NotificationController>
        {({ notifyInfo, notifyError }) => (
          <ModalController>
            {({ show, hide }) => (
              <DashboardAgentContactsSection
                {...props}
                isPageLoading={!hasFinished || !datatable.hasFinished}
                datatable={datatable}
                contacts={contacts}
                contactsRaw={contactsRaw}
                pagination={getPaginationData(status.contacts)}
                activeTab={match.params.taskType}
                // onSearchTextKeyUp={this.handleSearchTextKeyUp}
                showModal={show}
                hideModal={hide}
                meta={meta || {}}
                notifyError={notifyError}
                notifyInfo={notifyInfo}
                refetchContacts={this.props.status.contacts.refetch}
              />
            )}
          </ModalController>
        )}
      </NotificationController>
    );
  }
}
