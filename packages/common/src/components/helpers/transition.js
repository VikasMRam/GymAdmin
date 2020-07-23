import { css } from 'styled-components';

import { key } from 'sly/common/components/themes';

export const withTransition = ({ transition, speed = 'default' }) => transition && css`
  transition: ${transition} ${key(['transitions', speed])};
`;
