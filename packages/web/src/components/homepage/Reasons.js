import React from 'react';
import styled from 'styled-components';

import IconItem from 'sly/web/components/molecules/IconItem';
import { size, getKey } from 'sly/common/components/themes';
import { Heading, Block, Button, Hr, Link, Paragraph, Grid } from 'sly/common/components/atoms';
import { Centered, ResponsiveImage } from 'sly/web/components/atoms';

import Section from './Section';

const Reasons = () => (
  <Section
    display="grid"
    paddingBottom="48px"
    css={{
      gridGap: `${getKey('sizes.spacing.xMassive')}`,
    }}
    startingWithTablet={{
      paddingBottom: 64,
    }}
    startingWithLaptop={{
      paddingBottom: 80,
    }}
  >
    <Grid
      gap="xxxLarge"
      upToLaptop={{
        gridTemplateColumns: `${getKey('sizes.layout.col3')} 1fr`,
      }}
      upToTablet={{
        gridTemplateColumns: 'auto!important',
      }}
    >
      <ResponsiveImage
        path="react-assets/home/smarter-way.png"
        alt="smarter-way"
        css={{
          width: '100%',
        }}
      />
      <div>
        <Heading
          level="subtitle"
          size="display"
          pad="xLarge"
          css={{
            maxWidth: `calc(${getKey('sizes.layout.col4')} + ${getKey('sizes.spacing.xLarge')})`,
          }}
        >
          A Smarter Way to Find Your Next Home
        </Heading>
        <Block size="subtitle" weight="regular" pad="xLarge">Our&nbsp;
          <Block display="inline" background="harvest.lighter-90" palette="harvest.darker-15" padding={['small', 'tiny']}><b>Seniorly</b> Smart Search</Block>
          &nbsp;advanced technology and network of knowledgeable local experts work together to guide you to the next home you&apos;ll love.
        </Block>
        <Grid flow="row" gap="medium">
          <IconItem icon="search" iconPalette="harvest">Customized search with curated results</IconItem>
          <IconItem icon="security" iconPalette="harvest">Community pricing with full transparency</IconItem>
          <IconItem icon="star" iconPalette="harvest">Customers rate us 4 out of 5 stars</IconItem>
        </Grid>
      </div>
    </Grid>
    <Grid
      gap="xxLarge"
      upToLaptop={{
        gridTemplateColumns: `${getKey('sizes.layout.col3')} 1fr`,
      }}
      upToTablet={{
        gridTemplateColumns: 'auto!important',
      }}
      startingWithLaptop={{
        direction: 'rtl',
      }}
    >
      <ResponsiveImage
        path="react-assets/home/local-advisor.png"
        alt="local-advisor"
        css={{
          width: '100%',
        }}
      />
      <Block startingWithLaptop={{
        direction: 'ltr',
      }}>
        <Heading
          level="subtitle"
          size="display"
          pad="xLarge"
        >
          Your Seniorly Local Advisor
        </Heading>
        <Block size="subtitle" weight="regular" pad="xLarge">After you complete our Smart Search, you’ll work with a&nbsp;
          <Block display="inline" background="harvest.lighter-90" palette="harvest.darker-15" padding={['small', 'tiny']}><b>Seniorly</b> Local Advisor</Block>
          &nbsp;, your own expert who guides from the first step of your senior living journey—to the day you settle in to your new home.
        </Block>
        <Grid flow="row" gap="medium">
          <IconItem icon="tick" iconPalette="harvest">Answers all your questions</IconItem>
          <IconItem icon="tick" iconPalette="harvest">Shares insights and knowledge </IconItem>
          <IconItem icon="tick" iconPalette="harvest">Tours communities with you</IconItem>
          <IconItem icon="tick" iconPalette="harvest">Helps you choose wisely</IconItem>
        </Grid>
      </Block>
    </Grid>
    <Grid
      gap="xxxLarge"
      upToLaptop={{
        gridTemplateColumns: `${getKey('sizes.layout.col3')} 1fr`,
      }}
      upToTablet={{
        gridTemplateColumns: 'auto!important',
      }}
    >
      <ResponsiveImage
        path="react-assets/home/homebase.png"
        alt="smarter-way"
        css={{
          width: '100%',
        }}
      />
      <div>
        <Heading
          level="subtitle"
          size="display"
          pad="xLarge"
          css={{
            maxWidth: `calc(${getKey('sizes.layout.col4')} + ${getKey('sizes.spacing.xLarge')})`,
          }}
        >
          Your Home Base
        </Heading>
        <Block size="subtitle" weight="regular" pad="xLarge">We keep your search results, advisor contact info, and your communications in a private, secure&nbsp;
          <Block display="inline" background="harvest.lighter-90" palette="harvest.darker-15" padding={['small', 'tiny']}><b>Seniorly</b> Home Base</Block>
          &nbsp;to help you stay organized along the way. It’s easy to communicate with your advisor and change your preferences to explore different types of communities.
        </Block>
        <Grid flow="row" gap="medium">
          <IconItem icon="community-size-small" iconPalette="harvest">See your recommended communities</IconItem>
          <IconItem icon="list" iconPalette="harvest">Evaluate your options efficiently</IconItem>
          <IconItem icon="message" iconPalette="harvest">Stay in touch with your personal advisor</IconItem>
          <IconItem icon="baseline-loyalty" iconPalette="harvest">Get special offers for other products and services</IconItem>
        </Grid>
      </div>
    </Grid>
  </Section>
);

export default Reasons;