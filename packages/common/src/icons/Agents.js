import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/agents.svg').default
// import AgentsSvg from './svg/agents.svg';

const Agents = forwardRef((props, ref) => <Icon ref={ref} name="agents" svg={svg} {...props} />);

Agents.displayName = 'AgentsIcon';

export default Agents;