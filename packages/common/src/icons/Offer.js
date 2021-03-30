import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/offer.svg').default;

const Offer = forwardRef((props, ref) => <Icon ref={ref} name="offer" svg={svg} {...props} />);

Offer.displayName = 'OfferIcon';

export default Offer;
