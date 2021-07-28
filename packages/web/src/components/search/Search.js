import React, { Fragment, memo, useCallback, useMemo, useState } from 'react';
import { arrayOf, func, object, bool } from 'prop-types';

import ExploreContainer from './ExploreContainer';

import { getHelmetForSearchPage } from 'sly/web/services/helpers/html_headers';
import {
  TemplateHeader,
} from 'sly/web/components/templates/BasePageTemplate';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import Footer from 'sly/web/components/organisms/Footer';
import { Block, Link, Heading, space, sx } from 'sly/common/system';
import Map from 'sly/web/components/search/Map';
import coordPropType from 'sly/common/propTypes/coordPropType';
import Icon from 'sly/common/components/atoms/Icon';
import Filters, { DEFAULT_PAGE_SIZE } from 'sly/web/components/search/Filters';
import { LIST, MAP, SHOW_OPTIONS } from 'sly/web/components/search/constants';
import FilterButton from 'sly/web/components/search/Filters/FilterButton';
import useDimensions from 'sly/common/components/helpers/useDimensions';
import SearchPagination from 'sly/web/components/search/SearchPagination';
import { getTocSeoLabel, getLocationLabel } from 'sly/web/components/search/helpers';
import { titleize } from 'sly/web/services/helpers/strings';
import { shouldShowZillowSearchAd } from 'sly/web/services/helpers/adtiles';
import GetAssessmentBoxContainer from 'sly/web/containers/GetAssessmentBoxContainer';
import SearchResultsAdTileContainer from 'sly/web/containers/SearchResultsAdTileContainer';
import { ASSESSMENT_WIZARD_MATCHED_AGENT, ASSESSMENT_WIZARD_COMPLETED }
  from 'sly/web/assessment/constants';
import { isBrowser } from 'sly/web/config';
import ListEntityTile from 'sly/web/components/search/ListEntityTile';
import { getStateAbbr, isInternationalPath, isCanadaPath } from 'sly/web/services/helpers/url';

const Search = ({
  currentFilters,
  onFilterChange,
  onClearFilters,
  entities,
  meta,
  pagination,
  location,
  hasFinished,
}) => {
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
  const [hoveredCommunity, setHoveredCommunity] = useState(null);
  const [markerHover, setMarkerHover] = useState(null);

  const listSize = meta['filtered-count'];

  const nextShow = useMemo(() => {
    const showOptions = Object.keys(SHOW_OPTIONS);
    const current = showOptions.indexOf(show);
    return showOptions[Number(!current)];
  }, [show]);

  const toggleShow = useCallback(() => {
    setShow(nextShow);
  }, [nextShow]);

  const page = meta['page-number'] || 0;
  const cursor = (DEFAULT_PAGE_SIZE * page) + 1;
  const { city, state } = currentFilters;
  const stateStr = getStateAbbr(titleize(state));
  const locLabel = getLocationLabel(currentFilters);
  const tocLabel = getTocSeoLabel(currentFilters.toc);
  const locationStr = city ? `${titleize(city)}, ${stateStr}` : `${stateStr}`;
  const title = `${tocLabel} in ${locationStr}`;
  const showZillowSearchAd = (!!pagination && pagination?.current === 0) && shouldShowZillowSearchAd(currentFilters.toc);
  const isInternational = isInternationalPath(location.pathname);
  const isCanada = isCanadaPath(location.pathname);

  return (
    <>
      {getHelmetForSearchPage({
        ...currentFilters, url: location, communityList: entities, listSize,
      })}
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
        {/* <BannerNotificationAdContainer
            type="wizardSearch"
            {...currentFilters}
          /> */}
      </TemplateHeader>

      {/* SEARCH */}
      <Block
        flexDirection="column"
        display="flex"
        paddingTop={headerHeight}
        sx$laptop={{
          display: 'grid',
          gridTemplateRows: 'auto auto auto auto',
          gridTemplateColumns: 'minmax(0,820px) minmax(38vw,1fr)',
          gridTemplateAreas: '"heading map" "filters map" "noresults map" "list  map"',
        }}
      >
        <Block
          gridArea="heading"
          paddingTop={show === LIST ? 's' : '0'}
          paddingX="l"
          sx$tablet={{
            paddingTop: show === LIST ? 'l' : '0',
          }}
          css={{
            zIndex: '100',
          }}
        >

          {!!listSize &&
            <Block
              marginBottom="xs"
              display={show === LIST ? 'block' : 'none'}
              sx$laptop={{
                display: 'block',
              }}
            >
              {listSize} results
            </Block>
          }
          <Block
            display={show === LIST ? 'block' : 'none'}
            sx$laptop={{
              display: 'block',
            }}
          >
            <Heading pad="xs" font="title-xl">{title}</Heading>
          </Block>

        </Block>
        <Filters
          ref={filtersRef}
          currentFilters={currentFilters}
          onFilterChange={onFilterChange}
          onClearFilters={onClearFilters}
          showTOC={!isInternational || isCanada}
        >

          <FilterButton
            display="flex"
            sx$laptop={{
                display: 'none',
              }}
            marginLeft="auto"
            onClick={toggleShow}
          >
            <Icon icon={nextShow} />&nbsp;{SHOW_OPTIONS[nextShow]}
          </FilterButton>
        </Filters>
        {(hasFinished && !listSize) &&
        <Block
          gridArea="noresults"
          marginTop="m"
          padding="l"
          sx={{
            zIndex: '50',
          }}
        >
          <Heading font="title-s-azo" pad="xs">No results</Heading>
          <Block marginBottom="m">Try removing some filters or zooming out on the map to find more communities.</Block>
          <Link onClick={() => onClearFilters()}>
            Clear all filters
          </Link>
        </Block>
          }
        <Block
          gridArea="list"
          paddingBottom="xl"
          paddingTop="l"
          display={show === LIST ? 'block' : 'none'}
          sx$laptop={{
              display: 'block',
            }}
          sx$tablet={{
            paddingBottom: 'unset',
          }}

        >
          {entities.map((entity, i) => (
            <Fragment key={entity.id}>
              <ListEntityTile
                setHoveredEntity={setHoveredCommunity}
                index={cursor + i}
                entity={entity}
                loading={i <= 2 ? 'eager' : 'lazy'}
              />
              {!isInternational && !showZillowSearchAd && city && ((entities.length <= 4 && i === entities.length - 1) || (entities.length > 4 && i === 4)) &&
                <Block
                  margin="0 l l"
                >
                  <GetAssessmentBoxContainer
                    completedAssessment={isBrowser && !!localStorage.getItem(ASSESSMENT_WIZARD_COMPLETED)}
                    agentId={isBrowser ? (localStorage.getItem(ASSESSMENT_WIZARD_MATCHED_AGENT) || '') : ''}
                    mode={{ cta: 'generalOptions', entry: 'searchList' }}
                    startLink={`/wizards/assessment/location/${state}/${city} `}
                  />
                </Block>
              }
              {!isInternational && showZillowSearchAd && ((entities.length <= 4 && i === entities.length - 1) || (entities.length > 4 && i === 4)) &&
                <Block
                  margin="0 l l"
                >
                  <SearchResultsAdTileContainer type="getOffer" locationLabel={locLabel} tocLabel={tocLabel} />
                </Block>
              }
            </Fragment>
          ))}
          <SearchPagination
            currentFilters={currentFilters}
            pagination={pagination}
          />
          {!isInternational &&
          <ExploreContainer filters={currentFilters} />
          }
        </Block>
        <Map
          gridArea="map"
          currentFilters={currentFilters}
          communities={entities}
          meta={meta}
          onFilterChange={onFilterChange}
          onMarkerClick={setSelectedCommunity}
          onMarkerHover={setMarkerHover}
          selectedCommunity={selectedCommunity}
          selectedHover={markerHover}
          hoveredCommunity={hoveredCommunity}
          cursor={cursor}
          width="100%"
          sx={{
            display: show === MAP ? 'block' : 'none',
            paddingTop: `${upToLaptopOffset}px`,
            marginTop: `-${upToLaptopOffset}px`,
            height: sx`calc(100vh)`,
          }}

          sx$laptop={{
            display: 'block',
            position: 'sticky',
            top: '0px !important',
            paddingTop: `${startingWithLaptopOffset}px`,
            marginTop: `-${startingWithLaptopOffset}px`,
            height: '100vh',
          }}
        />
      </Block>
      {/* SEARCH_END */}
      <Footer
        display={show === LIST ? 'block' : 'none'}
        startingWithLaptop="block"
      />
    </>
  );
};

Search.propTypes = {
  onFilterChange: func,
  onClearFilters: func,
  currentFilters: object,
  entities: arrayOf(coordPropType),
  meta: object,
  pagination: object,
  location: object,
  hasFinished: bool,
};

Search.displayName = 'Search';

export default memo(Search);
