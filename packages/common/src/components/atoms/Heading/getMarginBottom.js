import { getKey } from 'sly/common/components/themes';

const getMarginBottom = (p) => {
  switch (p.size) {
    case 'hero': return getKey('sizes.spacing.xxLarge');
    case 'title': return getKey('sizes.spacing.xLarge');
    case 'subtitle': return getKey('sizes.spacing.large');
    default: return getKey('sizes.spacing.large');
  }
};

export default getMarginBottom;
