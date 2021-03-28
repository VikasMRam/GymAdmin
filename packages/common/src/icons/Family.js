import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/family.svg').default
// import FamilySvg from './svg/family.svg';

const Family = forwardRef((props, ref) => <Icon ref={ref} name="family" svg={svg} {...props} />);

Family.displayName = 'FamilyIcon';

export default Family;