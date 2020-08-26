import { css } from 'styled-components';

import { getSize } from 'sly/common/components/themes';

export default function withGutter({ horizontalGutter, verticalGutter }) {
  if (verticalGutter) {
    return css`
      & > * {
        margin-bottom: ${getSize('spacing', verticalGutter) || verticalGutter}; 
      }
      & > *:last-child {
        margin-bottom: 0;
      }
    `;
  }
  if (horizontalGutter) {
    return css`
      & > * {
        margin-right: ${getSize('spacing', horizontalGutter) || horizontalGutter}; 
      }
      & > *:last-child {
        margin-right: 0;
      }
    `;
  }

  return null;
}
