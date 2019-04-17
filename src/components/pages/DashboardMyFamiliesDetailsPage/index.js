import React, { Fragment } from 'react';
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
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import DashboardTwoColumnTemplate from 'sly/components/templates/DashboardTwoColumnTemplate';
import { Box, Block, Icon, Span, Link, Hr } from 'sly/components/atoms';
import Tabs from 'sly/components/molecules/Tabs';
import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';
import FamilyStage from 'sly/components/molecules/FamilyStage';
import FamilySummary from 'sly/components/molecules/FamilySummary';
import FamilyActivityItem from 'sly/components/molecules/FamilyActivityItem';
import FamilyDetailsFormContainer from 'sly/containers/FamilyDetailsFormContainer';
import AcceptAndContactFamilyContainer from 'sly/containers/AcceptAndContactFamilyContainer';
import RejectFamilyContainer from 'sly/containers/RejectFamilyContainer';

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

const DashboardMyFamiliesDetailsPage = ({
  client, rawClient, currentTab, showModal, hideModal, notifyError, notifyInfo, meta,
}) => {
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
  const { rejectReasons } = meta;
  const { id, clientInfo, stage } = client;
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

  const handleAcceptClick = () => {
    showModal(<AcceptAndContactFamilyContainer notifyError={notifyError} client={client} rawClient={rawClient} onCancel={hideModal} />, null, 'noPadding', false);
  };

  const handleRejectClick = () => {
    showModal(<RejectFamilyContainer reasons={rejectReasons} notifyError={notifyError} notifyInfo={notifyInfo} client={client} rawClient={rawClient} onCancel={hideModal} />, null, 'noPadding', false);
  };

  return (
    <DashboardTwoColumnTemplate activeMenuItem="My Families">
      <section>
        <Box snap="bottom">
          {backLink}
          <Block weight="medium" size="subtitle">{name}</Block>
        </Box>
        <Hr noMargin />
        <FamilyStage noBorderRadius snap="top" stageText={stage} onAcceptClick={handleAcceptClick} onRejectClick={handleRejectClick} />
        <FamilySummary snap="top" client={client} to={familyDetailsPath} />
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
            <FamilyDetailsFormContainer client={client} />
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
};

DashboardMyFamiliesDetailsPage.propTypes = {
  client: clientPropType,
  currentTab: string,
  showModal: func,
  hideModal: func,
  rawClient: object,
  notifyError: func,
  notifyInfo: func,
  meta: clientMetaPropType,
};

export default DashboardMyFamiliesDetailsPage;
