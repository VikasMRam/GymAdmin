import React from 'react';
import { bool, node, string, oneOfType, arrayOf } from 'prop-types';

import { Span } from 'sly/common/system';

const EntityInfoDescription = ({ type, inverted, children, ...props }) => {
  return (
    <Span
      whiteSpace="nowrap"
      overflow="hidden"
      textOverflow="ellipsis"
      display="flex"
      width="100%"
      sx={{
        font: type === 'map' ? 'body-s' : 'body-m',
      }}
      sx$tablet={{
        font: type === 'map' && 'body-m',
      }}
      sx$laptop={{
        font: type === 'map' && 'body-s',
      }}
      color={inverted ? 'white' : 'slate.lighter-40'}
      pad="xxs"
      {...props}
    >
      {children}
    </Span>
  );
};

EntityInfoDescription.propTypes = {
  type: string,
  inverted: bool,
  children: oneOfType([
    arrayOf(node),
    node,
  ]).isRequired,
};

export default EntityInfoDescription;
