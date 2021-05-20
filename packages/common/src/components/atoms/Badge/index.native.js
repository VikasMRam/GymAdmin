
import React from 'react';
import { string } from 'prop-types';

import Block from 'sly/common/components/atoms/Block';

const Badge = ({
  display, background, backgroundVariation, borderRadius, align,
  ...props
}) => (
  <Block
    display={display}
    background={background}
    backgroundVariation={backgroundVariation}
    borderRadius={borderRadius}
    align={align}
  >
    <Block {...props} />
  </Block>
);

Badge.propTypes = {
  display: string,
  background: string,
  backgroundVariation: string,
  borderRadius: string,
  align: string,
};

Badge.defaultProps = {
  display: 'inline-flex',
  padding: ['tiny', 'regular'],
  background: 'warning',
  backgroundVariation: 'base',
  palette: 'slate',
  size: 'tiny',
  weight: 'medium',
  borderRadius: 'large',
  align: 'center',
};

export default Badge;
