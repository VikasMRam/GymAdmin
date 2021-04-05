import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/favorite.svg').default;

const Favorite = forwardRef((props, ref) => <Icon ref={ref} name="favorite" svg={svg} {...props} />);

Favorite.displayName = 'FavoriteIcon';

export default Favorite;
