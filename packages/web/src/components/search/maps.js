import { fitBounds } from 'google-map-react';

export const MIN_ZOOM = 11;
export const MAX_ZOOM = 17;
export const DEFAULT_ZOOM = 13;

export const HOVER_DISTANCE = 50;

// helper stuff
const minMax = (value, min, max) => Math.min(Math.max(value, min), max);

export const findOptimalZoomForBounds = (bounds, size) => {
  const { zoom } = fitBounds(bounds, size);

  return minMax(
    zoom || DEFAULT_ZOOM,
    MIN_ZOOM,
    MAX_ZOOM,
  );
};

export const getVisibleRadius = ({ width, height }, latitude, zoom) => {
  const mult = 97.27130 * Math.cos(latitude * Math.PI / 180) / Math.pow(2, zoom);
  console.log('radius', width, height, mult)
  return ((width * mult) + (height * mult)) / 2;
};

export const getBoundsForSearchResults = (results) => {
  return results.reduce((acc, result) => {
    if (acc.se.lat === null || result.latitude < acc.se.lat) {
      acc.se.lat = result.latitude;
    }
    if (acc.nw.lat === null || result.latitude > acc.nw.lat) {
      acc.nw.lat = result.latitude;
    }
    if (acc.nw.lng === null || result.longitude < acc.nw.lng) {
      acc.nw.lng = result.longitude;
    }
    if (acc.se.lng === null || result.longitude > acc.se.lng) {
      acc.se.lng = result.longitude;
    }
    return acc;
  }, {
    nw: {
      lat: null,
      lng: null,
    },
    se: {
      lat: null,
      lng: null,
    },
  });
};

export const getBoundsCenter = ({ nw, se }) => {
  return {
    lat: (nw.lat + se.lat) / 2,
    lng: (nw.lng + se.lng) / 2,
  };
};

export const slyToApiPoint = point => ({
  lat: parseFloat(point?.latitude) || 0,
  lng: parseFloat(point?.longitude) || 0,
});
