/* eslint-disable no-underscore-dangle */
import GoogleMap, { fitBounds } from 'google-map-react';

import { gMapsApiKey } from 'sly/web/config';

export const MIN_ZOOM = 6;
export const MAX_ZOOM = 17;
export const DEFAULT_ZOOM = 13;

export const HOVER_DISTANCE = 20;

export const MAP = 'MAP';
export const COMPONENT_STATE = 'STATE';
export const NONE = 'NONE';

const TILE_SIZE = 256;

const INVALID_REQUEST = 'INVALID_REQUEST';
const NOT_FOUND = 'NOT_FOUND';
const OK = 'OK';
const OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT';
const REQUEST_DENIED = 'REQUEST_DENIED';
const UNKNOWN_ERROR = 'UNKNOWN_ERROR';
const ZERO_RESULTS = 'ZERO_RESULTS';

class Maps {
  _mapsPromise = null;
  sessionToken = null;
  autocompleteService = null;
  geocoder = null;

  getMaps = () => {
    if (!this._mapsPromise) {
      this._mapsPromise = GoogleMap.googleMapLoader({
        key: gMapsApiKey,
        libraries: ['places'],
      }).then((maps) => {
        this.sessionToken = new maps.places.AutocompleteSessionToken();
        this.autocompleteService = new maps.places.AutocompleteService();
        this.geocoder = new maps.Geocoder();
        return maps;
      });
    }
    return this._mapsPromise;
  };

  getGeocode = async (query) => {
    await this.getMaps();
    return new Promise((resolve, reject) => {
      this.geocoder.geocode(query, (results, status) => {
        if ([OK, ZERO_RESULTS].includes(status)) {
          resolve(results || []);
        } else {
          reject(new Error(status));
        }
      });
    });
  }

  getPlacePredictions = async input => {
    await this.getMaps();
    return new Promise((resolve, reject) => {
      const query = {
        componentRestrictions: {
          country: 'us',
        },
        types: ['(regions)'],
        input,
        sessionToken: this.sessionToken,
      };
      this.autocompleteService.getPlacePredictions(query, (predictions, status) => {
        if ([OK, ZERO_RESULTS].includes(status)) {
          resolve(predictions || []);
        } else {
          reject(new Error(status));
        }
      });
    });
  };
}

export const maps = new Maps();

// helper stuff
const round = n => Math.round((n + Number.EPSILON) * 100000) / 100000;
const minMax = (value, min, max) => Math.min(Math.max(value, min), max);
const vAdd = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
const vSub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });

const latLngToWorld = ({ lat, lng }) => {
  const sin = Math.sin(lat * Math.PI / 180);
  const x = lng / 360 + 0.5;
  let y = 0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;

  y = y < 0
    ? 0
    : y > 1 ? 1 : y;
  return { x, y };
};

const getPixelForLatLng = (coords, zoom) => {
  const world = latLngToWorld(coords);
  const scale = 2 ** zoom;
  return {
    x: world.x * scale * TILE_SIZE,
    y: world.y * scale * TILE_SIZE,
  };
};

const worldToLatLng = ({ x, y }) => {
  const n = Math.PI - 2 * Math.PI * y;

  // TODO test that this is faster
  // 360 * Math.atan(Math.exp((180 - y * 360) * Math.PI / 180)) / Math.PI - 90;
  return {
    lat: 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))),
    lng: x * 360 - 180,
  };
};

const getLatLngForPixel = (pixel, zoom) => {
  const scale = 2 ** zoom;
  const world = {
    x: pixel.x / scale / TILE_SIZE,
    y: pixel.y / scale / TILE_SIZE,
  };
  return worldToLatLng(world);
};

export const getLatLng = latlng => {
  if (process.browser && latlng instanceof google.maps.LatLng) {
    return latlng.toJSON();
  }
  return latlng;
};

export const getCoords = center => {
  const { lat, lng } = getLatLng(center);
  return {
    lat,
    lng,
  };
};

export const getMapQuery = map => ({
  ...getCoords(map.center),
  zoom: map.zoom,
});

export const getBounds = bounds => {
  if (process.browser && bounds instanceof google.maps.LatLngBounds) {
    const { north, east, south, west } = bounds.toJSON();
    return {
      northeast: {
        lat: north,
        lng: east,
      },
      southwest: {
        lat: south,
        lng: west,
      },
    };
  }
  return bounds;
};

// export const findOptimalZoomForBounds = (geometryBounds, size) => {
//   let zoom = MAX_ZOOM;
//   if (geometryBounds) {
//     const { northeast, southwest } = getBounds(geometryBounds);
//     zoom = fitBounds({
//       ne: northeast,
//       sw: southwest,
//     }, size).zoom;
//   }
//
//   return minMax(
//     zoom,
//     MIN_ZOOM,
//     MAX_ZOOM,
//   );
// };

// export const parseMapQuery = (query, geocode, mapSize) => {
//   if (query.lat && query.lng && query.zoom) {
//     return {
//       lat: Number.parseFloat(query.lat),
//       lng: Number.parseFloat(query.lng),
//       zoom: Number.parseInt(query.zoom, 10),
//     };
//   } else if (geocode) {
//     const { location, viewport } = geocode.geometry;
//     const coords = getCoords(location);
//     return {
//       ...coords,
//       zoom: findOptimalZoomForBounds(viewport, mapSize),
//     };
//   }
//
//   return {
//     lat: null,
//     lng: null,
//     zoom: null,
//   };
// };

/**
 * if getGeocode is provided, use getGeocode, otherwise try coords
 *
 * @param coords
 * @param geocode
 */
export const getGeographyFromMap = ({ zoom, ...coords }, { width, height }) => {
  const center = getPixelForLatLng(coords, zoom);
  const delta = {
    x: width / 2,
    y: height / 2,
  };
  const topLeft = vSub(center, delta);
  const bottomRight = vAdd(center, delta);
  const nw = getLatLngForPixel(topLeft, zoom);
  const se = getLatLngForPixel(bottomRight, zoom);

  return [
    nw.lat,
    nw.lng,
    se.lat,
    se.lng,
  ];
};

// export const geographyFromGeocode = geocode => {
//   const { viewport } = geocode.geometry;
//
//   const {
//     northeast: {
//       lng: e,
//       lat: n,
//     },
//     southwest: {
//       lng: w,
//       lat: s,
//     },
//   } = getBounds(viewport);
//
//   return {
//     coordinates: [[
//       [w, n],
//       [e, n],
//       [e, s],
//       [w, s],
//       [w, n],
//     ]],
//     type: 'Polygon',
//   };
// };

// export const getGeography = (mapQuery, geocode, mapDimensions) => {
//   if (geocode) {
//     return geographyFromGeocode(geocode);
//   } else if (mapQuery.lat
//     && mapQuery.lng
//     && mapQuery.zoom
//     && mapDimensions.width
//     && mapDimensions.height
//   ) {
//     return geographyFromMap(mapQuery, mapDimensions);
//   }
//   return null;
// };


export const findOptimalZoomForBounds = (bounds, size) => {
  const { zoom } = fitBounds(bounds, size);

  return minMax(
    zoom || DEFAULT_ZOOM,
    MIN_ZOOM,
    MAX_ZOOM,
  );
};

// export const getVisibleRadius = ({ width, height }, latitude, zoom) => {
//   const mult = 97.27130 * Math.cos(latitude * Math.PI / 180) / Math.pow(2, zoom);
//   console.log('radius', width, height, mult)
//   return ((width * mult) + (height * mult)) / 2;
// };

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

export const coordsFromGeoFilter = (geo) => {
  if (!geo) {
    return {
      zoom: DEFAULT_ZOOM,
      controlled: NONE,
    };
  }

  const coords = geo.split(',').map(Number);
  if (coords.length === 4) {
    const [nwlat, nwlng, selat, selng] = coords;
    return {
      lat: (nwlat + selat) / 2,
      lng: (nwlng + selng) / 2,
      zoom: DEFAULT_ZOOM,
      controlled: MAP,
    };
  }

  const [lat, lng] = coords;
  return {
    lat,
    lng,
    zoom: DEFAULT_ZOOM,
    controlled: NONE,
  };
};
