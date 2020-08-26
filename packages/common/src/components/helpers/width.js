import { css } from 'styled-components';

import { getKey } from 'sly/common/components/themes';

export const withWidth = ({ width }) => width && css({
  width: getKey('sizes', 'layout', width) || width,
});
