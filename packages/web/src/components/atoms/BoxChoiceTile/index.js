import React from 'react';
import { node, string, bool, func, oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifProp, prop } from 'styled-tools';

import { palette, size } from 'sly/web/components/themes';
import { spacing as spacingPropType } from 'sly/common/propTypes/spacing';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import Box from 'sly/web/components/atoms/Box';
import Icon from 'sly/web/components/atoms/Icon';

const getHoverBorderColour = ({ highlightedPalette }) => palette(highlightedPalette, 'base');

const StyledBox = styled(Box)`
  text-align: ${prop('align')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: ${prop('align')};
  border-color: ${ifProp('highlighted', palette('base'), palette('stroke'))}};
  background-color: ${ifProp('highlighted', palette('background'), 'transparent')}};
  ${ifProp('highlighted', css`
    color: ${palette('base')}
  `, css`
    &:hover {
      border-color: ${getHoverBorderColour};
    }
  `)}
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
    weight={selected ? 'bold' : 'regular'}
    border={selected ? 'large' : 'regular'}
    palette={selected ? palette : 'slate'}
    highlightedPalette={palette}
    highlighted={selected}
    onClick={onClick}
  >
    {!selected && hasCheckbox && <StyledIcon icon="checkbox-empty" palette="grey" variation="filler" />}
    {selected && hasCheckbox && <StyledIcon icon="checkbox" palette={palette} variation="base" />}
    {children || label}
  </StyledBox>
);

BoxChoiceTile.propTypes = {
  label: string,
  children: node,
  selected: bool,
  onClick: func,
  hasCheckbox: bool,
  padding: spacingPropType.isRequired,
  palette: palettePropType.isRequired,
  align: oneOf(['center', 'left']).isRequired,
};

BoxChoiceTile.defaultProps = {
  padding: 'large',
  align: 'center',
  palette: 'primary',
};

export default BoxChoiceTile;
