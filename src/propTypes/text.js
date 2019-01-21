import { oneOf } from 'prop-types';

import { getKey } from 'sly/components/themes';

export const text = oneOf(Object.keys(getKey('sizes.text')));
