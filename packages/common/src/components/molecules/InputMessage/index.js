import React from 'react';
import { bool, string } from 'prop-types';

import { Icon, Block } from 'sly/common/components/atoms';

const InputMessage = ({
  name, showIcon, icon, iconSize, palette, message, ...props
}) => (
  <>
    {message &&
    <Block {...props}>
      {showIcon && <Icon marginRight="regular" icon={icon} size={iconSize} palette={palette} />}
      <Block id={name} role="alert" palette={palette} size="caption">
        {message}
      </Block>
    </Block>}
  </>
);

InputMessage.propTypes = {
  name: string.isRequired,
  icon: string.isRequired,
  iconSize: string,
  palette: string.isRequired,
  message: string.isRequired,
  showIcon: bool,
};

InputMessage.defaultProps = {
  verticalAlign: 'middle',
  display: 'flex',
  showIcon: true,
};

export default InputMessage;
