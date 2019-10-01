import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { variation as variationPropType } from 'sly/propTypes/variation';
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
  className, palette, badgePalette, badgeVariation, text, icon, borderRadius,
}) => (
  <StyledBadge className={className} palette={badgePalette} variation={badgeVariation} textPalette={palette} borderRadius={borderRadius}>
    <StyledIcon icon={icon} palette={palette} size="small" />
    <Block weight="bold" palette={palette} size="nano">
      {text}
    </Block>
  </StyledBadge>
);

IconBadge.propTypes = {
  className: string,
  borderRadius: string.isRequired,
  icon: string,
  text: string,
  palette: palettePropType.isRequired,
  badgePalette: palettePropType.isRequired,
  badgeVariation: variationPropType,
};

IconBadge.defaultProps = {
  palette: 'green',
  borderRadius: 'small',
  badgePalette: 'white',
};

export default IconBadge;
