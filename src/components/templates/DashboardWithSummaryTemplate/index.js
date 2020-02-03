import React from 'react';
import styled from 'styled-components';

import { size, columnWidth } from 'sly/components/themes';

export const Navigation = styled.div`

`;

export const SummarySection = styled.div`
  grid-area: column;
`;

export const Section = styled.div`
  grid-area: section;
`;

export const BodyWrapper = styled.div`
  @media screen and (max-width: calc(${size('breakpoint.laptop')} - 1px)) {
    display: block;
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: grid;
    grid-template-columns: ${columnWidth(3, size('layout.gutter'))} auto;
    grid-template-areas: "column section";
  }
`;
