import React from 'react';
import styled from 'styled-components';
import { string, oneOf } from 'prop-types';

import { size } from 'sly/components/themes';

const width = ({ tileSize }) => size('tile', tileSize, 'width');
const height = ({ tileSize }) => size('tile', tileSize, 'height');
const breakpoint = ({ breakpoint }) => size('breakpoint', breakpoint);

const StyledImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  @media screen and (min-width: ${breakpoint}) {
    width: ${width};
    height: ${height};
  }
`;

const TileImage = ({
  tileSize, src, breakpoint, alt,
}) => {
  return <StyledImg tileSize={tileSize} src={src} breakpoint={breakpoint} alt={alt} />;
};

TileImage.propTypes = {
  tileSize: string,
  src: string.isRequired,
  breakpoint: oneOf(['mobile', 'tablet']),
  alt: string,
};

TileImage.defaultProps = {
  tileSize: 'small',
  breakpoint: 'mobile',
};

export default TileImage;
