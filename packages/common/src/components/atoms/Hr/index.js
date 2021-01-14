import React from 'react';
import styled from 'styled-components';

import Root from './Root';

const Hr = styled(({
  palette, variation, size, ...props
}) => (
  <Root
    borderPalette={palette}
    borderVariation={variation}
    margin={[size, 0]}
    {...props}
  />
))`
  padding: 0;
`;

Hr.defaultProps = {
  palette: 'slate',
  variation: 'lighter-90',
  size: 'xLarge',
  border: 'regular',
};

export default Hr;
