import { oneOf } from 'prop-types';

import { getKey } from 'sly/web/components/themes';

export const weight = oneOf(Object.keys(getKey('sizes.weight')));
