import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { string, func, object } from 'prop-types';

import {
  FAMILY_DASHBOARD_FAMILIES_PATH,
  FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH,
  FAMILY_DASHBOARD_FAMILIES_DETAILS_TAB_PATH,
} from 'sly/constants/dashboardAppPaths';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import clientPropType, { meta as clientMetaPropType } from 'sly/propTypes/client';
import { size } from 'sly/components/themes';
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
import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';
import FamilyStage from 'sly/components/molecules/FamilyStage';
import FamilySummary from 'sly/components/molecules/FamilySummary';
import FamilyActivityItem from 'sly/components/molecules/FamilyActivityItem';
import PutFamilyOnPause from 'sly/components/molecules/PutFamilyOnPause';

// todo: mock data
const activities = [
  {
    id: 'sdfsdf234wf',
    title: 'You got a new lead!',
    description: 'J. and his mother are looking for Assisted Living in Los Angeles. She is looking for a community that is very active and has a lot of activities and outings.',
    date: '2019-04-05T15:54:06Z',
  },
  {
    id: 'sdf234wsdfdf',
    title: 'You got a new lead!dfgdf',
    description: 'J. and his mother are looking for Assisted Living in Los Angeles. She is looking for a community that is very active and has a lot of activities and outings.',
    date: '2019-07-05T15:54:06Z',
  },
];

const PaddedFamilySummary = pad(FamilySummary, 'xLarge');

const BackLinkWrapper = pad(styled.div`
  display: flex;
  align-items: center;
`, 'regular');

const TextAlignCenterBlock = pad(textAlign(Block, 'center'), 'regular');
const AlignCenterBackLinkWrapper = BackLinkWrapper.extend`
  justify-content: center;
`;
const PaddedHr = pad(Hr, 'xLarge');

const CommunitiesTab = styled.div`
  width: ${size('layout.col4')};
  margin: auto;
  padding: ${size('spacing.xxxLarge')} 0;
`;

const StyledFamilyActivityItem = styled(FamilyActivityItem)`
  border-right: 0;
  border-left: 0;
`;

const FamilyDetailsTab = styled.div`
  padding: ${size('spacing.xLarge')};
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
  };

  handleAcceptClick = () => {
    const {
      showModal, hideModal, notifyError, client, rawClient,
    } = this.props;
    showModal(<AcceptAndContactFamilyContainer notifyError={notifyError} client={client} rawClient={rawClient} onCancel={hideModal} />, null, 'noPadding', false);
  };

  handleRejectClick = () => {
    const {
      meta, showModal, hideModal, notifyError, notifyInfo, client, rawClient, onRejectSuccess,
    } = this.props;
    const { rejectReasons } = meta;
    showModal(<RejectFamilyContainer onSuccess={onRejectSuccess} reasons={rejectReasons} notifyError={notifyError} notifyInfo={notifyInfo} client={client} rawClient={rawClient} onCancel={hideModal} />, null, 'noPadding', false);
  };

  handleUpdateClick = () => {
    const {
      showModal, hideModal, notifyError, client, rawClient, notifyInfo,
    } = this.props;
    showModal(<UpdateFamilyStageFormContainer onSuccess={hideModal} notifyError={notifyError} notifyInfo={notifyInfo} client={client} rawClient={rawClient} onCancel={hideModal} />, null, 'noPadding', false);
  };

  handleAddNoteClick = () => {
    const { showModal, client, hideModal } = this.props;
    const { clientInfo } = client;
    const { name } = clientInfo;
    showModal(
      <AddNoteFormContainer
        hasCancel
        onCancelClick={hideModal}
        heading={`Add a note on ${name}`}
        placeholder="Add a note on why you are updating this family's stage..."
        submitButtonText="Save note"
      />,
      null,
      'noPadding',
      false
    );
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
      showModal(<PlaceFamilyOnPauseFormContainer onSuccess={hideModal} onCancel={hideModal} notifyError={notifyError} notifyInfo={notifyInfo} client={client} rawClient={rawClient} />, null, 'noPadding', false);
    }
  };

  render() {
    const {
      handleAcceptClick, handleRejectClick, handleUpdateClick, handleAddNoteClick, handlePauseClick,
    } = this;
    const {
      client, currentTab, meta, notifyError, rawClient,
    } = this.props;

    const backLink = (
      <Link to={FAMILY_DASHBOARD_FAMILIES_PATH}>
        <BackLinkWrapper>
          <Icon icon="arrow-left" size="small" palette="primary" />
          <Span size="caption" palette="primary">Back to Prospects</Span>
        </BackLinkWrapper>
      </Link>
    );

    if (!client) {
      return (
        <DashboardPageTemplate activeMenuItem="My Families">
          <TextAlignCenterBlock weight="medium" size="subtitle">Family not found!</TextAlignCenterBlock>
          <AlignCenterBackLinkWrapper>{backLink}</AlignCenterBackLinkWrapper>
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
    const { showAcceptRejectButtons, showPauseButton } = getStageDetails(stage);
    const { name } = clientInfo;
    const activityCards = activities.map((a, i) =>
      <StyledFamilyActivityItem key={a.title} noBorderRadius snap={i === activities.length - 1 ? null : 'bottom'} title={a.title} description={a.description} date={a.date} />);
    let activeTab = 'ACTIVITY';
    if (currentTab === 'communities') {
      activeTab = 'COMMUNITIES';
    } else if (currentTab === 'family-details') {
      activeTab = 'FAMILY DETAILS';
    }
    const familyDetailsPath = FAMILY_DASHBOARD_FAMILIES_DETAILS_TAB_PATH.replace(':id', id).replace(':tab', 'family-details');
    const communitiesPath = FAMILY_DASHBOARD_FAMILIES_DETAILS_TAB_PATH.replace(':id', id).replace(':tab', 'communities');

    return (
      <DashboardTwoColumnTemplate activeMenuItem="My Families">
        <section>
          <Box snap="bottom">
            {backLink}
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
        </section>
        <Tabs activeTab={activeTab}>
          <div label="ACTIVITY" to={FAMILY_DASHBOARD_FAMILIES_DETAILS_PATH.replace(':id', id)}>
            <TableHeaderButtons hasColumnsButton={false} />
            {activityCards.length === 0 &&
              <Fragment>
                <PaddedHr noMargin />
                <TextAlignCenterBlock>There are no acivities.</TextAlignCenterBlock>
              </Fragment>
            }
            {activityCards.length > 0 && activityCards}
          </div>
          <div label="FAMILY DETAILS" to={familyDetailsPath}>
            <FamilyDetailsTab>
              <FamilyDetailsFormContainer
                client={client}
                rawClient={rawClient}
                notifyError={notifyError}
                accepted={!showAcceptRejectButtons}
                gender={gender}
                lookingFor={lookingFor}
                monthlyBudget={monthlyBudget}
                timeToMove={timeToMove}
              />
            </FamilyDetailsTab>
          </div>
          <div label="COMMUNITIES" to={communitiesPath}>
            <CommunitiesTab label="COMMUNITIES">
              <TextAlignCenterBlock size="subtitle" weight="medium">This feature is coming soon!</TextAlignCenterBlock>
              <TextAlignCenterBlock palette="grey">You will be able to view your family’s favorite communities list, add communities you recommend to their list, and send referrals to communities.</TextAlignCenterBlock>
            </CommunitiesTab>
          </div>
        </Tabs>
      </DashboardTwoColumnTemplate>
    );
  }
}
