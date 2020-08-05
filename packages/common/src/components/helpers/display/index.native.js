import { css } from 'styled-components';

export const withDisplay = ({
  display, flex, flexGrow, flexShrink, flexBasis, flexWrap, flexOrder,
}) => {
  let styles = {
    order: flexOrder,
    flex,
  };

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

  if (display === 'inline-block' || display === 'inline' || display === 'inline-flex') {
    return css({
      display: 'flex',
      alignSelf: 'flex-start',
      ...styles,
    });
  }
  if (display === 'block') {
    return css({
      display: 'flex',
      ...styles,
    });
  }
  if (display) {
    return css({
      display,
      ...styles,
    });
  }

  return css(styles);
};
