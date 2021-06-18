import React, { Component } from 'react';
import { object, func, arrayOf } from 'prop-types';
import { generatePath } from 'react-router';


import withNotification from 'sly/web/components/helpers/notification';
import withModal from 'sly/web/controllers/withModal';
import SlyEvent from 'sly/web/services/helpers/events';
import withDatatable from 'sly/web/services/datatable/components/withDatatable';
import { prefetch, withUser } from 'sly/web/services/api';
import { getDetailedPaginationData } from 'sly/web/services/helpers/pagination';
import listingPropType from 'sly/common/propTypes/listing';
import {
  DASHBOARD_LISTINGS_DETAIL_PATH,
  PROFILE,
} from 'sly/web/dashboard/dashboardAppPaths';
import AddListingFormContainer from 'sly/web/dashboard/listings/AddListingFormContainer';
import DashboardListingIndexPage from 'sly/web/dashboard/listings/DashboardListingIndexPage';

@withNotification
@withModal
@withUser
@withDatatable('listings')
@prefetch('listings', 'getListings', (req, { datatable }) => req(datatable.query))

export default class DashboardListingIndexPageContainer extends Component {
  static propTypes = {
    location: object,
    // listings: arrayOf(listingPropType), todo
    showModal: func.isRequired,
    hideModal: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    status: object,
    datatable: object,
    history: object,
  };

  onAddListingSuccess= (resp) => {
    const { history } = this.props;
    const { id } = resp;
    const path = generatePath(DASHBOARD_LISTINGS_DETAIL_PATH, { id, tab: PROFILE });
    history.push(path);
  };

  handleAddListing = () => {
    const {
      showModal,
      hideModal,
      notifyInfo,
      notifyError,
    } = this.props;

    const event = {
      category: 'DashboardLisitng',
      action: 'click',
      label: 'addListing',
    };

    SlyEvent.getInstance().sendEvent(event);

    showModal((
      <AddListingFormContainer
        notifyInfo={notifyInfo}
        notifyError={notifyError}
        onCancel={hideModal}
        onSuccess={this.onAddListingSuccess}
      />
    ), null, 'noPadding', false);
  };
  render() {
    console.log(this.props);
    const { status, location, datatable, notifyInfo, notifyError, ...props } = this.props;
    const { error, meta, hasFinished, normalized: listings } = status.listings;

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    return (
      <DashboardListingIndexPage
        {...props}
        isPageLoading={!hasFinished || !datatable.hasFinished}
        datatable={datatable}
        listings={listings || []}
        onAddListing={this.handleAddListing}
        meta={meta || {}}
        pagination={getDetailedPaginationData(status.listings, 'listings')}
      />
    );
  }
}

