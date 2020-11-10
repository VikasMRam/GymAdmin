import React, { useCallback, useMemo, createRef } from 'react';
import { arrayOf, func, string } from 'prop-types';

import { getBoundsForSearchResults, findOptimalZoomForBounds } from './maps';

import Map from 'sly/web/components/search/Map';
import coordPropType from 'sly/common/propTypes/coordPropType';
import Block from 'sly/common/components/atoms/Block';
import CommunityTile from 'sly/web/components/organisms/CommunityTile';
import Filters from 'sly/web/components/search/Filters';
import { LIST, MAP, SHOW_OPTIONS } from 'sly/web/components/search/constants';
import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';
import useDimensions from 'sly/common/components/helpers/useDimensions';

const mapRef = createRef();

const Search = ({
  show,
  setShow,
  setClickedMarker,
  center,
  defaultCenter,
  onMapChange,
  communities,
  headerHeight,
  selectedCommunity,
}) => {
  const breakpoint = useBreakpoint();

  const nextShow = useMemo(() => {
    const showOptions = Object.keys(SHOW_OPTIONS);
    const current = showOptions.indexOf(show);
    return showOptions[Number(!current)];
  }, [show]);

  const toggleShow = useCallback(() => {
    setShow(nextShow);
  }, [nextShow]);

  const [filtersRef, {
    height: filtersHeight = 84,
  }] = useDimensions();

  console.log({ headerHeight, filtersHeight });
  const { upToLaptopOffset, startingWithLaptopOffset } = useMemo(() => ({
    upToLaptopOffset: filtersHeight + headerHeight,
    startingWithLaptopOffset: headerHeight,
  }), [filtersHeight, headerHeight]);

  const onMarkerClick = (key) => {
    setClickedMarker(key);
  };

  let zoom = 1;
  if (communities.length && mapRef.current) {
    const bounds = getBoundsForSearchResults(communities);
    zoom = findOptimalZoomForBounds(bounds, { width: mapRef.current.clientWidth, height: mapRef.current.clientHeight });
  }

  return (
    <Block
      flexDirection="column"
      css={{
        paddingTop: headerHeight,
      }}
      upToLaptop={{
        display: 'flex',
      }}
      startingWithLaptop={{
        display: 'grid',
        gridTemplateRows: 'auto auto',
        gridTemplateColumns: '684px auto',
        gridTemplateAreas: '"filters map" "list  map"',
      }}
    >
      <Filters
        ref={filtersRef}
        gridArea="filters"
        padding="xLarge"
        nextShow={nextShow}
        toggleShow={toggleShow}
      />
      <Block
        gridArea="list"
        padding="0 xLarge"
        upToLaptop={{
          display: show === LIST ? 'block' : 'none',
        }}
      >
        {communities.map(community => (
          <CommunityTile
            key={community.id}
            noGallery
            community={community}
            marginBottom="xLarge"
            layout="column"
          />
        ))}
      </Block>
      <Block
        gridArea="map"
      >
        <Map
          ref={mapRef}
          defaultCenter={defaultCenter}
          center={center}
          communities={communities}
          zoom={zoom}
          onChange={onMapChange}
          onMarkerClick={onMarkerClick}
          selectedCommunity={selectedCommunity}
          width="100%"
          upToLaptop={{
            display: show === MAP ? 'block' : 'none',
            paddingTop: `${upToLaptopOffset}px`,
            marginTop: `-${upToLaptopOffset}px`,
            height: '100vh',
          }}
          startingWithLaptop={{
            position: 'sticky',
            top: '0px !important',
            // bottom: '100vh !important',
            paddingTop: `${startingWithLaptopOffset}px`,
            marginTop: `-${startingWithLaptopOffset}px`,
            height: '100vh',
          }}
        />
      </Block>
    </Block>
  );
};

Search.propTypes = {
  show: string,
  setShow: func,
  setClickedMarker: func,
  center: coordPropType,
  defaultCenter: coordPropType,
  onSearchSubmit: func,
  communities: arrayOf(coordPropType),
  onMapChange: func,
  selectedCommunity: coordPropType,
};

export default Search;
