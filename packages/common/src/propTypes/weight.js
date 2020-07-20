import { oneOf } from 'prop-types';

import { getKey } from 'sly/common/components/themes';

export const weight = oneOf(Object.keys(getKey('sizes.weight')));
