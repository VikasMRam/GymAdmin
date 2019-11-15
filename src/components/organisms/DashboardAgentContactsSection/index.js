import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, object, string, bool, func } from 'prop-types';
import { generatePath } from 'react-router';

import { size, palette } from 'sly/components/themes';
import mobileOnly from 'sly/components/helpers/mobileOnly';
import pad from 'sly/components/helpers/pad';
import SlyEvent from 'sly/services/helpers/events';
import contactPropType from 'sly/propTypes/contact';
import textAlign from 'sly/components/helpers/textAlign';
import { Box, Table, THead, TBody, Tr, Td, Heading, Block } from 'sly/components/atoms';
import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';
import Pagination from 'sly/components/molecules/Pagination';
import Th from 'sly/components/molecules/Th';
import IconButton from 'sly/components/molecules/IconButton';
import ContactRowCard from 'sly/components/organisms/ContactRowCard';
import {
  AGENT_DASHBOARD_TASKS_PATH, AGENT_DASHBOARD_CONTEXT_TASKS_PATH, TODAY, OVERDUE, UPCOMING, COMPLETED,
} from 'sly/constants/dashboardAppPaths';
import { stripPageNumber } from 'sly/services/helpers/appPaths';

const TABLE_HEADINGS = [
  { text: 'Contact Name' },
];

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

const StyledPagination = styled(mobileOnly(CenteredPagination, css`
  position: sticky;
`))`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    border-bottom: ${size('border.regular')} solid ${palette('slate.stroke')};
  }
`;

const FamiliesCountStatusBlock = pad(styled(Box)`
  border-radius: 0;
  padding-left: ${size('spacing.regular')};
  padding-left: ${size('spacing.large')};
  background-color: ${palette('white.base')};
`, 'large');

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

const TabMap = {
  All: TODAY,
};

const onTabClick = (label) => {
  const event = {
    category: 'DashboardAgentTasksTab',
    action: 'click',
    label,
  };
  SlyEvent.getInstance().sendEvent(event);
};

const getBasePath = (taskType, location) => {
  // const getBasePath = (taskType, contextPath = AGENT_DASHBOARD_TASKS_PATH, location) => {
  // TODO: Use AGENT_DASHBOARD_CONTEXT_TASKS_PATH below
  const path = generatePath(AGENT_DASHBOARD_TASKS_PATH, { taskType });

  return location && location.search ? `${path}${stripPageNumber(location.search)}` : path;
};

export default class DashboardAgentContactsSection extends Component {
  static propTypes = {
    datatable: object,
    contacts: arrayOf(contactPropType),
    contactsRaw: arrayOf(object),
    pagination: object,
    paginationString: string,
    activeTab: string,
    showPagination: bool,
    searchTextValue: string,
    onSearchTextKeyUp: func,
    isPageLoading: bool,
    showModal: func,
    hideModal: func,
    meta: object,
    notifyInfo: func,
    notifyError: func,
    refetchContacts: func,
    searchTextBoxValue: string,
  };

  handleAddContactClick = () => {
    const { showModal, hideModal, notifyInfo, notifyError, meta, refetchContacts } = this.props;
    const { priorities, statuses } = meta;

    SlyEvent.getInstance().sendEvent({
      category: 'AgentDashboardContacts',
      action: 'click',
      label: 'addContact',
    });

    showModal(
      (
        <div>create contact here</div>
      ), null, 'noPadding', false
    );
  };

  handleContactClick = (contact) => {
    const { showModal, hideModal, notifyInfo, notifyError, meta, tasksRaw, refetchTasks, client } = this.props;
    const { priorities, statuses } = meta;

    SlyEvent.getInstance().sendEvent({
      category: 'AgentDashboardContacts',
      action: 'click',
      label: 'viewContact',
    });

    showModal(
      (
        <div>You've clicked a contact. Prick!</div>
      ), null, 'noPadding', false
    );
  };

  render() {
    const {
      contacts, pagination, activeTab, isPageLoading, noBorder, meta, location,
      datatable,
    } = this.props;

    return (
      <>
        <TwoColumn>
          <Heading level="subtitle">Contacts</Heading>
          <IconButton icon="plus" hideTextInMobile onClick={this.handleAddContactClick}>
            Add contact
          </IconButton>
        </TwoColumn>
        <StyledTableHeaderButtons
          datatable={datatable}
          modelConfig={{ name: 'Task', defaultSearchField: 'title' }}
          meta={meta}
        />

        <StyledSection>
          {!isPageLoading && (
            <>
              <StyledTable>
                <THead>
                  <Tr>
                    {TABLE_HEADINGS.map(({ text }) => <Th key={text}>{text}</Th>)}
                  </Tr>
                </THead>
                <TBody>
                  {contacts.map(contact => (
                    <ContactRowCard key={contact.id} contact={contact} onContactClick={() => this.handleContactClick(contact)} />
                  ))}
                  {contacts.length === 0 &&
                    <Tr>
                      <Td colSpan={TABLE_HEADINGS.length} borderless={noBorder}>
                        <NoResultMessage>Nice! You are on top of all your tasks here.</NoResultMessage>
                      </Td>
                    </Tr>
                  }
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

        {!isPageLoading && contacts.length > 0 &&
          <StyledFamiliesCountStatusBlock padding="regular" size="caption" snap="top">
            {pagination.text}
          </StyledFamiliesCountStatusBlock>
        }
      </>
    );
  }
}
