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
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import clientPropType, { meta as clientMetaPropType } from 'sly/propTypes/client';
import notePropType from 'sly/propTypes/note';
import { size, palette } from 'sly/components/themes';
import { getStageDetails } from 'sly/services/helpers/stage';
import { NOTE_CTYPE_NOTE } from 'sly/constants/notes';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardTwoColumnTemplate from 'sly/components/templates/DashboardTwoColumnTemplate';
import FamilyDetailsFormContainer from 'sly/containers/FamilyDetailsFormContainer';
import AcceptAndContactFamilyContainer from 'sly/containers/AcceptAndContactFamilyContainer';
import RejectFamilyContainer from 'sly/containers/RejectFamilyContainer';
import UpdateFamilyStageFormContainer from 'sly/containers/UpdateFamilyStageFormContainer';
import AddNoteFormContainer from 'sly/containers/AddNoteFormContainer';
import { Box, Block, Icon, Link, Hr } from 'sly/components/atoms';
import Tabs from 'sly/components/molecules/Tabs';
import FamilyStage from 'sly/components/molecules/FamilyStage';
import FamilySummary from 'sly/components/molecules/FamilySummary';
import FamilyActivityItem from 'sly/components/molecules/FamilyActivityItem';
import BackLink from 'sly/components/molecules/BackLink';
import DashboardMyFamilyStickyFooterContainer from 'sly/containers/DashboardMyFamilyStickyFooterContainer';
import SlyEvent from 'sly/services/helpers/events';
import { clickEventHandler } from 'sly/services/helpers/eventHandlers';
import Tab from 'sly/components/molecules/Tab';
import fullWidth from 'sly/components/helpers/fullWidth';
import fullHeight from 'sly/components/helpers/fullHeight';
import ConversationMessagesContainer from 'sly/containers/ConversationMessagesContainer';
import userPropType from 'sly/propTypes/user';
import conversationPropType from 'sly/propTypes/conversation/conversation';
import Role from 'sly/components/common/Role';
import { CONVERSATION_PARTICIPANT_TYPE_CLIENT } from 'sly/constants/conversations';
import { AGENT_ND_ROLE, PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';
import ReferralSearchContainer from 'sly/containers/dashboard/ReferralSearchContainer';
import StatusSelect from 'sly/components/molecules/StatusSelect';
import DashboardAgentTasksSectionContainer from 'sly/containers/dashboard/DashboardAgentTasksSectionContainer';
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

const ClientName = ({ client, rawClient, backLinkHref, ...props }) => {
  const { clientInfo } = client;
  const { name } = clientInfo;
  return (
    <StyledClientNameBlock
      weight="medium"
      size="subtitle"
    >
      <Link to={backLinkHref}>
        <Icon icon="arrow-left" palette="primary" />
      </Link>
      <span>{name}</span>
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

const TextCenterBlock = fullHeight(textAlign(Block));
const FullWidthTextCenterBlock = fullWidth(TextCenterBlock);

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
    user: userPropType.isRequired,
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
      { id: MESSAGES, to: messagesPath, label: 'Messages' },
    ];
    const adminTabList = [
      { id: COMMUNITIES, to: communitiesPath, label: 'Communities' },
      { id: PARTNER_AGENTS, to: agentsPath, label: 'Agents' },
      { id: TASKS, to: tasksPath, label: 'Tasks' },
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

  handleAcceptClick = () => {
    const {
      showModal, hideModal, notifyError, client, rawClient, goToFamilyDetails, goToMessagesTab, refetchConversations, refetchClient, conversation, user,
    } = this.props;
    SlyEvent.getInstance().sendEvent({
      category: 'fdetails',
      action: 'launch',
      label: 'accept-lead',
      value: '',
    });
    showModal((
      <AcceptAndContactFamilyContainer
        notifyError={notifyError}
        client={client}
        rawClient={rawClient}
        onCancel={hideModal}
        goToFamilyDetails={goToFamilyDetails}
        goToMessagesTab={goToMessagesTab}
        refetchConversations={refetchConversations}
        refetchClient={refetchClient}
        conversation={conversation}
        user={user}
      />), null, 'noPadding', false);
  };

  handleRejectClick = () => {
    const {
      meta, showModal, hideModal, notifyError, notifyInfo, client, rawClient, onRejectSuccess,
    } = this.props;
    SlyEvent.getInstance().sendEvent({
      category: 'details',
      action: 'launch',
      label: 'reject-lead',
      value: '',
    });
    const { rejectReasons } = meta;
    showModal(<RejectFamilyContainer onSuccess={onRejectSuccess} reasons={rejectReasons} notifyError={notifyError} notifyInfo={notifyInfo} client={client} rawClient={rawClient} onCancel={hideModal} />, null, 'noPadding', false);
  };

  handleUpdateClick = () => {
    const {
      showModal, hideModal, notifyError, client, rawClient, notifyInfo, meta, refetchClient, refetchNotes,
    } = this.props;
    const { stage: clientStage } = client;
    const { stage, lossReasons } = meta;

    SlyEvent.getInstance().sendEvent({
      category: 'fdetails',
      action: 'launch',
      label: 'update-stage',
      value: '',
    });
    stage.push(clientStage);
    showModal(<UpdateFamilyStageFormContainer refetchClient={refetchClient} refetchNotes={refetchNotes} onSuccess={hideModal} lossReasons={lossReasons} notifyError={notifyError} notifyInfo={notifyInfo} client={client} rawClient={rawClient} nextAllowedStages={stage} onCancel={hideModal} />, null, 'noPadding', false);
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

  render() {
    const {
      handleAcceptClick, handleRejectClick, handleUpdateClick, handleAddNoteClick,
      handleEditNoteClick,
    } = this;

    const {
      client, currentTab, meta, notifyInfo, notifyError, rawClient, notes, noteIsLoading, clientIsLoading, user, conversation, hasConversationFinished, refetchConversations, refetchClient, showModal, hideModal,
    } = this.props;
    const { admin } = user;

    let conversationParticipants = [];
    let viewingAsParticipant;

    if (hasConversationFinished && conversation) {
      ({ conversationParticipants } = conversation);
      const { id } = user;
      viewingAsParticipant = conversationParticipants.find(p => p.participantID === id);
    }

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
      id, clientInfo, stage,
    } = client;
    let {
      levelGroup, showAcceptRejectButtons, showUpdateAddNoteButtons, canEditFamilyDetails,
    } = getStageDetails(stage);
    // Override based on role
    const { provider } = client;
    const { entityType, id: proOrg } = provider;
    const { roleID, organization } = user;
    const { id: userOrg } = organization;
    /* eslint-disable-next-line no-bitwise */
    if ((PLATFORM_ADMIN_ROLE & roleID) || (entityType === 'Organization' && userOrg === proOrg)) {
      [showAcceptRejectButtons, showUpdateAddNoteButtons, canEditFamilyDetails] = [false, true, true];
    }
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
        props.onEditClick = () => handleEditNoteClick(a);
      }

      return <StyledFamilyActivityItem {...props} />;
    }) : [];


    const familyDetailsPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: FAMILY_DETAILS });

    let stickyFooterOptions = [];
    if (showAcceptRejectButtons) {
      stickyFooterOptions = [
        {
          text: 'Accept and contact this family', icon: 'flag', palette: 'primary', iconPalette: 'slate', onClick: handleAcceptClick,
        },
        {
          text: 'Reject', icon: 'add-note', iconPalette: 'slate', palette: 'danger', onClick: handleRejectClick, ghost: true,
        },
      ];
    } else if (showUpdateAddNoteButtons) {
      stickyFooterOptions = [
        {
          text: 'Update Stage', icon: 'flag', iconPalette: 'slate', onClick: handleUpdateClick,
        },
        {
          text: 'Add Note', icon: 'add-note', iconPalette: 'slate', onClick: handleAddNoteClick, ghost: true,
        },
      ];
    }

    const backLinkHref = generatePath(AGENT_DASHBOARD_FAMILIES_PATH, { clientType: TabMap[levelGroup] });
    const backlink = <PaddedBackLink linkText={`Back to ${levelGroup}`} to={backLinkHref} onClick={clickEventHandler('fdetails', `Back to ${levelGroup}`)} />;

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
              onAcceptClick={handleAcceptClick}
              onRejectClick={handleRejectClick}
              onUpdateClick={handleUpdateClick}
              onAddNoteClick={handleAddNoteClick}
              client={client}
              user={user}
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
                  accepted={!showAcceptRejectButtons || admin}
                  canEditFamilyDetails={canEditFamilyDetails || admin}
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
                      <DashboardAgentTasksSectionContainer datatable={datatable} client={client} />
                    )}
                  </Datatable>
                </FamilyTasksTab>
              </Role>
            )}


            {currentTab === MESSAGES && (
              <SmallScreenBorderDiv>
                {!hasConversationFinished &&
                  <>
                    <br />
                    <FullWidthTextCenterBlock size="caption">Loading...</FullWidthTextCenterBlock>
                  </>
                }
                {hasConversationFinished &&
                  <ConversationMessagesContainer
                    conversation={conversation}
                    viewingAsParticipant={viewingAsParticipant}
                    participants={conversationParticipants}
                    sendMessageFormPlaceholder={`Message ${name}...`}
                    otherParticipantId={id}
                    otherParticipantType={CONVERSATION_PARTICIPANT_TYPE_CLIENT}
                    onCreateConversationSuccess={refetchConversations}
                  />
                }
              </SmallScreenBorderDiv>
            )}
          </TabWrapper>
        </div>
        <DashboardMyFamilyStickyFooterContainer
          options={stickyFooterOptions}
          stage={stage}
          stageLabel={`${levelGroup} - ${stage}`}
          showAcceptRejectButtons={showAcceptRejectButtons}
          user={user}
        />
      </StyledDashboardTwoColumnTemplate>
    );
  }
}
