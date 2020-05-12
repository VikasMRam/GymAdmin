import styled, { css } from 'styled-components';

import { size, palette, columnWidth } from 'sly/web/components/themes';
import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import Box, { topSnap, bottomSnap } from 'sly/web/components/atoms/Box';
import { ifProp } from 'styled-tools';

export const Top = styled.div`
  grid-area: top;
  padding: ${size('spacing.xLarge')} 0;
`;

export const Left = styled(Box)`
  background: ${palette('white.base')};
  grid-area: left;

  ${bottomSnap};
`;

export const Right = styled.div`
  grid-area: right;
`;

export const Section = styled(Box)`
  background: ${palette('white.base')};

  ${topSnap};
`;

export const SummarySection = styled.div`
  // the rest are to fix the
  // unusual behaviour of the summary section in laptop
  display: none;
  grid-area: summary;

  @media (max-width: calc(${size('breakpoint.laptop')} - 1px)) {
    &.selected {
      display: block;
    }
  }

  @media (min-width: ${size('breakpoint.laptop')}) {
    display: block;
    ${topSnap};
  }
`;

export const DashboardWithSummaryPageTemplate = styled(DashboardPageTemplate)`
  display: block;
  padding: 0 ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: 0 ${size('spacing.xLarge')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: grid;
    column-gap: ${size('spacing.xLarge')};
    grid-template-columns: ${columnWidth(3, size('layout.gutter'))} auto;
    grid-template-rows: max-content max-content auto;
    grid-template-areas:
      "top top"
      "left right"
      "summary right";
  }
`;
