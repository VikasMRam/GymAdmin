import { css } from 'styled-components';

export const withLineHeight = ({ lineHeight }) => lineHeight && css`
  line-height: ${lineHeight};
`;
