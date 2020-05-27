import React from 'react';
import { node, string, bool, func, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp, prop } from 'styled-tools';

import { palette, size } from 'sly/web/components/themes';
import { spacing as spacingPropType } from 'sly/web/propTypes/spacing';
import { palette as palettePropType } from 'sly/web/propTypes/palette';
import Box from 'sly/web/components/atoms/Box';
import Icon from 'sly/web/components/atoms/Icon';

const StyledBox = styled(Box)`
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: ${prop('align')};
  border-color: ${ifProp('highlighted', palette('dark35'), palette('stroke'))}};
  background-color: ${ifProp('highlighted', palette('background'), 'transparent')}};
  ${ifProp('highlighted', css`color: ${palette('base')}`)}
`;

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

const BoxChoiceTile = ({
  label, children, selected, onClick, hasCheckbox, padding, palette, ...props
}) => (
  <StyledBox
    {...props}
    padding={padding}
    size="caption"
    border={selected ? 'large' : 'regular'}
    palette={selected ? 'primary' : 'slate'}
    highlighted={selected}
    onClick={onClick}
  >
    {!selected && hasCheckbox && <StyledIcon icon="checkbox-empty" palette={palette} variation="filler" />}
    {selected && hasCheckbox && <StyledIcon icon="checkbox" palette={palette} variation="dark35" />}
    {children || label}
  </StyledBox>
);

BoxChoiceTile.propTypes = {
  label: string,
  children: node,
  selected: bool,
  onClick: func,
  hasCheckbox: bool,
  padding: spacingPropType,
  palette: palettePropType,
  align: oneOf(['center', 'left']),
};

BoxChoiceTile.defaultProps = {
  padding: 'large',
  align: 'center',
  palette: 'grey',
};

export default BoxChoiceTile;
