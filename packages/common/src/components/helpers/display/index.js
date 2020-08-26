import { css } from 'styled-components';

export const withDisplay = ({
  display,
  block,
  flex,
  justifyContent,
  alignItems,
  flexDirection,
  flexGrow,
  flexShrink,
  flexBasis,
  flexWrap,
  order,
  visibility,
}) => css({
  display: block === true ? 'block' : display,
  justifyContent,
  alignItems,
  visibility,
  flexDirection,
  flexGrow,
  flexShrink,
  flexBasis,
  flexWrap,
  order,
  flex,
});

