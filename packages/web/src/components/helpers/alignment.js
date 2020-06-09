import { css } from 'styled-components';

export const withAlign = (props) => {
  if (props.align === 'right') {
    return css({
      display: 'flex',
      justifyContent: 'flex-end',
    });
  }
  return null;
};
