import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/pet.svg').default
// import PetSvg from './svg/pet.svg';

const Pet = forwardRef((props, ref) => <Icon ref={ref} name="pet" svg={svg} {...props} />);

Pet.displayName = 'PetIcon';

export default Pet;