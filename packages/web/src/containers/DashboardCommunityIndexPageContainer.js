import React, { Component } from 'react';
import { parse } from 'query-string';
import { object, func } from 'prop-types';
import { withRouter, generatePath } from 'react-router';


import DashboardCommunityIndexPage from 'sly/web/components/pages/DashboardCommunityIndexPage';
import AddCommunityFormContainer from 'sly/web/containers/dashboard/AddCommunityFormContainer'
import withNotification from 'sly/web/controllers/withNotification';
import withModal from 'sly/web/controllers/withModal';
import SlyEvent from 'sly/web/services/helpers/events';
import {
  DASHBOARD_COMMUNITIES_DETAIL_PATH,
  PROFILE,
} from 'sly/web/constants/dashboardAppPaths';

@withNotification
@withModal
@withRouter

export default class DashboardCommunityIndexPageContainer extends Component {
  static propTypes = {
    location: object,
    showModal: func.isRequired,
    hideModal: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    history: object,
  };

  onAddCommunitySuccess= (resp) => {
    const { history } = this.props;
    const { id } = resp;
    const path = generatePath(DASHBOARD_COMMUNITIES_DETAIL_PATH, { id: id, tab: PROFILE });
    history.push(path);

  };

  handleAddCommunity = () => {
    const {
      showModal,
      hideModal,
      notifyInfo,
      notifyError,
    } = this.props;

    const event = {
      category: 'DashboardCommunity',
      action: 'click',
      label: 'addCommunity',
    };
    SlyEvent.getInstance().sendEvent(event);
    showModal((
      <AddCommunityFormContainer
        notifyInfo={notifyInfo}
        notifyError={notifyError}
        onCancel={hideModal}
        onSuccess={this.onAddCommunitySuccess}
      />
    ), null, 'noPadding', false);
  };
  render() {
    const { location } = this.props;
    const { 'page-number': pageNumber, ...filters } = parse(location.search);
    const sectionFilters = {
      'page-number': pageNumber,
    };
    return (
      <DashboardCommunityIndexPage
        sectionFilters={sectionFilters}
        filters={filters}
        onAddCommunity={this.handleAddCommunity}>
      </DashboardCommunityIndexPage>);
  }


};

