import React from 'react';

import Heading from 'sly/components/atoms/Heading';
import communityPropType from 'sly/propTypes/community';

const DashboardCommunityNameAndStatus = ({ community }) => {
  return (
    <div>
      <Heading>{community.name}</Heading>
    </div>
  );
};

DashboardCommunityNameAndStatus.propTypes = {
  community: communityPropType,
};

export default DashboardCommunityNameAndStatus;
