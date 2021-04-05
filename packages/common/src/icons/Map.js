import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/map.svg').default;

const Map = forwardRef((props, ref) => <Icon ref={ref} name="map" svg={svg} {...props} />);

Map.displayName = 'MapIcon';

export default Map;
