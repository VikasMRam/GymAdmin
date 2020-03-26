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
  CARE_SERVICES, PRICING, AMENITIES, SERVICES, CONTRACT, CONTACTS, PHOTOS, CLIENTS,
} from 'sly/constants/dashboardAppPaths';
import { AGENT_ND_ROLE, PLATFORM_ADMIN_ROLE } from 'sly/constants/roles';
import communityPropType from 'sly/propTypes/community';
import notePropType from 'sly/propTypes/note';
import userPropType from 'sly/propTypes/user';
import { size, palette } from 'sly/components/themes';
import { clickEventHandler } from 'sly/services/helpers/eventHandlers';
import { userIs } from 'sly/services/helpers/role';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import SlyEvent from 'sly/services/helpers/events';
import displayOnlyIn from 'sly/components/helpers/displayOnlyIn';
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
  Section,
  SummarySection,
  DashboardWithSummaryPageTemplate,
} from 'sly/components/templates/DashboardWithSummaryTemplate';
import DashboardCommunitySummary from 'sly/components/organisms/DashboardCommunitySummary';
import DashboardCommunityNameAndStatus from 'sly/components/organisms/DashboardCommunityNameAndStatus';
import { topSnap } from 'sly/components/atoms/Box';
import DashboardCommunityDetailsFormContainer from 'sly/containers/DashboardCommunityDetailsFormContainer';
import DashboardCommunityCareServicesFormContainer from 'sly/containers/DashboardCommunityCareServicesFormContainer';
import DashboardCommunityServicesFormContainer from 'sly/containers/DashboardCommunityServicesFormContainer';
import DashboardCommunityPricingFormContainer from 'sly/containers/DashboardCommunityPricingFormContainer';
import DashboardCommunityPhotosFormContainer from 'sly/containers/DashboardCommunityPhotosFormContainer';
import DashboardCommunityAmenitiesFormContainer from 'sly/containers/DashboardCommunityAmenitiesFormContainer';
import DashboardCommunityContractFormContainer from 'sly/containers/DashboardCommunityContractFormContainer';
import DashboardContactsSectionContainer from 'sly/containers/dashboard/DashboardContactsSectionContainer';
import DashboardAgentFamilyOverviewSectionContainer from 'sly/containers/DashboardAgentFamilyOverviewSectionContainer';
import { PROPERTY_ENTITY_TYPE } from 'sly/constants/entityTypes';

const BackLinkWrapper = pad(styled.div`
  display: flex;
  align-items: center;
`, 'regular');

const TextAlignCenterBlock = pad(textAlign(Block, 'center'), 'regular');
const AlignCenterBackLinkWrapper = styled(BackLinkWrapper)`
  justify-content: center;
`;

// FIXME: redundant code to remove styling from tabs, won't be necessary if tabs are styled property according to the
// definitive designs using DashboardWithSummaryTemplate
const StyledTabs = styled(Tabs)`
  border: ${size('border', 'regular')} solid ${palette('slate', 'stroke')};
  @media (max-width: calc(${size('breakpoint.laptop')} - 1px)) {
    ${topSnap};
  }
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
    currentTab: string,
    showModal: func,
    hideModal: func,
    notifyError: func,
    notifyInfo: func,
    communityIsLoading: bool,
    user: userPropType.isRequired,
  };

  getTabsForUser = () => {
    const { user, community } = this.props;
    const { roleID } = user;
    const { id } = community;

    const tabs = {
      Summary: SUMMARY,
      Profile: PROFILE,
      'Care Services': CARE_SERVICES,
      Pricing: PRICING,
      Photos: PHOTOS,
      Amenities: AMENITIES,
      Services: SERVICES,
      Contacts: CONTACTS,
      Contract: CONTRACT,
      Clients: CLIENTS,
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
    const {
      community,
      currentTab,
      communityIsLoading,
      user,
      notifyInfo,
      notifyError,
      showModal,
      hideModal,
    } = this.props;

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
          <TextAlignCenterBlock weight="medium" size="subtitle">Community not found!</TextAlignCenterBlock>
          <AlignCenterBackLinkWrapper>{backlink}</AlignCenterBackLinkWrapper>
        </DashboardPageTemplate>
      );
    }

    const { id: communityOrgId } = community.organization;
    const { id: userOrgId } = user.organization;
    const isOfDifferentOrg = userOrgId !== communityOrgId;

    const sectionFilters = {
      include: 'entities',
      'filter[community-id]': community.id,
    };

    const clientsSectionFilters = {
      'filter[community]': community.id,
    };

    return (
      <DashboardWithSummaryPageTemplate activeMenuItem="Communities">
        <Top>
          {backlink}
        </Top>

        <Left>
          {isOfDifferentOrg && (
            <DifferentOrgNotification palette="primary">
              This Family belongs to a different organization named <i>{community.organization.name}</i>
            </DifferentOrgNotification>
          )}
          <DashboardCommunityNameAndStatus community={community} />
        </Left>

        <Right>
          <StyledTabs activeTab={currentTab}>
            {this.getTabsForUser()}
          </StyledTabs>

          {currentTab === PROFILE && (
            <Section>
              <DashboardCommunityDetailsFormContainer
                notifyInfo={notifyInfo}
                notifyError={notifyError}
                community={community}
              />
            </Section>
          )}
          {currentTab === CARE_SERVICES && (
            <Section>
              <DashboardCommunityCareServicesFormContainer
                notifyInfo={notifyInfo}
                notifyError={notifyError}
                community={community}
              />
            </Section>
          )}
          {currentTab === PRICING && (
            <Section>
              <DashboardCommunityPricingFormContainer
                notifyInfo={notifyInfo}
                notifyError={notifyError}
                community={community}
              />
            </Section>
          )}
          {currentTab === PHOTOS && (
            <Section>
              <DashboardCommunityPhotosFormContainer
                showModal={showModal}
                hideModal={hideModal}
                notifyInfo={notifyInfo}
                notifyError={notifyError}
                community={community}
              />
            </Section>
          )}
          {currentTab === AMENITIES && (
            <Section>
              <DashboardCommunityAmenitiesFormContainer
                notifyInfo={notifyInfo}
                notifyError={notifyError}
                community={community}
              />
            </Section>
          )}
          {currentTab === SERVICES && (
            <Section>
              <DashboardCommunityServicesFormContainer
                notifyInfo={notifyInfo}
                notifyError={notifyError}
                community={community}
              />
            </Section>
          )}
          {currentTab === CONTACTS && (
            <Section>
              <DashboardContactsSectionContainer
                id="contacts"
                sectionFilters={sectionFilters}
                entityType={PROPERTY_ENTITY_TYPE}
                entityId={community.id}
                entityName={community.name}
              />
            </Section>
          )}
          {currentTab === CONTRACT && (
            <Section>
              <DashboardCommunityContractFormContainer
                notifyInfo={notifyInfo}
                notifyError={notifyError}
                community={community}
              />
            </Section>
          )}
          {currentTab === CLIENTS && (
            <Section>
              <DashboardAgentFamilyOverviewSectionContainer
                sectionFilters={clientsSectionFilters}
              />
            </Section>
          )}
        </Right>

        <SummarySection className={currentTab === SUMMARY ? 'selected' : ''}>
          <Section>
            <DashboardCommunitySummary community={community} />
          </Section>
        </SummarySection>
      </DashboardWithSummaryPageTemplate>
    );
  }
}
