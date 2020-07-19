import { css } from 'styled-components';

export const withDisplay = ({ display, block }) => css({
  display: block === true ? 'block' : display,
});
