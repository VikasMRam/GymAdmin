import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { variation as variationPropType } from 'sly/propTypes/variation';
import { Hr, Span, Badge } from 'sly/components/atoms';

const Wrapper = styled.div`
  position: relative;
  text-align: center;
`;

const TextBlock = styled(Span)`
  position: absolute;
  margin-top: -${size('spacing.xxLarge')};
  background: ${palette('white', 'base')};
  padding: 0 ${size('spacing.large')};
`;

const StyledBadge = styled(Badge)`
  position: absolute;
  margin-top: calc(-${size('spacing.xxLarge')} + -${size('spacing.tiny')});
  right: ${size('spacing.large')};
`;

const HrWithText = ({
  text, badgeText, palette, variation, badgeTextpalette,
}) => (
  <Wrapper>
    <Hr palette={palette} variation={variation} />
    <TextBlock size="caption" weight="medium">{text}</TextBlock>
    {badgeText && <StyledBadge palette={palette} variation={variation} textPalette={badgeTextpalette}>{badgeText}</StyledBadge>}
  </Wrapper>
);

HrWithText.propTypes = {
  palette: palettePropType,
  badgeTextpalette: palettePropType,
  variation: variationPropType,
  text: string.isRequired,
  badgeText: string,
};

export default HrWithText;
