import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import { size } from 'sly/web/components/themes';
import { Icon, Block } from 'sly/web/components/atoms';

const ErrorWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

const InputMessage = ({
  name, icon, iconSize, palette, message, className,
}) => (
  <ErrorWrapper className={className}>
    <StyledIcon icon={icon} size={iconSize} palette={palette} />
    <Block id={name} role="alert" palette={palette} size="caption">
      {message}
    </Block>
  </ErrorWrapper>
);

InputMessage.propTypes = {
  name: string.isRequired,
  icon: string.isRequired,
  iconSize: string,
  palette: string.isRequired,
  message: string.isRequired,
  className: string,
};

export default InputMessage;
