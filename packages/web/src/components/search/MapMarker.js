import React, { forwardRef } from 'react';
import { object, number } from 'prop-types';
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
        noGallery
        css={{
          width: 344,
          transform: 'translate(-50%, -54px)',
        }}
      />
    }
  </Wrapper>
);

Marker.propTypes = {
  selectedCommunity: object,
  number: number.isRequired,
};

export default Marker;
