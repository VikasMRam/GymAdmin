import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/radio.svg').default
// import RadioSvg from './svg/radio.svg';

const Radio = forwardRef((props, ref) => <Icon ref={ref} name="radio" svg={svg} {...props} />);

Radio.displayName = 'RadioIcon';

export default Radio;