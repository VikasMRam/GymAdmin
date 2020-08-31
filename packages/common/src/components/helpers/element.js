import { css } from 'styled-components';

import { getSize } from 'sly/common/components/themes';

export const withElementSize = ({ elementSize }) => elementSize && css({
  height: getSize('element', elementSize),
});
