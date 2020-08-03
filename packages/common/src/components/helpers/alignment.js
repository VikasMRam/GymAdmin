import { css } from 'styled-components';

import { isString } from 'sly/common/services/helpers/utils';

export const withAlign = ({ children, align }) => {
  let textStyles = {};

  if (isString(children)) {
    textStyles = {
      textAlign: align,
    };
  }

  if (align === 'right') {
    return css({
      ...textStyles,
      display: 'flex',
      justifyContent: 'flex-end',
    });
  } else if (align === 'center') {
    return css({
      ...textStyles,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    });
  }
  return null;
};
