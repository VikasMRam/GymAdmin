import React from 'react';
import { any, object, shape, string } from 'prop-types';
import styled from 'styled-components';
import { sortableContainer } from 'react-sortable-hoc';

import { size, palette } from 'sly/web/components/themes';
import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import Box from 'sly/web/components/atoms/Box';
import { topSnap } from 'sly/web/components/helpers/snap';
import { Block, Heading, Link } from 'sly/web/components/atoms';
import BackLink from 'sly/web/components/molecules/BackLink';
import { withBorder } from 'sly/web/components/helpers';

export const Top = styled.div`
  grid-area: top;
  padding: ${size('spacing.xLarge')} 0;
`;

export const Left = styled(({ children, heading, to, ...props }) => (
  <Box {...props}>
    {children}
    <Heading>{heading}</Heading>
    {to && <Link to={to}>View profile</Link>}
  </Box>
))`
  grid-area: left;
  display: grid;
  
  ${withBorder}
`;

Left.defaultProps = {
  snap: 'bottom',
  borderBottom: 'regular',
  background: 'white.base',
};

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
`;

Section.defaultProps = {
  padding: '0',
  snap: 'top',
};

export const SummarySection = styled(({ children, className, ...props }) => (
  <div className={className}>
    <Section padding="xLarge" {...props}>
      {children}
    </Section>
  </div>
))`
  display: none;
  grid-area: summary;

  ${topSnap};

  @media (max-width: calc(${size('breakpoint.laptop')} - 1px)) {
    &.selected {
      display: block;
    }
  }

  @media (min-width: ${size('breakpoint.laptop')}) {
    display: block;
  }
`;

export const SectionForm = ({ heading, children }) => (
  <Block
    padding="xLarge"
  >
    {heading && (
      <Block
        level="body"
        weight="medium"
        pad="large"
      >
        {heading}
      </Block>
    )}

    {children}
  </Block>
);

SectionForm.propTypes = {
  heading: string,
  children: any,
};


export const SectionSortable = sortableContainer(Block);

SectionSortable.defaultProps = {
  padding: 'xLarge',
};

const SectionHeaderWrapper = styled(Block)`
  display: flex;
  
  > * {
    flex-grow: 0;
    margin-left: ${size('spacing.regular')};
    
    &:first-child {
      flex-grow: 1;
      margin-left: 0;
    }
  }
`;

export const SectionHeader = ({ actions, children }) => {
  return (
    <SectionHeaderWrapper
      padding={['large', 'xLarge']}
      borderBottom="regular"
    >
      <Block size="subtitle" lineHeight="40px">{children}</Block>
      {actions}
    </SectionHeaderWrapper>
  );
};

SectionHeader.propTypes = {
  actions: any,
  children: any,
};

export const SectionActions = props => (
  <Block
    padding="xLarge"
    align="right"
    borderTop="regular"
    borderPalette="slate"
    borderVariation="lighter-90"
    {...props}
  />
);

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

const LoadingPageTemplate = styled(DashboardPageTemplate)`
  display: flex;
  align-items: center;
`;

export const Loading = ({ children, activeMenuItem, backLink }) => {
  return (
    <LoadingPageTemplate activeMenuItem={activeMenuItem}>
      <Block weight="medium" size="subtitle">{children}</Block>
      {backLink && (
        <BackLink to={backLink.path} event={backLink.event}>
          {backLink.label}
        </BackLink>
      )}
    </LoadingPageTemplate>
  );
};

Loading.propTypes = {
  activeMenuItem: string,
  children: string,
  backLink: shape({
    label: string,
    path: string,
    event: object,
  }),
};
