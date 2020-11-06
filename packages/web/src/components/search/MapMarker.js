import React from 'react';
import styled from 'styled-components';
import { object } from 'prop-types';

import Block from 'sly/common/components/atoms/Block';
import MapTile from 'sly/web/components/molecules/MapTile';

const Pin = styled(Block)`
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -20px 0 0 -20px;

  &:after {
    content: "";
    width: 14px;
    height: 14px;
    margin: 8px 0 0 8px;
    position: absolute;
    border-radius: 50%;
  }
`;

const Marker = ({ selectedCommunity, ...props }) => (
  <div {...props}>
    <Pin background="primary" />
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
};

export default Marker;
