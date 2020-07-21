import { css } from 'styled-components';

import { getKey } from 'sly/common/components/themes';

// uses props size and weight
export const getSize = (type, prop = 'size') => (props) => {
  const key = `sizes.${type}.${props[prop]}`;
  return getKey(key) || props[prop];
};

export const getWeight = (props) => {
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
