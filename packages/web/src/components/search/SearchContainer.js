import React, { useState, useEffect, useCallback } from 'react';
import useResizeObserver from 'use-resize-observer';
import { useLocation, useRouteMatch } from 'react-router';

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
import careTypes from 'sly/web/constants/careTypes';
import { LIST } from 'sly/web/components/search/constants';
import useDimensions from 'sly/common/components/helpers/useDimensions';

export default function SearchContainer() {
  const location = useLocation();
  const match = useRouteMatch(`/nusearch/:toc(${careTypes.join('|')})/:state/:city`);
  // const [kitchens, setKitchens] = useState([]);
  const [headerRef, {
    height: headerHeight = 80,
  }] = useDimensions();

  const searchParams = getSearchParams(match, location);
  const { requestInfo } = usePrefetch(
    'communityList',
    'getSearchResources',
    request => request(searchParams),
  );

  // console.log({location, match})
  const onMapChange = useCallback(() => {
    console.log('map changed');
  }, []);

  const [show, setShow] = useState(LIST);
  const [clickedMarker, setClickedMarker] = useState(null);
console.log('clickedMarker', clickedMarker);
  let center = {
    lng: 0,
    lat: 0,
  };
  const defaultCenter = center;

  if (requestInfo.normalized && requestInfo.normalized.length) {
    center = {
      lng: requestInfo.normalized[0].longitude,
      lat: requestInfo.normalized[0].latitude,
    };
  }

  return (
    <>
      <TemplateHeader
        ref={headerRef}
        noBottomMargin
        css={{
          position: 'fixed',
          zIndex: 1000,
          width: '100%',
        }}
      >
        <HeaderContainer />
        <BannerNotificationAdContainer
          type="wizardSearch"
          {...searchParams}
        />
      </TemplateHeader>
      <Search
        headerHeight={headerHeight}
        show={show}
        setShow={setShow}
        setClickedMarker={setClickedMarker}
        selectedCommunity={clickedMarker}
        onMapChange={onMapChange}
        defaultCenter={defaultCenter}
        center={center}
        communities={requestInfo.normalized || []}
      />
      <Footer
        upToLaptop={{
          display: show === LIST ? 'block' : 'none',
        }}
      />
    </>
  );
}

