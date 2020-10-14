import { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { upTo, startingWith } from './funcs';

export { upTo, startingWith };

export const withMedia = ({ upTo: upToDevice, startingWith: startingWithDevice }) => css`
  ${ifProp('upTo', css`
    display: none;
    ${upTo(upToDevice, css`
      display: inherit;
    `)}
  `)}

  ${ifProp('startingWith', css`
    display: none;
    ${startingWith(startingWithDevice, css`
      display: inherit;
    `)}
  `)}
`;
