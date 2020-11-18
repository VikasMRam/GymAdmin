import React, { forwardRef } from 'react';
import { bool, node, number } from 'prop-types';
import styled, { css } from 'styled-components';

import {
  withBorder,
  withColor, withDimensions,
  withDisplay,
  withElementSize,
  withMedia,
  withSpacing, withText,
} from 'sly/common/components/helpers';
import { palette, size } from 'sly/common/components/themes';

const Button = styled.div(
  withText,
  withColor,
  withDisplay,
  withBorder,
  withElementSize,
  withSpacing,
  withMedia,
  css`
    margin-right: ${size('spacing.medium')};
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      border-color: ${palette('slate.lighter-60')};
    }
  `,
);

const Number = styled.span(
  withSpacing,
  withDisplay,
  withColor,
  css`
    text-align: center;
    border-radius: 4px;
    width: 20px;
    height: 20px;
  `,
);

Number.defaultProps = {
  marginRight: 'regular',
  palette: 'white.base',
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
      background={(number || selected) && 'primary.lighter-90'}
      size="caption"
      alignItems="center"
      border="regular"
      borderRadius="large"
      elementSize="small"
      padding="0 large"
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
  children: node,
};

export default FilterButton;
