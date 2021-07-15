import React, { Component } from 'react';
import styled, { css } from 'styled-components';


import { size, palette } from 'sly/common/components/themes';
import { Hr, Heading, Block, Button, Grid, layout, Image, sx, sx$laptop, sx$tablet, space, Span  } from 'sly/common/system';
import { Icon } from 'sly/common/components/atoms';
import { Checkmark } from 'sly/common/icons/index';


const Section = styled(Block)`
  width: 100%;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
  ${sx$tablet({
    width: 'col8',
    paddingX: '0',
  })} 
  ${sx$laptop({ width: 'col12' })}) 
`;

const GradientOverlay = styled(Block)`
  display:inline-block;
  &:after {
    content:'';
    position:absolute;
    left:0; top:0;
    width:100%; 
    height:100%;
    display:inline-block;
    background: linear-gradient(to bottom,rgba(159,130,82,0.1) 0%,rgba(159,130,82,1) 50%);
  }
  ${sx$tablet({
    '&:after': {
      background: 'linear-gradient(to left,rgba(159,130,82,0.1) 0%,rgba(159,130,82,1) 95%)',
    },
  })} 
`;

const IconItem = styled(Block)`
display:flex;
flex-direction:row;
align-items:baseline;
color: white;
& svg {
    margin-right:${space('s')};
    margin-bottom:auto;
    flex: 1;
  }
& span {
    flex: 18;
}
`;

const PlusBranding = () => {
  return (
    <Block
      as="section"
      position="relative"
      mb="xs"
      sx$tablet={{ marginBottom: 'xxl' }}
      css={css`
        width: 100vw;
        max-width: 100vw;
        margin-left: calc(50% - 50vw);
        padding: ${space('xxl')} 0px;
        ${sx$tablet({ padding: '64px 0px' })}
        ${sx$laptop({ padding: 'xxxl 0px', marginLeft: 'calc(76% - 0.5px - 50vw)' })}
      `}
    >
      <GradientOverlay>
        <Image
          path="react-assets/plus/plus-background.jpeg"
          alt="A Home To Love"
          css={css`
            object-fit: cover;
            width: 100%;
            height: 100%;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
          `}
          sources={[120, 240, 480]}
          sizes="(max-width: 1199px) 100vw, 1200px"
          shouldPreload
          loading="eager"
        />
      </GradientOverlay>
      <Section
        display="flex"
        flexDirection="column"
        position="relative"
        sx={{
            zIndex: 100,
          }}
        sx$laptop={{
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
      >
        <Block

          sx$tablet={{
              marginBottom: '64px',
            }}
          sx$laptop={{
              marginBottom: '0',
              marginRight: '64px',
            }}
        >
          <Block
            display="flex"
            justifyContent="center"
            paddingBottom="xl"
            sx$tablet={{
                justifyContent: 'flex-start',
                paddingBottom: 's',
              }}
          >
            <Icon palette="white" icon="logo" size="hero" />
            <Heading
              font="title-l"
              pad="0 l"
              as="span"
              maxWidth={sx`calc(${layout('col4')} + ${space('l')})`}
              color="white"
              alignSelf="center"
            >
              Seniorly Plus
            </Heading>
          </Block>
          <Block
            m="s 0"
            font="body-m"
            pad="l"
            color="white"
            as="p"
            maxWidth={sx`calc(${layout('col8')} + ${space('l')})`}
          >
            This is a Seniorly Plus room which means it is part of a selection of only the highest quality homes. Each Plus home is verified through in-person quality inspection to ensure your next home is one you will love.
          </Block>
          <Block>
            <Grid flexDirection="row" gridGap="s">
              <IconItem><Checkmark color="white" /><Span>Each space is thoughtfully designed for comfort and care</Span></IconItem>
              <IconItem><Checkmark color="white" /><Span>Seniorly Plus communities come with premium support</Span></IconItem>
              <IconItem><Checkmark color="white" /><Span>Be at ease knowing each community is verified with an in-person inspection</Span></IconItem>
            </Grid>
          </Block>
          <Button
            palette="white"
            to="/"
            width="100%"
            marginTop="xl"
            paddingY="m"
            height="l"
            color="slate-base"
            sx$tablet={{
                width: 'initial',
                paddingX: 'xxl',
              }}
          >
            Learn more abour Seniorly Plus
          </Button>
        </Block>

      </Section>
    </Block>
  );
};

export default PlusBranding;
