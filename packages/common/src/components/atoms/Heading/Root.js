import React, { forwardRef } from 'react';
import { string } from 'prop-types';

import Block from 'sly/common/components/atoms/Block';

const Root = forwardRef((props, ref) => {
  switch (props.level || props.size) {
    case 'hero': return <Block as="h1" ref={ref} {...props} />;
    case 'title': return <Block as="h2" ref={ref} {...props} />;
    case 'subtitle': return <Block as="h3" ref={ref} {...props} />;
    case 'body': return <Block as="h4" ref={ref} {...props} />;
    default: return <Block as="h1" ref={ref} {...props} />;
  }
});

Root.propTypes = {
  level: string,
  size: string,
};

export default Root;
