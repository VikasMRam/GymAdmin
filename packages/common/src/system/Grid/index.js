import React, { forwardRef } from 'react';

import Block from 'sly/common/system/Block';

const Grid = forwardRef((props, ref) => <Block ref={ref} display="grid" {...props} />);

export default Grid;
