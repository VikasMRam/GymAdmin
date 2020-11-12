import React from 'react';
import { object, number, bool, string } from 'prop-types';
import styled from 'styled-components';

import Pin from './Pin';

import CommunityTile from 'sly/web/components/organisms/CommunityTile';

const Wrapper = styled.div``;

const Marker = ({ selectedCommunity, number, $hover, size, mapDimensions, fixCommunityTileAtBottom, ...props }) => {
  let extraCss = {
    transform: 'translate(-50%, -54px)',
  };
  const mapWidth =  mapDimensions ? mapDimensions.width : '100%';

  if (fixCommunityTileAtBottom && mapDimensions) {
    extraCss = {
      position: 'fixed',
      left: '-49%',
      top: 40,
    };
    if (mapDimensions.width < 768) {
      size = 'small';
      // extraCss.top = 132;
      extraCss.width = mapWidth - 16;
    }
  }
  const tileCss = {
    width: size ? 344 : mapWidth - 16,
    zIndex: 1000,
    ...extraCss,
  };

  return (
    <Wrapper
      {...props}
    >
      <Pin
        number={number}
        active={$hover || selectedCommunity}
        css={{
          transform: 'translate(-50%, -100%)',
        }}
      />
      {selectedCommunity &&
        <CommunityTile
          community={selectedCommunity}
          size={size}
          layout="column"
          shadowBlur="small"
          shadowSpread="tiny"
          shadowVOffset="small"
          noGallery
          noLayoutBreakingInTablet
          css={tileCss}
        />
      }
    </Wrapper>
  );
};

Marker.propTypes = {
  selectedCommunity: object,
  number: number.isRequired,
  $hover: bool,
  size: string,
  mapDimensions: object,
  fixCommunityTileAtBottom: bool,
};

export default Marker;
