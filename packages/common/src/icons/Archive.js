import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/archive.svg').default
// import ArchiveSvg from './svg/archive.svg';

const Archive = forwardRef((props, ref) => <Icon ref={ref} name="archive" svg={svg} {...props} />);

Archive.displayName = 'ArchiveIcon';

export default Archive;