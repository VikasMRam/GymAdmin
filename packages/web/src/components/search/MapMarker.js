import React from 'react';
import { object, number } from 'prop-types';

import Pin from './Pin';

import MapTile from 'sly/web/components/molecules/MapTile';

const Marker = ({ selectedCommunity, number }) => (
  <div>
    <Pin number={number} />
    {selectedCommunity &&
      <MapTile
        tileInfo={{
          id: selectedCommunity.id,
          name: selectedCommunity.name,
          startingRate: selectedCommunity.startingRate,
          mainImage: selectedCommunity.imageUrl,
          url: selectedCommunity.url,
          propInfo: {
            communityDescription: selectedCommunity.description,
            typeCare: selectedCommunity.webViewInfo.firstLineValue.split(','),
          },
          propRatings: {
            reviewsValue: selectedCommunity.reviewsValue,
            numReviews: selectedCommunity.numReviews,
          },
        }}
      />
    }
  </div>
);

Marker.propTypes = {
  selectedCommunity: object,
  number: number.isRequired,
};

export default Marker;
