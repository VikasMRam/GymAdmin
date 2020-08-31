import React from 'react';
import { string, node } from 'prop-types';

import { Block, Icon } from 'sly/common/components/atoms';

const ButtonLink = ({ icon, palette, size, children, ...props }) => (
  <Block {...props}>
    {icon && <Icon testID="Icon" icon={icon} palette={palette} size={size} />}
    <Block display="inline" palette={palette} size={size}>{children}</Block>
  </Block>
);

ButtonLink.propTypes = {
  palette: string.isRequired,
  size: string,
  icon: string,
  children: node,
};

ButtonLink.defaultProps = {
  palette: 'secondary',
  cursor: 'pointer',
  direction: 'row',
};

export default ButtonLink;
