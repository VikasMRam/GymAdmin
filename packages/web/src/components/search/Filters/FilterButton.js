import React, { forwardRef } from 'react';
import { bool, node, number, oneOfType, string } from 'prop-types';
import styled from 'styled-components';


import { Block, Span, space, color } from 'sly/common/system';

const Button = styled(Block)`
    margin-right: ${space('s')};
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      border-color: ${color('slate.lighter-60')};
    }
  `;

const Number = styled(Span)`
    text-align: center;
    border-radius: 4px;
    width: 20px;
    height: 20px;
  `;

Number.defaultProps = {
  marginRight: 'xs',
  color: 'white.base',
  background: 'primary.base',
};

const FilterButton = forwardRef(({
  number = 0,
  selected,
  children,
  ...props
}, ref) => {
  return (
    <Button
      ref={ref}
      display="flex"
      background={(number || selected) ? 'primary.lighter-90' : 'transparent'}
      sx={{
        '&:hover': {
          background: 'primary.lighter-90',
        },
      }}
      font="body-s"
      alignItems="center"
      border="s"
      borderColor="slate.lighter-90"
      borderRadius="l"
      height="m"
      padding="0 m"
      {...props}
    >
      {number > 0 && (
        <Number>{number}</Number>
      )}
      {' '}
      {children}
    </Button>
  );
});

FilterButton.propTypes = {
  selected: bool,
  number,
  children: oneOfType([node, string]),
};

export default FilterButton;
