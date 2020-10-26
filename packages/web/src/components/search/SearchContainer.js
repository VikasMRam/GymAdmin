import React, { useState, useEffect, useCallback } from 'react';
import useResizeObserver from 'use-resize-observer';
import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';
import Search from 'sly/web/components/search/Search';
import Map from 'sly/web/components/search/Map';

const LIST = 'list';
const MAP = 'map';

export default function SearchContainer () {
  // const [kitchens, setKitchens] = useState([]);
  const { ref: mapRef, width, height } = useResizeObserver();
  const breakpoint = useBreakpoint();

  const [show, setShow] = useState(LIST);

  const onMapChange = useCallback(() => {
    console.log('map changed');
  }, []);

  const center = {
    lng: 0,
    lat: 0,
  };

  const defaultCenter = center;

  const markers = [];

  const zoom = 3;
  // check if we just have the placeId from the url but
  // no geocode yet or the current geocode is obsolete

  return (
    <Search
      mapRef={mapRef}
      onMapChange={onMapChange}
      defaultCenter={defaultCenter}
      center={center}
      markers={markers}
      zoom={zoom}
    />
  );
}

