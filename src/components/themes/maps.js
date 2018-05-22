const maps = {};

maps.propertyDetailTheme = [
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#68747a',
      },
      {
        saturation: '0',
      },
      {
        lightness: '-42',
      },
    ],
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: '53',
      },
      {
        color: '#ffba00',
      },
      {
        saturation: '-54',
      },
      {
        gamma: '1',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        hue: '#ffbb00',
      },
      {
        saturation: '43',
      },
      {
        lightness: '38',
      },
      {
        gamma: '1.00',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
      {
        hue: '#00ff6a',
      },
      {
        saturation: '-28',
      },
      {
        lightness: '11',
      },
      {
        gamma: '1.00',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffba00',
      },
      {
        lightness: '37',
      },
      {
        saturation: '-24',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        lightness: '41',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.stroke',
    stylers: [
      {
        lightness: '40',
      },
      {
        gamma: '1',
      },
      {
        saturation: '-10',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: '39',
      },
      {
        gamma: '1',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [
      {
        hue: '#ff0000',
      },
      {
        saturation: '-100',
      },
      {
        lightness: '31',
      },
      {
        gamma: '1.00',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        lightness: '38',
      },
      {
        gamma: '1',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        color: '#80badc',
      },
      {
        visibility: 'on',
      },
      {
        lightness: '17',
      },
    ],
  },
];

export default maps;
