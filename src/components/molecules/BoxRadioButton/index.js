import React from 'react';
import { Field } from 'redux-form';
import { string, bool } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';
import { ifProp } from 'styled-tools';

import { size } from 'sly/components/themes';

import { Box, Icon } from 'sly/components/atoms';
import HelpBubble from 'sly/components/molecules/HelpBubble';
import ReduxField from 'sly/components/organisms/ReduxField';

const StyledField = styled(Field)`
  width: 100%;
  margin: 0;

  input {
    display: none!important;
  }

  label {
    margin: 0;
    cursor: pointer;
    padding: calc(${size('spacing.regular')} + ${size('spacing.small')}) 0;
  }
`;
const StyledBox = styled(Box)`
  border-color: ${ifProp('checked', palette('secondary', 0), palette('primary', 3))};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0;
  padding: 0 ${size('spacing.large')};
`;
const StyledHelpBubble = styled(HelpBubble)`
  span {
    color: red;
  }
`;
const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.large')};
`;

const BoxRadioButton = ({ name, checked, ...props }) => (
  <StyledBox checked={checked}>
    {checked && <StyledIcon icon="round-checkmark" />}
    <StyledField
      {...props}
      name={name}
      type="radio"
      component={ReduxField}
    />
    <StyledHelpBubble text="help text here" />
  </StyledBox>
);

BoxRadioButton.propTypes = {
  name: string,
  checked: bool,
};

export default BoxRadioButton;
