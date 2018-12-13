import { oneOf } from 'prop-types';

import { getKey } from 'sly/components/themes';

export const spacing = oneOf(Object.keys(getKey('sizes.spacing')));
