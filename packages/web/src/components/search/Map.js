import React, { useState, useEffect, useCallback } from 'react';
import { arrayOf, object, func, number } from 'prop-types';
import GoogleMap from 'google-map-react';
import debounce from 'lodash/debounce';
import { css } from 'styled-components';

import coordPropType from 'sly/common/propTypes/coordPropType';
import { gMapsApiKey } from 'sly/web/config';
import Block from 'sly/common/components/atoms/Block';

const Marker = () => (
  <Block
    width={24}
    height={24}
    css={css({
      background: 'red',
    })}
  />
);

const Map = ({
  defaultCenter,
  markers,
  center,
  zoom,
  onChange,
  ...restProps
}) => {
  const onDrag = useCallback(debounce((map) => {
    onChange(map);
  }, 200), []);

  const onZoom = useCallback((map) => {
    onChange(map);
  }, []);

  const [blockProps, mapProps] = Block.filterBlockProps(restProps);

  const onChildClickCallback = (key) => {
    console.log('marker clicked', key);
  };

  return (
    <Block
      {...blockProps}
    >
      <GoogleMap
        bootstrapURLKeys={{ key: gMapsApiKey }}
        center={center}
        defaultCenter={defaultCenter}
        defaultZoom={13}
        hoverDistance={25}
        onChildClick={onChildClickCallback}
        onDrag={onDrag}
        onZoomAnimationEnd={onZoom}
        zoom={zoom}
        {...mapProps}
      >
        {markers.map(({ location: { coordinates: [lng, lat] }, id }) => (
          <Marker
            key={id}
            lat={lat}
            lng={lng}
            place="place"
            show
          />
        ))}
      </GoogleMap>
    </Block>
  );

  // }
};

Map.propTypes = {
  center: coordPropType,
  defaultCenter: coordPropType,
  markers: arrayOf(object),
  onChange: func,
  zoom: number,
};

export default Map;
