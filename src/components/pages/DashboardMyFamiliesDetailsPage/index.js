import React, { Fragment, Component } from 'react';
import styled, { css } from 'styled-components';
import { string, func, object, arrayOf, bool } from 'prop-types';
import { generatePath } from 'react-router';
import { ifProp } from 'styled-tools';

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
import { FAMILY_STATUS_ON_PAUSE, NOTE_CTYPE_NOTE } from 'sly/constants/familyDetails';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardTwoColumnTemplate from 'sly/components/templates/DashboardTwoColumnTemplate';
import FamilyDetailsFormContainer from 'sly/containers/FamilyDetailsFormContainer';
import AcceptAndContactFamilyContainer from 'sly/containers/AcceptAndContactFamilyContainer';
import RejectFamilyContainer from 'sly/containers/RejectFamilyContainer';
import UpdateFamilyStageFormContainer from 'sly/containers/UpdateFamilyStageFormContainer';
import PlaceFamilyOnPauseFormContainer from 'sly/containers/PlaceFamilyOnPauseFormContainer';
import AddNoteFormContainer from 'sly/containers/AddNoteFormContainer';
import { Box, Block, Icon, Link, Hr } from 'sly/components/atoms';
import Tabs from 'sly/components/molecules/Tabs';
// import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';
import FamilyStage from 'sly/components/molecules/FamilyStage';
import FamilySummary from 'sly/components/molecules/FamilySummary';
import FamilyActivityItem from 'sly/components/molecules/FamilyActivityItem';
import PutFamilyOnPause from 'sly/components/molecules/PutFamilyOnPause';
import BackLink from 'sly/components/molecules/BackLink';
import IconButton from 'sly/components/molecules/IconButton';
import DashboardMyFamilyStickyFooterContainer from 'sly/containers/DashboardMyFamilyStickyFooterContainer';
import SlyEvent from 'sly/services/helpers/events';
import { clickEventHandler } from 'sly/services/helpers/eventHandlers';
import { userHasAdminRole } from 'sly/services/helpers/role';
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
import DashboardAgentTasksSectionContainer from 'sly/containers/dashboard/DashboardAgentTasksSectionContainer';

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
  padding: ${size('spacing.xLarge')};
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
  display: flex;
  padding: ${size('spacing.large')};
  background-color: ${palette('white', 'base')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const SmallScreenClientButtonWrapper = styled.div`
  margin: 0 auto;
`;

const SmallScreenClientNameDiv = styled.div`
  display: flex;
  align-items: end;
`;

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
    onUnPause: func.isRequired,
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
      { id: COMMUNITIES, to: communitiesPath, label: 'Communities' },
      { id: MESSAGES, to: messagesPath, label: 'Messages' },
    ];
    const adminTabList = [
      ...agentTabList,
      { id: PARTNER_AGENTS, to: agentsPath, label: 'Agents' },
      { id: TASKS, to: tasksPath, label: 'Tasks' },
    ];
    // TODO: CHANGE TO HAS ROLE INSTEAD OF IS ROLE...
    switch (roleID) {
      case AGENT_ND_ROLE:
        return [summaryTab].concat(agentTabList.map(e => genTab(e)));
      case PLATFORM_ADMIN_ROLE:
        return [summaryTab].concat(adminTabList.map(e => genTab(e)));
      default:
        return [];
    }
  };

  handleAcceptClick = () => {
    const {
      showModal, hideModal, notifyError, client, rawClient, goToFamilyDetails, goToMessagesTab, refetchConversations, refetchClient,
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
      />), null, 'noPadding', false);
  };

  handleRejectClick = () => {
    const {
      meta, showModal, hideModal, notifyError, notifyInfo, client, rawClient, onRejectSuccess,
    } = this.props;
    SlyEvent.getInstance().sendEvent({
      category: 'fdetails',
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

  handlePauseClick = () => {
    const {
      showModal, hideModal, notifyError, client, rawClient, notifyInfo, onUnPause,
    } = this.props;
    const { status } = client;
    const isPaused = status === FAMILY_STATUS_ON_PAUSE;

    if (isPaused) {
      onUnPause();
    } else {
      showModal(<PlaceFamilyOnPauseFormContainer
        onSuccess={hideModal}
        onCancel={hideModal}
        notifyError={notifyError}
        notifyInfo={notifyInfo}
        client={client}
        rawClient={rawClient}
      />, null, 'noPadding', false);
    }
    SlyEvent.getInstance().sendEvent({
      category: 'fdetails',
      action: 'launch',
      label: (isPaused ? 'true' : 'false'),
      value: '',
    });
  };

  render() {
    const {
      handleAcceptClick, handleRejectClick, handleUpdateClick, handleAddNoteClick, handlePauseClick,
      handleEditNoteClick,
    } = this;

    const {
      client, currentTab, meta, notifyInfo, notifyError, rawClient, notes, noteIsLoading, clientIsLoading, user, conversation, hasConversationFinished, onUnPause, refetchConversations, refetchClient,
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
      gender, lookingFor, monthlyBudget, timeToMove,
    } = meta;
    const {
      id, clientInfo, stage, status,
    } = client;
    const isPaused = status === FAMILY_STATUS_ON_PAUSE;
    let {
      levelGroup, showAcceptRejectButtons, showUpdateAddNoteButtons, showPauseButton, canEditFamilyDetails,
    } = getStageDetails(stage);
    // Override based on role
    if (userHasAdminRole(user)) {
      [showAcceptRejectButtons, showUpdateAddNoteButtons, showPauseButton, canEditFamilyDetails] = [false, true, true, true];
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
    const { tasksPath } = this.getTabPathsForUser();

    return (
      <StyledDashboardTwoColumnTemplate activeMenuItem="My Families">
        <div> {/* DashboardTwoColumnTemplate should have only 2 children as this is a two column template */}
          <BigScreenSummarySection>
            <Box snap="bottom">
              {backlink}
              <Block weight="medium" size="subtitle">{name} {isPaused && <Icon icon="pause" size="caption" palette="danger" />}</Block>
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
              user={user}
            />
            {showAcceptRejectButtons && <FamilySummary snap="top" client={client} to={familyDetailsPath} />}
            {!showAcceptRejectButtons && <PaddedFamilySummary snap="top" client={client} to={familyDetailsPath} />}
            {showPauseButton && <PutFamilyOnPause isPaused={isPaused} onTogglePause={handlePauseClick} />}
          </BigScreenSummarySection>
          <SmallScreenClientNameWrapper>
            <Link to={backLinkHref}>
              <Icon icon="arrow-left" palette="primary" />
            </Link>
            <SmallScreenClientButtonWrapper>
              <SmallScreenClientNameDiv>
                <Block weight="medium" size="subtitle">{name}</Block>
                {isPaused && <IconButton transparent icon="pause" size="caption" palette="danger" onClick={onUnPause} />}
              </SmallScreenClientNameDiv>
            </SmallScreenClientButtonWrapper>
          </SmallScreenClientNameWrapper>
        </div>
        <div>
          <Tabs activeTab={currentTab}>
            {this.getTabsForUser()}
          </Tabs>
          <TabWrapper snap="top">
            {currentTab === SUMMARY && (
              <Fragment>
                <SmallScreenBorderPaddedFamilySummary client={client} to={familyDetailsPath} noHeading />
                {showPauseButton && <PutFamilyOnPause isPaused={isPaused} onTogglePause={handlePauseClick} />}
              </Fragment>
            )}

            {currentTab === ACTIVITY && (
              <SmallScreenBorderDiv padding={!noteIsLoading && activityCards.length > 0 ? null : 'xLarge'}>
                {noteIsLoading && <Block size="subtitle">Loading...</Block>}
                {!noteIsLoading && activityCards.length === 0 &&
                <TextAlignCenterBlock>There are no activities.</TextAlignCenterBlock>
                }
                {!noteIsLoading && activityCards.length > 0 &&
                <Fragment>
                  {/* <TableHeaderButtons hasColumnsButton={false} /> */}
                  {activityCards}
                </Fragment>
                }
              </SmallScreenBorderDiv>
            )}

            {currentTab === FAMILY_DETAILS && (
              <FamilyDetailsTab>
                <FamilyDetailsFormContainer
                  client={client}
                  rawClient={rawClient}
                  notifyInfo={notifyInfo}
                  notifyError={notifyError}
                  accepted={!showAcceptRejectButtons || admin}
                  canEditFamilyDetails={canEditFamilyDetails || admin}
                  gender={gender}
                  lookingFor={lookingFor}
                  monthlyBudget={monthlyBudget}
                  timeToMove={timeToMove}
                />
              </FamilyDetailsTab>
            )}

            {currentTab === COMMUNITIES && (
              <ReferralSearchContainer
                notifyError={notifyError}
                notifyInfo={notifyInfo}
                parentClient={client}
                parentRawClient={rawClient}
                refetchClient={refetchClient}
                referralMode="Community"
              />
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
                <DashboardAgentTasksSectionContainer
                  basePath={tasksPath}
                  client={client}
                  noBorder
                />
              </Role>
            )}

            {currentTab === MESSAGES && (
              <SmallScreenBorderDiv>
                {!hasConversationFinished &&
                  <Fragment>
                    <br />
                    <FullWidthTextCenterBlock size="caption">Loading...</FullWidthTextCenterBlock>
                  </Fragment>
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
