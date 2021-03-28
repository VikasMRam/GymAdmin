import React, { forwardRef } from 'react';

import Block from 'sly/common/system/Block';

const Box = forwardRef((props, ref) => (
  <Block
    ref={ref}
    border="box"
    padding={['m', 'l']}
    {...props}
  />
));

Box.displayName = 'Box';

export default Box;
