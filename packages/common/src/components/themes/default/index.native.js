/* eslint-disable key-spacing,no-multi-spaces */
import theme from './index.common';

import { remToPx } from 'sly/common/components/themes';
import { objectMap } from 'sly/common/services/helpers/utils';

const convertValueToPx = val =>
  typeof val === 'object' ? objectMap(val, convertValueToPx) : remToPx(val, true);

theme.sizes = objectMap(theme.sizes, convertValueToPx);

export default theme;
