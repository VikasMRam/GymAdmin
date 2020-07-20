/* eslint-disable key-spacing,no-multi-spaces */
import theme from './index.common';

import { remToPx } from 'sly/common/components/themes';
import { objectMap } from 'sly/common/services/helpers/utils';

const convertValueToRem = val =>
  typeof val === 'object' ? objectMap(val, convertValueToRem) : remToPx(val);

theme.sizes = objectMap(theme.sizes, convertValueToRem);

export default theme;
