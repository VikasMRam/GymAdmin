import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/view.svg').default
// import ViewSvg from './svg/view.svg';

const View = forwardRef((props, ref) => <Icon ref={ref} name="view" svg={svg} {...props} />);

View.displayName = 'ViewIcon';

export default View;