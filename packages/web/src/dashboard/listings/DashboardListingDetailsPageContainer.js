import React, { Component } from 'react';
import { object, arrayOf, func } from 'prop-types';
import { Redirect, generatePath } from 'react-router';

import DashboardListingDetailsPage from 'sly/web/dashboard/listings/DashboardListingDetailsPage';
import { prefetch, withUser } from 'sly/web/services/api';
import userPropType from 'sly/common/propTypes/user';
import listingPropType from 'sly/common/propTypes/listing';
import {
  DASHBOARD_LISTINGS_DETAIL_PATH,
  SUMMARY,
  PROFILE,
} from 'sly/web/dashboard/dashboardAppPaths';
import withBreakpoint from 'sly/web/components/helpers/breakpoint';
import withNotification from 'sly/web/components/helpers/notification';
import withModal from 'sly/web/controllers/withModal';

const activityPath = id => generatePath(DASHBOARD_LISTINGS_DETAIL_PATH, {
  id,
  tab: PROFILE,
});

@withNotification
@withModal
@withUser
@withBreakpoint
@prefetch('listing', 'getListing', (req, { match }) => req({
  id: match.params.id,
}))

export default class DashboardListingDetailsPageContainer extends Component {
  static propTypes = {
    user: userPropType,
    listing: listingPropType,
    listings: arrayOf(listingPropType),
    match: object,
    location: object,
    status: object,
    history: object,
    breakpoint: object,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    showModal: func.isRequired,
    hideModal: func.isRequired,
  };

  render() {
    const {
      onRejectSuccess, onAddNote, onEditNote,
    } = this;

    const {
      listing,
      match,
      status,
      user,
      breakpoint,
      notifyError,
      notifyInfo,
      hideModal,
      showModal,
    } = this.props;

    if (!user) {
      return null;
    }

    const currentTab = match.params.tab || SUMMARY;
    if (breakpoint && listing && currentTab === SUMMARY && breakpoint.atLeastLaptop()) {
      return <Redirect to={activityPath(listing.id)} />;
    }


    const { hasFinished: listingHasFinished } = status.listing;
    // since it's using conditional prefetch, in initial stage communities key won't be there
    return (
      <DashboardListingDetailsPage
        match={match}
        notifyError={notifyError}
        notifyInfo={notifyInfo}
        listing={listing}
        currentTab={match.params.tab || SUMMARY}
        showModal={showModal}
        hideModal={hideModal}
        onRejectSuccess={() => onRejectSuccess(hideModal)}
        onAddNote={onAddNote}
        onEditNote={onEditNote}
        listingIsLoading={!listingHasFinished}
        user={user}
      />
    );
  }
}
