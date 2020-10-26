import { useState, useEffect, useCallback } from 'react';
import useResizeObserver from 'use-resize-observer';
import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';

const LIST = 'list';
const MAP = 'map';

export default function SearchContainer () {
  // const [kitchens, setKitchens] = useState([]);
  const { ref: mapRef, width, height } = useResizeObserver();
  const breakpoint = useBreakpoint();

  const [show, setShow] = useState(LIST);
  // useEffect(() => {
  //   const Kitchen = data?.Kitchen;
  //   if (Kitchen) {
  //     setKitchens(Kitchen);
  //   }
  // }, [data?.Kitchen]);

  // check if we just have the placeId from the url but
  // no geocode yet or the current geocode is obsolete

  return (
    <Search
      currentSearch={currentSearch}
      kitchens={kitchens}
      totalCount={totalCount}
      mapQuery={mapQuery}
      mapRef={mapRef}
      orderBy={orderBy}
      pricePer={pricePer}
      onSearchSubmit={onSearchSubmit}
      onAvailabilityChange={onAvailabilityChange}
      onPricePerChange={setPricePer}
      onSortByChange={setSortBy}
      onMapChange={onMapChange}
    />
  );
}

KitchenSearchContainer.propTypes = {
  district: districtPropType,
};
