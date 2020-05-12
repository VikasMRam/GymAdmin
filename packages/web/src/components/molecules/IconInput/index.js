import React from 'react';
import { string, bool } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/web/components/themes';
import { Icon, Input } from 'sly/web/components/atoms';

const borderColor = (p) => {
  if (p.warning) {
    return palette('warning', 'base');
  }
  return p.invalid ? palette('danger', 'base') : palette('slate', 'stroke');
};
const focusBorderColor = (p) => {
  if (p.warning) {
    return palette('warning', 'base');
  }
  return p.invalid ? palette('danger', 'base') : palette('primary', 'base');
};
const backgroundColor = (p) => {
  if (p.disabled) {
    return palette('grey', 'stroke');
  }
  if (p.warning) {
    return palette('warning', 'stroke');
  }
  return p.invalid ? palette('danger', 'stroke') : palette('white', 'base');
};

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  margin-bottom: ${size('spacing.regular')};
  flex-direction: row-reverse;

  input:focus + * {
    border-color: ${focusBorderColor};
  }
`;

const IconWrapper = styled.div`
  border: ${size('border.regular')} solid ${borderColor};
  // todo: non standard padding. remove afterwards if added to theme
  padding: calc(${size('spacing.regular')} + ${size('spacing.small')});
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${size('border.xxLarge')};
  border-bottom-left-radius: ${size('border.xxLarge')};
  background-color: ${backgroundColor};
`;

const StyledInput = styled(Input)`
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const IconInput = ({
  icon, warning, invalid, disabled, ...props
}) => (
  <Wrapper warning={warning} invalid={invalid}>
    <StyledInput {...props} warning={warning} invalid={invalid} disabled={disabled} />
    <IconWrapper warning={warning} invalid={invalid} disabled={disabled}>
      <Icon icon={icon} size="small" palette="slate" />
    </IconWrapper>
  </Wrapper>
);

IconInput.propTypes = {
  invalid: bool,
  warning: bool,
  disabled: bool,
  icon: string.isRequired,
};

IconInput.defaultProps = {
  icon: 'dollar',
};

export default IconInput;
