import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/family.svg').default;

const Family = forwardRef((props, ref) => <Icon ref={ref} name="family" svg={svg} {...props} />);

Family.displayName = 'FamilyIcon';

export default Family;
