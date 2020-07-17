import { oneOf } from 'prop-types';

import { getKey } from 'sly/web/components/themes';

export const spacing = oneOf(Object.keys(getKey('sizes.spacing')));
