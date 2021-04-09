import React from 'react';
import styled from 'styled-components';

import { Chevron } from 'sly/common/icons';
import { Block } from 'sly/common/system';

const Wrapper = styled(Block)`
  width: 48px;
  height: 48px;
  display: flex;
  border-radius: 24px;
  background: white;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, .1));
  cursor: pointer;
`;

const CarrousselButton = ({ color, iconSize, rotation, ...props }) => (
  <Wrapper {...props}>
    <Chevron
      sx={{
        margin: 'auto',
        verticalAlign: 'unset',
      }}
      color={color}
      size={iconSize}
      rotation={rotation}
    />
  </Wrapper>
);

Chevron.defaultProps = {
  iconSize: 'm',
  color: 'slate',
};

export default CarrousselButton;
