import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/medication.svg').default;

const Medication = forwardRef((props, ref) => <Icon ref={ref} name="medication" svg={svg} {...props} />);

Medication.displayName = 'MedicationIcon';

export default Medication;
