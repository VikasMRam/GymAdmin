import React, { forwardRef } from 'react';
import { css } from 'styled-components';
import { func, string, object } from 'prop-types';

import QuotesCarroussel from './QuotesCarroussel';
import CommunitiesByCity from './CommunitiesByCity';
import Reasons from './Reasons';
import Question from './Question';
import Guides from './Guides';
import Section from './Section';

import HeaderContainer from 'sly/web/containers/HeaderContainer';
// import { Hr } from 'sly/common/components/atoms';
import { Hr, Heading, Block, Button, Grid  } from 'sly/common/system';
import ResponsiveImage from 'sly/web/components/atoms/ResponsiveImage';
import Footer from 'sly/web/components/organisms/Footer';
import { startingWith } from 'sly/common/components/helpers/media';
import ModalContainer from 'sly/web/containers/ModalContainer';


const blockPad = css`
  margin-bottom: 48px;
  ${startingWith('tablet', css({ marginBottom: 64 }))}
  ${startingWith('laptop', css({ marginBottom: 80 }))}
`;

const blockPad2 = {
  marginBottom: 'xxl',
  '@tablet': {
    marginBottom: '64px',
  },
  '@laptop': {
    marginBottom: 'xxxl',
  },
};


const Separator = forwardRef((props, ref) => (
  <Hr
    ref={ref}
    margin="0"
    sx={blockPad2}
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
        sx={{
          paddingY: 'xxl',
          '@tablet': {
            paddingY: '64px',
          },
          '@laptop': {
            padding: 'xxxl',
          },
          ...blockPad2,
        }}
        // css={css`
        //   padding: 48px 0px;
        //   ${startingWith('tablet', css({ padding: '64px 0px' }))}
        //   ${startingWith('laptop', css({ padding: '80px 0px' }))}

        //   ${blockPad}
        // `}
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
          sizes="30vw"
        />
        {/* <BannerNotificationAdContainer type="wizardHome" noMarginBottom /> */}
        <Section
          display="flex"
          flexDirection="column"
          position="relative"
          sx={{
            zIndex: 100,
          }}
          sx$laptop={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Block css={css`
            margin-bottom: 48px;
            ${startingWith('tablet', css({ marginBottom: '64px' }))}
            ${startingWith('laptop', css({ marginRight: '64px', marginBottom: '0px' }))}
          `}
          >
            <Heading font="title-xxl" pad="l">
              Find a senior living community you’ll love.
            </Heading>
            <Block
              font="body-l"
              pad="l"
            >
              Seniorly makes it easier to choose the right community for your needs and budget. And it’s free.
            </Block>
            <Button
              to="/wizards/assessment?cta=speakExpert&entry=homepage"
              width="100%"
              paddingY="m"
              height="l"
              sx$tablet={{
                width: 'initial',
                paddingX: 'xxl',
              }}
            >
              Get started
            </Button>
          </Block>
          <Grid
            gridGap="m"
            flexDirection="row"
            sx$tablet={{
              gridTemplateColumns: '1fr 1fr!important',
            }}
            sx$laptop={{
              gridTemplateColumns: 'unset!important',
              width: 376,
              flexShrink: 0,
            }}
          >
            <Grid
              gridGap="m"
              gridTemplateColumns="1fr 1fr"
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
              gridGap="m"
              gridTemplateColumns="1fr 1fr"
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
        sx={blockPad2}
      />
      <Separator />

      <Reasons />

      <Separator />

      <CommunitiesByCity onLocationSearch={onLocationSearch} />

      <Guides sx={blockPad2} />

      <QuotesCarroussel css={blockPad} />

      <Grid
        flexDirection="column-reverse"
        display="flex"
        gridTemplateColumns="50% 50%"
        sx$tablet={{
          display: 'grid',
          flexDirection: 'row',
        }}
      >
        <Block
          background="primary"
          padding="l"
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Block
            width="auto"
            sx$tablet={{
              width: '480px',
            }}
          >
            <Block
              font="title-m"
              pad="l"
              color="white"
              textAlign="center"
              sx$tablet={{
                textAlign: 'initial',
              }}
            >
              See why thousands of families in your area trust Seniorly to find their next home.
            </Block>
            <Button
              background="primary"
              palette="viridian"
              borderPalette="white"
              border="m"
              borderRadius="xxs"
              borderColor="white"
              width="100%"
              paddingY="m"
              height="l"
              sx$tablet={{
                width: 'initial',
                paddingX: 'xxl',
              }}
              to="/wizards/assessment?cta=speakExpert&entry=homepage"
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
