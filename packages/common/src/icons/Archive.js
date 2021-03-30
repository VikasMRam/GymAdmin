import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/archive.svg').default;

const Archive = forwardRef((props, ref) => <Icon ref={ref} name="archive" svg={svg} {...props} />);

Archive.displayName = 'ArchiveIcon';

export default Archive;
