import React from 'react';
import { bool, string } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { palette } from 'sly/web/components/themes';
import { Icon } from 'sly/web/components/atoms';

const checkedPalette = ({ palette: checkedPalette }) => palette(checkedPalette, 'dark35');
const uncheckedPalette = ({ uncheckedPalette }) => palette(uncheckedPalette, 'base');

export const StyledIcon = styled(Icon)`
  svg {
    color: ${ifProp('checked', checkedPalette, uncheckedPalette)};
  }
`;

const Checkbox = props => props.checked ? <StyledIcon icon="checkbox" {...props} /> : <StyledIcon icon="checkbox-empty" {...props} />;

Checkbox.propTypes = {
  checked: bool.isRequired,
  palette: string,
};

Checkbox.defaultProps = {
  checked: false,
  palette: 'secondary',
  uncheckedPalette: 'white',
};

export default Checkbox;
