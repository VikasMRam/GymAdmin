import React, { Component, Fragment } from 'react';
import { func, arrayOf } from 'prop-types';
import { adminCommunityPropType } from 'sly/propTypes/community';
import { Box } from 'sly/components/atoms';
import DashboardCommunityAgentSearchBox from 'sly/components/organisms/DashboardCommunityAgentSearchBox';

import DashboardAdminReferralCommunityTile from 'sly/components/organisms/DashboardAdminReferralCommunityTile';

export default class DashboardCommunityReferrals extends Component {
  static propTypes = {
    handleCommunitySearch: func.isRequired,
    sendReferral: func.isRequired,
    communities: arrayOf(adminCommunityPropType),

  };

  render() {
    const { handleCommunitySearch, communities, sendReferral } = this.props;
    console.log('Seeing communities',communities);
    const commList = (communities || []).map((e, idx) => <Box key={e.name}><DashboardAdminReferralCommunityTile community={e} sendReferral={sendReferral} /></Box>);
    return (
      <Fragment>
        <DashboardCommunityAgentSearchBox handleSubmit={handleCommunitySearch} />
        {communities && communities.length > 0 && commList
        }
      </Fragment>
    );
  }
}
