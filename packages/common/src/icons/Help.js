import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/help.svg').default
// import HelpSvg from './svg/help.svg';

const Help = forwardRef((props, ref) => <Icon ref={ref} name="help" svg={svg} {...props} />);

Help.displayName = 'HelpIcon';

export default Help;