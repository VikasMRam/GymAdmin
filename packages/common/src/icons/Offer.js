import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/offer.svg').default
// import OfferSvg from './svg/offer.svg';

const Offer = forwardRef((props, ref) => <Icon ref={ref} name="offer" svg={svg} {...props} />);

Offer.displayName = 'OfferIcon';

export default Offer;