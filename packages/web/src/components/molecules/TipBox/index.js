import React from 'react';
import { node, string } from 'prop-types';

import { Box, Block } from 'sly/web/components/atoms';

const TipBox = ({
  heading, children, ...props
}) => (
  <Box {...props}>
    <Block pad="large" weight="bold" size="tiny" palette="primary" variation="base">{heading}</Block>
    {children}
  </Box>
);

TipBox.propTypes = {
  heading: string.isRequired,
  children: node,
};

TipBox.defaultProps = {
  palette: 'grey',
  background: 'slate.lighter-90',
};

export default TipBox;
