import styled, { css } from 'styled-components';

import { size } from 'sly/common/components/themes';

export const withPad = ({ pad } = {}) => {
  if (!pad) {
    return null;
  }

  return css`
    margin-bottom: ${size('spacing', pad)};
  `;
};

const pad = (Component, which = 'xLarge') => styled(Component)`
  margin-bottom: ${size('spacing', which)};
`;

export default pad;
