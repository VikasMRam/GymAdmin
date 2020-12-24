import React from 'react';
import styled, { css } from 'styled-components';
import { func, string, object } from 'prop-types';

import { size, getKey } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import SlyEvent from 'sly/web/services/helpers/events';
import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import { Heading, Block, Button, Hr, Link, Paragraph, Grid } from 'sly/common/components/atoms';
import { Centered, ResponsiveImage } from 'sly/web/components/atoms';
import Section from 'sly/web/components/molecules/Section';
import Footer from 'sly/web/components/organisms/Footer';
import HomeCTABox from 'sly/web/components/organisms/HomeCTABox';
import ContentOverImage, { MiddleContent } from 'sly/web/components/molecules/ContentOverImage';
import IconItem from 'sly/web/components/molecules/IconItem';
import QuotesCarroussel from 'sly/web/components/homepage/QuotesCarroussel';
import CommunitiesByCity from 'sly/web/components/homepage/CommunitiesByCity';
import Guides from 'sly/web/components/homepage/Guides';
import { startingWith } from 'sly/common/components/helpers/media';

const StyledSection = styled(Section)`
  text-align: center;
  margin: ${size('spacing.huge')} auto;

  & > h2 {
    margin-bottom: ${size('spacing.xLarge')};
  }
`;

const sendEvent = (category, action, label, value) => SlyEvent.getInstance().sendEvent({
  category,
  action,
  label,
  value,
});

const blockPad = css`
  margin-bottom: 48px;
  ${startingWith('tablet', css({ marginBottom: 64 }))}
  ${startingWith('laptop', css({ marginBottom: 80 }))}
`;

const HomePage = ({
  showModal, hideModal, onLocationSearch,
}) => {
  const HeaderContent = (
    <Block
      pad="xMassive"
      upToLaptop={{
        marginBottom: `calc(${getKey('sizes.spacing.xMassive')} + ${getKey('sizes.spacing.xLarge')})`,
      }}
      upToTablet={{
        marginBottom: getKey('sizes.spacing.xMassive'),
      }}
    >
      <HeaderContainer />
      {/* <BannerNotificationAdContainer type="wizardHome" noMarginBottom /> */}
      <ContentOverImage
        image="react-assets/home/cover6.jpg"
        imageAlt="A Home To Love"
        imageHeight={540}
        mobileHeight="852px"
        tabletHeight="540px"
        laptopHeight="540px"
        pad="xMassive"
        upToLaptop={{
          // important for margin to be applied after overlapping text content that overflows
          display: 'inline-block',
        }}
      >
        <MiddleContent
          width="100%"
          css={{
            maxWidth: getKey('sizes.layout.col12'),
          }}
          upToTablet={{
            maxWidth: `${getKey('sizes.layout.col4')}!important`,
            marginTop: `${getKey('sizes.spacing.xxxLarge')}!important`,
          }}
          upToLaptop={{
            marginTop: '120px!important',
            maxWidth: `${getKey('sizes.layout.col8')}!important`,
          }}
        >
          <Grid
            gap="xxxLarge"
            dimensions={[getKey('sizes.layout.col7'), '1fr']}
            upToLaptop={{
              gridTemplateColumns: 'unset!important',
              gridGap: `${getKey('sizes.spacing.xMassive')}!important`,
            }}
            startingWithLaptop={{
              alignItems: 'center',
            }}
          >
            <div>
              <Heading size="superHero" pad="xLarge">
                Find a senior living community you’ll love
              </Heading>
              <Block size="subtitle" lineHeight='1.6' pad="xLarge">
                Seniorly makes it easier to choose the right community for your needs and budget. And it’s free.
              </Block>
              <Button
                to="/wizards/assessment?cta=generalOptions&entry=homepage"
                kind="jumbo"
                upToTablet={{
                  width: '100%',
                }}
              >
                Get started
              </Button>
            </div>
            <Grid
              gap="large"
              flow="row"
              startingWithTablet={{
                gridTemplateColumns: '1fr 1fr!important',
              }}
              startingWithLaptop={{
                gridTemplateColumns: 'unset!important',
              }}
            >
              <Grid
                gap="large"
                dimensions={['1fr', '1fr']}
              >
                <ResponsiveImage
                  path="react-assets/home/hero-1.png"
                  alt="face1"
                  aspectRatio="1:1"
                />
                <ResponsiveImage
                  path="react-assets/home/hero-2.png"
                  alt="face2"
                  aspectRatio="1:1"
                />
              </Grid>
              <Grid
                gap="large"
                dimensions={['1fr', '1fr']}
              >
                <ResponsiveImage
                  path="react-assets/home/hero-3.png"
                  alt="face3"
                  aspectRatio="1:1"
                />
                <ResponsiveImage
                  path="react-assets/home/hero-4.png"
                  alt="face4"
                  aspectRatio="1:1"
                />
              </Grid>
            </Grid>
          </Grid>
        </MiddleContent>
      </ContentOverImage>
    </Block>
  );

  const onButtonClick = () => {
    const modalContent = (
      <>
        <Heading size="subtitle">Please enter a location:</Heading>
        <SearchBoxContainer
          layout="homeHero"
          onLocationSearch={(e) => {
            hideModal();
            onLocationSearch(e, true);
          }}
        />
      </>
    );
    sendEvent('freedomToExploreSearch', 'open');

    const closeModal = () => {
      hideModal();
      sendEvent('freedomToExploreSearch', 'close');
    };

    showModal(modalContent, closeModal, 'searchBox');
  };

  return (
    <>
      <TemplateHeader noBottomMargin>{HeaderContent}</TemplateHeader>
      <TemplateContent>
        <Section
          titleSize="displayL"
          title="Why do 3.5 million families use Seniorly every year?"
          headingMaxWidth={getKey('sizes.layout.col8')}
          css={{
            marginBottom: `calc(2 * ${getKey('sizes.spacing.xMassive')})`,
          }}
          upToLaptop={{
            marginBottom: `${getKey('sizes.spacing.xMassive')}!important`,
          }}
          centerTitle
        >
          <Grid
            gap="xLarge"
            upToLaptop={{
              gridTemplateColumns: 'auto!important',
            }}
          >
            <HomeCTABox
              image={assetPath('vectors/home/advisor.svg')}
              heading="Your Own Advisor"
              buttonText="Speak with an expert"
              buttonProps={{
                to: '/wizards/assessment?cta=generalOptions&entry=homepage',
              }}
            >
              We connect you with a Seniorly Local Advisor, our trusted partner who knows the communities in your area. Rely on your advisor as much or as little as you need to find a new home you&apos;ll love.
            </HomeCTABox>
            <HomeCTABox
              image={assetPath('vectors/home/smart-search.svg')}
              heading="Our Smart Search"
              buttonText="Take our quiz"
              buttonPalette="primary"
              buttonProps={{
                to: '/wizards/assessment?cta=speakExpert&entry=homepage',
              }}
            >
              Take our short quiz to set your personal preferences, then see the communities we recommend for you. Seniorly Smart Search helps you make sense of your options and choose wisely.
            </HomeCTABox>
            <HomeCTABox
              image={assetPath('vectors/home/freedom-to-explore.svg')}
              heading="Freedom to Explore"
              buttonText="Explore communities"
              buttonPalette="harvest"
              buttonProps={{
                onClick: () => onButtonClick(),
              }}
            >
              Want to explore communities on your own? No problem. We give you the tools to navigate through over 40,000 of the best communities—with access to monthly pricing and exclusive photos.
            </HomeCTABox>
          </Grid>
        </Section>

        <Block
          as="section"
          display="grid"
          css={{
            marginBottom: `${getKey('sizes.spacing.xMassive')}`,
            gridGap: `${getKey('sizes.spacing.xMassive')}`,
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
        </Block>

        <StyledSection title="Explore communities by city.">
          <Block size="subtitle">
            See our exclusive photos, monthly pricing, and expert insights for each community. You can learn more about the places you like or speak with a Seniorly Local Advisor in that city.
          </Block>
        </StyledSection>
      </TemplateContent>

      <CommunitiesByCity onLocationSearch={onLocationSearch}/>

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
              to="/wizards/assessment?cta=generalOptions&entry=homepage"
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
