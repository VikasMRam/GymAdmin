import React, { forwardRef } from 'react';
import styled from 'styled-components';

import Section from './Section';

import { Heading, Block, Grid, layout, space, sx, Image } from 'sly/common/system';
import { Search, Checkmark, Security, Star, Community, List, Messages, Offer  } from 'sly/common/icons/index';


const ReasonImage = forwardRef((props, ref) => (
  <Image
    ref={ref}
    css={{
      width: '100%',
    }}
    sizes={['calc(100vw - 48px)', 240, 500]}
    {...props}
  />
));


const IconItem = styled(Block)`
display:flex;
flex-direction:row;
align-items:baseline;
& svg {
    margin-right:${space('s')};
    margin-top:auto;
    margin-bottom:auto;
  }
`;

const Reasons = () => {
  return (
    <Section
      display="grid"
      paddingBottom="xxl"
      gridGap="64px"
      sx$laptop={{
        paddingBottom: 'xxxl',
      }}
      sx$tablet={{
        paddingBottom: '64px',
        gridGap: '72px',
      }}
    >
      <Grid
        gridGap="l"
        gridTemplateColumns="auto!important"
        sx$tablet={{
          gridTemplateColumns: sx`${layout('col3')} 1fr!important`,
          gridGap: sx`${space('l')}!important`,
        }}
        sx$laptop={{
          gridTemplateColumns: sx`${layout('col6')} 1fr!important`,
          gridGap: sx`${space('xxl')}!important`,
        }}
      >
        <ReasonImage
          path="react-assets/home/laptopA.webp"
          alt="smarter-way"
        />
        <Block
          margin="auto 0"
        >
          <Heading
            font="title-l"
            pad="m"
            maxWidth={sx`calc(${layout('col4')} + ${space('l')})`}
          >
            A Smarter Way to Find Your Next Home
          </Heading>
          <Block
            font="body-l"
            pad="l"
          >Our&nbsp;
            <Block display="inline" background="harvest.lighter-90" color="harvest.darker-20" padding={sx`${space('xxs')} ${space('xxxs')}`}><b>Seniorly</b> Smart Search</Block>
            &nbsp;advanced technology and network of knowledgeable local experts work together to guide you to the next home you&apos;ll love.
          </Block>
          <Grid flexDirection="row" gridGap="s">
            <IconItem><Search color="harvest" />Customized search with curated results</IconItem>
            <IconItem><Security color="harvest" /> Community pricing with full transparency</IconItem>
            <IconItem><Star color="harvest" active />Customers rate us 4 out of 5 stars</IconItem>
          </Grid>
        </Block>
      </Grid>
      <Grid
        gridGap="m"
        gridTemplateColumns="auto!important"
        sx$tablet={{
         gridTemplateColumns: sx`${layout('col3')} 1fr!important`,
         gridGap: sx`${space('l')}!important`,
       }}
        sx$laptop={{
         gridTemplateColumns: sx`${layout('col6')} 1fr!important`,
         gridGap: sx`${space('xxl')}!important`,
         direction: 'rtl',
       }}
      >
        <ReasonImage
          path="react-assets/home/laptopB.webp"
          alt="local-advisor"
        />
        <Block
          sx$laptop={{
            direction: 'ltr',
          }}
          margin="auto 0"
        >
          <Heading
            font="title-l"
            pad="m"
          >
            Your Seniorly Local Advisor
          </Heading>
          <Block
            font="body-l"
            pad="l"
          >After you complete our Smart Search, you’ll work with a&nbsp;
            <Block display="inline" background="harvest.lighter-90" color="harvest.darker-20" padding={sx`${space('xxs')} ${space('xxxs')}`}><b>Seniorly</b> Local Advisor</Block>
            &nbsp;, your own expert who guides from the first step of your senior living journey—to the day you settle in to your new home.
          </Block>
          <Grid flexDirection="row" gridGap="s">
            <IconItem><Checkmark color="harvest" /> Answers all your questions</IconItem>
            <IconItem><Checkmark color="harvest" />Shares insights and knowledge </IconItem>
            <IconItem><Checkmark color="harvest" />Tours communities with you</IconItem>
            <IconItem><Checkmark color="harvest" />Helps you choose wisely</IconItem>
          </Grid>
        </Block>
      </Grid>
      <Grid
        gridGap="m"
        gridTemplateColumns="auto!important"
        sx$tablet={{
         gridTemplateColumns: sx`${layout('col3')} 1fr!important`,
         gridGap: sx`${space('l')}!important`,
       }}
        sx$laptop={{
         gridTemplateColumns: sx`${layout('col6')} 1fr!important`,
         gridGap: sx`${space('xxl')}!important`,
       }}
      >
        <ReasonImage
          path="react-assets/home/laptopC.webp"
          alt="smarter-way"
        />
        <Block margin="auto 0">
          <Heading
            font="title-l"
            pad="m"
            maxWidth={sx`calc(${layout('col4')} + ${space('l')})`}
          >
            Your Home Base
          </Heading>
          <Block
            font="body-l"
            pad="l"
          >We keep your search results, advisor contact info, and your communications in a private, secure&nbsp;
            <Block display="inline" background="harvest.lighter-90" color="harvest.darker-20" padding={sx`${space('xxs')} ${space('xxxs')}`}><b>Seniorly</b> Home Base</Block>
            &nbsp;to help you stay organized along the way. It’s easy to communicate with your advisor and change your preferences to explore different types of communities.
          </Block>
          <Grid flexDirection="row" gridGap="s">
            <IconItem ><Community color="harvest" /> See your recommended communities</IconItem>
            <IconItem><List color="harvest" /> Evaluate your options efficiently</IconItem>
            <IconItem ><Messages color="harvest" /> Stay in touch with your personal advisor</IconItem>
            <IconItem><Offer color="harvest" /> Get special offers for other products and services</IconItem>
          </Grid>
        </Block>
      </Grid>
    </Section>
  );
};

export default Reasons;
