import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/web/components/themes';
import { getCardinalValues } from 'sly/web/components/helpers/getCardinalValues';

import { getColor } from './getColor';

const border = (Component, borderSize = 'regular', borderPalette = 'grey', borderPaletteVariation = 'base') => styled(Component)`
  border: ${size('border', borderSize)} ${palette(borderPalette, borderPaletteVariation)} solid;
`;

const borderDecorator = x => `${x} solid`;
export const withBorder = props => css`
  ${css(getCardinalValues(props, 'border', 'border', borderDecorator))};
  ${ifProp('borderRadius', css`border-radius: ${size('spacing', props.borderRadius)}`)};
  ${ifProp('borderPalette', css`border-color: ${getColor('borderPalette', 'borderVariation')}`)};
`;

export default border;
