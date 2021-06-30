import React, { useState, useEffect, useRef } from 'react';
import loadable from '@loadable/component';


const CommunityMap = loadable(() => import(/* webpackChunkName: "chunkCommunityMap" */ 'sly/web/components/organisms/CommunityMap'));

const LazyListingMapContainer = (props) => {
  const [mounted, setMounted] = useState(false);
  const placeholderRef = useRef();
  const { listing } = props;


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

  return mounted
    ? <CommunityMap community={listing} similarProperties={listing.similarProperties || []} />
    : <div ref={placeholderRef} />;
};

// LazyCommunityMapContainer.typeHydrationId = 'LazyCommunityMapContainer';

export default LazyListingMapContainer;
