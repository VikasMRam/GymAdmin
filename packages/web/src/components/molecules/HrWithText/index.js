import React from 'react';
import { string, object } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/web/components/themes';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { variation as variationPropType } from 'sly/common/propTypes/variation';
import { Hr, Span, Badge } from 'sly/web/components/atoms';

const Wrapper = styled.div`
  position: relative;
  height: calc(2 * ${size('spacing.xLarge')});
  padding-top: ${size('spacing.xLarge')};
  hr {
    margin: 0; 
  }
`;

const TextBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  span {
    background: ${palette('white', 'base')};
    padding: 0 ${size('spacing.large')};
  }
`;

const StyledBadge = styled(Badge)`
  position: absolute;
  top: ${size('spacing.medium')};
  right: ${size('spacing.large')};
`;

const HrWithText = ({
  text, badgeText, palette, variation, badgeTextpalette, className, hrRef,
}) => (
  <Wrapper className={className} ref={hrRef}>
    <Hr palette={palette} variation={variation} />
    {text && <TextBlock size="caption" weight="medium"><Span>{text}</Span></TextBlock>}
    {badgeText && <StyledBadge palette={palette} variation={variation} textPalette={badgeTextpalette}>{badgeText}</StyledBadge>}
  </Wrapper>
);

HrWithText.propTypes = {
  palette: palettePropType,
  badgeTextpalette: palettePropType,
  variation: variationPropType,
  text: string,
  badgeText: string,
  className: string,
  hrRef: object,
};

export default HrWithText;
