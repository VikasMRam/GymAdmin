import React from 'react';
import { Redirect } from 'react-router-dom';
import { useParams, useLocation } from 'react-router';

import CommunityDetailPage from './CommunityDetailPage';

import { usePrefetch } from 'sly/web/services/api';
import { getLastSegment, replaceLastSegment } from 'sly/web/services/helpers/url';
import { Image, Flex } from 'sly/common/system';
import { assetPath } from 'sly/web/components/themes';


const CommunityDetailPageContainer = () => {
  const { communitySlug } = useParams();
  const location = useLocation() || {};

  const {
    requestInfo: {
      normalized: community,
      status: communityStatus,
      headers: { location: communityLocation },
    },
  } = usePrefetch('getCommunity', {
    id: communitySlug,
    include: 'similar-communities,questions,agents',
  });

  if (communityStatus === 301) {
    const newSlug = getLastSegment(communityLocation);
    return <Redirect to={replaceLastSegment(location.pathname, newSlug)} />;
  }

  if (communityStatus === 404) {
    return <Redirect to={replaceLastSegment(location.pathname)} />;
  }

  if (!community || !location.pathname.includes(community.id)) {
    return (
      <Flex
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={assetPath('images/homebase/loader.svg')} />
      </Flex>);
  }

  // If request url does not match resource url from api, perform 302 redirect
  if (location.pathname !== community.url && location.pathname.includes(community.id)) {
    return <Redirect to={community.url} />;
  }

  return (
    <CommunityDetailPage
      community={community}
      location={location}
    />
  );
};

export default React.memo(CommunityDetailPageContainer, () => true);
