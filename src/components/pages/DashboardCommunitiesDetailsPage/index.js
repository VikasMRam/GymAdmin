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
  TASKS, NEWFAMILIES, PROSPECTING, CONNECTED, CLOSED,
} from 'sly/constants/dashboardAppPaths';
import { PROVIDER_ENTITY_TYPE_ORGANIZATION } from 'sly/constants/provider';
import { NOTE_CTYPE_NOTE } from 'sly/constants/notes';
import { FAMILY_STAGE_NEW, FAMILY_STAGE_REJECTED } from 'sly/constants/familyDetails';
import { AGENT_ND_ROLE, PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';
import communityPropType, { meta as communityMetaPropType } from 'sly/propTypes/community';
import notePropType from 'sly/propTypes/note';
import userPropType from 'sly/propTypes/user';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import { size, palette } from 'sly/components/themes';
import { getStageDetails } from 'sly/services/helpers/stage';
import { isReferralSent } from 'sly/services/helpers/community';
import { clickEventHandler } from 'sly/services/helpers/eventHandlers';
import { userIs, userExact } from 'sly/services/helpers/role';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import SlyEvent from 'sly/services/helpers/events';
import cursor from 'sly/components/helpers/cursor';
import textDecoration from 'sly/components/helpers/textDecoration';
import displayOnlyIn from 'sly/components/helpers/displayOnlyIn';
import Role from 'sly/components/common/Role';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardTwoColumnTemplate from 'sly/components/templates/DashboardTwoColumnTemplate';
import FamilyDetailsFormContainer from 'sly/containers/FamilyDetailsFormContainer';
import UpdateFamilyStageFormContainer from 'sly/containers/UpdateFamilyStageFormContainer';
import AddNoteFormContainer from 'sly/containers/AddNoteFormContainer';
import { Box, Block, Icon, Link, Hr, Span } from 'sly/components/atoms';
import Tabs from 'sly/components/molecules/Tabs';
import FamilyStage from 'sly/components/molecules/FamilyStage';
import FamilySummary from 'sly/components/molecules/FamilySummary';
import FamilyActivityItem from 'sly/components/molecules/FamilyActivityItem';
import BackLink from 'sly/components/molecules/BackLink';
import IconBadge from 'sly/components/molecules/IconBadge';
import Tab from 'sly/components/molecules/Tab';
import ConversationMessagesContainer from 'sly/containers/ConversationMessagesContainer';
import ReferralSearchContainer from 'sly/containers/dashboard/ReferralSearchContainer';
import StatusSelect from 'sly/components/molecules/StatusSelect';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import DuplicateFamilies from 'sly/components/organisms/DuplicateFamilies';
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
const AlignCenterBackLinkWrapper = styled(BackLinkWrapper)`
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

const SmallScreenBorderPaddedFamilySummary = styled(PaddedFamilySummary)`
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

const ClickHere = textDecoration(cursor(Span));

const ClientName = ({ community, rawClient, backLinkHref, user, ...props }) => {
  const { communityInfo, stage } = community;
  const { name } = communityInfo;
  const { isNew, isProspects } = getStageDetails(stage);

  return (
    <StyledClientNameBlock
      weight="medium"
      size="subtitle"
    >
      <Link to={backLinkHref}>
        <Icon icon="arrow-left" palette="primary" />
      </Link>
      <span>{name}</span>
      {isReferralSent(community) && <StyledIconBadge badgePalette="secondary" badgeVariation="dark35" palette="white" icon="checkmark-circle" text="R SENT" />}
      {(userIs(user, PLATFORM_ADMIN_ROLE) || (!isNew && !isProspects)) && <StyledStatusSelect community={community} rawClient={rawClient} user={user} {...props} />}
    </StyledClientNameBlock>
  );
};

ClientName.propTypes = {
  community: communityPropType,
  user: userPropType,
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

const SmallScreenBannerNotification = displayOnlyIn(BannerNotification, ['mobile', 'tablet']);

const TabMap = {
  New: NEWFAMILIES,
  Prospects: PROSPECTING,
  Connected: CONNECTED,
  Closed: CLOSED,
};

export default class DashboardCommunitiesDetailsPage extends Component {
  static propTypes = {
    community: communityPropType,
    communities: arrayOf(communityPropType),
    currentTab: string,
    showModal: func,
    hideModal: func,
    rawClient: object,
    notifyError: func,
    notifyInfo: func,
    meta: communityMetaPropType,
    onRejectSuccess: func,
    onAddNote: func,
    onEditNote: func,
    notes: arrayOf(notePropType),
    noteIsLoading: bool,
    communityIsLoading: bool,
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
    const { community } = this.props;
    const { id } = community;
    const summaryPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: SUMMARY });
    const activityPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: ACTIVITY });
    const familyDetailsPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: FAMILY_DETAILS });
    const agentsPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: PARTNER_AGENTS }); // Only for Admin
    const tasksPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: TASKS }); // Only for Admin
    const messagesPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: MESSAGES });

    return {
      summaryPath,
      activityPath,
      familyDetailsPath,
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
      showModal, hideModal, notifyError, community, rawClient, notifyInfo, meta, refetchClient, refetchNotes,
      onRejectSuccess,
    } = this.props;
    const { stage: communityStage } = community;
    const { stage, lossReasons, rejectReasons } = meta;
    const onSuccess = isReject ? onRejectSuccess : hideModal;
    const initialValues = isReject ? { stage: FAMILY_STAGE_REJECTED } : {};

    SlyEvent.getInstance().sendEvent({
      category: 'fdetails',
      action: 'launch',
      label: isReject ? 'reject-lead' : 'update-stage',
      value: '',
    });
    stage.push(communityStage);

    showModal((
      <UpdateFamilyStageFormContainer
        refetchClient={refetchClient}
        refetchNotes={refetchNotes}
        onSuccess={onSuccess}
        lossReasons={lossReasons}
        notifyError={notifyError}
        notifyInfo={notifyInfo}
        community={community}
        rawClient={rawClient}
        nextAllowedStages={stage}
        onCancel={hideModal}
        rejectReasons={rejectReasons}
        initialValues={initialValues}
      />), null, 'letsmovetothismodaltypealltheothermodals', false);
  };

  handleAddNoteClick = () => {
    const {
      showModal, community, hideModal, onAddNote, notifyError, notifyInfo,
    } = this.props;
    const { communityInfo } = community;
    const { name } = communityInfo;
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
      showModal, community, hideModal, onEditNote, notifyError, notifyInfo,
    } = this.props;
    const { communityInfo } = community;
    const { name } = communityInfo;
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
    const { showModal, hideModal, notifyInfo, notifyError, community } = this.props;
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
          community={community}
        />
      ), null, 'noPadding', false,
    );
  };

  handleClickHereForMore = () => {
    const { showModal, community, communities } = this.props;

    showModal(<DuplicateFamilies noTopSpacing currentClient={community} communities={communities} heading="Duplicate family entries" />, null, 'noPadding');
  };

  render() {
    const {
      community, currentTab, meta, notifyInfo, notifyError, rawClient, notes, noteIsLoading, communityIsLoading, user,
      conversation, setSelectedConversation, refetchClient,
      showModal, hideModal, onAcceptClick, communities, onEditStatusDetailsClick, isEditStatusDetailsMode, onStatusChange,
    } = this.props;
    const { organization } = user;

    if (communityIsLoading) {
      return (
        <StyledDashboardTwoColumnTemplate activeMenuItem="Communities">
          Loading...
        </StyledDashboardTwoColumnTemplate>
      );
    }

    if (!community) {
      const newUrl = generatePath(AGENT_DASHBOARD_FAMILIES_PATH, { communityType: NEWFAMILIES });
      const backlink = <BackLink linkText="Back to New" to={newUrl} onClick={clickEventHandler('fdetails', 'Back to Prospects')} />;
      return (
        <DashboardPageTemplate activeMenuItem="Communities">
          <TextAlignCenterBlock weight="medium" size="subtitle">Family not found!</TextAlignCenterBlock>
          <AlignCenterBackLinkWrapper>{backlink}</AlignCenterBackLinkWrapper>
        </DashboardPageTemplate>
      );
    }

    const {
      gender, lookingFor, monthlyBudget, timeToMove, roomTypes, careLevels, communityTypes, assignedTos,
    } = meta;
    const {
      id, communityInfo, stage, status, provider, organization: communityOrganization,
    } = community;
    const { entityType, id: providerOrg } = provider;
    const { id: communityOrg } = communityOrganization;
    const { id: userOrg } = organization;
    const { group, isConnected } = getStageDetails(stage);
    const showAcceptRejectButtons = stage === FAMILY_STAGE_NEW;
    let showUpdateAddNoteButtons = stage !== FAMILY_STAGE_NEW;
    let canEditFamilyDetails = isConnected;
    const isClientAdminUser = userIs(user, PLATFORM_ADMIN_ROLE) ||
      (entityType === PROVIDER_ENTITY_TYPE_ORGANIZATION && userOrg === providerOrg);
    const isAgentUser = userExact(user, AGENT_ND_ROLE);
    const isOfDifferentOrg = userOrg !== communityOrg;
    // Rule when lead is created by self
    if (stage === FAMILY_STAGE_NEW && isClientAdminUser) {
      showUpdateAddNoteButtons = true;
      canEditFamilyDetails = true;
    }

    const { name } = communityInfo;
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


    const backLinkHref = generatePath(AGENT_DASHBOARD_FAMILIES_PATH, { communityType: TabMap[group] });
    const backlink = <PaddedBackLink linkText={`Back to ${group}`} to={backLinkHref} onClick={clickEventHandler('fdetails', `Back to ${group}`)} />;

    const taskFilters = {
      'filter[community]': community.id,
    };

    const communityName = (
      <ClientName
        community={community}
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

    const duplicateWarningContent = (
      <span>
        There are families with same contact info.&nbsp;<ClickHere palette="white" onClick={this.handleClickHereForMore}>Click here to check.</ClickHere>
      </span>
    );

    return (
      <StyledDashboardTwoColumnTemplate activeMenuItem="Communities">
        <div> {/* DashboardTwoColumnTemplate should have only 2 children as this is a two column template */}
          <BigScreenSummarySection>
            <Box snap="bottom">
              {backlink}
              {communityName}
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
              community={community}
            />
            {showAcceptRejectButtons && <FamilySummary snap="top" community={community} isOfDifferentOrg={isOfDifferentOrg} isAgentUser={isAgentUser} to={familyDetailsPath} />}
            {!showAcceptRejectButtons && <PaddedFamilySummary snap="top" community={community} isOfDifferentOrg={isOfDifferentOrg} isAgentUser={isAgentUser} to={familyDetailsPath} />}
          </BigScreenSummarySection>
          <SmallScreenClientNameWrapper>
            {communityName}
          </SmallScreenClientNameWrapper>
        </div>
        <div>
          <Tabs activeTab={currentTab}>
            {this.getTabsForUser()}
          </Tabs>
          {communities && communities.length > 1 &&
            <SmallScreenBannerNotification palette="warning">
              {duplicateWarningContent}
            </SmallScreenBannerNotification>
          }
          {isOfDifferentOrg &&
            <SmallScreenBannerNotification palette="primary">
              This Family belongs to a different organization named <i>{community.organization.name}</i>
            </SmallScreenBannerNotification>
          }
          <TabWrapper snap="top">
            {currentTab === SUMMARY && (
              <SmallScreenBorderPaddedFamilySummary community={community} isAgentUser={isAgentUser} to={familyDetailsPath} noHeading />
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
                  community={community}
                  isAgentUser={isAgentUser}
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
                  onEditStageDetailsClick={this.handleUpdateClick}
                  onEditStatusDetailsClick={onEditStatusDetailsClick}
                />
              </FamilyDetailsTab>
            )}

            {currentTab === COMMUNITIES && (
              <Role className="agentTab" is={PLATFORM_ADMIN_ROLE}>
                <ReferralSearchContainer
                  notifyError={notifyError}
                  notifyInfo={notifyInfo}
                  parentClient={community}
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
                  parentClient={community}
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
                      <DashboardAgentTasksSectionContainer datatable={datatable} community={community} contextPath={familyTasksPath} />
                    )}
                  </Datatable>
                </FamilyTasksTab>
              </Role>
            )}

            {currentTab === MESSAGES && (
              <SmallScreenBorderDiv>
                {!conversation &&
                  <DashboardMessagesContainerWrapper>
                    <Datatable
                      id="conversations"
                      filters={{}}
                    >
                      {datatable => (
                        <DashboardMessagesContainer
                          datatable={datatable}
                          onConversationClick={setSelectedConversation}
                          heading="Conversations"
                          communityId={id}
                        />
                      )}
                    </Datatable>
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
      </StyledDashboardTwoColumnTemplate>
    );
  }
}
