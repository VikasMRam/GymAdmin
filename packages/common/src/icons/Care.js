import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/care.svg').default
// import CareSvg from './svg/care.svg';

const Care = forwardRef((props, ref) => <Icon ref={ref} name="care" svg={svg} {...props} />);

Care.displayName = 'CareIcon';

export default Care;