import { css } from 'styled-components';

import { isString } from 'sly/common/services/helpers/utils';

export const withAlign = (props) => {
  let textStyles = {};

  if (isString(props.children)) {
    textStyles = {
      textAlign: props.align,
    };
  }

  if (props.align === 'right') {
    return css({
      ...textStyles,
      display: 'flex',
      justifyContent: 'flex-end',
    });
  } else if (props.align === 'center') {
    return css({
      ...textStyles,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    });
  }
  return null;
};
