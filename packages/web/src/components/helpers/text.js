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

const getWeight = (props) => {
  if (!(props.weight || props.size)) return null;

  if (props.weight) {
    const key = `sizes.weight.${props.weight}`;
    return css({
      fontWeight: getKey(key) || props.weight,
    });
  }

  if (['subtitle', 'title', 'hero', 'superHero'].includes(props.size)) {
    const key = 'sizes.weight.medium';
    return css({
      fontWeight: getKey(key),
    });
  }

  return null;
};

export const withText = props => css`
  ${props.size && css`
    font-size: ${getSize('text')(props)};
    line-height: ${getSize('lineHeight')(props)};
  `}
  
  ${ifProp('lineHeight', css`
    line-height: ${getSize('lineHeight', 'lineHeight')(props)};
  `)}
  
  ${getWeight(props)};
`;
