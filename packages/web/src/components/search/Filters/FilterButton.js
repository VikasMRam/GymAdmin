import React, { forwardRef } from 'react';
import { node } from 'prop-types';
import styled, { css } from 'styled-components';

import {
  withBorder,
  withDisplay,
  withElementSize,
  withMedia,
  withSpacing,
} from 'sly/common/components/helpers';
import { palette, size } from 'sly/common/components/themes';

const Button = styled.div(
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

const FilterButton = forwardRef(({ children, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      display="flex"
      alignItems="center"
      border="regular"
      borderRadius="large"
      elementSize="small"
      padding="0 large"
      {...props}
    >
      {children}
    </Button>
  );
});

FilterButton.propTypes = {
  children: node,
};

export default FilterButton;
