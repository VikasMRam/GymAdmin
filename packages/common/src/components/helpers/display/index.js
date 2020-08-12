import { css } from 'styled-components';

export const withDisplay = ({
  display, block, flex, flexGrow, flexShrink, flexBasis, flexWrap, flexOrder,
}) => {
  let styles = {
    order: flexOrder,
    flex,
  };

  styles = (display || block) ? {
    ...styles,
    display: block === true ? 'block' : display,
  } : styles;

  if (display === 'flex' || display === 'inline-flex') {
    styles = {
      flexGrow,
      flexShrink,
      flexBasis,
      flexWrap,
      ...styles,
      // put styles last so that grow, shrink, basis etc can be overriden by flex
    };
  }

  return css(styles);
};
