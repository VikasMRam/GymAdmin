import React from 'react';
import styled from 'styled-components';

import Icon from 'sly/common/components/atoms/Icon';

const CarrousselButton = styled(Icon)`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  background: white;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, .1));
  cursor: pointer;
`;

CarrousselButton.defaultProps = {
  icon: 'chevron',
  size: 'caption',
  palette: 'slate',
};

export default CarrousselButton;
