import React from 'react';
import { node, string, bool, func, oneOf } from 'prop-types';
import styled from 'styled-components';
import { ifProp, prop } from 'styled-tools';

import { palette, size } from 'sly/web/components/themes';
import { spacing as spacingPropType } from 'sly/web/propTypes/spacing';
import Box from 'sly/web/components/atoms/Box';
import Icon from 'sly/web/components/atoms/Icon';

const StyledBox = styled(Box)`
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: ${prop('align')};
  border-color: ${ifProp('highlighted', palette('secondary', 'dark35'), palette('stroke'))}};
`;

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

const BoxChoiceTile = ({
  label, children, selected, onClick, hasCheckbox, padding, ...props
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
    {!selected && hasCheckbox && <StyledIcon icon="checkbox-empty" palette="grey" variation="filler" />}
    {selected && hasCheckbox && <StyledIcon icon="checkbox" palette="secondary" variation="dark35" />}
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
  align: oneOf(['center', 'left']),
};

BoxChoiceTile.defaultProps = {
  padding: 'large',
  align: 'center',
};

export default BoxChoiceTile;
