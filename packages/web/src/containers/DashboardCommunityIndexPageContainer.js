import React, { Component } from 'react';
import { object, func, arrayOf } from 'prop-types';
import { generatePath } from 'react-router';


import AddCommunityFormContainer from 'sly/web/containers/dashboard/AddCommunityFormContainer'
import withNotification from 'sly/web/controllers/withNotification';
import withModal from 'sly/web/controllers/withModal';
import SlyEvent from 'sly/web/services/helpers/events';
import {
  DASHBOARD_COMMUNITIES_DETAIL_PATH,
  PROFILE,
} from 'sly/web/constants/dashboardAppPaths';
import withDatatable from 'sly/web/services/datatable/components/withDatatable';
import { prefetch, withUser, withResourceBuffer } from 'sly/web/services/api';
import DashboardCommunityIndexPage from 'sly/web/components/pages/DashboardCommunityIndexPage';
import { getDetailedPaginationData } from 'sly/web/services/helpers/pagination';
import communityPropType from 'sly/common/propTypes/community';

@withDatatable('communities')
@withNotification
@withModal
@withUser
@prefetch('communities', 'getCommunities', (req, { datatable }) => {
  return req(datatable.query);
})
@withResourceBuffer('communities')

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
    const { status, location, datatable, notifyInfo, notifyError, buffer, ...props } = this.props;
    const { error, meta, hasFinished, normalized: communities } = buffer.communities;

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

