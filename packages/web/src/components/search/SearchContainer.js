import React, { useState, useEffect, useCallback } from 'react';
import useResizeObserver from 'use-resize-observer';

import { usePrefetch } from 'sly/web/services/api/prefetch';
import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';
import Search from 'sly/web/components/search/Search';
import { getSearchParams } from 'sly/web/services/helpers/search';
import {
  TemplateHeader,
} from 'sly/web/components/templates/BasePageTemplate';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import BannerNotificationAdContainer
  from 'sly/web/containers/BannerNotificationAdContainer';
import Footer from 'sly/web/components/organisms/Footer';
import { LIST, SHOW_OPTIONS } from 'sly/web/components/search/constants';

export default function SearchContainer({ location, match }) {
  // const [kitchens, setKitchens] = useState([]);
  const { ref: mapRef, width, height } = useResizeObserver();
  const breakpoint = useBreakpoint();

  const searchParams = getSearchParams(match, location);
  const { requestInfo } = usePrefetch(
    'communityList',
    'getSearchResources',
    request => request(searchParams),
  );

  const [show, setShow] = useState(LIST);

  const toggleShow = useCallback(() => {
    const showOptions = Object.keys(SHOW_OPTIONS);
    const current = showOptions.indexOf(show);
    const next = Number(!current);
    setShow(next);
  }, [show]);

  // console.log({location, match})
  const onMapChange = useCallback(() => {
    console.log('map changed');
  }, []);


  const center = {
    lng: 0,
    lat: 0,
  };
  const defaultCenter = center;

  const zoom = 3;
  // check if we just have the placeId from the url but
  // no geocode yet or the current geocode is obsolete

  return (
    <>
      <TemplateHeader noBottomMargin>
        <HeaderContainer />
        <BannerNotificationAdContainer
          type="wizardSearch"
          {...searchParams}
        />
      </TemplateHeader>
      <Search
        show={show}
        toggleShow={toggleShow}
        mapRef={mapRef}
        onMapChange={onMapChange}
        defaultCenter={defaultCenter}
        center={center}
        communities={requestInfo.normalized || []}
        zoom={zoom}
      />
      <Footer />
    </>
  );
}

