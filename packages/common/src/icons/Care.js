import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/care.svg').default;

const Care = forwardRef((props, ref) => <Icon ref={ref} name="care" svg={svg} {...props} />);

Care.displayName = 'CareIcon';

export default Care;
