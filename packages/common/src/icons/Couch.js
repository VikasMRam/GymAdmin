import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/couch.svg').default
// import CouchSvg from './svg/couch.svg';

const Couch = forwardRef((props, ref) => <Icon ref={ref} name="couch" svg={svg} {...props} />);

Couch.displayName = 'CouchIcon';

export default Couch;