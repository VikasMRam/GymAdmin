import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/edit.svg').default
// import EditSvg from './svg/edit.svg';

const Edit = forwardRef((props, ref) => <Icon ref={ref} name="edit" svg={svg} {...props} />);

Edit.displayName = 'EditIcon';

export default Edit;