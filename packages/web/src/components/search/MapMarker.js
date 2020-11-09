import React from 'react';
import { object, number } from 'prop-types';

import Pin from './Pin';

import CommunityTile from 'sly/web/components/organisms/CommunityTile';

const Marker = ({ selectedCommunity, number, ...props }) => (
  <>
    <Pin
      number={number}
      css={{
        background: 'red',
        transform: 'translate(-50%, -100%)',
      }}
      {...props}
    />
    {selectedCommunity &&
      <CommunityTile
        community={selectedCommunity}
        size="small"
        layout="column"
        width="344px"
        noGallery
      />
    }
  </>
);

Marker.propTypes = {
  selectedCommunity: object,
  number: number.isRequired,
};

export default Marker;
