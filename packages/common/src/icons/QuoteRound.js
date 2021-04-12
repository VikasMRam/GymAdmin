import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/quote-round.svg').default;

const QuoteRound = forwardRef((props, ref) => <Icon ref={ref} name="quote-round" svg={svg} {...props} />);

QuoteRound.displayName = 'QuoteRoundIcon';

export default QuoteRound;
