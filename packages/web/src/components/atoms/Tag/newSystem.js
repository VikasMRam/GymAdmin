import React from 'react';
import { bool, string } from 'prop-types';

import { Block } from 'sly/common/system';

const Tag = ({ background, color, ...props }) => {
  if (props.outline) {
    props.border = 's';
  } else if (background && color) {
    props.background = background;
    props.color = color;
  } else {
    background = color;
    color = 'white';
  }

  return <Block background={background} color={color} {...props} />;
};

Tag.displayName = 'Tag';

Tag.propTypes = {
  palette: string,
  outline: bool,
  color: string,
  background: string,
};

Tag.defaultProps = {
  font: 'body-xs',
  borderRadius: 'xxs',
  display: 'inline-flex',
  color: 'primary',
  align: 'center',
  justifyContent: 'center',
  padding: 'xxs xs',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  singleLine: true,
};

export default Tag;
