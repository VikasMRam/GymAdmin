import React from 'react';
import { string, shape, bool, number } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import { palette } from 'styled-theme';
import Link from 'react-router-dom/Link';

import { size } from 'sly/components/themes';
import Rating from 'sly/components/atoms/Rating';
import Input from 'sly/components/atoms/Input';

const width = ({ tileSize }) => size('tile', tileSize, 'width');
const height = ({ tileSize }) => size('tile', tileSize, 'height');

const Wrapper = styled.div`
  position: relative;
  width: ${width};
  height: ${height};
`;

// TODO: create a img component that understand sly's resampling configurations
const StyledImg = styled.img`
  object-fit: cover;
  width: ${width};
  height: ${height};

  input[type="checkbox"] {
    margin: 0px;
  }
`;

const Checkbox = styled(Input)`
  position: absolute;
  top: ${size('spacing.small')};
  right: ${size('spacing.small')};
`;

export const CaptionSpan = styled.span`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background: ${p => `${palette('grayscale', 0)(p)}80`}; // 50%
  font-size: ${size('text.caption')};
  padding: ${size('spacing.small')};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${palette('white', 0)};
`;

const CommunityTile = ({
  size, palette, community, selectable, ...props
}) => {
  const {
    name, uri, picture, rating,
  } = community;
  return (
    <Wrapper tileSize={size} {...props}>
      <StyledImg tileSize={size} src={picture} />
      {selectable && <Checkbox type="checkbox" />}
      <CaptionSpan>
        <StyledLink to={community.uri}>{name}</StyledLink>
        {rating && <Rating size="small" palette={palette} value={rating} />}
      </CaptionSpan>
    </Wrapper>
  );
};

CommunityTile.propTypes = {
  selectable: bool,
  size: string,
  palette: string,
  community: shape({
    name: string.isRequired,
    uri: string.isRequired,
    picture: string.isRequired,
    rating: number,
  }),
};

CommunityTile.defaultProps = {
  palette: 'secondary',
  size: 'small',
};

export default CommunityTile;
