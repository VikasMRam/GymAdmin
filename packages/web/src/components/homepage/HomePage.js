import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { func, string, object } from 'prop-types';

import QuotesCarroussel from './QuotesCarroussel';
import CommunitiesByCity from './CommunitiesByCity';
import Reasons from './Reasons';
import Question from './Question';
import Guides from './Guides';
import Section from './Section';

import { size, getKey } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import { Heading, Block, Button, Hr, Link, Paragraph, Grid } from 'sly/common/components/atoms';
import { Centered, ResponsiveImage } from 'sly/web/components/atoms';
import Footer from 'sly/web/components/organisms/Footer';
import ContentOverImage, { MiddleContent } from 'sly/web/components/molecules/ContentOverImage';
import { startingWith } from 'sly/common/components/helpers/media';
import ModalContainer from 'sly/web/containers/ModalContainer';


const blockPad = css`
  margin-bottom: 48px;
  ${startingWith('tablet', css({ marginBottom: 64 }))}
  ${startingWith('laptop', css({ marginBottom: 80 }))}
`;

const Separator = forwardRef((props, ref) => (
  <Hr
    ref={ref}
    margin="0px"
    css={blockPad}
    {...props}
  />
));

const HomePage = ({
  showModal, hideModal, onLocationSearch,
}) => {
  return (
    <>
      <ModalContainer />

      <HeaderContainer />

      <Block
        as="header"
        position="relative"
        css={css`
          padding: 48px 0px;
          ${startingWith('tablet', css({ padding: '64px 0px' }))}
          ${startingWith('laptop', css({ padding: '80px 0px' }))}

          ${blockPad}
        `}
      >
        <ResponsiveImage
          path="react-assets/home/cover6.jpg"
          alt="A Home To Love"
          css={css`
            object-fit: cover;
            width: 100%;
            height: 100%;
            opacity: 0.8;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
          `}
          sources={[120, 240, 480]}
          sizes="calc(100vw / 3)"
        />
        {/* <BannerNotificationAdContainer type="wizardHome" noMarginBottom /> */}
        <Section css={css`
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 100;
          ${startingWith('laptop', css({ flexDirection: 'row', alignItems: 'center' }))}
        `}
        >
          <Block css={css`
            margin-bottom: 48px;
            ${startingWith('tablet', css({ marginBottom: '64px' }))}
            ${startingWith('laptop', css({ marginRight: '64px', marginBottom: '0px' }))}
          `}
          >
            <Heading font="title-xxlarge" pad="large">
              Find a senior living community you’ll love.
            </Heading>
            <Block
              font="body-large"
              css={css`
              margin-bottom: 48px;
              ${startingWith('tablet', css({ marginBottom: '24px' }))}
            `}
            >
              Seniorly makes it easier to choose the right community for your needs and budget. And it’s free.
            </Block>
            <Button
              to="/wizards/assessment?cta=speakExpert&entry=homepage"
              kind="jumbo"
              upToTablet={{
                width: '100%',
              }}
            >
              Get started
            </Button>
          </Block>
          <Grid
            gap="large"
            flow="row"
            startingWithTablet={{
              gridTemplateColumns: '1fr 1fr!important',
            }}
            startingWithLaptop={{
              gridTemplateColumns: 'unset!important',
              width: 376,
              flexShrink: 0,
            }}
          >
            <Grid
              gap="large"
              dimensions={['1fr', '1fr']}
            >
              <ResponsiveImage
                path="react-assets/home/hero-1.webp"
                alt="face1"
                aspectRatio="1:1"
                sources={[150, 180, 300, 360]}
                sizes={['calc((100vw - 3rem) / 2)', 150, 180]}
              />
              <ResponsiveImage
                path="react-assets/home/hero-2.webp"
                alt="face2"
                aspectRatio="1:1"
                sources={[150, 180, 300, 360]}
                sizes={['calc((100vw - 3rem) / 2)', 150, 180]}
              />
            </Grid>
            <Grid
              gap="large"
              dimensions={['1fr', '1fr']}
            >
              <ResponsiveImage
                path="react-assets/home/hero-3.webp"
                alt="face3"
                aspectRatio="1:1"
                sources={[150, 180, 300, 360]}
                sizes={['calc((100vw - 3rem) / 2)', 150, 180]}
              />
              <ResponsiveImage
                path="react-assets/home/hero-4.webp"
                alt="face4"
                aspectRatio="1:1"
                sources={[150, 180, 300, 360]}
                sizes={['calc((100vw - 3rem) / 2)', 150, 180]}
              />
            </Grid>
          </Grid>
        </Section>

      </Block>

      <Question
        showModal={showModal}
        hideModal={hideModal}
        onLocationSearch={onLocationSearch}
        css={blockPad}
      />
      <Separator />

      <Reasons />

      <Separator />

      <CommunitiesByCity onLocationSearch={onLocationSearch} />

      <Guides css={blockPad} />

      <QuotesCarroussel css={blockPad} />

      <Grid
        upToTablet={{
          display: 'flex!important',
          flexDirection: 'column-reverse',
        }}
      >
        <Block
          background="primary"
          padding="xLarge"
          align="center"
          verticalAlign="middle"
          display="flex"
        >
          <Block
            width="480px"
            upToTablet={{
              width: 'auto!important',
            }}
          >
            <Block
              weight="medium"
              size="displayS"
              pad="xLarge"
              palette="white"
              upToTablet={{
                textAlign: 'center',
              }}
            >
              See why thousands of families in your area trust Seniorly to find their next home.
            </Block>
            <Button
              background="primary"
              palette="white"
              borderPalette="white"
              to="/wizards/assessment?cta=speakExpert&entry=homepage"
              kind="jumbo"
              upToTablet={{
                width: '100%',
              }}
            >
              Get started
            </Button>
          </Block>
        </Block>
        <ResponsiveImage
          path="react-assets/home/bottom-banner.jpg"
          alt="bottom-banner"
          aspectRatio="1:1"
          paddingTop="396px!important"
          upToLaptop={{
            paddingTop: '388px!important',
          }}
          upToTablet={{
            paddingTop: '240px!important',
          }}
        />
      </Grid>
      <Footer />
    </>
  );
};

HomePage.propTypes = {
  onLocationSearch: func,
  pathName: string,
  queryParams: object,
  setQueryParams: func,
  showModal: func,
  hideModal: func,
  history: object,
};

export default HomePage;
