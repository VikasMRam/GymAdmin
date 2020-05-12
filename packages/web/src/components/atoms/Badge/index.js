import styled from 'styled-components';

import { size, palette } from 'sly/web/components/themes';
import { palette as palettePropType } from 'sly/web/propTypes/palette';
import { variation as variationPropType } from 'sly/web/propTypes/variation';
import { spacing as spacingPropType } from 'sly/web/propTypes/spacing';

const backgroundColour = ({ palette: paletteProp, variation }) => palette(paletteProp, variation);

const textColour = ({ textPalette }) => palette(textPalette, 'base');

const borderRadius = ({ borderRadius }) => size('spacing', borderRadius);

const Badge = styled.div`
  background-color: ${backgroundColour};
  border-radius: ${borderRadius};
  font-size: ${size('text.tiny')};
  font-weight: ${size('weight.medium')};
  padding: ${size('spacing.tiny')} ${size('spacing.regular')};
  display: inline-flex;
  align-items: center;
  color: ${textColour};
`;

Badge.propTypes = {
  palette: palettePropType,
  textPalette: palettePropType,
  variation: variationPropType,
  borderRadius: spacingPropType,
};

Badge.defaultProps = {
  palette: 'warning',
  variation: 'base',
  textPalette: 'slate',
  borderRadius: 'large',
};

export default Badge;
