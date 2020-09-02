import React from 'react';
import { bool, string } from 'prop-types';

import Block from 'sly/common/components/atoms/Block';

const Tag = ({ ...props }) => {
  if (props.outline) {
    props.border = 'regular';
  } else {
    props.background = props.palette;
    props.palette = 'white';
  }

  return <Block {...props} />;
};

Tag.displayName = 'Tag';

Tag.propTypes = {
  palette: string,
  outline: bool,
};

Tag.defaultProps = {
  size: 'tiny',
  weight: 'bold',
  elementSize: 'tag',
  borderRadius: 'small',
  display: 'inline-flex',
  palette: 'primary',
  align: 'center',
  justifyContent: 'center',
  padding: '0 regular',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  singleLine: true,
};

export default Tag;
