import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/web/components/themes';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { variation as variationPropType } from 'sly/common/propTypes/variation';
import { text as textPropType } from 'sly/common/propTypes/text';
import { Badge, Icon, Block } from 'sly/web/components/atoms';

const StyledBadge = styled(Badge)`
  border: ${size('border.regular')} solid ${palette('slate.stroke')};
  padding: ${size('spacing.small')} ${size('spacing.regular')};
`;

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.small')};
`;

const IconBadge = ({
  className, palette, badgePalette, badgeVariation, text, icon, borderRadius, size,
}) => (
  <StyledBadge className={className} background={badgePalette} backgroundVariation={badgeVariation} palette={palette} borderRadius={borderRadius}>
    <StyledIcon icon={icon} palette={palette} size="body" />
    <Block weight="bold" palette={palette} size={size}>
      {text}
    </Block>
  </StyledBadge>
);

IconBadge.propTypes = {
  className: string,
  borderRadius: string.isRequired,
  icon: string,
  size: textPropType.isRequired,
  text: string,
  palette: palettePropType.isRequired,
  badgePalette: palettePropType.isRequired,
  badgeVariation: variationPropType,
};

IconBadge.defaultProps = {
  palette: 'green',
  borderRadius: 'small',
  badgePalette: 'white',
  size: 'micro',
};

export default IconBadge;
