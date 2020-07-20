import { oneOf } from 'prop-types';

import { getKey } from 'sly/common/components/themes';

export const borderRadiusPropType = oneOf(Object.keys(getKey('sizes.spacing')));
export const borderPropType = oneOf(Object.keys(getKey('sizes.border')));
