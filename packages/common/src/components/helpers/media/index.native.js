import { Dimensions } from 'react-native';
import { css } from 'styled-components';

import { getKey } from 'sly/common/components/themes';

// TODO: integrate iterateDevices

export const upTo = (device, styles) => {
  const windowWidth = Dimensions.get('window').width;
  const deviceBreakpoint = getKey('sizes', 'breakpoint', device);

  if (windowWidth < deviceBreakpoint.replace('px', '')) {
    return css`
      ${styles}
    `;
  }

  return null;
};

export const startingWith = (device, styles) => {
  const windowWidth = Dimensions.get('window').width;
  const deviceBreakpoint = getKey('sizes', 'breakpoint', device);

  if (windowWidth >= deviceBreakpoint.replace('px', '')) {
    return css`
      ${styles}
    `;
  }

  return null;
};
