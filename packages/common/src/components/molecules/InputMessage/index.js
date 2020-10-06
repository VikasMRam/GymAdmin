import React from 'react';
import { string } from 'prop-types';

import { Icon, Block } from 'sly/common/components/atoms';

const InputMessage = ({
  name, icon, iconSize, palette, message, ...props
}) => (
  <Block {...props}>
    <Icon marginRight="regular" icon={icon} size={iconSize} palette={palette} />
    <Block id={name} role="alert" palette={palette} size="caption">
      {message}
    </Block>
  </Block>
);

InputMessage.propTypes = {
  name: string.isRequired,
  icon: string.isRequired,
  iconSize: string,
  palette: string.isRequired,
  message: string.isRequired,
};

InputMessage.defaultProps = {
  verticalAlign: 'middle',
  display: 'flex',
};

export default InputMessage;
