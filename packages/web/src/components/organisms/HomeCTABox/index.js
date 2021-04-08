import React from 'react';
import { string, node, object } from 'prop-types';

import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { Heading, Block, Button, Image } from 'sly/common/system';

const HomeCTABox = ({ image, heading, children, buttonText, buttonPalette, buttonProps }) => (
  <Block
    background="harvest.lighter-90"
    padding="l"
    paddingTop="xxl"
    borderRadius="xs"
  >
    <Block textAlign="center" pad="l">
      <Image src={image} />
    </Block>
    <Heading pad="m" font="title-m" textAlign="center">{heading}</Heading>
    <Block font="body-l" pad="l" textAlign="center">
      {children}
    </Block>
    <Block alignItems="center" display="flex">
      <Button
        width="100%"
        align="center"
        palette={buttonPalette}
        {...buttonProps}
      >
        {buttonText}
      </Button>
    </Block>
  </Block>
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
