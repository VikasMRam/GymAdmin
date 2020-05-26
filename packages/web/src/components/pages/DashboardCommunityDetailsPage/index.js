import React, { Component } from 'react';
import styled from 'styled-components';
import { string, func, object, arrayOf, bool, shape } from 'prop-types';
import { generatePath } from 'react-router';

import {
  DASHBOARD_COMMUNITIES_PATH,
  DASHBOARD_COMMUNITIES_DETAIL_PATH,
  SUMMARY,
  PROFILE,
  CARE_SERVICES,
  PRICING,
  AMENITIES,
  SERVICES,
  CONTRACT,
  CONTACTS,
  PHOTOS,
  CLIENTS,
  EDITS,
  DASHBOARD_COMMUNITIES_DETAIL_EDIT_PATH,
} from 'sly/web/constants/dashboardAppPaths';
import { PLATFORM_ADMIN_ROLE } from 'sly/web/constants/roles';
import communityPropType from 'sly/web/propTypes/community';
import userPropType from 'sly/web/propTypes/user';
import { size, palette } from 'sly/web/components/themes';
import { clickEventHandler } from 'sly/web/services/helpers/eventHandlers';
import { userIs } from 'sly/web/services/helpers/role';
import Tabs from 'sly/web/components/molecules/Tabs';
import Tab, { MobileTab } from 'sly/web/components/molecules/Tab';
import BannerNotification from 'sly/web/components/molecules/BannerNotification';
import {
  Top,
  Right,
  Left,
  Section,
  SummarySection,
  DashboardWithSummaryPageTemplate, LeftNotifications, Loading,
} from 'sly/web/components/templates/DashboardWithSummaryTemplate';
import DashboardCommunitySummary from 'sly/web/components/organisms/DashboardCommunitySummary';
import DashboardCommunityNameAndStatus from 'sly/web/components/organisms/DashboardCommunityNameAndStatus';
import { topSnap } from 'sly/web/components/atoms/Box';
import DashboardCommunityDetailsFormContainer from 'sly/web/containers/DashboardCommunityDetailsFormContainer';
import DashboardCommunityCareServicesFormContainer from 'sly/web/containers/DashboardCommunityCareServicesFormContainer';
import DashboardCommunityServicesFormContainer from 'sly/web/containers/DashboardCommunityServicesFormContainer';
import DashboardCommunityPricingFormContainer from 'sly/web/containers/DashboardCommunityPricingFormContainer';
import DashboardCommunityPhotosFormContainer from 'sly/web/containers/DashboardCommunityPhotosFormContainer';
import DashboardCommunityAmenitiesFormContainer from 'sly/web/containers/DashboardCommunityAmenitiesFormContainer';
import DashboardCommunityContractFormContainer from 'sly/web/containers/DashboardCommunityContractFormContainer';
import DashboardContactsSectionContainer from 'sly/web/containers/dashboard/DashboardContactsSectionContainer';
import DashboardAgentFamilyOverviewSectionContainer from 'sly/web/containers/DashboardAgentFamilyOverviewSectionContainer';
import DashboardCommunityEditsContainer from 'sly/web/containers/DashboardCommunityEditsContainer';
import { PROPERTY_ENTITY_TYPE } from 'sly/web/constants/entityTypes';
import Link from 'sly/web/components/atoms/Link';
import BreadCrumb from 'sly/web/components/molecules/BreadCrumb';

// FIXME: redundant code to remove styling from tabs, won't be necessary if tabs are styled property according to the
// definitive designs using DashboardWithSummaryTemplate
const StyledTabs = styled(Tabs)`
  border: ${size('border', 'regular')} solid ${palette('slate', 'stroke')};
  @media (max-width: calc(${size('breakpoint.laptop')} - 1px)) {
    ${topSnap};
  }
`;

export default class DashboardCommunityDetailsPage extends Component {
  static propTypes = {
    match: shape({
      url: string,
    }),
    community: communityPropType,
    currentTab: string,
    showModal: func,
    hideModal: func,
    notifyError: func,
    notifyInfo: func,
    communityIsLoading: bool,
    currentEdit: object,
    suggestedEdits: arrayOf(object),
    user: userPropType,
  };

  getTabsForUser = () => {
    const { user, community } = this.props;
    const { roleID } = user;
    const { id } = community;

    const tabs = {
      Profile: PROFILE,
      'Care Services': CARE_SERVICES,
      Pricing: PRICING,
      Photos: PHOTOS,
      Amenities: AMENITIES,
      Services: SERVICES,
      Contacts: [CONTACTS, PLATFORM_ADMIN_ROLE],
      Contract: [CONTRACT, PLATFORM_ADMIN_ROLE],
      Clients: CLIENTS,
      Edits: EDITS,
      // ...
    };

    const pathFor = tab => generatePath(DASHBOARD_COMMUNITIES_DETAIL_PATH, { id, tab });
    const makeTab = (tab, label, TabComponent) => {
      if (Array.isArray(tab)) {
        let permission;
        [tab, permission] = tab;
        if (!(permission & roleID)) {
          return null;
        }
      }
      return (
        <TabComponent id={tab} key={tab} to={pathFor(tab)} onClick={clickEventHandler('fdetails-tab', label)}>
          {label}
        </TabComponent>
      );
    };

    return [
      makeTab(SUMMARY, 'Summary', MobileTab),
      ...Object.entries(tabs)
        .reduce((acc, [label, tab]) => {
          const elem = makeTab(tab, label, Tab);
          if (elem) {
            acc.push(elem);
          }
          return acc;
        }, []),
    ];
  };

  render() {
    const {
      match,
      community,
      currentEdit,
      suggestedEdits,
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
        <Loading activeMenuItem="Communities">
          Loading...
        </Loading>
      );
    }

    const backLink = {
      path: generatePath(DASHBOARD_COMMUNITIES_PATH),
      label: 'Back to communities',
      event: {
        category: 'fdetails',
        label: 'Back to Communities',
        action: 'click',
      },
    };

    if (!community) {
      return (
        <Loading activeMenuItem="Communities" backLink={backLink}>
          Community not found!
        </Loading>
      );
    }

    const breadCrumbItems = [
      { ...backLink, label: 'Communities' },
      {
        path: match.url,
        label: community.name,
      },
    ];

    const userIsAdmin = userIs(user, PLATFORM_ADMIN_ROLE);
    const communityOrgId = community.organization?.id;
    const userOrgId = user.organization?.id;
    const isOfDifferentOrg = !userIsAdmin && (userOrgId !== communityOrgId);

    const pendingChangesUrl = currentEdit?.isPending && generatePath(DASHBOARD_COMMUNITIES_DETAIL_EDIT_PATH, { id: community.id, editId: currentEdit.id });

    const sectionFilters = {
      include: 'entities',
      'filter[community-id]': community.id,
    };

    const clientsSectionFilters = {
      'filter[community]': community.id,
    };

    const notifications =  [];

    if (pendingChangesUrl) {
      notifications.push({
        palette: 'yellow',
        content: (
          <>
            Pending changes<br />
            <Link to={pendingChangesUrl}>View edit history</Link>
          </>
        ),
      });
    }

    if (isOfDifferentOrg) {
      notifications.push({
        palette: 'primary',
        content: (
          <>
            This Family belongs to a different organization named <i>{community.organization?.name || 'Unknown'}</i>
          </>
        ),
      });
    }
    return (
      <DashboardWithSummaryPageTemplate activeMenuItem="Communities">
        <Top>
          <BreadCrumb items={breadCrumbItems} pad={null} />
        </Top>

        <Left>
          {(notifications.length || null) && (
            <LeftNotifications>
              {notifications.map(({ palette, content }) => (
                <BannerNotification
                  key={content}
                  palette={palette}
                >
                  {content}
                </BannerNotification>
              ))}
            </LeftNotifications>
          )}
          <DashboardCommunityNameAndStatus community={community} />
        </Left>

        <Right>
          <StyledTabs activeTab={currentTab}>
            {this.getTabsForUser()}
          </StyledTabs>

          <Section noPadding={currentTab === EDITS}>
            {currentTab === PROFILE && (
              <DashboardCommunityDetailsFormContainer
                notifyInfo={notifyInfo}
                notifyError={notifyError}
                community={community}
                currentEdit={currentEdit}
              />
            )}
            {currentTab === CARE_SERVICES && (
              <DashboardCommunityCareServicesFormContainer
                notifyInfo={notifyInfo}
                notifyError={notifyError}
                community={community}
                currentEdit={currentEdit}
              />
            )}
            {currentTab === PRICING && (
              <DashboardCommunityPricingFormContainer
                notifyInfo={notifyInfo}
                notifyError={notifyError}
                community={community}
                currentEdit={currentEdit}
              />
            )}
            {currentTab === PHOTOS && (
              <DashboardCommunityPhotosFormContainer
                showModal={showModal}
                hideModal={hideModal}
                notifyInfo={notifyInfo}
                notifyError={notifyError}
                community={community}
                currentEdit={currentEdit}
              />
            )}
            {currentTab === AMENITIES && (
              <DashboardCommunityAmenitiesFormContainer
                notifyInfo={notifyInfo}
                notifyError={notifyError}
                community={community}
                currentEdit={currentEdit}
              />
            )}
            {currentTab === SERVICES && (
              <DashboardCommunityServicesFormContainer
                notifyInfo={notifyInfo}
                notifyError={notifyError}
                community={community}
                currentEdit={currentEdit}
              />
            )}
            {currentTab === CONTACTS && (
              <DashboardContactsSectionContainer
                id="contacts"
                sectionFilters={sectionFilters}
                entityType={PROPERTY_ENTITY_TYPE}
                entityId={community.id}
                entityName={community.name}
              />
            )}
            {currentTab === CONTRACT && (
              <DashboardCommunityContractFormContainer
                notifyInfo={notifyInfo}
                notifyError={notifyError}
                community={community}
                currentEdit={currentEdit}
              />
            )}
            {currentTab === CLIENTS && (
              <DashboardAgentFamilyOverviewSectionContainer
                sectionFilters={clientsSectionFilters}
              />
            )}
            {currentTab === EDITS && (
              <DashboardCommunityEditsContainer
                notifyInfo={notifyInfo}
                notifyError={notifyError}
                community={community}
                currentEdit={currentEdit}
                suggestedEdits={suggestedEdits}
              />
            )}
          </Section>
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
