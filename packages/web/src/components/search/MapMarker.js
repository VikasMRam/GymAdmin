import React from 'react';
import { object, number, bool } from 'prop-types';
import styled from 'styled-components';

import Pin from './Pin';

import CommunityTile from 'sly/web/components/organisms/CommunityTile';

const Wrapper = styled.div``;

const Marker = ({ selectedCommunity, number, $hover, mapDimensions, fixCommunityTileAtBottom, ...props }) => {
  let extraCss = {
    transform: 'translate(-50%, -54px)',
  };
  const tileWidth =  mapDimensions ? mapDimensions.width - 16 : '100%';

  if (fixCommunityTileAtBottom && mapDimensions) {
    extraCss = {
      position: 'fixed',
      left: 0,
      top: (mapDimensions.height / 2) - 212,
    };
    if (mapDimensions.width > 768 && mapDimensions.width < 1080) {
      extraCss.left = `${(mapDimensions.width - 680) / 2}px`;
      extraCss.top = (mapDimensions.height / 2) - 286;
    }
  }
  const tileCss = {
    width: 344,
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
          type="map"
          layout="column"
          shadowBlur="small"
          shadowSpread="tiny"
          shadowVOffset="small"
          noGallery
          css={tileCss}
          upToLaptop={{
            width: '680px!important',
          }}
          upToTablet={{
            width: `${tileWidth}px!important`,
            left: '-49%!important',
          }}
        />
      }
    </Wrapper>
  );
};

Marker.propTypes = {
  selectedCommunity: object,
  number: number.isRequired,
  $hover: bool,
  mapDimensions: object,
  fixCommunityTileAtBottom: bool,
};

export default Marker;
