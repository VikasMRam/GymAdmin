import styled from 'styled-components';

import { key } from 'sly/web/components/themes';

const transition = (Component, property = 'all', speed = 'default') => styled(Component)`
  transition: ${property} ${key(['transitions', speed])};
`;

export default transition;
