import { css } from 'styled-components';

export const withDisplay = ({ display }) => {
  if (display === 'inline-block' || display === 'inline' || display === 'inline-flex') {
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
