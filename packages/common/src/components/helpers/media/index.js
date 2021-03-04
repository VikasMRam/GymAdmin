import { css } from 'styled-components';
import { withProp } from 'styled-tools';

import { upTo, startingWith } from './funcs';

export { upTo, startingWith };

export const withMedia = () => css`
  ${withProp('upToDesktop', upToDesktop => upTo('desktop', upToDesktop))}
  ${withProp('upToLaptop', upToLaptop => upTo('laptop', upToLaptop))}
  ${withProp('upToTablet', upToTablet => upTo('tablet', upToTablet))}
  ${withProp('upToMobile', upToMobile => upTo('mobile', upToMobile))}

  ${withProp('startingWith', startingWithStyles => startingWith(null, startingWithStyles))}
  ${withProp('startingWithMobile', startingWithMobile => startingWith('mobile', startingWithMobile))}
  ${withProp('startingWithTablet', startingWithTablet => startingWith('tablet', startingWithTablet))}
  ${withProp('startingWithLaptop', startingWithLaptop => startingWith('laptop', startingWithLaptop))}
`;
