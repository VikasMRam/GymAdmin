import React from 'react';
import { object, number, bool } from 'prop-types';
import styled from 'styled-components';

import Pin from './Pin';

import CommunityTile from 'sly/web/components/organisms/CommunityTile';

const Wrapper = styled.div``;

const Marker = ({ selectedCommunity, number, $hover, ...props }) => (
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
        size="small"
        layout="column"
        shadowBlur="small"
        shadowSpread="tiny"
        shadowVOffset="small"
        noGallery
        css={{
          width: 344,
          transform: 'translate(-50%, -54px)',
          zIndex: 1000,
        }}
      />
    }
  </Wrapper>
);

Marker.propTypes = {
  selectedCommunity: object,
  number: number.isRequired,
  $hover: bool,
};

export default Marker;
