import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { object, arrayOf, func } from 'prop-types';


import { size, assetPath } from 'sly/components/themes';
import SimilarCommunityTile from 'sly/components/molecules/SimilarCommunityTile';
import { Link, Block } from 'sly/components/atoms';
import CommunityFilterBar from 'sly/components/organisms/CommunityFilterBar';
import Pagination from 'sly/components/molecules/Pagination';
import Heading from 'sly/components/atoms/Heading';
import BreadCrumb from 'sly/components/molecules/BreadCrumb';
import ImageOverlayContentTile from 'sly/components/molecules/ImageOverlayContentTile';

import { getBreadCrumbsForLocation } from 'sly/services/helpers/url';
import AdTile from 'sly/components/molecules/AdTile/index';
import { SearchPageTileTexts as searchAdProps } from 'sly/services/helpers/ad';

const CommunityFilterBarWrapper = styled.div`
  display: none;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
  }
`;
const StyledLink = styled(Link)`
  display: block;
  margin-bottom: ${size('spacing.large')};
`;

const AdTileWrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const MSCColumnWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  > * {
    margin-bottom: ${size('spacing.large')};
    margin-right: 0;
  }
  > *:last-child {
    margin-right: 0;
  }
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    > * {
      margin-right: ${size('spacing.xLarge')};
    }
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

const getPaginationData = requestMeta => ({
  current: requestMeta['page-number'],
  total: requestMeta['filtered-count'] / requestMeta['page-size'],
});

const mostSearchedCities = [
  {
    to: '/assisted-living/california/san-francisco',
    image: assetPath('images/cities/SanFrancisco.jpeg'),
    subtitle: 'San Francisco, CA',
    title: '95+ communities',
  },
  {
    to: '/assisted-living/california/los-angeles',
    image: assetPath('images/cities/LosAngeles.jpeg'),
    subtitle: 'Los Angeles, CA',
    title: '105+ communities',
  },
  {
    to: '/assisted-living/california/san-diego',
    image: assetPath('images/cities/SanDiego.jpeg'),
    subtitle: 'San Diego, CA',
    title: '75+ communities',
  },
];

const usefulInformationTiles = [
  {
    to: '/independent-living',
    image: assetPath('images/home/useful-info/independent-living.jpg'),
    title: 'Independent Living',
  },
  {
    to: '/assisted-living',
    image: assetPath('images/home/useful-info/assisted-living.jpg'),
    title: 'Assisted Living',
  },
  {
    to: '/alzheimers-care',
    image: assetPath('images/home/useful-info/memory-care.jpg'),
    title: 'Memory Care',
  },
];

export default class CommunitySearchList extends Component {
  static propTypes = {
    requestMeta: object.isRequired,
    searchParams: object.isRequired,
    onParamsChange: func.isRequired,
    onAdTileClick: func.isRequired,
    communityList: arrayOf(object).isRequired,
  };

  onPageChange = (page) => {
    const { onParamsChange } = this.props;
    console.log('Seeing page change',page);
    onParamsChange({
      changedParams: { 'page-number': page },
    });
  };

  render() {
    const {
      communityList, requestMeta, searchParams, onAdTileClick, ...props
    } = this.props;
    const adIndex = 2;
    let mostSearchedCitiesComponents = null;
    let usefulInformationTilesComponents = null;

    if (communityList.length < 1) {
      mostSearchedCitiesComponents = mostSearchedCities.map(mostSearchedCity => (
        <StyledLink key={mostSearchedCity.title} to={mostSearchedCity.to}>
          <ImageOverlayContentTile size="small" image={mostSearchedCity.image}>
            <Heading palette="white" size="subtitle" level="subtitle">{mostSearchedCity.subtitle}</Heading>
            <Block palette="white">{mostSearchedCity.title}</Block>
          </ImageOverlayContentTile>
        </StyledLink>
      ));
      usefulInformationTilesComponents = usefulInformationTiles.map(usefulInformation => (
        <StyledLink key={usefulInformation.title} to={usefulInformation.to}>
          <ImageOverlayContentTile size="small" image={usefulInformation.image}>
            <Heading size="subtitle" palette="white">{usefulInformation.title}</Heading>
          </ImageOverlayContentTile>
        </StyledLink>
      ));
    }

    const components = communityList.map((similarProperty) => {
      return (
        <StyledLink key={similarProperty.id} to={similarProperty.url}>
          <SimilarCommunityTile
            similarProperty={similarProperty}
          />
        </StyledLink>
      );
    });
    // components.splice(adIndex, 0, <AdTileWrapper key="ad" ><AdTile {...searchAdProps} onClick={() => onAdTileClick()} /></AdTileWrapper>);
    const { current, total } = getPaginationData(requestMeta);
    return (
      <Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        <CommunityFilterBarWrapper>
          <CommunityFilterBar searchParams={searchParams} {...props} />
        </CommunityFilterBarWrapper>
        {components}
        {communityList.length < 1 &&
          <Fragment>
            {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
            <StyledHeading size="subtitle">Explore homes in popular cities</StyledHeading>
            <MSCColumnWrapper>
              {mostSearchedCitiesComponents}
            </MSCColumnWrapper>
            <StyledHeading size="subtitle">Learn more about senior care</StyledHeading>
            <MSCColumnWrapper>
              {usefulInformationTilesComponents}
            </MSCColumnWrapper>
          </Fragment>
        }
        {communityList.length > 0 &&
          <Fragment>
            {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
            <Pagination onChange={this.onPageChange} current={current} total={total} />
            <BreadCrumb items={getBreadCrumbsForLocation(searchParams)} />
          </Fragment>
        }
      </Fragment>
    );
  }
}

