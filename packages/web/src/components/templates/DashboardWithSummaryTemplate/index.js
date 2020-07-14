import React from 'react';
import { any, object, shape, string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import Box from 'sly/web/components/atoms/Box';
import { Block, Heading, Link } from 'sly/web/components/atoms';
import BackLink from 'sly/web/components/molecules/BackLink';
import { withBorder, withText } from 'sly/web/components/helpers';

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

export const Section = styled(Box)``;

Section.defaultProps = {
  background: 'white',
  padding: '0',
  snap: 'top',
};

export const SectionHeader = styled(({ actions, children, className, ...props }) => (
  <Block
    padding={['large', 'xLarge']}
    borderBottom="regular"
    background="white"
    className={className}
    {...props}
  >
    <Block size="subtitle" lineHeight="40px">{children}</Block>
    {actions}
  </Block>
))`
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

SectionHeader.propTypes = {
  actions: any,
  children: any,
  className: string,
};

export const SummarySectionHeader = styled(Box)`
  ${withBorder({ borderBottom: 'regular' })} 
  
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    ${withText({ size: 'body' })};
    ${withBorder({ borderBottom: 0 })};
  }
`;

SummarySectionHeader.defaultProps = {
  weight: 'medium',
  padding: ['large', 'xLarge'],
  snap: 'vertical',
  size: 'subtitle',
  lineHeight: '40px',
  background: 'white',
};

export const SummarySection = styled(({ heading, className, children, ...props }) => (
  <Block className={className}>
    <SummarySectionHeader>
      {heading}
    </SummarySectionHeader>
    <Section {...props}>
      <Block padding={['large', 'xLarge', 'xLarge']}>
        {children}
      </Block>
    </Section>
  </Block>
))`
  display: none;
  grid-area: summary;

  @media (max-width: calc(${size('breakpoint.laptop')} - 1px)) {
    &.selected {
      display: block;
    }
  }

  @media (min-width: ${size('breakpoint.laptop')}) {
    display: block;
    
    ${SectionHeader} {
      display: none;
    }
  }
`;

export const SectionForm = ({ heading, children }) => (
  <Block
    padding="xLarge"
    borderBottom="regular"
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


export const SectionActions = props => (
  <Block
    padding="xLarge"
    align="right"
    borderPalette="slate"
    borderVariation="lighter-90"
    {...props}
  />
);

export const DashboardWithSummaryPageTemplate = styled(DashboardPageTemplate)`
  display: block;
  padding: 0 ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: 0 ${size('spacing.xLarge')} ${size('spacing.xLarge')}; 
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
