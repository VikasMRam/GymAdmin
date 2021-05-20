import React from 'react';
import { any, bool, object, shape, string } from 'prop-types';
import styled, { css } from 'styled-components';
import { ifNotProp, ifProp } from 'styled-tools';

import { size } from 'sly/common/components/themes';
import { startingWith, upTo, withBorder, withFlex, withText } from 'sly/common/components/helpers';
import DashboardPageTemplate from 'sly/web/components/templates/DashboardPageTemplate';
import { Block, Box, Heading, Label } from 'sly/web/components/atoms';
import BackLink from 'sly/web/components/molecules/BackLink';
import CollapsibleBlock from 'sly/web/components/molecules/CollapsibleBlock';

export const Top = styled.div`
  grid-area: top;
  padding: ${size('spacing.xLarge')} 0;
`;

const LeftBody = styled(Block)`
  ${upTo('laptop', css`
    & > :first-child {
      flex-grow: 1;
    }
  `)}
`;

const LeftHeading = styled(Heading)`
  ${upTo('laptop', css`
    margin-bottom: 0;
  `)}
`;

export const Left = styled(({ children, heading, actions, ...props }) => (
  <Box {...props}>
    {children}
    <LeftBody>
      <LeftHeading lineHeight="1.15">
        {heading}
      </LeftHeading>

      {actions}
    </LeftBody>
  </Box>
))`
  grid-area: left;
  display: grid;

  // ${withBorder}
`;

Left.propTypes = {
  heading: string,
  actions: any,
};

Left.defaultProps = {
  snap: 'bottom',
  background: 'white.base',
};

export const LeftNotifications = styled(Block)``;

LeftNotifications.defaultProps = {
  margin: '-xLarge',
  borderRadius: 'small',
  snap: 'bottom',
  overflow: 'hidden',
  marginBottom: 0,
  paddingBottom: 'xLarge',
};

export const Right = styled(Block)`
  grid-area: right;
`;

export const Section = styled(Box)``;

Section.defaultProps = {
  background: 'white',
  padding: '0',
  snap: 'top',
};

export const SectionHeader = ({ actions, children, className, ...props }) => (
  <Block
    className={className}
    padding={['large', 'xLarge']}
    borderBottom="regular"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    horizontalGutter="regular"
    {...props}
  >
    <Heading size="subtitle" flexGrow="1" pad="0">{children}</Heading>
    {actions}
  </Block>
);

SectionHeader.displayName = 'SectionHeader';

SectionHeader.propTypes = {
  actions: any,
  children: any,
  className: string,
};

export const Warning = styled(Block)``;

Warning.defaultProps = {
  background: 'yellow.lighter-60',
  textAlign: 'center',
  padding: 'large',
};

  // ${withBorder({ borderBottom: 'regular' })}
    // ${withBorder({ borderBottom: 0 })};
export const SummarySectionHeader = styled(Box)`

  ${startingWith('laptop', css`
    ${withText({ size: 'body' })};
  `)}
`;

SummarySectionHeader.defaultProps = {
  weight: 'medium',
  padding: ['large', 'xLarge'],
  snap: 'vertical',
  size: 'subtitle',
  lineHeight: '40px',
  background: 'white',
};

export const SummarySectionBody = styled(Section)`
  ${startingWith('laptop', css`
    padding-top: 0;
  `)}
`;

SummarySectionBody.defaultProps = {
  padding: 'large xLarge xLarge',
  snap: 'top',
};

export const SummarySection = styled(({ children, startingWith, ...props }) => (
  <Block startingWith={startingWith} {...props}>
    {children}
  </Block>
))`
  display: none;
  grid-area: summary;

  ${upTo('laptop', css`
    &.selected {
      display: block;
    }
  `)}

  ${startingWith('laptop', css`
    display: block;
  `)}
`;

export const SummaryRow = styled(({ label, children, collapsible, ...props }) => {
  const BlockComponent = collapsible
    ? CollapsibleBlock
    : Block;
  return (
    <BlockComponent size="caption" minHeight="tiny" {...props}>
      <Label palette="grey">{label}</Label>
      <Block>
        {children}
      </Block>
    </BlockComponent>
  );
})`
  ${ifNotProp('collapsible', css`
    @media screen and (min-width: ${size('breakpoint.mobile')}) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: ${size('tabletLayout.gutter')};
    }

    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      display: block;
      grid-column-gap: ${size('layout.gutter')};
    }
  `)}
`;

SummaryRow.propTypes = {
  collapsible: bool,
};

SummaryRow.defaultProps = {
  marginBottom: 'large',
};

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


