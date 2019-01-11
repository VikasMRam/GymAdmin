import React from 'react';
import { string, any } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Icon, Span } from 'sly/components/atoms/index';

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  > :first-child {
    flex-grow: 0;
    margin-right: ${size('spacing.regular')};
  }
`;

const IconItem = ({
  icon, iconSize, iconPalette, palette, size, children,
}) => {
  const defIconSize = iconSize || size || undefined;
  return (
    <Wrapper>
      <Icon icon={icon} size={defIconSize} palette={iconPalette} />
      <Span palette={palette} size={size}>{children}</Span>
    </Wrapper>
  );
};

IconItem.propTypes = {
  icon: string.isRequired,
  iconSize: string,
  iconPalette: string,
  size: string,
  palette: string,
  children: any,
};

export default IconItem;
