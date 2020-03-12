import React from 'react';
import { arrayOf, shape } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Link, Heading, Block } from 'sly/components/atoms';
import ImageOverlayContentTile from 'sly/components/molecules/ImageOverlayContentTile';

const StyledLink = styled(Link)`
  display: block;
`;

const StyledImageOverlayContentTile = styled(ImageOverlayContentTile)`
  border-radius: 4px;
`;

// TODO: to move this to a common place for reusability
export const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: ${size('mobileLayout.gutter')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-gap: ${size('tabletLayout.gutter')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-gap: ${size('layout.gutter')};
    grid-template-columns: ${size('layout.col4')} ${size('layout.col4')} ${size('layout.col4')};
  }
`;

const Wrapper = styled(ColumnWrapper)`
  grid-template-columns: auto;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-template-columns: ${size('layout.col4')} ${size('layout.col4')} ${size('layout.col4')};
  }
`;

const MostSearchedRegions = ({ mostSearchedRegions }) => (
  <Wrapper>
    {mostSearchedRegions.map(mostSearchedRegion => (
      <StyledLink key={mostSearchedRegion.title} to={mostSearchedRegion.to}>
        <StyledImageOverlayContentTile size="small" image={mostSearchedRegion.image}>
          <Heading palette="white" size="subtitle" level="subtitle">{mostSearchedRegion.title}</Heading>
          <Block palette="white">
            <strong> Includes: </strong>
            {mostSearchedRegion.states}
          </Block>
        </StyledImageOverlayContentTile>
      </StyledLink>
    ))
  }
  </Wrapper>
);

MostSearchedRegions.propTypes = {
  mostSearchedRegions: arrayOf(shape).isRequired,
};

export default MostSearchedRegions;
