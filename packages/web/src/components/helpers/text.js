import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

import { setDisplayName } from 'sly/web/components/helpers/index';
import { getKey } from 'sly/web/components/themes';

export const textAlign = (Component, which = 'center') => styled(Component)`
  text-align: ${which};
`;

export const textDecoration = (Component, decoration = 'underline') => setDisplayName(styled(Component)`
  text-decoration: ${decoration};
`, Component.displayName);

export const textTransform = (Component, transform = 'capitalize') => styled(Component)`
  text-transform: ${transform};
`;

// uses props size and weight
const getSize = (type, prop = 'size') => (props) => {
  const key = `sizes.${type}.${props[prop]}`;
  return getKey(key) || props[prop];
};

export const withText = () => css`
  ${ifProp('size', css`
    font-size: ${getSize('text')};
    line-height: ${getSize('lineHeight')};
  `)}
  ${ifProp('lineHeight', css`
    line-height: ${getSize('lineHeight', 'lineHeight')};
  `)}
  ${ifProp('weight', css`
    font-weight: ${getSize('weight', 'weight')};
  `)}
`;
