import React, { Component } from 'react';
import { object, func, arrayOf } from 'prop-types';
import { generatePath } from 'react-router';


import withNotification from 'sly/web/components/helpers/notification';
import withModal from 'sly/web/controllers/withModal';
import SlyEvent from 'sly/web/services/helpers/events';
import withDatatable from 'sly/web/services/datatable/components/withDatatable';
import { prefetch, withUser } from 'sly/web/services/api';
import { getDetailedPaginationData } from 'sly/web/services/helpers/pagination';
import communityPropType from 'sly/common/propTypes/community';

import {
  DASHBOARD_COMMUNITIES_DETAIL_PATH,
  PROFILE,
} from 'sly/web/dashboard/dashboardAppPaths';
import AddCommunityFormContainer from 'sly/web/dashboard/communities/AddCommunityFormContainer'
import DashboardCommunityIndexPage from 'sly/web/dashboard/communities/DashboardCommunityIndexPage';

@withNotification
@withModal
@withUser
@withDatatable('communities')
@prefetch('communities', 'getCommunities', (req, { datatable }) => req(datatable.query))

export default class DashboardCommunityIndexPageContainer extends Component {
  static propTypes = {
    location: object,
    communities: arrayOf(communityPropType),
    showModal: func.isRequired,
    hideModal: func.isRequired,
    notifyInfo: func.isRequired,
    notifyError: func.isRequired,
    status: object,
    datatable: object,
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
    const { status, location, datatable, notifyInfo, notifyError, ...props } = this.props;
    const { error, meta, hasFinished, normalized: communities } = status.communities;

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    return (
      <DashboardCommunityIndexPage
        {...props}
        isPageLoading={!hasFinished || !datatable.hasFinished}
        datatable={datatable}
        communities={communities || []}
        onAddCommunity={this.handleAddCommunity}
        meta={meta || {}}
        pagination={getDetailedPaginationData(status.communities, 'communities')}
      />
    );
  }
};

