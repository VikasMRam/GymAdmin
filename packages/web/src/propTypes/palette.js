import { oneOf } from 'prop-types';

import { getKey } from 'sly/web/components/themes';

export const palette = oneOf(Object.keys(getKey('palette')));
