import { css } from 'styled-components';

import { size } from 'sly/common/components/themes';
import { isReactNative } from 'sly/common/constants/utils';
import { isString } from 'sly/common/services/helpers/utils';

export const withAlign = ({
  children, direction, align, verticalAlign, position,
  top, bottom, left, right, display, alignItems, textAlign,
}) => {
  // when only align is given without display flex
  // treat children like block elements, like normal divs
  if (!direction) {
    direction = align && display !== 'flex' ? 'column' : 'row';
  }
  let textStyles = {};
  let styles = {
    flexDirection: direction,
    alignItems,
    textAlign,
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
    // allow top="0"
    styles = {
      ...styles,
      top: parseInt(top, 10) === 0 ? '0px' : size('spacing', top),
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
    // allow right="0"
    styles = {
      ...styles,
      right: parseInt(top, 10) === 0 ? '0px' : size('spacing', right),
    };
  }

  // when flex-direction is row - align-items vertical, justify-content horizontal
  // when flex-direction is column - align-items horizontal, justify-content vertical
  // justifySelf is not present in react native; so don't apply that for mobiles
  if (align) {
    styles = {
      ...styles,
      ...textStyles,
      display: 'flex',
    };

    if (align === 'right') {
      if (direction === 'row' || direction === 'row-reverse') {
        styles.justifyContent = 'flex-end';
        if (isString(children) && !isReactNative) {
          styles.justifySelf = 'flex-end';
        }
      } else {
        styles.alignItems = 'flex-end';
        if (isString(children)) {
          styles.alignSelf = 'flex-end';
        }
      }
    } else if (align === 'center') {
      if (direction === 'row' || direction === 'row-reverse') {
        styles.justifyContent = 'center';
        if (isString(children) && !isReactNative) {
          styles.justifySelf = 'center';
        }
      } else {
        styles.alignItems = 'center';
        if (isString(children)) {
          styles.alignSelf = 'center';
        }
      }
    }  else if (align === 'space-between') {
      if (direction === 'row' || direction === 'row-reverse') {
        styles.justifyContent = 'space-between';
      } else {
        styles.alignContent = 'space-between';
      }
    }
  }

  if (verticalAlign) {
    styles = {
      ...styles,
      ...textStyles,
      display: 'flex',
    };

    if (verticalAlign === 'middle') {
      if (direction === 'row' || direction === 'row-reverse') {
        styles.alignItems = 'center';
        if (isString(children)) {
          styles.alignSelf = 'center';
        }
      } else {
        styles.justifyContent = 'center';
        if (isString(children) && !isReactNative) {
          styles.justifySelf = 'center';
        }
      }
    } else if (verticalAlign === 'bottom') {
      if (direction === 'row' || direction === 'row-reverse') {
        styles.alignItems = 'flex-end';
        if (isString(children)) {
          styles.alignSelf = 'flex-end';
        }
      } else {
        styles.justifyContent = 'flex-end';
        if (isString(children) && !isReactNative) {
          styles.justifySelf = 'flex-end';
        }
      }
    }
  }

  if (Object.keys(styles).length) {
    return css(styles);
  }

  return null;
};
