import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, object, string, bool, func } from 'prop-types';
import { Route } from 'react-router';

import { size, palette } from 'sly/web/components/themes';
import mobileOnly from 'sly/web/components/helpers/mobileOnly';
import pad from 'sly/web/components/helpers/pad';
import SlyEvent from 'sly/web/services/helpers/events';
import contactPropType from 'sly/web/propTypes/contact';
import { Box, Table, THead, TBody, Tr, Td, Heading, Block } from 'sly/web/components/atoms';
import TableHeaderButtons from 'sly/web/components/molecules/TableHeaderButtons';
import Pagination from 'sly/web/components/molecules/Pagination';
import Th from 'sly/web/components/molecules/Th';
import ContactRowCard from 'sly/web/components/organisms/ContactRowCard';
import Modal from 'sly/web/components/molecules/Modal';
import AddOrEditContactFormContainer from 'sly/web/containers/AddOrEditContactFormContainer';
import IconButton from 'sly/web/components/molecules/IconButton';
import { ENTITY_LABEL_MAP } from 'sly/web/constants/entityTypes';
import { textAlign } from 'sly/web/components/helpers/text';

const TABLE_HEADINGS = [{ text: 'Contact name' }, { text: 'Entity' }, { text: 'Email' }, { text: 'Phone number' }, { text: 'Delete' }];

const Section = styled.section`
  background-color: ${palette('grey.background')};
  padding: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: 0;
    background-color: ${palette('white.base')};
    border: ${size('border.regular')} solid ${palette('slate.stroke')};
    border-top: 0;
    border-bottom: 0;
  }
`;

const StyledTable = styled(Table)`
  border-right: 0;
  border-left: 0;
`;

const CenteredPagination = styled(Pagination)`
  padding: ${size('spacing.large')};
  justify-content: center;
`;

const StyledPagination = styled(
  mobileOnly(
    CenteredPagination,
    css`
      position: sticky;
    `,
  ),
)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    border-bottom: ${size('border.regular')} solid ${palette('slate.stroke')};
  }
`;

const FamiliesCountStatusBlock = pad(
  styled(Box)`
    border-radius: 0;
    padding-left: ${size('spacing.regular')};
    padding-left: ${size('spacing.large')};
    background-color: ${palette('white.base')};
  `,
  'large',
);

const StyledFamiliesCountStatusBlock = styled(FamiliesCountStatusBlock)`
  margin-bottom: 0;
  border-left: none;
  border-right: none;
  border-bottom: none;
`;

const TwoColumn = pad(styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  padding: ${size('spacing.large')};
  margin-bottom: 0;

  ${Heading} {
    margin-bottom: 0;
  }
`);

const NoResultMessage = styled(textAlign(Block))`
  padding-top: ${size('spacing.xxxLarge')};
  padding-bottom: ${size('spacing.xxxLarge')};
`;

const StyledTableHeaderButtons = styled(TableHeaderButtons)`
  border: none;
`;

const StyledSection = styled(Section)`
  border: none;
`;

export default class DashboardAgentContactsSection extends Component {
  static propTypes = {
    datatable: object,
    contacts: arrayOf(contactPropType),
    contactsRaw: arrayOf(object),
    pagination: object,
    paginationString: string,
    showPagination: bool,
    isPageLoading: bool,
    meta: object,
    refetchContacts: func,
    match: object,
    history: object,
    redirectTo: func.isRequired,
    noBorder: bool,
    entityType: string.isRequired,
    entityId: string,
    entityName: string,
    deleteContact: func,
  };

  handleAddContactClick = () => {
    SlyEvent.getInstance().sendEvent({
      category: 'AgentDashboardContacts',
      action: 'click',
      label: 'addContact',
    });
  };

  handleContactClick = () => {
    SlyEvent.getInstance().sendEvent({
      category: 'AgentDashboardContacts',
      action: 'click',
      label: 'viewContact',
    });
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

  render() {
    const {
      contacts,
      pagination,
      isPageLoading,
      noBorder,
      meta,
      datatable,
      refetchContacts,
      match,
      history,
      redirectTo,
      entityId,
      entityType,
      entityName,
      deleteContact,
    } = this.props;

    const entityLabel = ENTITY_LABEL_MAP[entityType];
    // Assuming that the entity type column is at second place
    if (entityLabel) {
      TABLE_HEADINGS[1] =  { text: entityLabel };
    }
    return (
      <>
        <TwoColumn>
          <Heading level="subtitle">Contacts</Heading>
          {entityId && entityType && entityName && <IconButton icon="plus" hideTextInMobile to={`${match.url}/new`} onClick={this.handleAddContactClick}>Add contact</IconButton>}
        </TwoColumn>
        <StyledTableHeaderButtons
          datatable={datatable}
          modelConfig={{ name: 'Contact', defaultSearchField: 'name' }}
          meta={meta}
        />

        <StyledSection>
          {!isPageLoading && (
            <>
              <StyledTable sticky>
                <THead>
                  <Tr>{TABLE_HEADINGS.map(({ text }) => <Th key={text}>{text}</Th>)}</Tr>
                </THead>
                <TBody>
                  {contacts.map((contact) => {
                    const entity = this.getContactEntity(contact, entityType);
                    return (<ContactRowCard
                      key={contact.id}
                      contact={contact}
                      entity={entity}
                      editContactUrl={`${match.url}/edit/${contact.id}`}
                      onContactClick={() => this.handleContactClick(contact)}
                      deleteContact={deleteContact}
                    />);
                  })}
                  {contacts.length === 0 && (
                    <Tr>
                      <Td colSpan={TABLE_HEADINGS.length} borderless={noBorder}>
                        <NoResultMessage>Nice! You are on top of all your contacts here.</NoResultMessage>
                      </Td>
                    </Tr>
                  )}
                </TBody>
              </StyledTable>
              {pagination.show && (
                <StyledPagination
                  current={pagination.current}
                  total={pagination.total}
                  range={1}
                  basePath={datatable.basePath}
                  pageParam="page-number"
                />
              )}
            </>
          )}
          {isPageLoading && 'Loading...'}
        </StyledSection>

        {!isPageLoading &&
          contacts.length > 0 && (
            <StyledFamiliesCountStatusBlock padding="regular" size="caption" snap="top">
              {pagination.text}
            </StyledFamiliesCountStatusBlock>
        )}
        {/* For this to work, the route must not have exact true in App.js */}
        {!isPageLoading && (
          <Route path={`${match.url}/edit/:contactId`}>
            {({ match: routeMatch }) => {
              const contact = routeMatch ? contacts.find(x => x.id === routeMatch.params.contactId) : null;

              if (routeMatch && !contact) {
                redirectTo(match.url, true);
              }

              const closeModal = () => {
                if (history.action === 'PUSH') {
                  history.goBack();
                } else {
                  redirectTo(match.url, true);
                }
              };
              let entityId = null;
              let entityName = null;
              if (contact) {
                const entity = this.getContactEntity(contact, entityType);
                if (entity) {
                  entityId = entity.id;
                  entityName = entity.label;
                }
              }

              return (
                <Modal
                  isOpen={!!routeMatch}
                  onClose={closeModal}
                  closeable
                  layout="noPadding"
                >
                  <AddOrEditContactFormContainer
                    refetchContacts={refetchContacts}
                    contact={contact}
                    onSuccess={closeModal}
                    onCancel={closeModal}
                    entityId={entityId}
                    entityType={entityType}
                    entityName={entityName}
                  />
                </Modal>
              );
            }}
          </Route>
        )}
        {!isPageLoading && (
          <Route path={`${match.url}/new`}>
            {({ match: routeMatch }) => {
              const closeModal = () => {
                if (history.action === 'PUSH') {
                  history.goBack();
                } else {
                  redirectTo(match.url, true);
                }
              };

              return (
                <Modal
                  isOpen={!!routeMatch}
                  onClose={closeModal}
                  closeable
                  layout="noPadding"
                >
                  <AddOrEditContactFormContainer
                    refetchContacts={refetchContacts}
                    onSuccess={closeModal}
                    onCancel={closeModal}
                    entityId={entityId}
                    entityType={entityType}
                    entityName={entityName}
                  />
                </Modal>
              );
            }}
          </Route>
        )}
      </>
    );
  }
}
