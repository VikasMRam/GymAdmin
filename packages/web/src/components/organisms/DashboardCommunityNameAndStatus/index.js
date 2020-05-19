import React from 'react';

import Heading from 'sly/web/components/atoms/Heading';
import communityPropType from 'sly/web/propTypes/community';

const DashboardCommunityNameAndStatus = ({ community }) => {
  return (
    <Heading>{community.name}</Heading>
  );
};

DashboardCommunityNameAndStatus.propTypes = {
  community: communityPropType,
};

export default DashboardCommunityNameAndStatus;
