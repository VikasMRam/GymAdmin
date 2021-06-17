import { css } from 'styled-components';
import { switchProp } from 'styled-tools';

export const topSnap = css`
  border-top: 0;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

// won't remove border
export const bottomSnap = css`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

export const leftSnap = css`
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

export const leftSnapWithBorder = css`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

// won't remove border
export const rightSnap = css`
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
`;

export const allSnap = css`
  border: 0;
  border-radius: 0;
`;

export const withSnap = switchProp('snap', {
  top: topSnap,
  bottom: bottomSnap,
  left: leftSnap,
  right: rightSnap,
  all: allSnap,
  leftWithBorder: leftSnapWithBorder,
  horizontalWithBorder: `${leftSnapWithBorder} ${rightSnap}`,
  vertical: `${topSnap} ${bottomSnap}`,
  horizontal: `${leftSnap} ${rightSnap}`,
});
