import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/web/components/themes';
import { getCardinalValues } from 'sly/web/components/helpers/getCardinalValues';

import { getColor } from './getColor';

const border = (Component, borderSize = 'regular', borderPalette = 'grey', borderPaletteVariation = 'base') => styled(Component)`
  border: ${size('border', borderSize)} ${palette(borderPalette, borderPaletteVariation)} solid;
`;

const getBorderColor = (p, v) => getColor(p, v, 'slate.lighter-90');

const borderDecorator = x => `${x} solid`;
export const withBorder = (props) => {
  const values = getCardinalValues(props, 'border', 'border', borderDecorator);

  if (props.borderPalette || Object.keys(values).length) {
    values.borderColor = getBorderColor('borderPalette', 'borderVariation')(props);
  }
  if (props.borderRadius) {
    values.borderRadius = size('spacing', props.borderRadius)();
  }
  if (Object.keys(values).length) {
    return css(values);
  }

  return null;
};

export default border;
