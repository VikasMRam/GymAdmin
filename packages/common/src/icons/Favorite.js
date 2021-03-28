import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/favorite.svg').default
// import FavoriteSvg from './svg/favorite.svg';

const Favorite = forwardRef((props, ref) => <Icon ref={ref} name="favorite" svg={svg} {...props} />);

Favorite.displayName = 'FavoriteIcon';

export default Favorite;