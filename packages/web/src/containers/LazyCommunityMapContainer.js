import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import loadable from '@loadable/component';

import { usePrefetch } from 'sly/web/services/api/prefetch';

const CommunityMap = loadable(() => import(/* webpackChunkName: "chunkCommunityMap" */ 'sly/web/components/organisms/CommunityMap'));

const LazyCommunityMapContainer = () => {
  const [mounted, setMounted] = useState(false);

  const { communitySlug } = useParams();

  const { requestInfo: { normalized: community } } = usePrefetch('getCommunity', {
    id: communitySlug,
    include: 'similar-communities,questions,agents',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted
    ? <CommunityMap community={community} similarProperties={community.similarProperties} />
    : <div />;
};

LazyCommunityMapContainer.typeHydrationId = 'LazyCommunityMapContainer';

export default LazyCommunityMapContainer;
