import React, { forwardRef } from 'react';

import Block from 'sly/common/system/Block';

const Hr = forwardRef((props, ref) => (
  <Block
    ref={ref}
    as="hr"
    _sx={{
      margin: 0,
      marginBlockStart: 0,
      marginBlockEnd: 0,
      border: 0,
      borderTop: 's',
      borderColor: 'slate.lighter-90',
    }}
    {...props}
  />
));

export default Hr;
