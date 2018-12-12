import { oneOf } from 'prop-types';

import { getKey } from 'sly/components/themes';

export const border = oneOf(Object.keys(getKey('sizes.border')));
