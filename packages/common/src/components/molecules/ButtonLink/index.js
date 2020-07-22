import React from 'react';
import { string, node } from 'prop-types';

import wrapperProps from './wrapperProps';

// todo: common after migration
import { Icon } from 'sly/web/components/atoms';
import { Block } from 'sly/common/components/atoms';

const ButtonLink = ({ icon, palette, size, children, ...props }) => (
  <Block palette={palette} size={size} {...props} {...wrapperProps}>
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
  palette: 'secondary',
  cursor: 'pointer',
};

export default ButtonLink;
