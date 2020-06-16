import React from 'react';
import { node, string } from 'prop-types';

import pad from 'sly/web/components/helpers/pad';
import { Box, Block } from 'sly/web/components/atoms';

const PaddedBlock = pad(Block);
PaddedBlock.displayName = 'PaddedBlock';

const TipBox = ({
  heading, children, className,
}) => (
  <Box palette="grey" backgroundPalette="grey" backgroundVariation="background" className={className}>
    <PaddedBlock weight="bold" size="tiny" palette="primary" variation="base">{heading}</PaddedBlock>
    {children}
  </Box>
);

TipBox.propTypes = {
  heading: string.isRequired,
  children: node,
  className: string,
};

export default TipBox;
