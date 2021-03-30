import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/edit.svg').default;

const Edit = forwardRef((props, ref) => <Icon ref={ref} name="edit" svg={svg} {...props} />);

Edit.displayName = 'EditIcon';

export default Edit;
