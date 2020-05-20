import React from 'react';
import { node, string } from 'prop-types';

import pad from 'sly/web/components/helpers/pad';
import { Box, Block } from 'sly/web/components/atoms';

const PaddedBlock = pad(Block);
PaddedBlock.displayName = 'PaddedBlock';

const TipBox = ({
  heading, children,
}) => (
  <Box palette="grey" backgroundPalette="grey" backgroundVariation="background">
    <PaddedBlock weight="bold" size="tiny" palette="secondary" variation="dark35">{heading}</PaddedBlock>
    {children}
  </Box>
);

TipBox.propTypes = {
  heading: string.isRequired,
  children: node,
};

export default TipBox;
