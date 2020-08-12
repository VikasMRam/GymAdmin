import { css } from 'styled-components';

export const withClamping = ({ clamped }) => clamped && css({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
});
