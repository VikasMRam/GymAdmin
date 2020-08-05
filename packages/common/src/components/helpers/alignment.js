import { css } from 'styled-components';

import { isString } from 'sly/common/services/helpers/utils';

// when flex-direction is column(default is row) align and verticalAlign can be swapped.
// verticalAlign becomes horizontal and align becomes vertical.
export const withAlign = ({ children, direction = 'row', align, verticalAlign }) => {
  let textStyles = {};
  let styles = {
    flexDirection: direction,
  };

  if (isString(children) && align) {
    textStyles = {
      textAlign: align,
    };
  }

  if (align === 'right') {
    styles = {
      ...styles,
      ...textStyles,
      display: 'flex',
      justifyContent: 'flex-end',
    };
  } else if (align === 'center') {
    styles = {
      ...styles,
      ...textStyles,
      display: 'flex',
      justifyContent: 'center',
    };
  }

  if (verticalAlign === 'middle') {
    styles = {
      ...styles,
      display: 'flex',
      alignItems: 'center',
    };
  } else if (verticalAlign === 'bottom') {
    styles = {
      ...styles,
      display: 'flex',
      alignItems: 'flex-end',
    };
  }

  if (Object.keys(styles).length) {
    return css(styles);
  }

  return null;
};
