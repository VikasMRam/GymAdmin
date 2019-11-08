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
  TASKS, PROSPECTING, CONNECTED, CLOSED,
} from 'sly/constants/dashboardAppPaths';
import { PROVIDER_ENTITY_TYPE_ORGANIZATION } from 'sly/constants/provider';
import { NOTE_CTYPE_NOTE } from 'sly/constants/notes';
import { FAMILY_STAGE_NEW, FAMILY_STAGE_REJECTED } from 'sly/constants/familyDetails';
import { AGENT_ND_ROLE, PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';
import clientPropType, { meta as clientMetaPropType } from 'sly/propTypes/client';
import notePropType from 'sly/propTypes/note';
import userPropType from 'sly/propTypes/user';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import { size, palette } from 'sly/components/themes';
import { getStageDetails } from 'sly/services/helpers/stage';
import { isReferralSent } from 'sly/services/helpers/client';
import { clickEventHandler } from 'sly/services/helpers/eventHandlers';
import { userIs } from 'sly/services/helpers/role';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import SlyEvent from 'sly/services/helpers/events';
import Role from 'sly/components/common/Role';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardTwoColumnTemplate from 'sly/components/templates/DashboardTwoColumnTemplate';
import FamilyDetailsFormContainer from 'sly/containers/FamilyDetailsFormContainer';
import UpdateFamilyStageFormContainer from 'sly/containers/UpdateFamilyStageFormContainer';
import AddNoteFormContainer from 'sly/containers/AddNoteFormContainer';
import { Box, Block, Icon, Link, Hr } from 'sly/components/atoms';
import Tabs from 'sly/components/molecules/Tabs';
import FamilyStage from 'sly/components/molecules/FamilyStage';
import FamilySummary from 'sly/components/molecules/FamilySummary';
import FamilyActivityItem from 'sly/components/molecules/FamilyActivityItem';
import BackLink from 'sly/components/molecules/BackLink';
import IconBadge from 'sly/components/molecules/IconBadge';
import Tab from 'sly/components/molecules/Tab';
import DashboardMyFamilyStickyFooterContainer from 'sly/containers/DashboardMyFamilyStickyFooterContainer';
import ConversationMessagesContainer from 'sly/containers/ConversationMessagesContainer';
import ReferralSearchContainer from 'sly/containers/dashboard/ReferralSearchContainer';
import StatusSelect from 'sly/components/molecules/StatusSelect';
import DashboardAgentTasksSectionContainer from 'sly/containers/dashboard/DashboardAgentTasksSectionContainer';
import DashboardMessagesContainer from 'sly/containers/DashboardMessagesContainer';
import AddOrEditTaskFormContainer from 'sly/containers/AddOrEditTaskFormContainer';
import { Datatable } from 'sly/services/datatable';

const PaddedFamilySummary = pad(FamilySummary, 'xLarge');

const BackLinkWrapper = pad(styled.div`
  display: flex;
  align-items: center;
`, 'regular');

const TextAlignCenterBlock = pad(textAlign(Block, 'center'), 'regular');
const AlignCenterBackLinkWrapper = BackLinkWrapper.extend`
  justify-content: center;
`;

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

const SmallScreenBorderPaddedFamilySummary = PaddedFamilySummary.extend`
  ${SmallScreenBorder}
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

const FamilyDetailsTab = styled.div`
  ${SmallScreenBorder};
`;

const FamilyTasksTab = styled.div`
  padding:${size('spacing', 'xLarge')};
`;

const TabWrapper = styled(Box)`
  padding: ${size('spacing.large')};
  background-color: ${palette('grey', 'background')};
  margin-bottom: ${size('dashboard.actionFooterBottomMargin')};
  border-width: 0;

  > * {
    background-color: ${palette('white', 'base')};
  }
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xLarge')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    background-color: ${palette('white', 'base')};
    padding: 0;
    margin-bottom: 0;
    border-width: ${size('border.regular')};

    > * {
      background-color: transparent;
    }
  }
`;

const MobileTab = styled(Tab)`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const BigScreenSummarySection = styled.section`
  display: none;

  > * {
    background-color: ${palette('white', 'base')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
  }
`;

const SmallScreenClientNameWrapper = styled.div`
  padding: ${size('spacing.large')};
  background-color: ${palette('white', 'base')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const StyledStatusSelect = styled(StatusSelect)`
  margin-bottom: 0;
  min-width: 56px;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    min-width: 125px;
  }
`;

const StyledClientNameBlock = styled(Block)`
  display: flex;
  align-items: center;

  > :nth-child(2) {
    flex-grow: 1;
    text-align: center;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    > :nth-child(2) {
      text-align: left;
    }

    > :nth-child(1) {
      display: none;
    }
  }

`;

const DashboardMessagesContainerWrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    padding: ${size('spacing.xLarge')};
  }
`;
const StyledIconBadge = styled(IconBadge)`
  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    order: 2;
  }
`;

const ClientName = ({ client, rawClient, backLinkHref, ...props }) => {
  const { clientInfo } = client;
  const { name, additionalMetadata } = clientInfo;
  return (
    <StyledClientNameBlock
      weight="medium"
      size="subtitle"
    >
      <Link to={backLinkHref}>
        <Icon icon="arrow-left" palette="primary" />
      </Link>
      <span>{name}</span>
      {isReferralSent(additionalMetadata) && <StyledIconBadge badgePalette="secondary" palette="white" icon="checkmark-circle" text="R SENT" />}
      <StyledStatusSelect client={client} rawClient={rawClient} {...props} />
    </StyledClientNameBlock>
  );
};

ClientName.propTypes = {
  client: clientPropType,
  rawClient: object,
  backLinkHref: string,
};

const StyledDashboardTwoColumnTemplate = styled(DashboardTwoColumnTemplate)`
  margin-bottom: ${size('element.xxxLarge')};

  main {
    padding: 0;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-bottom: 0;

    main {
      padding: ${size('spacing.xLarge')};
    }
  }
`;

const PaddedBackLink = pad(BackLink, 'regular');

const TabMap = {
  Prospects: PROSPECTING,
  Connected: CONNECTED,
  Closed: CLOSED,
};

export default class DashboardMyFamiliesDetailsPage extends Component {
  static propTypes = {
    client: clientPropType,
    currentTab: string,
    showModal: func,
    hideModal: func,
    rawClient: object,
    notifyError: func,
    notifyInfo: func,
    meta: clientMetaPropType,
    onRejectSuccess: func,
    onAddNote: func,
    onEditNote: func,
    notes: arrayOf(notePropType),
    noteIsLoading: bool,
    clientIsLoading: bool,
    refetchClient: func.isRequired,
    refetchNotes: func.isRequired,
    goToFamilyDetails: func,
    goToMessagesTab: func,
    refetchConversations: func,
    hasConversationFinished: bool,
    conversation: conversationPropType,
    conversations: arrayOf(conversationPropType),
    setSelectedConversation: func,
    user: userPropType.isRequired,
    onAcceptClick: func,
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

    return {
      summaryPath,
      activityPath,
      familyDetailsPath,
      communitiesPath,
      agentsPath,
      tasksPath,
      messagesPath,
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
    ];
    const adminTabList = [
      { id: COMMUNITIES, to: communitiesPath, label: 'Communities' },
      { id: PARTNER_AGENTS, to: agentsPath, label: 'Agents' },
      { id: TASKS, to: tasksPath, label: 'Tasks' },
      { id: MESSAGES, to: messagesPath, label: 'Messages' },
    ];
    // TODO: CHANGE TO HAS ROLE INSTEAD OF IS ROLE...
    let tabs = [summaryTab];
    /* eslint-disable no-bitwise */
    if (roleID & AGENT_ND_ROLE) {
      tabs = tabs.concat(agentTabList.map(e => genTab(e)));
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
      />), null, 'noPadding', false);
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
      ), null, 'noPadding', false
    );
  };

  getStickyFooterOptions = (showUpdateAddNoteButtons, showAcceptRejectButtons) => {
    const { hideModal, onAcceptClick } = this.props;

    // showUpdateAddNote Button overrides showAcceptReject Buttons
    if (showUpdateAddNoteButtons) {
      const {
        messagesPath,
        communitiesPath,
        agentsPath,
      } = this.getTabPathsForUser();
      return [
        {
          text: 'Add note', icon: 'add-note', iconPalette: 'slate', onClick: this.handleAddNoteClick, ghost: true,
        },
        {
          text: 'Add task', icon: 'checkbox-fill', iconPalette: 'slate', onClick: this.handleAddTaskClick, ghost: true,
        },
        {
          text: 'Message family', icon: 'message', iconPalette: 'slate', onClick: hideModal, to: messagesPath, ghost: true,
        },
        {
          text: 'Send agent refferal', icon: 'send', iconPalette: 'slate', onClick: hideModal, to: agentsPath, ghost: true,
        },
        {
          text: 'Send community refferal', icon: 'send', iconPalette: 'slate', onClick: hideModal, to: communitiesPath, ghost: true,
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

  render() {
    const {
      client, currentTab, meta, notifyInfo, notifyError, rawClient, notes, noteIsLoading, clientIsLoading, user,
      conversation, conversations, setSelectedConversation, hasConversationFinished, refetchConversations, refetchClient,
      showModal, hideModal, onAcceptClick,
    } = this.props;
    const { organization } = user;

    if (clientIsLoading) {
      return (
        <StyledDashboardTwoColumnTemplate activeMenuItem="My Families">
          Loading...
        </StyledDashboardTwoColumnTemplate>
      );
    }

    if (!client) {
      const prospectingUrl = generatePath(AGENT_DASHBOARD_FAMILIES_PATH, { clientType: PROSPECTING });
      const backlink = <BackLink linkText="Back to Prospects" to={prospectingUrl} onClick={clickEventHandler('fdetails', 'Back to Prospects')} />;
      return (
        <DashboardPageTemplate activeMenuItem="My Families">
          <TextAlignCenterBlock weight="medium" size="subtitle">Family not found!</TextAlignCenterBlock>
          <AlignCenterBackLinkWrapper>{backlink}</AlignCenterBackLinkWrapper>
        </DashboardPageTemplate>
      );
    }

    const {
      gender, lookingFor, monthlyBudget, timeToMove, roomTypes, careLevels, communityTypes, assignedTos,
    } = meta;
    const {
      id, clientInfo, stage, provider,
    } = client;
    const { entityType, id: providerOrg } = provider;
    const { id: userOrg } = organization;
    const { group, isConnected } = getStageDetails(stage);
    const showAcceptRejectButtons = stage === FAMILY_STAGE_NEW;
    let showUpdateAddNoteButtons = stage !== FAMILY_STAGE_NEW;
    let canEditFamilyDetails = isConnected;
    const isClientAdminUser = userIs(user, PLATFORM_ADMIN_ROLE) ||
      (entityType === PROVIDER_ENTITY_TYPE_ORGANIZATION && userOrg === providerOrg);
    // Rule when lead is created by self
    if (stage === FAMILY_STAGE_NEW && isClientAdminUser) {
      showUpdateAddNoteButtons = true;
      canEditFamilyDetails = true;
    }
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
      if (a.cType === NOTE_CTYPE_NOTE) {
        props.onEditClick = () => this.handleEditNoteClick(a);
      }

      return <StyledFamilyActivityItem {...props} />;
    }) : [];


    const familyDetailsPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: FAMILY_DETAILS });
    const familyTasksPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: TASKS });


    const backLinkHref = generatePath(AGENT_DASHBOARD_FAMILIES_PATH, { clientType: TabMap[group] });
    const backlink = <PaddedBackLink linkText={`Back to ${group}`} to={backLinkHref} onClick={clickEventHandler('fdetails', `Back to ${group}`)} />;

    const taskFilters = {
      'filter[client]': client.id,
    };

    const clientName = <ClientName client={client} rawClient={rawClient} backLinkHref={backLinkHref} showModal={showModal} hideModal={hideModal} notifyInfo={notifyInfo} notifyError={notifyError} user={user} />;

    return (
      <StyledDashboardTwoColumnTemplate activeMenuItem="My Families">
        <div> {/* DashboardTwoColumnTemplate should have only 2 children as this is a two column template */}
          <BigScreenSummarySection>
            <Box snap="bottom">
              {backlink}
              {clientName}
            </Box>
            <Hr noMargin />
            <FamilyStage
              noBorderRadius
              snap="top"
              stageText={stage}
              onAcceptClick={onAcceptClick}
              onRejectClick={this.handleRejectClick}
              onUpdateClick={this.handleUpdateClick}
              onAddNoteClick={this.handleAddNoteClick}
              user={user}
              client={client}
            />
            {showAcceptRejectButtons && <FamilySummary snap="top" client={client} to={familyDetailsPath} />}
            {!showAcceptRejectButtons && <PaddedFamilySummary snap="top" client={client} to={familyDetailsPath} />}
          </BigScreenSummarySection>
          <SmallScreenClientNameWrapper>
            {clientName}
          </SmallScreenClientNameWrapper>
        </div>
        <div>
          <Tabs activeTab={currentTab}>
            {this.getTabsForUser()}
          </Tabs>
          <TabWrapper snap="top">
            {currentTab === SUMMARY && (
              <>
                <SmallScreenBorderPaddedFamilySummary client={client} to={familyDetailsPath} noHeading />
              </>
            )}

            {currentTab === ACTIVITY && (
              <SmallScreenBorderDiv padding={!noteIsLoading && activityCards.length > 0 ? null : 'xLarge'}>
                {noteIsLoading && <Block size="subtitle">Loading...</Block>}
                {!noteIsLoading && activityCards.length === 0 &&
                <TextAlignCenterBlock>There are no activities.</TextAlignCenterBlock>
                }
                {!noteIsLoading && activityCards.length > 0 &&
                <>
                  {/* <TableHeaderButtons hasColumnsButton={false} /> */}
                  {activityCards}
                </>
                }
              </SmallScreenBorderDiv>
            )}

            {currentTab === FAMILY_DETAILS && (
              <FamilyDetailsTab>
                <FamilyDetailsFormContainer
                  client={client}
                  rawClient={rawClient}
                  refetchClient={refetchClient}
                  notifyInfo={notifyInfo}
                  notifyError={notifyError}
                  accepted={!showAcceptRejectButtons || userIs(user, PLATFORM_ADMIN_ROLE)}
                  canEditFamilyDetails={canEditFamilyDetails || userIs(user, PLATFORM_ADMIN_ROLE)}
                  gender={gender}
                  lookingFor={lookingFor}
                  monthlyBudget={monthlyBudget}
                  timeToMove={timeToMove}
                  careLevels={careLevels}
                  roomTypes={roomTypes}
                  communityTypes={communityTypes}
                  assignedTos={assignedTos}
                />
              </FamilyDetailsTab>
            )}

            {currentTab === COMMUNITIES && (
              <Role className="agentTab" is={PLATFORM_ADMIN_ROLE}>
                <ReferralSearchContainer
                  notifyError={notifyError}
                  notifyInfo={notifyInfo}
                  parentClient={client}
                  parentRawClient={rawClient}
                  refetchClient={refetchClient}
                  user={user}
                  referralMode="Community"
                />
              </Role>
            )}

            {currentTab === PARTNER_AGENTS && (
              <Role className="agentTab" is={PLATFORM_ADMIN_ROLE}>
                <ReferralSearchContainer
                  notifyError={notifyError}
                  notifyInfo={notifyInfo}
                  parentClient={client}
                  parentRawClient={rawClient}
                  refetchClient={refetchClient}
                  user={user}
                  referralMode="Agent"
                />
              </Role>
            )}

            {currentTab === TASKS && (
              <Role className="agentTab" is={PLATFORM_ADMIN_ROLE}>
                <FamilyTasksTab>
                  <Datatable
                    id="tasks"
                    filters={taskFilters}
                  >
                    {datatable => (
                      <DashboardAgentTasksSectionContainer datatable={datatable} client={client} contextPath={familyTasksPath} />
                    )}
                  </Datatable>
                </FamilyTasksTab>
              </Role>
            )}

            {currentTab === MESSAGES && (
              <SmallScreenBorderDiv>
                {!conversation &&
                  <DashboardMessagesContainerWrapper>
                    <DashboardMessagesContainer
                      isLoading={!hasConversationFinished}
                      heading="Conversations"
                      conversations={conversations}
                      onConversationClick={setSelectedConversation}
                      refetchConversations={refetchConversations}
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
          </TabWrapper>
        </div>
        <DashboardMyFamilyStickyFooterContainer
          options={stickyFooterOptions}
          stage={stage}
          stageLabel={`${group} - ${stage}`}
          showAcceptRejectButtons={showAcceptRejectButtons && !isClientAdminUser}
          user={user}
        />
      </StyledDashboardTwoColumnTemplate>
    );
  }
}
