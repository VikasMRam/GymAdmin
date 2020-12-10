import React from 'react';
import { string, node, object } from 'prop-types';

import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { Box, Heading, Block, Button } from 'sly/common/components/atoms';
import { Image } from 'sly/web/components/atoms';

const HomeCTABox = ({ image, heading, children, buttonText, buttonPalette, buttonProps }) => (
  <Box
    background="harvest.lighter-90"
    padding="xLarge"
    paddingTop="xxxLarge"
  >
    <Block textAlign="center" pad="xLarge">
      <Image src={image} />
    </Block>
    <Heading pad="large" size="displayS" align="center">{heading}</Heading>
    <Block size="subtitle" weight="regular" pad="xLarge" align="center">
      {children}
    </Block>
    <Block align="center" display="flex">
      <Button
        width="100%"
        align="center"
        background={buttonPalette}
        startingWithTablet={{
          maxWidth: '280px',
        }}
        {...buttonProps}
      >
        {buttonText}
      </Button>
    </Block>
  </Box>
);

HomeCTABox.propTypes = {
  image: string.isRequired,
  heading: string.isRequired,
  children: node.isRequired,
  buttonText: string.isRequired,
  buttonPalette: palettePropType.isRequired,
  buttonProps: object.isRequired,
};

HomeCTABox.defaultProps = {
  buttonPalette: 'yellow',
  buttonProps: {},
};

export default HomeCTABox;
