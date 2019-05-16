import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';
import styled from 'styled-components';

// import { size } from 'sly/components/themes';
import { prefetch } from 'sly/services/newApi';
import textAlign from 'sly/components/helpers/textAlign';
import pad from 'sly/components/helpers/pad';
import shadow from 'sly/components/helpers/shadow';
import { Block, Link } from 'sly/components/atoms';
import CommunityTile from 'sly/components/organisms/CommunityTile';

const CenteredBlock = textAlign(Block);

const StyledCommunityTile = styled(shadow(CommunityTile))`
// todo height
`;

const PaddedStyledCommunityTile = pad(StyledCommunityTile, 'xLarge');

@prefetch('searchResources', 'getSearchResources', (req, { state, city }) => req({
  state,
  city,
}))

export default class SearchResultsContainer extends Component {
  static propTypes = {
    status: object.isRequired,
    searchResources: arrayOf(object),
  };

  render() {
    const { searchResources, status } = this.props;

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

    const communityTiles = searchResources.map((sr, i) => {
      const ct = i === searchResources.length - 1 ?
        <StyledCommunityTile layout="column" noGallery community={sr} /> :
        <PaddedStyledCommunityTile layout="column" noGallery community={sr} />;
      return <Link key={sr.id} href={sr.url} target="_blank">{ct}</Link>;
    });

    return (
      <section>
        {communityTiles}
      </section>
    );
  }
}
