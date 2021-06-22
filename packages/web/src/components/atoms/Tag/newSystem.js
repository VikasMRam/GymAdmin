import React from 'react';
import { bool, string } from 'prop-types';

import { Block } from 'sly/common/system';

const Tag = ({ ...props }) => {
  if (props.outline) {
    props.border = 's';
  } else {
    props.background = props.color;
    props.color = 'white';
  }

  return <Block {...props} />;
};

Tag.displayName = 'Tag';

Tag.propTypes = {
  palette: string,
  outline: bool,
  color: string,
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
