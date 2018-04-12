import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import { size } from 'sly/components/themes';

const width = ({ tileSize }) => size('tile', tileSize, 'width');
const height = ({ tileSize }) => size('tile', tileSize, 'height');

const StyledImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  width: ${width};
  height: ${height};
`;

const TileImage = ({ tileSize, src }) => {
  return <StyledImg tileSize={tileSize} src={src} />;
};

TileImage.propTypes = {
  tileSize: string,
  src: string.isRequired,
};

TileImage.defaultProps = {
  tileSize: 'small',
};

export default TileImage;
