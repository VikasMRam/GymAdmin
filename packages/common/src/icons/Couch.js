import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/couch.svg').default;

const Couch = forwardRef((props, ref) => <Icon ref={ref} name="couch" svg={svg} {...props} />);

Couch.displayName = 'CouchIcon';

export default Couch;
