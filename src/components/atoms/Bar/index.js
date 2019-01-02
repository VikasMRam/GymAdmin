import { number } from 'prop-types';
import styled from 'styled-components';
import { prop } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { variation as variationPropType } from 'sly/propTypes/variation';

const backgroundColour = ({ palette: paletteProp, variation }) => palette(paletteProp, variation);

const Bar = styled.div`
  background-color: ${backgroundColour};
  border: ${size('border.regular')} solid ${palette('grey', 'filler')};
  border-radius: ${size('border.xLarge')};
  height: ${size('element.small')};
  width: ${prop('width')}%;
`;

Bar.propTypes = {
  palette: palettePropType,
  variation: variationPropType,
  width: number,
};

Bar.defaultProps = {
  palette: 'white',
  variation: 'base',
  width: 100,
};

export default Bar;
