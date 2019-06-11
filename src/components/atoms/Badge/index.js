import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { variation as variationPropType } from 'sly/propTypes/variation';

const backgroundColour = ({ palette: paletteProp, variation }) => palette(paletteProp, variation);

const textColour = ({ textPalette }) => palette(textPalette, 'base');

const Badge = styled.div`
  background-color: ${backgroundColour};
  border-radius: ${size('text.caption')};
  font-size: ${size('text.tiny')};
  font-weight: ${size('weight.medium')};
  padding: ${size('spacing.tiny')} ${size('spacing.regular')};
  display: inline-block;
  color: ${textColour};
`;

Badge.propTypes = {
  palette: palettePropType,
  textPalette: palettePropType,
  variation: variationPropType,
};

Badge.defaultProps = {
  palette: 'warning',
  variation: 'base',
  textPalette: 'slate',
};

export default Badge;
