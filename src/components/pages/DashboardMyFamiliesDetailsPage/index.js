import React, { Fragment, Component } from 'react';
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
  MESSAGES,
} from 'sly/constants/dashboardAppPaths';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import clientPropType, { meta as clientMetaPropType } from 'sly/propTypes/client';
import notePropType from 'sly/propTypes/note';
import { size, palette } from 'sly/components/themes';
import { getStageDetails } from 'sly/services/helpers/stage';
import { FAMILY_STATUS_ON_HOLD, NOTE_CTYPE_NOTE } from 'sly/constants/familyDetails';
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
import DashboardMyFamilyStickyFooterContainer from 'sly/containers/DashboardMyFamilyStickyFooterContainer';
import SlyEvent from 'sly/services/helpers/events';
import { clickEventHandler } from 'sly/services/helpers/eventHandlers';
import Tab from 'sly/components/molecules/Tab';
import fullWidth from 'sly/components/helpers/fullWidth';
import fullHeight from 'sly/components/helpers/fullHeight';
import ConversationMessagesContainer from 'sly/containers/ConversationMessagesContainer';
import userPropType from 'sly/propTypes/user';
import conversationPropType from 'sly/propTypes/conversation/conversation';

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

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    border: 0;
  }
`;

const CommunitiesTab = styled.div`
  ${SmallScreenBorder};
  padding: ${size('spacing.xxxLarge')} 0;

  > * {
    width: ${size('layout.col4')};
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col4')};
    margin-left: auto;
    margin-right: auto;
  }
`;

const TabContent = styled.div`
  background-color: inherit;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    border: ${size('border', 'regular')} solid ${palette('slate', 'stroke')};
    border-top: 0;
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
`;

const FamilyDetailsTab = styled.div`
  ${SmallScreenBorder};
  padding: ${size('spacing.xLarge')};
`;

const TabWrapper = styled.div`
  padding: ${size('spacing.large')};
  background-color: ${palette('grey', 'background')};
  margin-bottom: ${size('dashboard.actionFooterBottomMargin')};

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

const SmallScreenClientNameBlock = styled(Block)`
  width: 100%;
  text-align: center;
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

  handleAcceptClick = () => {
    const {
      showModal, hideModal, notifyError, client, rawClient, goToFamilyDetails, goToMessagesTab, refetchConversations,
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
    const { stage, lossReasons } = meta;
    SlyEvent.getInstance().sendEvent({
      category: 'fdetails',
      action: 'launch',
      label: 'update-stage',
      value: '',
    });
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
    const isPaused = status === FAMILY_STATUS_ON_HOLD;

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
      client, currentTab, meta, notifyInfo, notifyError, rawClient, notes, noteIsLoading, clientIsLoading, user, conversation, hasConversationFinished,
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
      const backlink = <BackLink linkText="Back to Prospects" to={AGENT_DASHBOARD_FAMILIES_PATH} onClick={clickEventHandler('fdetails', 'Back to Prospects')} />;
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
    const isPaused = status === FAMILY_STATUS_ON_HOLD;
    const {
      levelGroup, showAcceptRejectButtons, showUpdateAddNoteButtons, showPauseButton, canEditFamilyDetails,
    } = getStageDetails(stage);
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

    const summaryPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: SUMMARY });
    const activityPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id });
    const familyDetailsPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: FAMILY_DETAILS });
    const communitiesPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: COMMUNITIES });
    const messagesPath = generatePath(AGENT_DASHBOARD_FAMILIES_DETAILS_PATH, { id, tab: MESSAGES });

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

    const backLinkHref = levelGroup === 'Prospects' ? AGENT_DASHBOARD_FAMILIES_PATH : `${AGENT_DASHBOARD_FAMILIES_PATH}?type=${levelGroup}`;
    const backlink = <PaddedBackLink linkText={`Back to ${levelGroup}`} to={backLinkHref} onClick={clickEventHandler('fdetails', `Back to ${levelGroup}`)} />;

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
            />
            {showAcceptRejectButtons && <FamilySummary snap="top" client={client} to={familyDetailsPath} />}
            {!showAcceptRejectButtons && <PaddedFamilySummary snap="top" client={client} to={familyDetailsPath} />}
            {showPauseButton && <PutFamilyOnPause isPaused={isPaused} onTogglePause={handlePauseClick} />}
          </BigScreenSummarySection>
          <SmallScreenClientNameWrapper>
            <Link to={backLinkHref}>
              <Icon icon="arrow-left" palette="slate" />
            </Link>
            <SmallScreenClientNameBlock weight="medium" size="subtitle">{name}</SmallScreenClientNameBlock>
          </SmallScreenClientNameWrapper>
        </div>
        <div>
          <Tabs activeTab={currentTab}>
            <MobileTab id={SUMMARY} to={summaryPath} onClick={clickEventHandler('fdetails-tab', 'Summary')}>
              Summary
            </MobileTab>
            <Tab id={ACTIVITY} default to={activityPath} onClick={clickEventHandler('fdetails-tab', 'Activity')}>
              Activity
            </Tab>
            <Tab id={FAMILY_DETAILS} to={familyDetailsPath} onClick={clickEventHandler('fdetails-tab', 'Family Details')}>
              Family Details
            </Tab>
            <Tab id={COMMUNITIES} to={communitiesPath} onClick={clickEventHandler('fdetails-tab', 'Communities')}>
              Communities
            </Tab>
            <Tab id={MESSAGES} default to={messagesPath} onClick={clickEventHandler('fdetails-tab', 'Messages')}>
              Messages
            </Tab>
          </Tabs>
          <TabWrapper>
            {currentTab === SUMMARY && (
              <Fragment>
                <SmallScreenBorderPaddedFamilySummary snap="top" client={client} to={familyDetailsPath} noHeading />
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
              <CommunitiesTab>
                <TextAlignCenterBlock size="subtitle" weight="medium">This feature is coming soon!</TextAlignCenterBlock>
                <TextAlignCenterBlock palette="grey">You will be able to view your family’s favorite communities list, add communities you recommend to their list, and send referrals to communities.</TextAlignCenterBlock>
              </CommunitiesTab>
            )}

            {currentTab === MESSAGES && (
              <div>
                {!hasConversationFinished &&
                <Fragment>
                  <br />
                  <FullWidthTextCenterBlock size="caption">Loading...</FullWidthTextCenterBlock>
                </Fragment>
                }
                {!conversation &&
                <Fragment>
                  <br />
                  <FullWidthTextCenterBlock size="caption"> No Conversation found...</FullWidthTextCenterBlock>
                </Fragment>
                }
                {hasConversationFinished && conversation &&
                <Fragment>
                  <ConversationMessagesContainer
                    conversation={conversation}
                    viewingAsParticipant={viewingAsParticipant}
                    participants={conversationParticipants}
                    sendMessageFormPlaceholder={`Message ${name}...`}
                  />
                </Fragment>
                }
              </div>
            )}
          </TabWrapper>
        </div>
        <DashboardMyFamilyStickyFooterContainer
          options={stickyFooterOptions}
          stage={stage}
          showAcceptRejectButtons={showAcceptRejectButtons}
        />
      </StyledDashboardTwoColumnTemplate>
    );
  }
}
