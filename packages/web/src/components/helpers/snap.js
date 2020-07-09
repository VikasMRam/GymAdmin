import { css } from 'styled-components';
import { switchProp } from 'styled-tools';

export const topSnap = css`
  border-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

export const bottomSnap = css`
  border-bottom: 0;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;


export const withSnap = switchProp('snap', {
  top: topSnap,
  bottom: bottomSnap,
  vertical: `${topSnap} ${bottomSnap}`,
});
