import { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { upTo, startingWith } from './funcs';
import iterateDevices from './iterateDevices';

export { upTo, startingWith };

export const withMedia = ({ upTo: upToDevice, startingWith: startingWithDevice }) => css`
  ${iterateDevices}

  ${ifProp('upTo', css`
    display: none;
    ${upTo(upToDevice, css`
      display: block;
    `)}
  `)}

  ${ifProp('startingWith', css`
    display: none;
    ${startingWith(startingWithDevice, css`
      display: block;
    `)}
  `)}
`;
