import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/pet.svg').default;

const Pet = forwardRef((props, ref) => <Icon ref={ref} name="pet" svg={svg} {...props} />);

Pet.displayName = 'PetIcon';

export default Pet;
