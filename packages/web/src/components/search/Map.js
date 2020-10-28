import React, { useState, useEffect, useCallback } from 'react';
import { arrayOf, object, func, number } from 'prop-types';
import GoogleMap from 'google-map-react';
import debounce from 'lodash/debounce';
import styled, { css } from 'styled-components';

import coordPropType from 'sly/common/propTypes/coordPropType';
import { gMapsApiKey } from 'sly/web/config';
// import Block from 'sly/common/components/atoms/Block';

const Block = styled.div``;

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
  communities,
  center,
  zoom,
  onChange,
  ...props
}) => {
  const onDrag = useCallback(debounce((map) => {
    onChange(map);
  }, 200), []);

  const onZoom = useCallback((map) => {
    onChange(map);
  }, []);

  console.log('props', props);

  const onChildClickCallback = (key) => {
    console.log('marker clicked', key);
  };

  return (
    <Block
      {...props}
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
      >
        {communities.map(({ latitude, longitude, id }) => (
          <Marker
            key={id}
            lat={latitude}
            lng={longitude}
            place="place"
            show
          />
        ))}
      </GoogleMap>
    </Block>
  );

  // }
};

Map.defaultProps = {
  communities: [],
};

Map.propTypes = {
  center: coordPropType,
  defaultCenter: coordPropType,
  communities: arrayOf(object),
  onChange: func,
  zoom: number,
};

export default Map;
