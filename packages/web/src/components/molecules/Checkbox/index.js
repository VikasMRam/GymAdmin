import React from 'react';
import { bool, string } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { palette } from 'sly/common/components/themes';
import { Icon } from 'sly/common/components/atoms';

const checkedPalette = ({ palette: checkedPalette }) => palette(checkedPalette, 'darker-30');
const uncheckedPalette = ({ uncheckedPalette }) => palette(uncheckedPalette, 'base');

export const StyledIcon = styled(Icon)`
  svg {
    color: ${ifProp('checked', checkedPalette, uncheckedPalette)};
  }
`;

const Checkbox = ({ checked, ...props }) => (
  <StyledIcon
    icon={checked ? 'checkbox' : 'checkbox-empty'}
    {...props}
  />
);

Checkbox.propTypes = {
  checked: bool.isRequired,
  palette: string,
};

Checkbox.defaultProps = {
  checked: false,
  palette: 'primary',
  uncheckedPalette: 'white',
};

export default Checkbox;
