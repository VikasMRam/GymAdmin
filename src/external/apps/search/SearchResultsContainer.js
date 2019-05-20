import React, { Component } from 'react';
import { arrayOf, object, string } from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { size } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { prefetch } from 'sly/services/newApi';
import { getPaginationData } from 'sly/services/helpers/pagination';
import { getCitySearchUrl, getStateAbbr } from 'sly/services/helpers/url';
import textAlign from 'sly/components/helpers/textAlign';
import displayOnlyIn from 'sly/components/helpers/displayOnlyIn';
import pad from 'sly/components/helpers/pad';
import shadow from 'sly/components/helpers/shadow';
import { Block, Link, Button } from 'sly/components/atoms';
import CommunityTile from 'sly/components/organisms/CommunityTile';
import Pagination from 'sly/components/molecules/Pagination';

const CenteredBlock = textAlign(Block);

const StyledCommunityTile = styled(shadow(CommunityTile))`
// todo height
`;

const PaddedStyledCommunityTile = pad(StyledCommunityTile, 'xLarge');

const BottomWrapper = styled.div`
  display: grid;
  grid-gap: ${size('spacing.large')};
  align-items: baseline;
  justify-content: center;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: max-content min-content min-content;
  }
`;

const OrBlock = displayOnlyIn(Block, ['tablet', 'laptop']);

const ButtonWrapper = textAlign(styled.div``);

@prefetch('searchResources', 'getSearchResources', (req, { state, city, pageNumber }) => req({
  state,
  city,
  'page-number': pageNumber,
}))

@withRouter

export default class SearchResultsContainer extends Component {
  static propTypes = {
    status: object.isRequired,
    searchResources: arrayOf(object),
    location: object,
    state: string,
    city: string,
    palette: palettePropType,
  };

  render() {
    const {
      searchResources, status, location, city, state, palette,
    } = this.props;
    let basePath = location.pathname;
    if (palette) {
      basePath += `?palette=${palette}`;
    }

    if (!status.searchResources.hasStarted || status.searchResources.isLoading) {
      return (
        <CenteredBlock>Searching...</CenteredBlock>
      );
    }

    // no results
    if (!searchResources || !searchResources.length) {
      return (
        <CenteredBlock>No matching results found!</CenteredBlock>
      );
    }

    const requestMeta = status.searchResources.meta;
    const { current, total } = getPaginationData(requestMeta);
    let searchPath;
    if (total > 1) {
      const commProp = {
        address: {
          city,
          state: getStateAbbr(state),
        },
        propInfo: {
          typeCare: searchResources[0].typeCare,
        },
      };
      searchPath = getCitySearchUrl(commProp);
    }

    const communityTiles = searchResources.map((sr, i) => {
      const ct = i === searchResources.length - 1 && total < 2 ?
        <StyledCommunityTile palette={palette} layout="column" showFloorPlan={false} noGallery community={sr} /> :
        <PaddedStyledCommunityTile palette={palette} layout="column" showFloorPlan={false} noGallery community={sr} />;
      return <Link key={sr.id} href={sr.url} target="_blank">{ct}</Link>;
    });

    return (
      <section>
        {communityTiles}
        {total > 1 &&
          <BottomWrapper>
            <Pagination
              basePath={basePath}
              pageParam="page-number"
              current={current}
              total={total}
              useHref={false}
              palette={palette}
            />
            <OrBlock>or</OrBlock>
            <ButtonWrapper>
              <Button palette={palette} href={searchPath} target="_blank">See more on Seniorly</Button>
            </ButtonWrapper>
          </BottomWrapper>
        }
      </section>
    );
  }
}
