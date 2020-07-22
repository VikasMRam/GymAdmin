import { css } from 'styled-components';

export const withDisplay = ({ display, block }) => (display || block) && css({
  display: block === true ? 'block' : display,
});
