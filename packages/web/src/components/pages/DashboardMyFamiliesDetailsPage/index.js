import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { string, func, object, arrayOf, bool } from 'prop-types';
import { generatePath } from 'react-router';

import {
  AGENT_DASHBOARD_FAMILIES_PATH,
  AGENT_DASHBOARD_FAMILIES_DETAILS_PATH,
  SUMMARY,
  ACTIVITY,
  FAMILY_DETAILS,
  COMMUNITIES,
  PARTNER_AGENTS,
  MESSAGES,
  EMAILS,
  TASKS, NEWFAMILIES, PROSPECTING, CONNECTED, CLOSED
} from 'sly/web/constants/dashboardAppPaths';
import { PROVIDER_ENTITY_TYPE_ORGANIZATION } from 'sly/web/constants/provider';
import { NOTE_CTYPE_NOTE } from 'sly/web/constants/notes';
import { CLIENT_ENTITY_TYPE } from 'sly/web/constants/entityTypes';
import { FAMILY_STAGE_NEW, FAMILY_STAGE_REJECTED } from 'sly/web/constants/familyDetails';
import { AGENT_ND_ROLE, AGENT_ADMIN_ROLE, PLATFORM_ADMIN_ROLE } from 'sly/common/constants/roles';
import clientPropType, { meta as clientMetaPropType } from 'sly/common/propTypes/client';
import notePropType from 'sly/common/propTypes/note';
import userPropType from 'sly/common/propTypes/user';
import conversationPropType from 'sly/common/propTypes/conversation/conversation';
import { size, palette } from 'sly/common/components/themes';
import { getStageDetails } from 'sly/web/services/helpers/stage';
import { isReferralSent } from 'sly/web/services/helpers/client';
import { clickEventHandler } from 'sly/web/services/helpers/eventHandlers';
import { userIs } from 'sly/web/services/helpers/role';
import pad from 'sly/web/components/helpers/pad';
import SlyEvent from 'sly/web/services/helpers/events';
import cursor from 'sly/web/components/helpers/cursor';
import Role from 'sly/web/components/common/Role';
import FamilyDetailsFormContainer from 'sly/web/containers/FamilyDetailsFormContainer';
import UpdateFamilyStageFormContainer from 'sly/web/containers/UpdateFamilyStageFormContainer';
import AddNoteFormContainer from 'sly/web/containers/AddNoteFormContainer';
import { Block, Link, Span } from 'sly/web/components/atoms';
import Tabs from 'sly/web/components/molecules/Tabs';
import DashboardFamilySummary from 'sly/web/components/molecules/DashboardFamilySummary';
import FamilyActivityItem from 'sly/web/components/molecules/FamilyActivityItem';
import Tab, { MobileTab } from 'sly/web/components/molecules/Tab';
import DashboardMyFamilyStickyFooterContainer from 'sly/web/containers/DashboardMyFamilyStickyFooterContainer';
import ConversationMessagesContainer from 'sly/web/containers/ConversationMessagesContainer';
import ReferralSearchContainer from 'sly/web/containers/dashboard/ReferralSearchContainer';
import StatusSelect from 'sly/web/components/molecules/StatusSelect';
import DuplicateFamilies from 'sly/web/components/organisms/DuplicateFamilies';
import DashboardAgentTasksSectionContainer from 'sly/web/containers/dashboard/DashboardAgentTasksSectionContainer';
import DashboardMessagesContainer from 'sly/web/containers/DashboardMessagesContainer';
import DashboardEmailsContainer from 'sly/web/containers/DashboardEmailsContainer';
import AddOrEditTaskFormContainer from 'sly/web/containers/AddOrEditTaskFormContainer';
import { Datatable } from 'sly/web/services/datatable';
import { textDecoration, textAlign } from 'sly/web/components/helpers/text';
import {
  DashboardWithSummaryPageTemplate, Left, LeftNotifications,
  Loading,
  Right, Section,
  Top,
} from 'sly/web/components/templates/DashboardWithSummaryTemplate';
import BreadCrumb from 'sly/web/components/molecules/BreadCrumb';
import Tag from 'sly/web/components/atoms/Tag';
import BannerNotification from 'sly/web/components/molecules/BannerNotification';
import Pagination from 'sly/web/components/molecules/Pagination';

const StyledPagination = styled(Pagination)`
  margin: 1rem;
  justify-content: center;
`;

const TextAlignCenterBlock = pad(textAlign(Block, 'center'), 'regular');

const SmallScreenBorder = css`
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    border: 0;
  }
`;

const SmallScreenBorderDiv = styled.div`
  ${SmallScreenBorder}
  ${p => p.padding && css`padding: ${size('spacing', p.padding)};`}
`;

const StyledFamilyActivityItem = styled(FamilyActivityItem)`
  border-right: 0;
  border-left: 0;
  &:first-child {
    border-top: 0;
  }
  &:last-child {
    border-bottom: 0;
  }
`;

const StyledStatusSelect = styled(StatusSelect)`
  margin-bottom: 0;

  min-width: max-content;
`;


const DashboardMessagesContainerWrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    padding: ${size('spacing.xLarge')};
  }
`;

const ClickHere = textDecoration(cursor(Span));

const ClientActions = ({ client, rawClient, user, ...props }) => {
  const { stage } = client;
  const { isNew, isProspects } = getStageDetails(stage);

  return (
    <Block display="flex" horizontalGutter="regular">
      {(userIs(user, PLATFORM_ADMIN_ROLE) || (!isNew && !isProspects)) &&
        <StyledStatusSelect
          client={client}
          rawClient={rawClient}
          user={user}
          {...props}
        />
      }
      {isReferralSent(client) &&
        <Tag
          palette="green"
          outline
          elementSize="label"
        >
          Referral sent
        </Tag>
      }
    </Block>
  );
};

ClientActions.propTypes = {
  client: clientPropType,
  user: userPropType,
  rawClient: object,
  backLinkHref: string,
};

const TabMap = {
  New: NEWFAMILIES,
  Prospects: PROSPECTING,
  Connected: CONNECTED,
  Closed: CLOSED,
};

export default class DashboardMyFamiliesDetailsPage extends Component {
  static propTypes = {
    client: clientPropType,
    clients: arrayOf(clientPropType),
    requestStatus: object,
    currentTab: string,
    showModal: func,
    hideModal: func,
    isModalOpen: bool,
    rawClient: object,
    notifyError: func,
    notifyInfo: func,
    meta: clientMetaPropType,
    onRejectSuccess: func,
    onAddNote: func,
    onEditNote: func,
    notes: arrayOf(notePropType),
    noteIsLoading: bool,
    isLoading: bool,
    refetchClient: func.isRequired,
    refetchNotes: func.isRequired,
    goToFamilyDetails: func,
    goToMessagesTab: func,
    conversation: conversationPropType,
    setSelectedConversation: func,
    user: userPropType.isRequired,
    onAcceptClick: func,
    onEditStatusDetailsClick: func,
    isEditStatusDetailsMode: bool,
    onStatusChange: func,
  };

  getTabPathsForUser = () => {
    const { client } = this.props;
    const { id } = client;
    const summaryPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: SUMMARY });
    const activityPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: ACTIVITY });
    const familyDetailsPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: FAMILY_DETAILS });
    const communitiesPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: COMMUNITIES });
    const agentsPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: PARTNER_AGENTS }); // Only for Admin
    const tasksPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: TASKS }); // Only for Admin
    const messagesPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: MESSAGES });
    const emailsPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: EMAILS });

    return {
      summaryPath,
      activityPath,
      familyDetailsPath,
      communitiesPath,
      agentsPath,
      tasksPath,
      messagesPath,
      emailsPath,
    };
  };

  getTabsForUser = () => {
    const { user } = this.props;
    const { roleID } = user;
    const {
      summaryPath,
      activityPath,
      familyDetailsPath,
      communitiesPath,
      agentsPath,
      tasksPath,
      messagesPath,
      emailsPath,
    } = this.getTabPathsForUser();

    const summaryTab = (
      <MobileTab id={SUMMARY} key={SUMMARY} to={summaryPath} onClick={clickEventHandler('fdetails-tab', 'Summary')}>
        Summary
      </MobileTab>
    );

    const genTab = ({ id, to, label }) => {
      return (
        <Tab id={id} key={id} to={to} onClick={clickEventHandler('fdetails-tab', label)}>
          {label}
        </Tab>
      );
    };
    const agentTabList = [
      { id: ACTIVITY, to: activityPath, label: 'Activity' },
      { id: FAMILY_DETAILS, to: familyDetailsPath, label: 'Family Details' },
      // { id: MESSAGES, to: messagesPath, label: 'Messages' },
    ];
    const agentAdminTabList = [
      { id: COMMUNITIES, to: communitiesPath, label: 'Communities' },
      { id: TASKS, to: tasksPath, label: 'Tasks' },
    ];
    const adminTabList = [
      // { id: COMMUNITIES, to: communitiesPath, label: 'Communities' },
      { id: PARTNER_AGENTS, to: agentsPath, label: 'Agents' },
      // { id: TASKS, to: tasksPath, label: 'Tasks' },
      { id: MESSAGES, to: messagesPath, label: 'Messages' },
      { id: EMAILS, to: emailsPath, label: 'Emails' },
    ];
    // TODO: CHANGE TO HAS ROLE INSTEAD OF IS ROLE...
    let tabs = [summaryTab];
    /* eslint-disable no-bitwise */
    if (roleID & (AGENT_ND_ROLE | AGENT_ADMIN_ROLE | PLATFORM_ADMIN_ROLE)) {
      tabs = tabs.concat(agentTabList.map(e => genTab(e)));
    }
    /* eslint-disable no-bitwise */
    if (roleID & (AGENT_ADMIN_ROLE | PLATFORM_ADMIN_ROLE)) {
      tabs = tabs.concat(agentAdminTabList.map(e => genTab(e)));
    }
    /* eslint-disable no-bitwise */
    if (roleID & PLATFORM_ADMIN_ROLE) {
      tabs = tabs.concat(adminTabList.map(e => genTab(e)));
    }

    return tabs;
  };

  handleRejectClick = (e) => {
    this.handleUpdateClick(e, true);
  };

  handleUpdateClick = (e, isReject) => {
    const {
      showModal, hideModal, notifyError, client, rawClient, notifyInfo, meta, refetchClient, refetchNotes,
      onRejectSuccess,
    } = this.props;
    const { stage: clientStage } = client;
    const { stage, lossReasons, rejectReasons } = meta;
    const onSuccess = isReject ? onRejectSuccess : hideModal;
    const initialValues = isReject ? { stage: FAMILY_STAGE_REJECTED } : {};

    SlyEvent.getInstance().sendEvent({
      category: 'fdetails',
      action: 'launch',
      label: isReject ? 'reject-lead' : 'update-stage',
      value: '',
    });
    stage.push(clientStage);

    showModal((
      <UpdateFamilyStageFormContainer
        refetchClient={refetchClient}
        refetchNotes={refetchNotes}
        onSuccess={onSuccess}
        lossReasons={lossReasons}
        notifyError={notifyError}
        notifyInfo={notifyInfo}
        client={client}
        rawClient={rawClient}
        nextAllowedStages={stage}
        onCancel={hideModal}
        rejectReasons={rejectReasons}
        initialValues={initialValues}
      />), null, 'letsmovetothismodaltypealltheothermodals', false);
  };

  handleAddNoteClick = () => {
    const {
      showModal, client, hideModal, onAddNote, notifyError, notifyInfo,
    } = this.props;
    const { clientInfo } = client;
    const { name } = clientInfo;
    SlyEvent.getInstance().sendEvent({
      category: 'fdetails',
      action: 'launch',
      label: 'add-note',
      value: '',
    });
    const handleSubmit = data => onAddNote(data, notifyError, notifyInfo, hideModal);

    showModal(<AddNoteFormContainer
      hasCancel
      noteRequired
      onCancelClick={hideModal}
      heading={`Add a note on ${name}`}
      label="Note"
      placeholder=""
      submitButtonText="Save note"
      onSubmit={handleSubmit}
    />, null, 'noPadding', false);
  };

  handleEditNoteClick = (note) => {
    const {
      showModal, client, hideModal, onEditNote, notifyError, notifyInfo,
    } = this.props;
    const { clientInfo } = client;
    const { name } = clientInfo;
    SlyEvent.getInstance().sendEvent({
      category: 'fdetails',
      action: 'launch',
      label: 'edit-note',
      value: note.id,
    });
    const handleSubmit = data => onEditNote(data, note, notifyError, notifyInfo, hideModal);
    const initialValues = {
      note: note.body,
    };

    showModal(<AddNoteFormContainer
      hasCancel
      noteRequired
      onCancelClick={hideModal}
      heading={`Edit note on ${name}`}
      label="Note"
      placeholder="Edit a note."
      submitButtonText="Save note"
      onSubmit={handleSubmit}
      initialValues={initialValues}
    />, null, 'noPadding', false);
  };

  handleAddTaskClick = () => {
    const { showModal, hideModal, notifyInfo, notifyError, client } = this.props;
    // todo: remove after clarifying. here since task api call
    // won't be done meta is not available
    const priorities = [
      'Urgent',
      'High',
      'Medium',
      'Low',
    ];
    const statuses = [
      'Not Started',
      'In Progress',
      'Completed',
      'Deleted',
    ];
    const event = {
      category: 'fdetails',
      action: 'launch',
      label: 'addTask',
    };
    SlyEvent.getInstance().sendEvent(event);
    showModal(
      (
        <AddOrEditTaskFormContainer
          priorities={priorities}
          statuses={statuses}
          onCancel={hideModal}
          notifyInfo={notifyInfo}
          notifyError={notifyError}
          onSuccess={hideModal}
          client={client}
        />
      ), null, 'noPadding', false,
    );
  };

  getStickyFooterOptions = (showUpdateAddNoteButtons, showAcceptRejectButtons) => {
    const { /* hideModal, */ onAcceptClick } = this.props;

    /* agent features to be released in future
      {
        text: 'Add task', icon: 'checkbox-fill', iconPalette: 'slate', onClick: this.handleAddTaskClick, ghost: true,
      },
      {
        text: 'Send agent refferal', icon: 'send', iconPalette: 'slate', onClick: hideModal, to: agentsPath, ghost: true,
      },
      {
        text: 'Send community refferal', icon: 'send', iconPalette: 'slate', onClick: hideModal, to: communitiesPath, ghost: true,
      },
      {
        text: 'Message family', icon: 'message', iconPalette: 'slate', onClick: hideModal, to: messagesPath, ghost: true,
      },
    */
    // showUpdateAddNote Button overrides showAcceptReject Buttons
    if (showUpdateAddNoteButtons) {
      /* const {
        messagesPath,
        communitiesPath,
        agentsPath,
      } = this.getTabPathsForUser(); */
      return [
        {
          text: 'Add note', icon: 'add-note', iconPalette: 'slate', onClick: this.handleAddNoteClick, ghost: true,
        },
        {
          text: 'Update stage', icon: 'flag', iconPalette: 'slate', onClick: this.handleUpdateClick,
        },
      ];
    }
    if (showAcceptRejectButtons) {
      return [
        {
          text: 'Accept and contact this family', icon: 'flag', palette: 'primary', iconPalette: 'slate', onClick: onAcceptClick,
        },
        {
          text: 'Reject', icon: 'add-note', iconPalette: 'slate', palette: 'danger', onClick: this.handleRejectClick, ghost: true,
        },
      ];
    }
    return [];
  };

  handleClickHereForMore = () => {
    const { showModal, client, clients } = this.props;

    showModal(<DuplicateFamilies noTopSpacing currentClient={client} clients={clients} heading="Duplicate family entries" />, null, 'noPadding');
  };

  render() {
    const {
      client, currentTab, meta, notifyInfo, notifyError, rawClient, basePath, notes, notesPagination, noteIsLoading, isLoading, user,
      conversation, setSelectedConversation, refetchClient,
      showModal, hideModal, isModalOpen, onAcceptClick, clients, onEditStatusDetailsClick, isEditStatusDetailsMode, onStatusChange,
    } = this.props;

    const { organization } = user;


    if (isLoading) {
      return (
        <Loading activeMenuItem="Families">
          Loading...
        </Loading>
      );
    }

    const {
      gender, lookingFor, monthlyBudget, timeToMove, roomTypes, mobilityLevels, careServices, communityTypes, assignedTos,
    } = meta;
    const {
      id, clientInfo, stage, status, provider, organization: clientOrganization, parentSlug, uuidAux,
    } = client;
    const { entityType, id: providerOrg } = provider;
    const { id: clientOrg } = clientOrganization;
    const { id: userOrg } = organization;
    const { group, isConnected } = getStageDetails(stage);
    const backLinkHref = generatePath(AGENT_DASHBOARD_FAMILIES_PATH, { clientType: TabMap[group] });
    const backLink = {
      path: generatePath(AGENT_DASHBOARD_FAMILIES_PATH, { clientType: TabMap[group] }),
      label: 'Back to Families',
      event: {
        category: 'fdetails',
        label: 'Back to Families',
        action: 'click',
      },
    };

    if (!client) {
      return (
        <Loading activeMenuItem="Families" backLink={backLink}>
          Client not found!
        </Loading>
      );
    }

    const breadCrumbItems = [
      { ...backLink, label: 'Families' },
      {
        label: client.clientInfo?.name,
      },
    ];

    const showAcceptRejectButtons = stage === FAMILY_STAGE_NEW;
    let showUpdateAddNoteButtons = stage !== FAMILY_STAGE_NEW;
    let canEditFamilyDetails = isConnected;
    const isClientAdminUser = userIs(user, PLATFORM_ADMIN_ROLE) ||
      (entityType === PROVIDER_ENTITY_TYPE_ORGANIZATION && userOrg === providerOrg);
    const isAgentUser = userIs(user, AGENT_ND_ROLE);
    const isOfDifferentOrg = userOrg !== clientOrg;
    // Rule when lead is created by self
    if (isClientAdminUser) {
      showUpdateAddNoteButtons = true;
      canEditFamilyDetails = true;
    }
    const { uuidInfo: { residentInfo: { interest } } } = uuidAux || { uuidInfo: { residentInfo: { interest: '' } } };
    const explicitOptOut = interest === 'do-not-refer';
    // Sticky footer is for smaller width devices
    const stickyFooterOptions = this.getStickyFooterOptions(showUpdateAddNoteButtons, showAcceptRejectButtons);

    const { name } = clientInfo;
    const activityCards = notes ? notes.map((a, i) => {
      const props = {
        key: a.id,
        noBorderRadius: true,
        snap: i === notes.length - 1 ? null : 'bottom',
        title: a.title,
        description: a.body,
        date: a.createdAt,
        cType: a.cType,
      };
      if (a.commentableType === CLIENT_ENTITY_TYPE && a.commentableID !== id && a.title !== '') {
        if (!a.title.includes('[Note on Agent Record]')) { // not to allow multiple presence due to rerender
          a.title = `[Note on Agent Record] ${a.title}`;
        }
      }
      if (a.cType === NOTE_CTYPE_NOTE) {
        props.onEditClick = () => this.handleEditNoteClick(a);
      }

      return <StyledFamilyActivityItem {...props} />;
    }) : [];


    const familyDetailsPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: FAMILY_DETAILS });
    const familyTasksPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: TASKS });

    const taskFilters = {
      'filter[client]': client.id,
    };

    const headerActions = (
      <ClientActions
        client={client}
        rawClient={rawClient}
        refetchClient={refetchClient}
        backLinkHref={backLinkHref}
        showModal={showModal}
        hideModal={hideModal}
        notifyInfo={notifyInfo}
        notifyError={notifyError}
        user={user}
        status={isEditStatusDetailsMode ? status : null}
        onStatusChange={onStatusChange}
        onCancel={onStatusChange}
      />
    );

    const notifications = [];

    if (clients && clients.length > 1) {
      notifications.push({
        palette: 'yellow',
        content: (
          <>
            There are families with same contact info.&nbsp;<ClickHere palette="white" onClick={this.handleClickHereForMore}>Click here to check.</ClickHere>
          </>
        ),
      });
    }

    if (userIs(user, PLATFORM_ADMIN_ROLE) && explicitOptOut) {
      notifications.push({
        palette: 'yellow',
        content: (
          <>
            This family explicitly opted out of being connected with an agent!
          </>
        ),
      });
    }

    if (isOfDifferentOrg && parentSlug !== '') {
      notifications.push({
        palette: 'primary',
        content: (
          <Span weight="bold">
            <Link
              palette="white"
              target="_blank"
              to={`/dashboard/agent/my-families/${parentSlug}`}
              onClick={clickEventHandler('fdetails', 'Nav to Parent')}
            >
              You are looking at {client.organization.name}'s family. Go to the parent record.
            </Link>
          </Span>
        ),
      });
    }

    return (
      <DashboardWithSummaryPageTemplate hasStickyFooter={!isModalOpen} activeMenuItem="Families">
        <Top>
          <BreadCrumb items={breadCrumbItems} />
        </Top>

        <Left heading={name} actions={headerActions}>
          {(notifications.length || null) && (
            <LeftNotifications>
              {notifications.map(({ palette, content }) => (
                <BannerNotification
                  key={content}
                  palette={palette}
                >
                  {content}
                </BannerNotification>
              ))}
            </LeftNotifications>
          )}
        </Left>

        <Right>
          <Tabs activeTab={currentTab}>
            {this.getTabsForUser()}
          </Tabs>

          {currentTab === ACTIVITY && (
            <Section>
              {noteIsLoading && <Block size="subtitle">Loading...</Block>}
              {!noteIsLoading && activityCards.length === 0 &&
              <TextAlignCenterBlock>There are no activities.</TextAlignCenterBlock>
              }
              {!noteIsLoading && activityCards.length > 0 &&
              <>
                {/* <TableHeaderButtons hasColumnsButton={false} /> */}
                {activityCards}
                {notesPagination.show &&
                  <StyledPagination
                    current={notesPagination.current}
                    total={notesPagination.total}
                    basePath={basePath}
                    pageParam="page-number"
                  />
                }
              </>
              }
            </Section>
          )}

          {currentTab === FAMILY_DETAILS && (
            <FamilyDetailsFormContainer
              client={client}
              isAgentUser={isAgentUser}
              rawClient={rawClient}
              refetchClient={refetchClient}
              notifyInfo={notifyInfo}
              notifyError={notifyError}
              accepted={!showAcceptRejectButtons  || userIs(user, PLATFORM_ADMIN_ROLE)}
              canEditFamilyDetails={canEditFamilyDetails || userIs(user, PLATFORM_ADMIN_ROLE)}
              isAgentProUser={userIs(user, AGENT_ADMIN_ROLE)}
              gender={gender}
              lookingFor={lookingFor}
              monthlyBudget={monthlyBudget}
              timeToMove={timeToMove}
              careServices={careServices}
              mobilityLevels={mobilityLevels}
              roomTypes={roomTypes}
              communityTypes={communityTypes}
              assignedTos={assignedTos}
              onEditStageDetailsClick={this.handleUpdateClick}
              onEditStatusDetailsClick={onEditStatusDetailsClick}
            />
          )}

          {currentTab === COMMUNITIES && (
            <Role className="agentTab" is={PLATFORM_ADMIN_ROLE | AGENT_ADMIN_ROLE}>
              <Section>
                <ReferralSearchContainer
                  notifyError={notifyError}
                  notifyInfo={notifyInfo}
                  parentClient={client}
                  parentRawClient={rawClient}
                  refetchClient={refetchClient}
                  user={user}
                  referralMode="Community"
                />
              </Section>
            </Role>
          )}

          {currentTab === PARTNER_AGENTS && (
            <Role className="agentTab" is={PLATFORM_ADMIN_ROLE}>
              <Section>
                <ReferralSearchContainer
                  notifyError={notifyError}
                  notifyInfo={notifyInfo}
                  parentClient={client}
                  parentRawClient={rawClient}
                  refetchClient={refetchClient}
                  user={user}
                  referralMode="Agent"
                />
              </Section>
            </Role>
          )}

          {currentTab === TASKS && (
            <Role className="agentTab" is={PLATFORM_ADMIN_ROLE | AGENT_ADMIN_ROLE}>
              <Datatable
                id="tasks"
                filters={taskFilters}
              >
                {datatable => (
                  <DashboardAgentTasksSectionContainer datatable={datatable} client={client} contextPath={familyTasksPath} />
                )}
              </Datatable>
            </Role>
          )}

          {currentTab === MESSAGES && (
            <SmallScreenBorderDiv>
              {!conversation &&
                <DashboardMessagesContainerWrapper>
                  <DashboardMessagesContainer
                    onConversationClick={setSelectedConversation}
                    heading="Conversations"
                    clientId={id}
                  />
                </DashboardMessagesContainerWrapper>
              }
              {conversation &&
                <ConversationMessagesContainer
                  conversationId={conversation.id}
                  sendMessageFormPlaceholder={`Message ${name}...`}
                  onBackClick={() => setSelectedConversation(null)}
                />
              }
            </SmallScreenBorderDiv>
          )}
          {currentTab === EMAILS && (
            <SmallScreenBorderDiv>
              <DashboardEmailsContainer
                heading="Emails"
                clientId={id}
              />
            </SmallScreenBorderDiv>
          )}
        </Right>

        <DashboardFamilySummary
          className={currentTab === SUMMARY ? 'selected' : ''}
          client={client}
          user={user}
          isOfDifferentOrg={isOfDifferentOrg}
          isAgentUser={isAgentUser}
          to={familyDetailsPath}
          stageText={stage}
          onAcceptClick={onAcceptClick}
          onRejectClick={this.handleRejectClick}
          onUpdateClick={this.handleUpdateClick}
          onAddNoteClick={this.handleAddNoteClick}
          snap={notifications.length ? 'vertical' : 'bottom'}
        />

        {!isModalOpen && (
          <DashboardMyFamilyStickyFooterContainer
            options={stickyFooterOptions}
            stage={stage}
            stageLabel={`${group} - ${stage}`}
            showAcceptRejectButtons={showAcceptRejectButtons && !isClientAdminUser}
            user={user}
          />
        )}
      </DashboardWithSummaryPageTemplate>
    );
  }
}
