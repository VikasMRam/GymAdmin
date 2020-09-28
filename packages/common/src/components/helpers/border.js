import { css } from 'styled-components';

import { getColor } from './getColor';
import { getCardinalValues } from './getCardinalValues';

import { size } from 'sly/common/components/themes';

const getBorderColor = (p, v) => getColor(p, v, 'slate.lighter-90');

const borderDecorator = x => `${x} solid`;

export const withBorder = (props) => {
  const values = getCardinalValues(props, 'border', 'border', borderDecorator);

  if (props.borderPalette || Object.keys(values).length) {
    values.borderColor = getBorderColor('borderPalette', 'borderVariation')(props);
  }
  if (props.borderRadius) {
    // support borderRadius="50%", borderRadius="25%" etc
    values.borderRadius =
      props.borderRadius.endsWith('%') ? props.borderRadius : size('spacing', props.borderRadius)(props);
  }
  if (Object.keys(values).length) {
    return css(values);
  }

  return null;
};

export default withBorder;
