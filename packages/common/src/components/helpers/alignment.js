import { css } from 'styled-components';

import { size } from 'sly/common/components/themes';
import { isString } from 'sly/common/services/helpers/utils';

// when flex-direction is column(default is row) align and verticalAlign can be swapped.
// verticalAlign becomes horizontal and align becomes vertical.
export const withAlign = ({
  children, direction = 'row', align, verticalAlign, position,
  top, bottom, left, right,
}) => {
  let textStyles = {};
  let styles = {
    flexDirection: direction,
  };

  if (isString(children) && align) {
    textStyles = {
      textAlign: align,
    };
  }

  if (position) {
    styles = {
      ...styles,
      position,
    };
  }
  if (top) {
    styles = {
      ...styles,
      top: size('spacing', top),
    };
  }
  if (bottom) {
    styles = {
      ...styles,
      bottom: size('spacing', bottom),
    };
  }
  if (left) {
    styles = {
      ...styles,
      left: size('spacing', left),
    };
  }
  if (right) {
    styles = {
      ...styles,
      right: size('spacing', right),
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
  }  else if (align === 'space-between') {
    styles = {
      ...styles,
      ...textStyles,
      display: 'flex',
      justifyContent: 'space-between',
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
