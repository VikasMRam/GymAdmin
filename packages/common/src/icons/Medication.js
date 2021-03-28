import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/medication.svg').default
// import MedicationSvg from './svg/medication.svg';

const Medication = forwardRef((props, ref) => <Icon ref={ref} name="medication" svg={svg} {...props} />);

Medication.displayName = 'MedicationIcon';

export default Medication;