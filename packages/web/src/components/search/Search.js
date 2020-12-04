import React, { Fragment, memo, useCallback, useMemo, useState } from 'react';
import { arrayOf, func, object, bool } from 'prop-types';

import ExploreContainer from './ExploreContainer';

import { getHelmetForSearchPage } from 'sly/web/services/helpers/html_headers';
import { getKey } from 'sly/common/components/themes';
import {
  TemplateHeader,
} from 'sly/web/components/templates/BasePageTemplate';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import Footer from 'sly/web/components/organisms/Footer';
import Map from 'sly/web/components/search/Map';
import coordPropType from 'sly/common/propTypes/coordPropType';
import Block from 'sly/common/components/atoms/Block';
import Icon from 'sly/common/components/atoms/Icon';
import Heading from 'sly/common/components/atoms/Heading';
import Filters, { DEFAULT_PAGE_SIZE } from 'sly/web/components/search/Filters';
import { LIST, MAP, SHOW_OPTIONS } from 'sly/web/components/search/constants';
import FilterButton from 'sly/web/components/search/Filters/FilterButton';
import Link from 'sly/common/components/atoms/Link';
import useDimensions from 'sly/common/components/helpers/useDimensions';
import SearchPagination from 'sly/web/components/search/SearchPagination';
import { getTocSeoLabel, getLocationLabel } from 'sly/web/components/search/helpers';
import { titleize } from 'sly/web/services/helpers/strings';
import { shouldShowZillowSearchAd } from 'sly/web/services/helpers/adtiles';
import GetAssessmentBoxContainer from 'sly/web/containers/GetAssessmentBoxContainer';
import SearchResultsAdTileContainer from 'sly/web/containers/SearchResultsAdTileContainer';
import { ASSESSMENT_WIZARD_MATCHED_AGENT, ASSESSMENT_WIZARD_COMPLETED }
  from 'sly/web/constants/wizards/assessment';
import { isBrowser } from 'sly/web/config';
import ListCommunityTile from 'sly/web/components/search/ListCommunityTile';
import { getStateAbbr } from 'sly/web/services/helpers/url';

const Search = ({
  currentFilters,
  onFilterChange,
  onClearFilters,
  communities,
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
  const showZillowSearchAd = shouldShowZillowSearchAd(currentFilters.toc);

  return (
    <>
      {getHelmetForSearchPage({
        ...currentFilters, url: location, communityList: communities, listSize,
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
        css={{
          paddingTop: headerHeight,
        }}
        upToLaptop={{
          display: 'flex',
        }}
        startingWithLaptop={{
          display: 'grid',
          gridTemplateRows: 'auto auto',
          gridTemplateColumns: '708px auto',
          gridTemplateAreas: '"filters map" "list  map"',
        }}
      >
        <Block
          gridArea="filters"
          padding="xLarge"
          css={{
            zIndex: '100',
          }}
          upToLaptop={{
            paddingTop: getKey('sizes.spacing.medium'),
            paddingBottom: getKey('sizes.spacing.medium'),
          }}
        >

          {!!listSize &&
            <Block
              upToLaptop={{
                display: show === LIST ? 'block' : 'none',
              }}
              css={{
              marginBottom: 'small',
            }}>
              {listSize} results
            </Block>
          }
          <Block
            upToLaptop={{
              display: show === LIST ? 'block' : 'none',
            }}
          >
            <Heading level="hero" size="title">{title}</Heading>
          </Block>
          <Filters
            ref={filtersRef}
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
          {(hasFinished && !listSize) &&
            <Block
              marginTop="xxxLarge"
              upToTablet={{
                marginTop: getKey('sizes.spacing.xxLarge'),
              }}
            >
              <Heading level="subtitle" size="subtitle" pad="regular">No results</Heading>
              <Block marginBottom="large">Try removing some filters or zooming out on the map to find more communities.</Block>
              <Link onClick={() => onClearFilters()}>
                Clear all filters
              </Link>
            </Block>
          }
        </Block>

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
            <Fragment key={community.id}>
              <ListCommunityTile
                setHoveredCommunity={setHoveredCommunity}
                index={cursor + i}
                community={community}
              />
              {!showZillowSearchAd && city && ((communities.length < 3 && i === communities.length - 1) || (communities.length > 1 && i === 1)) &&
                <Block
                  margin="0 xLarge xLarge"
                >
                  <GetAssessmentBoxContainer
                    completedAssessment={isBrowser && !!localStorage.getItem(ASSESSMENT_WIZARD_COMPLETED)}
                    agentId={isBrowser ? (localStorage.getItem(ASSESSMENT_WIZARD_MATCHED_AGENT) || '') : ''}
                    startLink={`/wizards/assessment/location/${state}/${city}?skipIntro=true`}
                  />
                </Block>
              }
              {showZillowSearchAd && ((communities.length < 3 && i === communities.length - 1) || (communities.length > 1 && i === 1)) &&
                <Block
                  margin="0 xLarge xLarge"
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
          <ExploreContainer filters={currentFilters} />
        </Block>
        <Map
          gridArea="map"
          currentFilters={currentFilters}
          communities={communities}
          meta={meta}
          onFilterChange={onFilterChange}
          onMarkerClick={setSelectedCommunity}
          onMarkerHover={setHoveredCommunity}
          selectedCommunity={hoveredCommunity || selectedCommunity}
          cursor={cursor}
          width="100%"
          upToLaptop={{
            display: show === MAP ? 'block' : 'none',
            paddingTop: `${upToLaptopOffset}px`,
            marginTop: `-${upToLaptopOffset}px`,
            height: `calc(100vh - ${getKey('sizes.spacing.xLarge')})`,
          }}
          startingWithLaptop={{
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
        upToLaptop={{
          display: show === LIST ? 'block' : 'none',
        }}
      />
    </>
  );
};

Search.propTypes = {
  onFilterChange: func,
  onClearFilters: func,
  currentFilters: object,
  communities: arrayOf(coordPropType),
  meta: object,
  pagination: object,
  location: object,
  hasFinished: bool,
};

Search.displayName = 'Search';

export default memo(Search);
