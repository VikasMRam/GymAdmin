import React, { Fragment } from 'react';
import { func, arrayOf } from 'prop-types';

import { adminCommunityPropType } from 'sly/propTypes/community';
import DashboardCommunityAgentSearchBox from 'sly/components/organisms/DashboardCommunityAgentSearchBox';
import DashboardAdminReferralCommunityTile from 'sly/components/organisms/DashboardAdminReferralCommunityTile';

const DashboardCommunityReferralSearch = ({ communities, handleCommunitySearch }) => {
  console.log('Seeing communities', communities);
  // const commList = communities.map(e => <DashboardAdminReferralCommunityTile key={e.name} community={e} />);
  return (
    <Fragment>
      <DashboardCommunityAgentSearchBox handleSubmit={handleCommunitySearch} />
      {communities && communities.length > 0 && <div>commList</div>
      }
    </Fragment>
  );
};

DashboardCommunityReferralSearch.propTypes = {
  handleCommunitySearch: func.isRequired,
  sendReferral: func.isRequired,
  handleSubmit: func,
  communities: arrayOf(adminCommunityPropType),
};

export default DashboardCommunityReferralSearch;
