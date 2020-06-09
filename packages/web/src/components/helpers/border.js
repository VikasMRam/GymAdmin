import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/web/components/themes';
import { getColor } from 'sly/web/components/helpers';
import { getCardinalValues } from 'sly/web/components/helpers/getCardinalValues';

const border = (Component, borderSize = 'regular', borderPalette = 'grey', borderPaletteVariation = 'base') => styled(Component)`
  border: ${size('border', borderSize)} ${palette(borderPalette, borderPaletteVariation)} solid;
`;


export const withBorder = props => css`
  ${ifProp('border', getCardinalValues(props, 'border', 'border'))};
  ${ifProp('borderRadius', css`border-radius: ${size('spacing', props.borderRadius)}`)};
  
  border-color: ${getColor(props.borderPalette || 'slate', props.borderVariation || 'lighter-90')};
`;

export default border;
