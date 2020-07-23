import React from 'react';
import { string, node } from 'prop-types';

import { Block, Icon } from 'sly/common/components/atoms';

const ButtonLink = ({ icon, palette, size, children, ...props }) => (
  <Block palette={palette} size={size} {...props}>
    {icon && <Icon testID="Icon" icon={icon} palette={palette} size={size} />}
    {children}
  </Block>
);

ButtonLink.propTypes = {
  palette: string.isRequired,
  size: string,
  icon: string,
  children: node,
};

ButtonLink.defaultProps = {
  display: 'inline-flex',
  palette: 'secondary',
  cursor: 'pointer',
};

export default ButtonLink;
