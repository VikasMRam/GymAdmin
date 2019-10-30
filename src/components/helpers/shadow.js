import styled, { css } from 'styled-components';

import { size, palette } from 'sly/components/themes';
import transition from 'sly/components/helpers/transition';

const styles = (spread = 'regular') => css`
  box-shadow: 0 0 ${size('spacing', spread)} ${palette('slate', 'filler')}80;
`;

const shadow = (Component, ...props) => styled(Component)`
  ${styles(...props)}
`;

export const shadowOnHover = (Component, ...props) => styled(transition(Component, 'box-shadow'))`
  :hover {
    ${styles(...props)}
  }
`;

export default shadow;
