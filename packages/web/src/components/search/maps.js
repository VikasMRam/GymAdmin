import { fitBounds } from 'google-map-react';

const MIN_ZOOM = 11;
const MAX_ZOOM = 17;

// helper stuff
const minMax = (value, min, max) => Math.min(Math.max(value, min), max);

export const findOptimalZoomForBounds = ({ north, east, south, west }, size) => {
  let zoom = MAX_ZOOM;
  const northeast = {
    lat: north,
    lng: east,
  };
  const southwest = {
    lat: south,
    lng: west,
  };
  ({ zoom } = fitBounds({
    ne: northeast,
    sw: southwest,
  }, size));

  return minMax(
    zoom,
    MIN_ZOOM,
    MAX_ZOOM,
  );
};

export const getBoundsForSearchResults = (results) => {
  return results.reduce((acc, result) => {
    if (typeof acc.north === 'undefined' || result.latitude < acc.south) {
      acc.south = result.latitude;
    }
    if (typeof acc.north === 'undefined' || result.latitude > acc.north) {
      acc.north = result.latitude;
    }
    if (typeof acc.west === 'undefined' || result.longitude < acc.west) {
      acc.west = result.longitude;
    }
    if (typeof acc.east === 'undefined' || result.longitude < acc.east) {
      acc.east = result.longitude;
    }
    return acc;
  }, {});
};
