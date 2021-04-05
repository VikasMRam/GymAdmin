import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/agents.svg').default;

const Agents = forwardRef((props, ref) => <Icon ref={ref} name="agents" svg={svg} {...props} />);

Agents.displayName = 'AgentsIcon';

export default Agents;
