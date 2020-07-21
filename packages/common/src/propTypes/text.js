import { oneOf } from 'prop-types';

import { getKey } from 'sly/web/components/themes';

export const text = oneOf(Object.keys(getKey('sizes.text')));
