import React from 'react';
import { node, string, bool, func } from 'prop-types';
import styled from 'styled-components';

import Box from 'sly/components/atoms/Box';

const StyledBox = styled(Box)`
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const BoxChoiceTile = ({
  label, children, selected, onClick, ...props
}) => (
  <StyledBox
    {...props}
    padding="regular"
    border={selected ? 'large' : 'regular'}
    palette={selected ? 'primary' : 'slate'}
    highlighted={selected}
    onClick={onClick}
  >
    {children || label}
  </StyledBox>
);

BoxChoiceTile.propTypes = {
  label: string,
  children: node,
  selected: bool,
  onClick: func,
};

export default BoxChoiceTile;
