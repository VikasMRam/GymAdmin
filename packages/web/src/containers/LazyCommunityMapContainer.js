import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import loadable from '@loadable/component';

import { usePrefetch } from 'sly/web/services/api/prefetch';

const CommunityMap = loadable(() => import(/* webpackChunkName: "chunkCommunityMap" */ 'sly/web/components/organisms/CommunityMap'));

const LazyCommunityMapContainer = () => {
  const [mounted, setMounted] = useState(false);
  const placeholderRef = useRef();

  const { communitySlug } = useParams();

  const { requestInfo: { normalized: community } } = usePrefetch('getCommunity', {
    id: communitySlug,
    include: 'similar-communities,questions,agents',
  });

  useEffect(() => {
    if (placeholderRef.current) {
      const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMounted(true);
          }
        });
      }, {
        rootMargin: '0px 0px 500px 0px',
      });
      intersectionObserver.observe(placeholderRef.current);
      return () => intersectionObserver.disconnect();
    }
  }, [placeholderRef]);

  if (!community) return null;

  return mounted
    ? <CommunityMap community={community} similarCommunities={community.similarCommunities} />
    : <div ref={placeholderRef} />;
};

LazyCommunityMapContainer.typeHydrationId = 'LazyCommunityMapContainer';

export default LazyCommunityMapContainer;
