import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { string, func, object, arrayOf, bool } from 'prop-types';
import { generatePath } from 'react-router';

import {
  ADMIN_DASHBOARD_COMMUNITIES_PATH,
  ADMIN_DASHBOARD_COMMUNITIES_DETAIL_PATH,
  SUMMARY,
  PARTNER_AGENTS,
  MESSAGES,
  TASKS,
  PROFILE,
} from 'sly/constants/dashboardAppPaths';
import { AGENT_ND_ROLE, PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';
import communityPropType, { meta as communityMetaPropType } from 'sly/propTypes/community';
import notePropType from 'sly/propTypes/note';
import userPropType from 'sly/propTypes/user';
import { size, palette } from 'sly/components/themes';
import { clickEventHandler } from 'sly/services/helpers/eventHandlers';
import { userIs } from 'sly/services/helpers/role';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import SlyEvent from 'sly/services/helpers/events';
import displayOnlyIn from 'sly/components/helpers/displayOnlyIn';
import Role from 'sly/components/common/Role';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';
import { Block } from 'sly/components/atoms';
import Tabs from 'sly/components/molecules/Tabs';
import BackLink from 'sly/components/molecules/BackLink';
import Tab from 'sly/components/molecules/Tab';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import {
  Top,
  Right,
  Left,
  SummarySection,
  DashboardWithSummaryPageTemplate,
} from 'sly/components/templates/DashboardWithSummaryTemplate';
import DashboardCommunitySummary from 'sly/components/organisms/DashboardCommunitySummary';
import Heading from 'sly/components/atoms/Heading';
import DashboardCommunityNameAndStatus from 'sly/components/organisms/DashboardCommunityNameAndStatus';
import DashboardCommunityProfile from 'sly/components/organisms/DashboardCommunityProfile';

const BackLinkWrapper = pad(styled.div`
  display: flex;
  align-items: center;
`, 'regular');

const TextAlignCenterBlock = pad(textAlign(Block, 'center'), 'regular');
const AlignCenterBackLinkWrapper = styled(BackLinkWrapper)`
  justify-content: center;
`;

const MobileTab = styled(Tab)`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;

const DifferentOrgNotification = displayOnlyIn(BannerNotification, ['mobile', 'tablet']);

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
    setSelectedConversation: func,
    user: userPropType.isRequired,
    onAcceptClick: func,
    onEditStatusDetailsClick: func,
    isEditStatusDetailsMode: bool,
    onStatusChange: func,
  };

  getTabPathsForUser = () => {
  };

  getTabsForUser = () => {
    const { user, community } = this.props;
    const { roleID } = user;
    const { id } = community;

    const tabs = {
      'Summary': SUMMARY,
      'Profile': PROFILE,
      // ...
    };

    const pathFor = tab => generatePath(ADMIN_DASHBOARD_COMMUNITIES_DETAIL_PATH, { id, tab });

    return Object.entries(tabs)
      .map(([label, tab]) => {
        const TabComponent = tab === SUMMARY ? MobileTab : Tab;
        const path = tab === SUMMARY ? pathFor() : pathFor(tab);
        return (
          <TabComponent id={tab} key={tab} to={path} onClick={clickEventHandler('fdetails-tab', label)}>
            {label}
          </TabComponent>
        );
      });
  };

  render() {
    const { community, currentTab, communityIsLoading, user } = this.props;

    if (communityIsLoading) {
      return (
        <DashboardPageTemplate activeMenuItem="Communities">
          Loading...
        </DashboardPageTemplate>
      );
    }

    const backlinkEvent = {
      category: 'fdetails',
      label: 'Back to Communities',
      action: 'click',
    };

    const backLinkHref = generatePath(ADMIN_DASHBOARD_COMMUNITIES_PATH);
    const backlink = (
      <BackLink to={backLinkHref} event={backlinkEvent}>
        Back to Communities
      </BackLink>
    );

    if (!community) {
      return (
        <DashboardPageTemplate activeMenuItem="Communities">
          <TextAlignCenterBlock weight="medium" size="subtitle">Family not found!</TextAlignCenterBlock>
          <AlignCenterBackLinkWrapper>{backlink}</AlignCenterBackLinkWrapper>
        </DashboardPageTemplate>
      );
    }

    const { id: communityOrgId } = community.organization;
    const { id: userOrgId } = user.organization;
    const isOfDifferentOrg = userOrgId !== communityOrgId;

    return (
      <DashboardWithSummaryPageTemplate activeMenuItem="Communities">
        <Top>
          {backlink}

          {isOfDifferentOrg && (
            <DifferentOrgNotification palette="primary">
              This Family belongs to a different organization named <i>{community.organization.name}</i>
            </DifferentOrgNotification>
          )}
        </Top>

        <Left>
          <DashboardCommunityNameAndStatus community={community} />
        </Left>

        <Right>
          <Tabs activeTab={currentTab}>
            {this.getTabsForUser()}
          </Tabs>

          {currentTab === PROFILE && (
            <DashboardCommunityProfile community={community} />
          )}
        </Right>

        <SummarySection className={currentTab === SUMMARY ? 'selected' : ''}>
          <DashboardCommunitySummary community={community} />
        </SummarySection>
      </DashboardWithSummaryPageTemplate>
    );
  }
}
