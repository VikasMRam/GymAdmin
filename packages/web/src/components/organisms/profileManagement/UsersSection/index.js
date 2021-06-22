import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { arrayOf, object, string, bool, func } from 'prop-types';
import { Route } from 'react-router';


import { size, palette } from 'sly/common/components/themes';
import mobileOnly from 'sly/web/components/helpers/mobileOnly';
import pad from 'sly/web/components/helpers/pad';
import SlyEvent from 'sly/web/services/helpers/events';
import userPropType from 'sly/common/propTypes/user';
import { Box, Table, THead, TBody, Tr, Td, Block } from 'sly/web/components/atoms';
import TableHeaderButtons from 'sly/web/components/molecules/TableHeaderButtons';
import Pagination from 'sly/web/components/molecules/Pagination';
import Th from 'sly/web/components/molecules/Th';
import Modal from 'sly/web/components/molecules/Modal';
import IconButton from 'sly/common/components/molecules/IconButton';
import { ENTITY_LABEL_MAP } from 'sly/web/constants/entityTypes';
import { textAlign } from 'sly/web/components/helpers/text';
import { SectionHeader } from 'sly/web/dashboard/DashboardWithSummaryTemplate';
import UserRowCard from 'sly/web/components/organisms/UserRowCard';
import AddEditUserContainer from 'sly/web/containers/dashboard/AddEditUserContainer';

const TABLE_HEADINGS = [{ text: 'user name' }, { text: 'Organization' }, { text: 'Email' }, { text: 'Phone number' }, { text: 'Delete' }];

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

export default class UsersSection extends Component {
  static propTypes = {
    datatable: object,
    users: arrayOf(userPropType),
    usersRaw: arrayOf(object),
    pagination: object,
    paginationString: string,
    showPagination: bool,
    isPageLoading: bool,
    meta: object,
    refetchusers: func,
    match: object,
    history: object,
    redirectTo: func.isRequired,
    noBorder: bool,
    entityType: string.isRequired,
    entityId: string,
    entityName: string,
    deleteuser: func,
  };

  handleAdduserClick = () => {
    SlyEvent.getInstance().sendEvent({
      category: 'AgentDashboardusers',
      action: 'click',
      label: 'adduser',
    });
  };

  handleUserClick = () => {
    SlyEvent.getInstance().sendEvent({
      category: 'AgentDashboardusers',
      action: 'click',
      label: 'viewuser',
    });
  };

  render() {
    const {
      users,
      pagination,
      isPageLoading,
      noBorder,
      meta,
      datatable,
      refetchusers,
      match,
      history,
      redirectTo,
      entityId,
      entityType,
      entityName,
      deleteuser,
    } = this.props;

    const entityLabel = ENTITY_LABEL_MAP[entityType];
    // Assuming that the entity type column is at second place
    if (entityLabel) {
      TABLE_HEADINGS[1] =  { text: entityLabel };
    }
    const actions = (
      <IconButton
        icon="plus"
        hideTextInMobile
        to={`${match.url}/new`}
        onClick={this.handleAdduserClick}
      >
        Add user
      </IconButton>
    );

    return (
      <Section>
        <SectionHeader actions={actions}>
          Users
        </SectionHeader>

        <StyledTableHeaderButtons
          datatable={datatable}
          modelConfig={{ name: 'User', defaultSearchField: 'name' }}
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
                  {users.map((user) => {
                    return (<UserRowCard
                      key={user.id}
                      user={user}
                      editUserUrl={`${match.url}/edit/${user.id}`}
                      onUserClick={() => this.handleUserClick()}
                      deleteUser={deleteuser}
                    />);
                  })}
                  {users.length === 0 && (
                    <Tr>
                      <Td colSpan={TABLE_HEADINGS.length} borderless={noBorder}>
                        <NoResultMessage>There are no users associated with the organization!</NoResultMessage>
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
          users.length > 0 && (
            <StyledFamiliesCountStatusBlock padding="regular" size="caption" snap="top">
              {pagination.text}
            </StyledFamiliesCountStatusBlock>
        )}
        {/* For this to work, the route must not have exact true in App.js */}
        {!isPageLoading && (
          <Route path={`${match.url}/edit/:userId`}>
            {({ match: routeMatch }) => {
              const user = routeMatch ? users.find(x => x.id === routeMatch.params.userId) : null;

              if (routeMatch && !user) {
                redirectTo(match.url, true);
              }

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
                  <AddEditUserContainer
                    refetchusers={refetchusers}
                    user={user}
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
                  <AddEditUserContainer
                    refetchusers={refetchusers}
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
      </Section>
    );
  }
}
