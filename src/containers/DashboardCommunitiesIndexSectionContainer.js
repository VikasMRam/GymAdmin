import React, { Component } from 'react';
import { arrayOf, object, func } from 'prop-types';
import { withRouter } from 'react-router';

import { prefetch, withUser } from 'sly/services/newApi';
import communityPropType from 'sly/propTypes/community';
import DashboardCommunitiesIndexSection from 'sly/components/organisms/DashboardCommunitiesIndexSection';
import withNotification from 'sly/controllers/withNotification';
import { getDetailedPaginationData } from 'sly/services/helpers/pagination';

@withRouter
@withUser
@withNotification
@prefetch('communities', 'getCommunities', (req, { datatable }) => {
  return req(datatable.query);
})

export default class DashboardCommunitiesIndexSectionContainer extends Component {
  static propTypes = {
    communities: arrayOf(communityPropType),
    status: object,
    history: object,
    datatable: object,
    match: object,
    location: object,
    notifyError: func,
    notifyInfo: func,
  };

  refetchCommunities = () => {
    const { status } = this.props;
    status.communities.refetch();
  };

  render() {
    const { communities, status, match, location, datatable, notifyInfo, notifyError, ...props } = this.props;
    const { error, hasFinished } = status.communities;

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    return (
      <DashboardCommunitiesIndexSection
        {...props}
        isPageLoading={!hasFinished || !datatable.hasFinished}
        datatable={datatable}
        communities={communities}
        pagination={getDetailedPaginationData(status.communities, 'communities')}
      />
    );
  }
}
