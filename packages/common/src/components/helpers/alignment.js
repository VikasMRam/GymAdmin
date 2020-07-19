import { css } from 'styled-components';

export const withAlign = (props) => {
  if (props.align === 'right') {
    return css({
      display: 'flex',
      justifyContent: 'flex-end',
    });
  } else if (props.align === 'center') {
    return css({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    });
  }
  return null;
};
