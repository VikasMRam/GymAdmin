import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/map.svg').default
// import MapSvg from './svg/map.svg';

const Map = forwardRef((props, ref) => <Icon ref={ref} name="map" svg={svg} {...props} />);

Map.displayName = 'MapIcon';

export default Map;