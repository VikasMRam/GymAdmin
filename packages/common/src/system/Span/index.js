import React, { forwardRef } from 'react';

import Block from 'sly/common/system/Block';

const Span = forwardRef((props, ref) => <Block ref={ref} as="span" {...props} />);

export default Span;
