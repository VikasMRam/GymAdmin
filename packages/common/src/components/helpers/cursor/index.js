import { css } from 'styled-components';

export const withCursor = ({ cursor }) => cursor && css({
  cursor,
});
