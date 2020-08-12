import { css } from 'styled-components';

export const withHeight = ({ height }) => height && css`
  height: ${height};
`;
