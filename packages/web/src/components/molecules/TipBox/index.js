import React from 'react';
import { node, string } from 'prop-types';

import { Box, Block } from 'sly/web/components/atoms';

const TipBox = ({
  heading, children, className,
}) => (
  <Box palette="grey" background="slate.lighter-90" className={className}>
    <Block pad="large" weight="bold" size="tiny" palette="primary" variation="base">{heading}</Block>
    {children}
  </Box>
);

TipBox.propTypes = {
  heading: string.isRequired,
  children: node,
  className: string,
};

export default TipBox;
