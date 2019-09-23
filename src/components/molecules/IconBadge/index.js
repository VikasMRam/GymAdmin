import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { Badge, Icon, Block } from 'sly/components/atoms';

const borderRadius = ({ borderRadius }) => size('spacing', borderRadius);

const StyledBadge = styled(Badge)`
  border-radius: ${borderRadius};
  border: ${size('border.regular')} solid ${palette('slate.stroke')};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: ${size('spacing.small')} ${size('spacing.regular')};
`;

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.small')};
`;

const IconBadge = ({
  palette, text, icon, borderRadius,
}) => (
  <StyledBadge palette="white" textPalette={palette} borderRadius={borderRadius}>
    <StyledIcon icon={icon} palette={palette} size="small" />
    <Block weight="bold" palette={palette} size="tiny">
      {text}
    </Block>
  </StyledBadge>
);

IconBadge.propTypes = {
  borderRadius: string.isRequired,
  icon: string.isRequired,
  text: string,
  palette: palettePropType.isRequired,
};

IconBadge.defaultProps = {
  palette: 'green',
  borderRadius: 'small',
};

export default IconBadge;
