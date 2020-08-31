import { css } from 'styled-components';

export const withTextTransform = ({ textTransform }) => textTransform && css({
  textTransform,
});

export const withSingleLine = ({ singleLine }) => singleLine && css({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
});
