import React from 'react';
import { string, node } from 'prop-types';

import { Block } from 'sly/common/system';

const ButtonLink = ({ Icon, color, font, children, ...props }) => (
  <Block {...props}>
    {Icon && <Icon />}
    <Block display="inline" color={color} font={font}>{children}</Block>
  </Block>
);

ButtonLink.propTypes = {
  color: string,
  font: string,
  Icon: node,
  children: node,
};

ButtonLink.defaultProps = {
  color: 'primary',
  sx: { cursor: 'pointer' },
  font: 'title-xs-azo',
  display: 'inline',
};

export default ButtonLink;
