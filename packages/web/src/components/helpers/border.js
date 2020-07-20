import styled from 'styled-components';

import { size, palette } from 'sly/common/components/themes';

const border = (Component, borderSize = 'regular', borderPalette = 'grey', borderPaletteVariation = 'base') => styled(Component)`
  border: ${size('border', borderSize)} ${palette(borderPalette, borderPaletteVariation)} solid;
`;

export default border;
