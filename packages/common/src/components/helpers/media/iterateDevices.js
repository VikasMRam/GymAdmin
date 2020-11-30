import { css } from 'styled-components';
import { withProp } from 'styled-tools';

import { upTo, startingWith } from './funcs';

export default css`
  ${withProp('upToLaptop', upToLaptop => upTo('laptop', upToLaptop))}
  ${withProp('upToTablet', upToTablet => upTo('tablet', upToTablet))}
  ${withProp('upToMobile', upToMobile => upTo('mobile', upToMobile))}

  ${withProp('startingWithAll', startingWithStyles => startingWith(null, startingWithStyles))}
  ${withProp('startingWithMobile', startingWithMobile => startingWith('mobile', startingWithMobile))}
  ${withProp('startingWithTablet', startingWithTablet => startingWith('tablet', startingWithTablet))}
  ${withProp('startingWithLaptop', startingWithLaptop => startingWith('laptop', startingWithLaptop))}
`;
