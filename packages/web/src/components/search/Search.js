import React, { useCallback, useMemo, useState, createRef } from 'react';
import { arrayOf, func, string, object, number } from 'prop-types';

import { getBoundsForSearchResults, findOptimalZoomForBounds } from './maps';
import ExploreContainer from './ExploreContainer';

import { getKey } from 'sly/common/components/themes';
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
import Link from 'sly/common/components/atoms/Link';
import CommunityTile from 'sly/web/components/organisms/CommunityTile';
import Filters from 'sly/web/components/search/Filters';
import { LIST, MAP, SHOW_OPTIONS } from 'sly/web/components/search/constants';
import { getBreadCrumbsForLocation } from 'sly/web/services/helpers/url';
import FilterButton from 'sly/web/components/search/Filters/FilterButton';
import { useBreakpoint } from 'sly/web/components/helpers/breakpoint';
import useDimensions from 'sly/common/components/helpers/useDimensions';
import Pagination from 'sly/web/components/molecules/Pagination';
import BreadCrumb from 'sly/web/components/molecules/BreadCrumb';

const mapRef = createRef();

const Search = ({
  currentFilters,
  center,
  defaultCenter,
  onFilterChange,
  onClearFilters,
  onMapChange,
  communities,
  current,
  total,
  start,
  end,
  count,
  basePath,
}) => {
  const breakpoint = useBreakpoint();

  const [headerRef, {
    height: headerHeight = 80,
  }] = useDimensions();

  const [filtersRef, {
    height: filtersHeight = 84,
  }] = useDimensions();

  const { upToLaptopOffset, startingWithLaptopOffset } = useMemo(() => ({
    upToLaptopOffset: filtersHeight + headerHeight,
    startingWithLaptopOffset: headerHeight,
  }), [filtersHeight, headerHeight]);

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
          onClearFilters={onClearFilters}
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
          upToTablet={{
            paddingBottom: getKey('sizes.spacing.xxLarge'),
          }}
          upToLaptop={{
            display: show === LIST ? 'block' : 'none',
          }}
        >
          {communities.map((community, i) => (
            <Link
              to={community.url}
              event={{
                category: 'SearchPage',
                action: 'communityClick',
                label: i,
                value: community.id,
              }}
              block
            >
              <CommunityTile
                key={community.id}
                noGallery
                community={community}
                margin="0 xLarge xLarge"
                layout="column"
              />
            </Link>
          ))}
        </Block>
        {show === LIST && (
          <section>
            <Block
              display="flex"
              direction="column"
              alignItems="center"
              padding="xLarge 0"
              upToTablet={{
                paddingBottom: getKey('sizes.spacing.xxLarge'),
              }}
            >
              {communities.length > 0 &&
                <Pagination
                  basePath={basePath}
                  pageParam="page-number"
                  current={current}
                  total={total}
                  collapsedInMobile
                  css={{
                    marginBottom: getKey('sizes.spacing.large'),
                  }}
                />}
              <Block
                pad="xLarge"
                upToTablet={{
                  display: 'none',
                }}
              >
                {start} - {end} of {count} results
              </Block>
              <BreadCrumb
                items={getBreadCrumbsForLocation(currentFilters, true)}
                upToTablet={{
                  display: 'none!important',
                }}
              />
            </Block>
            <ExploreContainer filters={currentFilters} />
          </section>
        )}
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
  onFilterChange: func,
  onClearFilters: func,
  communities: arrayOf(coordPropType),
  onMapChange: func,
  selectedCommunity: coordPropType,
  currentFilters: object,
  current: number,
  total: number,
  start: number,
  end: number,
  count: number,
  basePath: string,
};

export default Search;
