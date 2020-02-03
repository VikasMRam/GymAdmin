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
  PROFILE, AGENT_DASHBOARD_FAMILIES_PATH,
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
import { Box, Block, Icon, Link } from 'sly/components/atoms';
import Tabs from 'sly/components/molecules/Tabs';
import BackLink from 'sly/components/molecules/BackLink';
import Tab from 'sly/components/molecules/Tab';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import { SummarySection, Section, BodyWrapper, Navigation } from 'sly/components/templates/DashboardWithSummaryTemplate';
import DashboardCommunitySummary from 'sly/components/organisms/DashboardCommunitySummary';

const PaddedBackLink = pad(BackLink, 'regular');

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

const SmallScreenBannerNotification = displayOnlyIn(BannerNotification, ['mobile', 'tablet']);

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
    const { community } = this.props;
    const { id } = community;
    const summaryPath = generatePath(ADMIN_DASHBOARD_COMMUNITIES_DETAIL_PATH, { id, tab: SUMMARY });
    const profilePath = generatePath(ADMIN_DASHBOARD_COMMUNITIES_DETAIL_PATH, { id, tab: PROFILE });
    // ...

    return {
      summaryPath,
      profilePath,
    };
  };

  getTabsForUser = () => {
    const { user } = this.props;
    const { roleID } = user;
    const {
      summaryPath,
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
    const adminTabList = [
      { id: PARTNER_AGENTS, to: agentsPath, label: 'Agents' },
      { id: TASKS, to: tasksPath, label: 'Tasks' },
      { id: MESSAGES, to: messagesPath, label: 'Messages' },
    ];
    // TODO: CHANGE TO HAS ROLE INSTEAD OF IS ROLE...
    let tabs = [summaryTab];
    /* eslint-disable no-bitwise */
    if (roleID & PLATFORM_ADMIN_ROLE) {
      tabs = tabs.concat(adminTabList.map(e => genTab(e)));
    }
    return tabs;
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
    const backlink = <PaddedBackLink linkText="Back to Communities" to={backLinkHref} event={backlinkEvent} />;

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
      <DashboardPageTemplate activeMenuItem="Communities">
        <BodyWrapper>
          <Navigation>
            {backlink}
          </Navigation>
          <Tabs activeTab={currentTab}>
            {this.getTabsForUser()}
          </Tabs>
          {isOfDifferentOrg &&
            <SmallScreenBannerNotification palette="primary">
              This Family belongs to a different organization named <i>{community.organization.name}</i>
            </SmallScreenBannerNotification>
          }
          <SummarySection className={currentTab === SUMMARY ? 'selected' : ''}>
            <DashboardCommunitySummary community={community} />
          </SummarySection>
          <Section>
            {currentTab === PROFILE && (
              <>Tab section</>
            )}
          </Section>
        </BodyWrapper>
      </DashboardPageTemplate>
    );
  }
}
