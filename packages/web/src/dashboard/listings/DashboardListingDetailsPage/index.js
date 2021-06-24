import React from 'react';
import { string, func, object, arrayOf, bool } from 'prop-types';
import { generatePath } from 'react-router';


import {
  DASHBOARD_LISTINGS_PATH,
  DASHBOARD_LISTINGS_DETAIL_PATH,
  SUMMARY,
  PROFILE,
  PHOTOS,
  DASHBOARD_LISTINGS_DETAIL_EDIT_PATH,
  ADDITIONAL_INFO,
} from 'sly/web/dashboard/dashboardAppPaths';
import { PLATFORM_ADMIN_ROLE } from 'sly/common/constants/roles';
import listingPropType from 'sly/common/propTypes/listing';
import userPropType from 'sly/common/propTypes/user';
import { clickEventHandler } from 'sly/web/services/helpers/eventHandlers';
import { userIs } from 'sly/web/services/helpers/role';
import Tabs from 'sly/web/components/molecules/Tabs';
import Tab, { MobileTab } from 'sly/web/components/molecules/Tab';
import BannerNotification from 'sly/web/components/molecules/BannerNotification';
import {
  Top,
  Right,
  Left,
  DashboardWithSummaryPageTemplate, LeftNotifications, Loading,
} from 'sly/web/dashboard/DashboardWithSummaryTemplate';
import DashboardListingDetailsFormContainer from 'sly/web/dashboard/listings/DashboardListingDetailsFormContainer';
import DashboardListingPhotosFormContainer from 'sly/web/dashboard/listings/DashboardListingPhotosFormContainer';
import DashboardListingAdditionalInfoFormContainer from 'sly/web/dashboard/listings/DashboardListingAdditionalInfoFormContainer';
import DashboardListingSummary from 'sly/web/dashboard/listings/DashboardListingSummary';
import { Link } from 'sly/web/components/atoms';
import BreadCrumb from 'sly/web/components/molecules/BreadCrumb';


const DashboardListingDetailsPage = ({
  listing,
  currentEdit,
  currentTab,
  listingIsLoading,
  user,
  notifyInfo,
  notifyError,
  showModal,
  hideModal,
}) => {
  const getTabsForUser = () => {
    const { roleID } = user;
    const { id } = listing;

    const tabs = {
      Profile: PROFILE,
      Photos: PHOTOS,
      'Additional Information': ADDITIONAL_INFO,
      // ...
    };

    const pathFor = tab => generatePath(DASHBOARD_LISTINGS_DETAIL_PATH, { id, tab });
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

  if (listingIsLoading) {
    return (
      <Loading activeMenuItem="Listings">
        Loading...
      </Loading>
    );
  }

  const backLink = {
    path: generatePath(DASHBOARD_LISTINGS_PATH),
    label: 'Back to listings',
    event: {
      category: 'fdetails',
      label: 'Back to Communities',
      action: 'click',
    },
  };

  if (!listing) {
    return (
      <Loading activeMenuItem="Communities" backLink={backLink}>
        Listing not found!
      </Loading>
    );
  }

  const breadCrumbItems = [
    { ...backLink, label: 'Listings' },
    {
      label: listing.name,
    },
  ];

  const userIsAdmin = userIs(user, PLATFORM_ADMIN_ROLE);
  const listingOrgId = listing.organization?.id;
  const userOrgId = user.organization?.id;
  const isOfDifferentOrg = !userIsAdmin && (userOrgId !== listingOrgId);

  const pendingChangesUrl = currentEdit?.isPending && generatePath(DASHBOARD_LISTINGS_DETAIL_EDIT_PATH, { id: listing.id, editId: currentEdit.id });


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
          This Family belongs to a different organization named <i>{listing.organization?.name || 'Unknown'}</i>
        </>
      ),
    });
  }

  const headerActions = listing.url && <Link to={listing.url}>View profile</Link>;

  return (

    <DashboardWithSummaryPageTemplate activeMenuItem="Communities">
      <Top>
        <BreadCrumb items={breadCrumbItems} />
      </Top>

      <Left heading={listing.name} actions={headerActions}>
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
      </Left>

      <Right>
        <Tabs activeTab={currentTab}>
          {getTabsForUser()}
        </Tabs>

        {currentTab === PROFILE && (
        <DashboardListingDetailsFormContainer
          notifyInfo={notifyInfo}
          notifyError={notifyError}
          listing={listing}
          currentEdit={currentEdit}
        />
      )}
        {currentTab === PHOTOS && (
        <DashboardListingPhotosFormContainer
          showModal={showModal}
          hideModal={hideModal}
          notifyInfo={notifyInfo}
          notifyError={notifyError}
          listing={listing}
          currentEdit={currentEdit}
        />
      )}
        {currentTab === ADDITIONAL_INFO && (
        <DashboardListingAdditionalInfoFormContainer
          notifyInfo={notifyInfo}
          notifyError={notifyError}
          listing={listing}
          currentEdit={currentEdit}
        />
      )}
      </Right>
      <DashboardListingSummary
        className={currentTab === SUMMARY ? 'selected' : ''}
        listing={listing}
      />
    </DashboardWithSummaryPageTemplate>
  );
};

DashboardListingDetailsPage.propTypes = {
  listing: listingPropType,
  currentTab: string,
  showModal: func,
  hideModal: func,
  notifyError: func,
  notifyInfo: func,
  listingIsLoading: bool,
  currentEdit: object,
  suggestedEdits: arrayOf(object),
  user: userPropType,
};

export default DashboardListingDetailsPage;
