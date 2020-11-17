import React, { useCallback, useMemo, useState, createRef } from 'react';
import { arrayOf, func, string, object } from 'prop-types';

import { getBoundsForSearchResults, findOptimalZoomForBounds } from './maps';
import ExploreContainer from './ExploreContainer';

import {
  TemplateHeader,
} from 'sly/web/components/templates/BasePageTemplate';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import BannerNotificationAdContainer
  from 'sly/web/containers/BannerNotificationAdContainer';
import Footer from 'sly/web/components/organisms/Footer';
import Map from 'sly/web/components/search/Map';
import coordPropType from 'sly/common/propTypes/coordPropType';
import Block from 'sly/common/components/atoms/Block';
import Icon from 'sly/common/components/atoms/Icon';
import CommunityTile from 'sly/web/components/organisms/CommunityTile';
import Filters from 'sly/web/components/search/Filters';
import { LIST, MAP, SHOW_OPTIONS } from 'sly/web/components/search/constants';
import FilterButton from 'sly/web/components/search/Filters/FilterButton';
import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';
import useDimensions from 'sly/common/components/helpers/useDimensions';

const mapRef = createRef();

const Search = ({
  currentFilters,
  center,
  defaultCenter,
  onFilterChange,
  onMapChange,
  communities,
}) => {
  const breakpoint = useBreakpoint();

  const [headerRef, {
    height: headerHeight = 80,
  }] = useDimensions();

  const [show, setShow] = useState(LIST);
  const [selectedCommunity, setSelectedCommunity] = useState(null);

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

  const { upToLaptopOffset, startingWithLaptopOffset } = useMemo(() => ({
    upToLaptopOffset: filtersHeight + headerHeight,
    startingWithLaptopOffset: headerHeight,
  }), [filtersHeight, headerHeight]);

  const onMarkerClick = (key) => {
    setSelectedCommunity(key);
  };

  let zoom = 1;
  let mapWidth;
  let mapHeight;
  if (communities.length && mapRef.current) {
    const bounds = getBoundsForSearchResults(communities);
    zoom = findOptimalZoomForBounds(bounds, { width: mapRef.current.clientWidth, height: mapRef.current.clientHeight });
    mapWidth = mapRef.current.clientWidth;
    mapHeight = mapRef.current.clientHeight;
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
          { /*<BannerNotificationAdContainer
          type="wizardSearch"
          {...currentFilters}
        /> */}
      </TemplateHeader>

      {/* SEARCH */}
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
          currentFilters={currentFilters}
          onFilterChange={onFilterChange}
        >
          <FilterButton
            upTo="laptop"
            marginLeft="auto"
            onClick={toggleShow}
          >
            <Icon icon={nextShow} />&nbsp;{SHOW_OPTIONS[nextShow]}
          </FilterButton>
        </Filters>
        <Block
          gridArea="list"
          padding="0 xLarge"
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
        {show === LIST && <ExploreContainer gridArea="explore" filters={currentFilters} />}
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
            mapDimensions={{
              width: mapWidth,
              height: mapHeight,
            }}
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
            fixCommunityTileAtBottom={show !== LIST}
          />
        </Block>
      </Block>
      {/* SEARCH_END */}
      <Footer
        upToLaptop={{
          display: show === LIST ? 'block' : 'none',
        }}
      />
    </>
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
  currentFilters: object,
};

export default Search;
