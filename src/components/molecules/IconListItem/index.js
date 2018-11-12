import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Icon, Block } from 'sly/components/atoms/index';

const Wrapper = styled.div`
  display: flex;
`;

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

const IconListItem = ({
  icon, iconSize, iconPalette, text,
}) => {
  return (
    <Wrapper>
      <StyledIcon icon={icon} size={iconSize} palette={iconPalette} />
      <Block>{text}</Block>
    </Wrapper>
  );
};

IconListItem.propTypes = {
  icon: string.isRequired,
  iconSize: string,
  iconPalette: string,
  text: string.isRequired,
};

IconListItem.defaultProps = {
  iconSize: 'regular',
  iconPalette: 'primary',
};

export default IconListItem;
