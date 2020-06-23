import React, { Component } from 'react';
import { arrayOf, object, string } from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { size } from 'sly/web/components/themes';
import { NUMBER_OF_RESULTS_PER_PAGE } from 'sly/web/external/constants/search';
import { palette as palettePropType } from 'sly/web/propTypes/palette';
import { prefetch } from 'sly/web/services/api';
import { getPaginationData } from 'sly/web/services/helpers/pagination';
import { getCitySearchUrl, getStateAbbr } from 'sly/web/services/helpers/url';
import displayOnlyIn from 'sly/web/components/helpers/displayOnlyIn';
import pad from 'sly/web/components/helpers/pad';
import shadow from 'sly/web/components/helpers/shadow';
import { Block, Link, Button } from 'sly/web/components/atoms';
import CommunityTile from 'sly/web/components/organisms/CommunityTile';
import Pagination from 'sly/web/components/molecules/Pagination';
import { textAlign } from 'sly/web/components/helpers/text';

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

@prefetch('searchResources', 'getSearchResources', (req, { state, city, pageNumber }) => {
  let params = {
    'page-number': pageNumber,
    'page-size': NUMBER_OF_RESULTS_PER_PAGE,
  };
  if (state) {
    params = { ...params, state };
  }
  if (city) {
    params = { ...params, city };
  }
  if (!state && !city) {
    params = { ...params, nearme: 'true' };
  }

  return req(params);
})

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
      searchResources, status, location, palette,
    } = this.props;
    let { city, state } = this.props;
    const { meta } = status;
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
      if (meta) {
        const { geo } = meta;
        if (geo) {
          ({ city, state } = geo);
        }
      }
      const commProp = {
        address: {
          city,
          state: state ? getStateAbbr(state) : null,
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
      return <Link key={sr.id} href={sr.url} target="_blank" rel="nofollow">{ct}</Link>;
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
              <Button palette={palette} href={searchPath} target="_blank" rel="nofollow">See more on Seniorly</Button>
            </ButtonWrapper>
          </BottomWrapper>
        }
      </section>
    );
  }
}
