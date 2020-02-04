import styled from 'styled-components';

import { size, columnWidth } from 'sly/components/themes';
import DashboardPageTemplate from 'sly/components/templates/DashboardPageTemplate';

export const Top = styled.div`
  grid-area: top;
  padding: ${size('spacing.xLarge')} 0;
`;

export const Left = styled.div`
  grid-area: left;
`;

export const Right = styled.div`
  grid-area: right;
`;

export const SummarySection = styled.div`
  display: none;
  grid-area: summary;

  @media (max-width: calc(${size('breakpoint.laptop')} - 1px)) {
    &.selected {
      display: block;
    }
  }

  @media (min-width: ${size('breakpoint.laptop')}) {
    display: block;
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
    grid-template-rows: min-content min-content auto;
    grid-template-areas:
      "top top"
      "left right"
      "summary right";
  }
`;
