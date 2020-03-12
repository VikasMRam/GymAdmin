import React from 'react';
import { node, string, bool, func } from 'prop-types';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { palette, size } from 'sly/components/themes';
import Box from 'sly/components/atoms/Box';
import Icon from 'sly/components/atoms/Icon';

const StyledBox = styled(Box)`
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-color: ${ifProp('highlighted', palette('secondary', 'dark35'), palette('stroke'))}};
`;

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

const BoxChoiceTile = ({
  label, children, selected, onClick, hasCheckbox, ...props
}) => (
  <StyledBox
    {...props}
    padding="large"
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
};

export default BoxChoiceTile;
