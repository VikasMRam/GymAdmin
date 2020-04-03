import React from 'react';
import styled from 'styled-components';

import { size, palette, assetPath } from 'sly/components/themes';
import { Block, Heading, Link, Image, ResponsiveImage, Icon } from 'sly/components/atoms';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import HeaderContainer from 'sly/containers/HeaderContainer';
import CurtainupSubscribeFormContainer from 'sly/containers/CurtainupSubscribeFormContainer';
import { TemplateHeader } from 'sly/components/templates/BasePageTemplate';
import ContentOverImage, { MiddleContent } from 'sly/components/molecules/ContentOverImage';
import Footer from 'sly/components/organisms/Footer';

const PaddedResponsiveImage = pad(ResponsiveImage);

const PaddedHeading = pad(Heading);

const PaddedLink = pad(Link, 'large');

const StyledMiddleContent = styled(textAlign(MiddleContent))`
  width: 100%;
  padding: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col8')};
  }
`;

const HeroVideo = pad(styled.iframe`
  margin-top: -180px; // video has a non-standard dimension that's only used in this page
  position: relative;
  width: 100%;

  @media screen and (min-width: 515px) {
    width: 505px;
  }
`, 'xxxLarge');

const Section = styled.section`
  padding: calc(${size('spacing.massive')} + ${size('spacing.regular')}) ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: calc(${size('spacing.massive')} + ${size('spacing.regular')});
  }
`;

const ColouredSection = styled(Section)`
  background: ${palette('secondary', 'background')};
`;

const ContentWrapper = styled.div`
  margin: auto;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col8')};
  }
`;

const SmallContentWrapper = styled(ContentWrapper)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col5')};
  }
`;

const SubscribeForm = pad(ContentWrapper, 'massive');

const ShareButtons = styled.div`
  > * {
    margin-right: ${size('spacing.xLarge')};
  }
`;

const Content = textAlign(styled.main``);

const ShowStarts = pad(SmallContentWrapper, 'massive');

const PastShows = styled.div`
  > * {
    width: ${size('layout.col4')};
    margin-right: ${size('layout.gutter')};
    margin-bottom: ${size('layout.gutter')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    > * {
      margin-bottom: 0;
    }
  }
`;

const CurtainUpPage = () => (
  <>
    <TemplateHeader noBottomMargin>
      <HeaderContainer />
      <ContentOverImage
        image="react-assets/curtainup/hero.png"
        imageAlt="Seniorly presents curtainup"
        imageHeight={740}
        mobileHeight="740px"
        tabletHeight="740px"
        laptopHeight="740px"
      >
        <StyledMiddleContent>
          <PaddedResponsiveImage path="react-assets/curtainup/logo.png" />
          <PaddedHeading palette="white" size="subtitle" weight="regular">
            A daily 1 hour live stream to entertain our aging loved ones. We will be broadcasting live into senior communities and homes nationwide through our relationships with thousands of senior living providers.
          </PaddedHeading>
          <PaddedLink href="https://www.youtube.com/channel/UCAxh9TnYDhoIKCT4IaKI_dQ?sub_confirmation=1" target="_blank">
            <Image src={assetPath('images/curtainup/youtube-subscribe.png')} />
          </PaddedLink>
          <Block palette="white">Subscribe To Our YouTube Channel To Watch The Shows!</Block>
        </StyledMiddleContent>
      </ContentOverImage>
    </TemplateHeader>
    <Content>
      <ColouredSection>
        <HeroVideo title="what is curtainup" height="285" src="https://www.youtube.com/embed/H-wOQ-Areys" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        <SubscribeForm>
          <PaddedHeading weight="regular" palette="secondary" variant="dark35">Get Our Weekly Performance Alert and Find Out Who is Performing Each Day.</PaddedHeading>
          <CurtainupSubscribeFormContainer />
        </SubscribeForm>
        <PaddedHeading weight="regular" palette="secondary" variant="dark35">Share the show!</PaddedHeading>
        <ShareButtons>
          <Link href="" target="_blank">
            <Icon icon="youtube-round" size="xLarge" />
          </Link>
          <Link href="" target="_blank">
            <Icon icon="facebook-round" size="xLarge" />
          </Link>
          <Link href="" target="_blank">
            <Icon icon="twitter-round" size="xLarge" />
          </Link>
          <Link href="" target="_blank">
            <Icon icon="linkedin-round" size="xLarge" />
          </Link>
          <Link href="" target="_blank">
            <Icon icon="instagram-round" size="xLarge" />
          </Link>
          <Link href="" target="_blank">
            <Icon icon="share-round" size="xLarge" palette="slate" />
          </Link>
        </ShareButtons>
      </ColouredSection>
      <Section>
        <ContentWrapper>
          <PaddedHeading weight="regular" palette="secondary" variant="dark35">Just Some of the Scheduled Guests to Appear</PaddedHeading>
          <Block>Seniorly Presents: CURTAIN UP! - a Live Free Show streaming daily for 1 hour via the Seniorly YouTube Channel and Facebook Page. Viewers can watch performers in real-time, ask questions, or sit back and enjoy the show.</Block>
        </ContentWrapper>
      </Section>
      <ColouredSection>
        <ShowStarts>
          <PaddedHeading weight="regular" palette="secondary" variant="dark35">The Show Starts</PaddedHeading>
          <PaddedHeading size="superHero" weight="regular" palette="secondary" variant="dark35">Every Weekday at 1 pm PT / 4 pm ET</PaddedHeading>
        </ShowStarts>
        <PaddedHeading weight="regular" palette="secondary" variant="dark35">See Our Past Shows</PaddedHeading>
        <PastShows>
          <iframe title="past show 1" height="185" src="https://www.youtube.com/embed/0sP6Ao02JLE" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          <iframe title="past show 2" height="185" src="https://www.youtube.com/embed/H-wOQ-Areys" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          <iframe title="past show 3" height="185" src="https://www.youtube.com/embed/0PrYaxpNzMI" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </PastShows>
      </ColouredSection>
      <Section>
        <PaddedHeading weight="regular" palette="secondary" variant="dark35">Why We Are Doing This</PaddedHeading>
      </Section>
    </Content>
    <Footer />
  </>
);

export default CurtainUpPage;
