import { css } from 'styled-components';

export const withOverflow = ({ overflow }) => {
  return overflow && css({ overflow });
};
