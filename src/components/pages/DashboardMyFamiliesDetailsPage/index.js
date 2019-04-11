import React, { Fragment } from 'react';
import styled from 'styled-components';

import { FAMILY_DASHBOARD_FAMILIES_PATH } from 'sly/constants/dashboardAppPaths';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import { size } from 'sly/components/themes';
import DashboardTwoColumnTemplate from 'sly/components/templates/DashboardTwoColumnTemplate';
import { Box, Block, Icon, Span, Link, Hr } from 'sly/components/atoms';
import Tabs from 'sly/components/molecules/Tabs';
import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';
import FamilyStage from 'sly/components/molecules/FamilyStage';
import FamilySummary from 'sly/components/molecules/FamilySummary';
import FamilyActivityItem from 'sly/components/molecules/FamilyActivityItem';
// todo: mock data. remove later
import PraneshKumar from 'sly/../private/storybook/sample-data/user-pranesh-kumar.json';
// todo: mock data. remove later
const client = {
  ...PraneshKumar,
  // todo: replace stage with correct structure after clarification
  stageText: 'Prospecting - New',
  stageLevel: 1,
};
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

const DashboardMyFamiliesDetailsPage = () => {
  const { name, stageText, stageLevel } = client;
  const activityCards = activities.map((a, i) =>
    <StyledFamilyActivityItem key={a.title} noBorderRadius snap={i === activities.length - 1 ? null : 'bottom'} title={a.title} description={a.description} date={a.date} />);

  return (
    <DashboardTwoColumnTemplate activeMenuItem="My Families">
      <section>
        <Box snap="bottom">
          <Link to={FAMILY_DASHBOARD_FAMILIES_PATH}>
            <BackLinkWrapper>
              <Icon icon="arrow-left" size="small" palette="primary" />
              <Span size="tiny" palette="primary">Back to Prospects</Span>
            </BackLinkWrapper>
          </Link>
          <Block weight="medium" size="subtitle">{name}</Block>
        </Box>
        <Hr noMargin />
        <FamilyStage noBorderRadius snap="top" stageText={stageText} stageLevel={stageLevel} />
        <FamilySummary snap="top" client={client} />
      </section>
      <Tabs>
        <div label="ACTIVITY">
          <TableHeaderButtons noBorder hasColumnsButton={false} />
          {activityCards.length === 0 &&
            <Fragment>
              <PaddedHr noMargin />
              <TextAlignCenterBlock>There are no acivities.</TextAlignCenterBlock>
            </Fragment>
          }
          {activityCards.length > 0 && activityCards}
        </div>
        <div label="FAMILY DETAILS">
          See ya later, <em>Alligator</em>!
        </div>
        <div label="COMMUNITIES">
          <CommunitiesTab label="COMMUNITIES">
            <TextAlignCenterBlock size="subtitle" weight="medium">This feature is coming soon!</TextAlignCenterBlock>
            <TextAlignCenterBlock palette="grey">You will be able to view your family’s favorite communities list, add communities you recommend to their list, and send referrals to communities.</TextAlignCenterBlock>
          </CommunitiesTab>
        </div>
      </Tabs>
    </DashboardTwoColumnTemplate>
  );
};

export default DashboardMyFamiliesDetailsPage;
