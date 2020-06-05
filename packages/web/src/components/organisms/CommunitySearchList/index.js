import React from 'react';
import styled from 'styled-components';
import { object, arrayOf } from 'prop-types';
import queryString from 'query-string';

import { size, gridColumns } from 'sly/web/components/themes';
import { getPaginationData } from 'sly/web/services/helpers/pagination';
import pad from 'sly/web/components/helpers/pad';
import { shadowOnHover } from 'sly/web/components/helpers/shadow';

import { getTocLabel, getLocationLabel } from 'sly/web/services/helpers/search';
import { Centered, Link, Block, Heading } from 'sly/web/components/atoms';
import Pagination from 'sly/web/components/molecules/Pagination';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import CommunityFilterBar from 'sly/web/components/organisms/CommunityFilterBar';
import CommunityTile from 'sly/web/components/organisms/CommunityTile';
import SearchResultsAdTileContainer from 'sly/web/containers/SearchResultsAdTileContainer';

const CommunityFilterBarWrapper = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
  }
`;
const CommunityTileWrapper = pad(styled.div`
  position: relative;
`, 'xLarge');

const StyledLink = styled(Link)`
  // position: absolute !important;
  // top: 0 !important;
  // right: 0 !important;
  // bottom: 0 !important;
  // left: 0 !important;
  z-index: 10;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const MSCColumnWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
  ${gridColumns(1, size('spacing.xLarge'))};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    ${gridColumns(2, size('spacing.xLarge'))};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    ${gridColumns(3, size('spacing.xLarge'))};
  }
`;

const PaginationText = pad('div');
const PaddedPagination = pad(Pagination, 'small');

const ShadowCommunityTile = shadowOnHover(styled(CommunityTile)`
  position: relative;
`);

const PaddedSearchResultsAdTileContainer = pad(SearchResultsAdTileContainer);

const mostSearchedCities = [
  {
    to: '/assisted-living/california/san-francisco',
    image: 'react-assets/cities/SanFrancisco.jpeg',
    subtitle: 'San Francisco, CA',
    title: '95+ communities',
  },
  {
    to: '/assisted-living/california/los-angeles',
    image: 'react-assets/cities/LosAngeles.jpeg',
    subtitle: 'Los Angeles, CA',
    title: '105+ communities',
  },
  {
    to: '/assisted-living/california/san-diego',
    image: 'react-assets/cities/SanDiego.jpeg',
    subtitle: 'San Diego, CA',
    title: '75+ communities',
  },
];

const usefulInformationTiles = [
  {
    to: '/independent-living',
    image: 'react-assets/home/useful-info/independent-living.jpg',
    title: 'Independent Living',
  },
  {
    to: '/assisted-living',
    image: 'react-assets/home/useful-info/assisted-living.jpg',
    title: 'Assisted Living',
  },
  {
    to: '/memory-care',
    image: 'react-assets/home/useful-info/memory-care.jpg',
    title: 'Memory Care',
  },
];

const CommunitySearchList = ({ communityList, requestMeta, searchParams, location }) => {
  let mostSearchedCitiesComponents = null;
  let usefulInformationTilesComponents = null;

  if (communityList.length < 1) {
    mostSearchedCitiesComponents = mostSearchedCities.map(mostSearchedCity => (
      <Link key={mostSearchedCity.title} to={mostSearchedCity.to}>
        <ResponsiveImage path={mostSearchedCity.image} aspectRatio="4:3">
          <Centered>
            <Heading palette="white" size="subtitle" level="subtitle">{mostSearchedCity.subtitle}</Heading>
            <Block palette="white">{mostSearchedCity.title}</Block>
          </Centered>
        </ResponsiveImage>
      </Link>
    ));
    usefulInformationTilesComponents = usefulInformationTiles.map(usefulInformation => (
      <Link key={usefulInformation.title} to={usefulInformation.to}>
        <ResponsiveImage path={usefulInformation.image} aspectRatio="4:3">
          <Centered>
            <Heading size="subtitle" palette="white">{usefulInformation.title}</Heading>
          </Centered>
        </ResponsiveImage>
      </Link>
    ));
  }

  const { current, total } = getPaginationData(requestMeta);
  const count = requestMeta['filtered-count'];
  const present = (requestMeta['page-number'] * requestMeta['page-size']);
  const start = present + 1;
  const end = (present + requestMeta['page-size']  > count ? count : present + requestMeta['page-size']);
  const locLabel = getLocationLabel(searchParams);
  const tocLabel = getTocLabel(searchParams.toc);
  // pagination pathname
  let params = {};
  if (location.search) {
    params = queryString.parse(location.search);
  }
  if (params['page-number']) {
    delete params['page-number'];
  }
  const qs = queryString.stringify(params);
  let basePath = location.pathname;
  if (qs.length > 0) {
    basePath = `${basePath}?${qs}`;
  }

  return (
    <>
      <CommunityFilterBarWrapper>
        <CommunityFilterBar searchParams={searchParams} />
      </CommunityFilterBarWrapper>
      {communityList.map((similarProperty, index) => (
        <>
          <CommunityTileWrapper key={similarProperty.id}>
            <StyledLink
              to={similarProperty.url}
              event={{
                category: 'SearchPage',
                action: 'communityClick',
                label: index,
                value: similarProperty.id,
              }}
            >
            <ShadowCommunityTile
              community={similarProperty}
              layout="column"
              imageSize="regular"
              noGallery
              showDescription
              showSeeMoreButtonOnHover
              lazyLoadImage={index !== 0}
              event={{
                category: 'SearchPage',
                action: 'communityClick',
                label: index,
                value: similarProperty.id,
              }}
            />
            </StyledLink>
          </CommunityTileWrapper>
          {((communityList.length < 3 && index === communityList.length - 1) || (communityList.length > 1 && index === 1)) &&
            <PaddedSearchResultsAdTileContainer type="homeCare" locationLabel={locLabel} tocLabel={tocLabel} />
            }
        </>
      ))}
      {communityList.length < 1 &&
        <>
          <StyledHeading size="subtitle">Explore homes in popular cities</StyledHeading>
          <MSCColumnWrapper>
            {mostSearchedCitiesComponents}
          </MSCColumnWrapper>
          <StyledHeading size="subtitle">Learn more about senior care</StyledHeading>
          <MSCColumnWrapper>
            {usefulInformationTilesComponents}
          </MSCColumnWrapper>
        </>
      }
      <PaginationText>
        {`Showing ${start} to ${end} of ${count}`}
      </PaginationText>
      {communityList.length > 0 &&
        <PaddedPagination basePath={basePath} pageParam="page-number" current={current} total={total} />
      }
    </>
  );
};

CommunitySearchList.propTypes = {
  requestMeta: object.isRequired,
  searchParams: object.isRequired,
  communityList: arrayOf(object).isRequired,
  location: object.isRequired,
};

export default CommunitySearchList;
