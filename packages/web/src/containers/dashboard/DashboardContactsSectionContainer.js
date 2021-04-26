import React, { Component } from 'react';
import { arrayOf, object, func, string } from 'prop-types';

import { withRouter } from 'react-router';
import { prefetch, withUser, query } from 'sly/web/services/api';
import contactPropType from 'sly/common/propTypes/contact';
import DashboardAgentContactsSection from 'sly/web/components/organisms/DashboardAgentContactsSection';
import { withRedirectTo } from 'sly/common/services/redirectTo';
import { withDatatable } from 'sly/web/services/datatable';
import withModal from 'sly/web/controllers/withModal';
import withNotification from 'sly/web/components/helpers/notification';
import ConfirmationDialog from 'sly/web/components/molecules/ConfirmationDialog';

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

@withDatatable('contacts')
@withRouter
@withUser
@withRedirectTo
@withModal
@withNotification
@query('deleteContact', 'deleteContact')
@prefetch('contacts', 'getContacts', (req, { datatable }) => req(datatable.query))

export default class DashboardContactsSectionContainer extends Component {
  static propTypes = {
    contacts: arrayOf(contactPropType),
    status: object,
    datatable: object,
    match: object.isRequired,
    location: object.isRequired,
    redirectTo: func.isRequired,
    entityType: string.isRequired,
    entityId: string,
    entityName: string,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    deleteContact: func.isRequired,
  };

  getContactEntity = (contact, entityType) => {
    for (let i = 0; i < contact.entities.length; i++) {
      const e = contact.entities[i];
      if (e.entityType === entityType)  {
        return e;
      }
    }
    return null;
  }

  refetchContacts = () => {
    const { status } = this.props;
    status.contacts.refetch();
  }

  deleteContact = (contact) => {
    const { showModal, hideModal, notifyInfo, notifyError } = this.props;

    const doDelete = () => {
      const { deleteContact, entityId, entityType } = this.props;

      const entity = this.getContactEntity(contact, entityType);
      const payload = { id: contact.id, entityId: entityId, entityType: entity.entityType };
      return deleteContact(payload)
        .then(this.refetchContacts)
        .then(hideModal)
        .then(() => {
          notifyInfo(`Contact ${contact.name} removed correctly`);
        })
        .catch(() => {
          notifyError(`Contact ${contact.name} could not be removed`);
        });
    };

    return showModal((
      <ConfirmationDialog
        heading={`Remove ${contact.name}`}
        description={`Are you sure that you want to remove ${contact.name}? This cannot be undone.`}
        onConfirmClick={doDelete}
        onCancelClick={hideModal}
      />
    ), hideModal);
  };

  render() {
    const { contacts, status, redirectTo, match, location, datatable,  entityId, entityType, entityName, ...props } = this.props;

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
        refetchContacts={this.refetchContacts}
        match={match}
        redirectTo={redirectTo}
        entityId={entityId}
        entityType={entityType}
        entityName={entityName}
        deleteContact={this.deleteContact}
      />
    );
  }
}
