import React, { Fragment, Component } from 'react';
import styled, { css } from 'styled-components';
import { string, func, object, arrayOf, bool } from 'prop-types';

import {
  FAMILY_DASHBOARD_FAMILIES_PATH,
  FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH,
  SUMMARY,
  ACTIVITY,
  FAMILY_DETAILS,
  COMMUNITIES,
} from 'sly/constants/dashboardAppPaths';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import clientPropType, { meta as clientMetaPropType } from 'sly/propTypes/client';
import notePropType from 'sly/propTypes/note';
import { size, palette } from 'sly/components/themes';
import { getStageDetails } from 'sly/services/helpers/stage';
import { FAMILY_STATUS_ON_HOLD } from 'sly/constants/familyDetails';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardTwoColumnTemplate from 'sly/components/templates/DashboardTwoColumnTemplate';
import FamilyDetailsFormContainer from 'sly/containers/FamilyDetailsFormContainer';
import AcceptAndContactFamilyContainer from 'sly/containers/AcceptAndContactFamilyContainer';
import RejectFamilyContainer from 'sly/containers/RejectFamilyContainer';
import UpdateFamilyStageFormContainer from 'sly/containers/UpdateFamilyStageFormContainer';
import PlaceFamilyOnPauseFormContainer from 'sly/containers/PlaceFamilyOnPauseFormContainer';
import AddNoteFormContainer from 'sly/containers/AddNoteFormContainer';
import { Box, Block, Icon, Span, Link, Hr } from 'sly/components/atoms';
import Tabs from 'sly/components/molecules/Tabs';
// import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';
import FamilyStage from 'sly/components/molecules/FamilyStage';
import FamilySummary from 'sly/components/molecules/FamilySummary';
import FamilyActivityItem from 'sly/components/molecules/FamilyActivityItem';
import PutFamilyOnPause from 'sly/components/molecules/PutFamilyOnPause';
import DashboardMyFamilyStickyFooterContainer from 'sly/containers/DashboardMyFamilyStickyFooterContainer';
import SlyEvent from 'sly/services/helpers/events';
import { clickEventHandler } from 'sly/services/helpers/eventHandlers';

const StyledTabs = styled(Tabs)`
  background-color: ${palette('white', 'base')};
  > :first-child {
    text-transform: uppercase;
  }
`;

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
  ${SmallScreenBorder}
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
  ${SmallScreenBorder}
  padding: ${size('spacing.xLarge')};
`;

const TabWrapper = styled.div`
  padding: ${size('spacing.large')};
  background-color: ${palette('grey', 'background')};

  > * {
    background-color: ${palette('white', 'base')};
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xLarge')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    background-color: ${palette('white', 'base')};
    padding: 0;
  }
`;

const hideInBigScreenStyles = css`
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

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-bottom: 0;
  }
`;

const BackArrorIcon = styled(Icon)`
  margin-right: ${size('spacing.small')};
`;

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
    notes: arrayOf(notePropType),
    noteIsLoading: bool,
    clientIsLoading: bool,
    refetchClient: func.isRequired,
    refetchNotes: func.isRequired,
    goToFamilyDetails: func,
  };

  handleAcceptClick = () => {
    const {
      showModal, hideModal, notifyError, client, rawClient, refetchClient, goToFamilyDetails,
    } = this.props;
    SlyEvent.getInstance().sendEvent({
      category: 'fdetails',
      action: 'launch',
      label: 'accept-lead',
      value: '',
    });
    showModal(<AcceptAndContactFamilyContainer notifyError={notifyError} client={client} rawClient={rawClient} onCancel={hideModal} goToFamilyDetails={goToFamilyDetails} refetchClient={refetchClient} />, null, 'noPadding', false);
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

    showModal(
      <AddNoteFormContainer
        hasCancel
        onCancelClick={hideModal}
        heading={`Add a note on ${name}`}
        placeholder="Add a note on why you are updating this family's stage..."
        submitButtonText="Save note"
        onSubmit={handleSubmit}
      />, null, 'noPadding', false);
  };

  handlePauseClick = () => {
    const {
      showModal, hideModal, notifyError, client, rawClient, notifyInfo, onUnPause,
    } = this.props;
    const { status } = client;
    const isPaused = status === FAMILY_STATUS_ON_HOLD;
    SlyEvent.getInstance().sendEvent({
      category: 'fdetails',
      action: 'launch',
      label: isPaused,
      value: '',
    });
    if (isPaused) {
      onUnPause();
    } else {
      showModal(
        <PlaceFamilyOnPauseFormContainer
          onSuccess={hideModal}
          onCancel={hideModal}
          notifyError={notifyError}
          notifyInfo={notifyInfo}
          client={client}
          rawClient={rawClient}
        />, null, 'noPadding', false);
    }
  };

  render() {
    const {
      handleAcceptClick, handleRejectClick, handleUpdateClick, handleAddNoteClick, handlePauseClick,
    } = this;

    const {
      client, currentTab, meta, notifyInfo, notifyError, rawClient, notes, noteIsLoading, clientIsLoading,
    } = this.props;

    if (clientIsLoading) {
      return (
        <DashboardTwoColumnTemplate activeMenuItem="My Families">
          Loading...
        </DashboardTwoColumnTemplate>
      );
    }

    const getBackLink = (linkText, backLinkHref) => (
      <Link to={backLinkHref} onCLick={clickEventHandler('fdetails',linkText)}>
        <BackLinkWrapper>
          <BackArrorIcon icon="arrow-left" size="small" palette="primary" />
          <Span size="caption" palette="primary">{linkText}</Span>
        </BackLinkWrapper>
      </Link>
    );

    if (!client) {
      return (
        <DashboardPageTemplate activeMenuItem="My Families">
          <TextAlignCenterBlock weight="medium" size="subtitle">Family not found!</TextAlignCenterBlock>
          <AlignCenterBackLinkWrapper>{getBackLink('Back to Prospects', FAMILY_DASHBOARD_FAMILIES_PATH)}</AlignCenterBackLinkWrapper>
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
      level, levelGroup, palette, showAcceptRejectButtons, showUpdateAddNoteButtons, showPauseButton, canEditFamilyDetails,
    } = getStageDetails(stage);
    const { name } = clientInfo;
    const activityCards = notes ? notes.map((a, i) =>
      <StyledFamilyActivityItem key={a.id} noBorderRadius snap={i === notes.length - 1 ? null : 'bottom'} title={a.title} description={a.body} date={a.createdAt} />) : [];

    const summaryPath = FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH.replace(':id', id).replace(':tab?', SUMMARY);
    const activityPath = FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH.replace(':id/:tab?', id)
    const familyDetailsPath = FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH.replace(':id', id).replace(':tab?', FAMILY_DETAILS);
    const communitiesPath = FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH.replace(':id', id).replace(':tab?', COMMUNITIES);

    let stickyFooterOptions = [];
    if (showAcceptRejectButtons) {
      stickyFooterOptions = [
        {
          text: 'Accept and contact this family', icon: 'flag', iconPalette: 'slate', onClick: handleAcceptClick,
        },
        {
          text: 'Reject', icon: 'add-note', iconPalette: 'slate', onClick: handleRejectClick, ghost: true,
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

    const backLinkHref = levelGroup === 'Prospects' ? FAMILY_DASHBOARD_FAMILIES_PATH : `${FAMILY_DASHBOARD_FAMILIES_PATH}?type=${levelGroup}`;
    const stickyFooterStageProps = {
      text: `${levelGroup} - ${stage}`,
      currentStage: level,
      palette,
    };

    return (
      <StyledDashboardTwoColumnTemplate activeMenuItem="My Families">
        <div> {/* DashboardTwoColumnTemplate should have only 2 children as this is a two column template */}
          <BigScreenSummarySection>
            <Box snap="bottom">
              {getBackLink(`Back to ${levelGroup}`, backLinkHref)}
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
            <Link to={FAMILY_DASHBOARD_FAMILIES_PATH}>
              <Icon icon="arrow-left" palette="slate" />
            </Link>
            <SmallScreenClientNameBlock weight="medium" size="subtitle">{name}</SmallScreenClientNameBlock>
          </SmallScreenClientNameWrapper>
        </div>
        <StyledTabs activeTab={currentTab}>
          <div id={SUMMARY} label="Summary" tabStyles={hideInBigScreenStyles} to={summaryPath}>
            <TabWrapper>
              <SmallScreenBorderPaddedFamilySummary snap="top" client={client} to={familyDetailsPath} noHeading />
              {showPauseButton && <PutFamilyOnPause isPaused={isPaused} onTogglePause={handlePauseClick} />}
            </TabWrapper>
          </div>
          <div id={ACTIVITY} default label="Activity" to={activityPath}>
            <TabWrapper>
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
            </TabWrapper>
          </div>
          <div id={FAMILY_DETAILS} label="Family Details" to={familyDetailsPath}>
            <TabWrapper>
              <FamilyDetailsTab>
                <FamilyDetailsFormContainer
                  client={client}
                  rawClient={rawClient}
                  notifyInfo={notifyInfo}
                  notifyError={notifyError}
                  accepted={!showAcceptRejectButtons}
                  canEditFamilyDetails={canEditFamilyDetails}
                  gender={gender}
                  lookingFor={lookingFor}
                  monthlyBudget={monthlyBudget}
                  timeToMove={timeToMove}
                />
              </FamilyDetailsTab>
            </TabWrapper>
          </div>
          <div id={COMMUNITIES} label="Communities" to={communitiesPath}>
            <TabWrapper>
              <CommunitiesTab>
                <TextAlignCenterBlock size="subtitle" weight="medium">This feature is coming soon!</TextAlignCenterBlock>
                <TextAlignCenterBlock palette="grey">You will be able to view your family’s favorite communities list, add communities you recommend to their list, and send referrals to communities.</TextAlignCenterBlock>
              </CommunitiesTab>
            </TabWrapper>
          </div>
        </StyledTabs>
        <DashboardMyFamilyStickyFooterContainer
          options={stickyFooterOptions}
          stageProps={stickyFooterStageProps}
          showAcceptRejectButtons={showAcceptRejectButtons}
        />
      </StyledDashboardTwoColumnTemplate>
    );
  }
}
