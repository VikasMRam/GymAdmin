import { css } from 'styled-components';

// todo: all these sly/common
import { size, palette } from 'sly/web/components/themes';

const backgroundColour = ({ palette: paletteProp, variation }) => palette(paletteProp, variation);

const borderRadius = ({ borderRadius }) => size('spacing', borderRadius);

const colour = ({ textPalette }) => palette(textPalette, 'base');

export const textStyles = css`
  font-size: ${size('text.tiny')};
  font-weight: ${size('weight.medium')};
  color: ${colour};
`;

export default css`
  ${textStyles}
  background-color: ${backgroundColour};
  border-radius: ${borderRadius};
`;
