import styled, { css } from 'styled-components';

import { size } from 'sly/common/components/themes';

const displayOnlyIn = (Component, displayIn = ['mobile', 'tablet', 'laptop']) => {
  let displayCss = css``;

  if (!displayIn.includes('mobile')) {
    displayCss = css`
      ${displayCss}
      display: none;
    `;
  }
  if (!displayIn.includes('tablet')) {
    displayCss = css`
      ${displayCss}
      @media screen and (min-width: ${size('breakpoint.tablet')}) {
        display: none;
      }
    `;
  } else {
    displayCss = css`
      ${displayCss}
      @media screen and (min-width: ${size('breakpoint.tablet')}) {
        display: block;
      }
    `;
  }
  if (!displayIn.includes('laptop')) {
    displayCss = css`
      ${displayCss}
      @media screen and (min-width: ${size('breakpoint.laptop')}) {
        display: none;
      }
    `;
  } else {
    displayCss = css`
      ${displayCss}
      @media screen and (min-width: ${size('breakpoint.laptop')}) {
        display: block;
      }
    `;
  }

  return styled(Component)`
    ${displayCss}
  `;
};

export default displayOnlyIn;
