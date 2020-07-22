import { css } from 'styled-components';

export const withDisplay = ({ display, inline }) => {
  if (inline) {
    return css({
      alignSelf: 'flex-start',
    });
  }
  if (display) {
    return css({
      display,
    });
  }

  return null;
};
