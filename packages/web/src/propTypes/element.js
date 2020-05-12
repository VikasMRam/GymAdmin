import { oneOf } from 'prop-types';

import { getKey } from 'sly/components/themes';

export const element = oneOf(Object.keys(getKey('sizes.element')));
