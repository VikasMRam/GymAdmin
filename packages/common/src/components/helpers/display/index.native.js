import { css } from 'styled-components';

export const withDisplay = ({ display }) => {
  if (display === 'inline-block' || display === 'inline' || display === 'inline-flex') {
    return css({
      display: 'flex',
      alignSelf: 'flex-start',
    });
  }
  if (display === 'block') {
    return css({
      display: 'flex',
    });
  }
  if (display) {
    return css({
      display,
    });
  }

  return null;
};
