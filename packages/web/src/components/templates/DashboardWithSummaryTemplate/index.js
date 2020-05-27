import styled, { css } from 'styled-components';

import { size, palette, columnWidth } from 'sly/web/components/themes';
import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import Box, { topSnap, bottomSnap } from 'sly/web/components/atoms/Box';
import { ifProp } from 'styled-tools';
import pad from 'sly/web/components/helpers/pad';
import { Block } from 'sly/web/components/atoms';
import React from 'react';
import { any } from 'prop-types';

export const Top = styled.div`
  grid-area: top;
  padding: ${size('spacing.xLarge')} 0;
`;

export const Left = styled(Box)`
  background: ${palette('white.base')};
  grid-area: left;
  ${bottomSnap};
`;

export const LeftNotifications = styled.div`
  margin: -${size('spacing.xLarge')};
  margin-bottom: 0;
  padding-bottom: ${size('spacing.xLarge')};
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

export const FormSection = styled.div`
  padding: ${size('spacing.xLarge')} ${size('spacing.large')};
  padding-bottom: 0;
  border-bottom: ${size('border.regular')} solid ${palette('slate', 'stroke')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: ${size('spacing.xLarge')};
    padding-bottom: 0;
  }
`;


const SectionHeaderWrapper = styled.div`
  display: flex;
  padding:
    ${size('spacing.large')}
    ${size('spacing.xLarge')}
    ${size('spacing.large')}
    ${size('spacing.xLarge')};
  > * {
    &:first-child {
      flex-grow: 1;
      margin-left: 0;
    }
    // margin: ${size('spacing.large')};
    margin-left: ${size('spacing.regular')};
    flex-grow: 0;
  }
`;
const Heading = styled(Block)`
  line-height: 40px;
`;

export const SectionHeader = ({ actions, children }) => {
  return (
    <SectionHeaderWrapper>
      <Heading size="subtitle">{children}</Heading>
      {actions}
    </SectionHeaderWrapper>
  );
};

SectionHeader.propTypes = {
  actions: any,
  children: any,
};

export const DashboardWithSummaryPageTemplate = styled(DashboardPageTemplate)`
  display: block;
  padding: 0 ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: 0 ${size('spacing.xLarge')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: grid;
    column-gap: ${size('spacing.xLarge')};
    grid-template-columns: ${size('layout.col4')} minmax(0, 1fr);
    grid-template-rows: max-content max-content auto;
    grid-template-areas:
      "top top"
      "left right"
      "summary right";
  }
`;
