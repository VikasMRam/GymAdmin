import React, { useCallback, forwardRef } from 'react';
import { arrayOf, object, func, number, string, bool } from 'prop-types';
import GoogleMap from 'google-map-react';
import debounce from 'lodash/debounce';

import Marker from './MapMarker';

import coordPropType from 'sly/common/propTypes/coordPropType';
import { gMapsApiKey } from 'sly/web/config';
import Block from 'sly/common/components/atoms/Block';
import STYLES from 'sly/web/constants/map';

const Map = forwardRef(({
  defaultCenter,
  communities,
  center,
  zoom,
  onChange,
  onMarkerClick,
  selectedCommunity,
  markerSize,
  mapDimensions,
  fixCommunityTileAtBottom,
  ...props
}, ref) => {
  const onDrag = useCallback(debounce((map) => {
    onChange(map);
  }, 200), []);

  const onZoom = useCallback((map) => {
    onChange(map);
  }, []);

  const onChildClickCallback = (key) => {
    const community = communities.find(x => x.id === key);
    onMarkerClick(community);
  };

  return (
    <Block
      ref={ref}
      {...props}
    >
      <GoogleMap
        bootstrapURLKeys={{ key: gMapsApiKey }}
        center={center}
        defaultCenter={defaultCenter}
        defaultZoom={3}
        hoverDistance={50}
        onChildClick={onChildClickCallback}
        onDrag={onDrag}
        onZoomAnimationEnd={onZoom}
        zoom={zoom}
        options={maps => ({
          zoomControl: true,
          zoomControlOptions: {
           position: maps.ControlPosition.TOP_LEFT,
          },
          styles: STYLES,
         })}
      >
        {communities.map(({ latitude, longitude, id }, i) => (
          <Marker
            key={id}
            selectedCommunity={selectedCommunity && selectedCommunity.id === id ? selectedCommunity : null}
            lat={latitude}
            lng={longitude}
            number={i + 1}
            size={markerSize}
            mapDimensions={mapDimensions}
            fixCommunityTileAtBottom={fixCommunityTileAtBottom}
          />
        ))}
      </GoogleMap>
    </Block>
  );
});

Map.defaultProps = {
  communities: [],
};

Map.propTypes = {
  center: coordPropType,
  defaultCenter: coordPropType,
  communities: arrayOf(object),
  onChange: func,
  zoom: number,
  onMarkerClick: func,
  selectedCommunity: object,
  markerSize: string,
  mapDimensions: object,
  fixCommunityTileAtBottom: bool,
};

export default Map;
