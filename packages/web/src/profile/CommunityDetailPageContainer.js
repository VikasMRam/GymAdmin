import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useLocation, useParams } from 'react-router';

import CommunityDetailPage from './CommunityDetailPage';

import events from 'sly/web/services/events';
import useCommunity from 'sly/web/profile/hooks/useCommunity';
import { getLastSegment, replaceLastSegment } from 'sly/web/services/helpers/url';
import { Image, Flex } from 'sly/common/system';
import { assetPath } from 'sly/web/components/themes';


const communitySizes = {
  'up to 20 Beds': 'small',
  '20 - 51 Beds': 'medium',
  '51 +': 'large',
};

const CommunityDetailPageContainer = () => {
  const location = useLocation() || {};
  const { communitySlug, toc } = useParams();

  const {
    community,
    communityStatus,
    communityLocation,
  } = useCommunity({ communitySlug });

  useEffect(() => {
    if (communityStatus === 200) {
      events.page('Community Profile', {
        slug: communitySlug,
        size: communitySizes[community.propInfo.communitySize],
        care: toc,
      });
    }
  }, [communitySlug]);

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

//export default React.memo(CommunityDetailPageContainer, () => true);
export default CommunityDetailPageContainer;

