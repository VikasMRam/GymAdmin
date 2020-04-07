import React from 'react';
import styled from 'styled-components';

import { size, palette, assetPath } from 'sly/components/themes';
import { Block, Heading, Link, Image, ResponsiveImage, Box, Button } from 'sly/components/atoms';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import fullWidth from 'sly/components/helpers/fullWidth';
import HeaderContainer from 'sly/containers/HeaderContainer';
import CurtainupSubscribeFormContainer from 'sly/containers/CurtainupSubscribeFormContainer';
import { TemplateHeader } from 'sly/components/templates/BasePageTemplate';
import ContentOverImage, { MiddleContent } from 'sly/components/molecules/ContentOverImage';
import Footer from 'sly/components/organisms/Footer';
import CurtainupEventBox from 'sly/components/organisms/CurtainupEventBox';

const PaddedResponsiveImage = pad(ResponsiveImage);

const PaddedHeading = pad(Heading);

const XxxLargePaddedHeading = pad(Heading, 'xxxLarge');

const PaddedLink = pad(Link, 'large');

const PaddedImage = pad(Image);

const LargePaddedImage = pad(Image, 'large');

const FullWidthCurtainupSubscribeFormContainer = fullWidth(CurtainupSubscribeFormContainer);

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
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-items: center;
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
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-items: center;

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

const WhyDoingThisWrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: grid;
    grid-template-columns: ${size('layout.col2')} ${size('layout.col6')};
    grid-gap: ${size('layout.gutter')};
  }
`;

const PaddedBlock = pad(Block);

const LargePaddedBlock = pad(Block, 'large');

const XxxLargePaddedBlock = pad(Block, 'xxxLarge');

const RegularPaddedBlock = pad(Block, 'regular');

const TwoCol6Columns = textAlign(fullWidth(styled.div`
  display: grid;
  grid-gap: ${size('layout.gutter')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: ${size('layout.col6')} ${size('layout.col6')};
    width: auto;
  }
`), 'left');

const TeamingUpWithWrapper = pad(styled.div`
  display: grid;
  grid-gap: calc(${size('layout.gutter')} * 2);

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-gap: ${size('layout.gutter')};
    grid-template-columns: ${size('layout.col4')} ${size('layout.col4')};
  }
`, 'massive');

const OurHostsWrapper = styled.div`
  display: grid;
  grid-gap: ${size('layout.gutter')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: ${size('layout.col2')} ${size('layout.col2')};
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
          <FullWidthCurtainupSubscribeFormContainer />
        </SubscribeForm>
        <PaddedHeading weight="regular" palette="secondary" variant="dark35">Share the show!</PaddedHeading>
        <ShareButtons>
          <div className="addthis_inline_share_toolbox" />
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
        <XxxLargePaddedHeading weight="regular" palette="secondary" variant="dark35">Why We Are Doing This</XxxLargePaddedHeading>
        <WhyDoingThisWrapper>
          <Image src={assetPath('images/curtainup/arthur.png')} />
          <Box>
            <div>&quot;I&apos;m motivated by a simple belief, “we all need community”. That’s why I’ve dedicated my life to helping seniors find and live in communities as they grow older. In this current health crisis, the need for community and engagement has never been more important for our aging loved ones. Millions of seniors are living at home and in senior living communities under lockdown. This is our opportunity to let them know they are still part of our community and offer some happy moments in an uncertain isolated world.&quot;</div>
          </Box>
        </WhyDoingThisWrapper>
      </Section>
      <ColouredSection>
        <PaddedHeading weight="regular" palette="secondary" variant="dark35">The Shows This Week</PaddedHeading>
        <XxxLargePaddedBlock>Performers subject to change</XxxLargePaddedBlock>
        {/* todo replace with data from api */}
        <TwoCol6Columns>
          <CurtainupEventBox
            date="2020-04-02T08:02:17-05:00"
            performers={[
              {
                name: 'Jackie Burns',
                description: '"Wicked," "Hair," "If/Then"',
                gallery: {
                  id: 'dsfdsfs',
                  images: [
                    {
                      id: 'sdfsdfsd',
                      name: 'arthur.png',
                      path: assetPath('images/curtainup/arthur.png'),
                    },
                  ],
                },
              },
              {
                name: 'Jackie Burns 1',
                description: '"Wicked," "Hair," "If/Then"',
                gallery: {
                  id: 'dsfdsfs',
                  images: [
                    {
                      id: 'sdfsdfsd',
                      name: 'arthur.png',
                      path: assetPath('images/curtainup/arthur.png'),
                    },
                  ],
                },
              },
              {
                name: 'Jackie Burns 2',
                description: '"Wicked," "Hair," "If/Then"',
                gallery: {
                  id: 'dsfdsfs',
                  images: [
                    {
                      id: 'sdfsdfsd',
                      name: 'arthur.png',
                      path: assetPath('images/curtainup/arthur.png'),
                    },
                  ],
                },
              },
            ]}
          />
          <CurtainupEventBox
            date="2020-04-05T08:02:17-05:00"
            palette="razzmatazz"
            performers={[
              {
                name: 'Jackie Burns',
                description: '"Wicked," "Hair," "If/Then"',
                gallery: {
                  id: 'dsfdsfs',
                  images: [
                    {
                      id: 'sdfsdfsd',
                      name: 'arthur.png',
                      path: assetPath('images/curtainup/arthur.png'),
                    },
                  ],
                },
              },
              {
                name: 'Jackie Burns 1',
                description: '"Wicked," "Hair," "If/Then"',
                gallery: {
                  id: 'dsfdsfs',
                  images: [
                    {
                      id: 'sdfsdfsd',
                      name: 'arthur.png',
                      path: assetPath('images/curtainup/arthur.png'),
                    },
                  ],
                },
              },
              {
                name: 'Jackie Burns 2',
                description: '"Wicked," "Hair," "If/Then"',
                gallery: {
                  id: 'dsfdsfs',
                  images: [
                    {
                      id: 'sdfsdfsd',
                      name: 'arthur.png',
                      path: assetPath('images/curtainup/arthur.png'),
                    },
                  ],
                },
              },
            ]}
          />
        </TwoCol6Columns>
      </ColouredSection>
      <Section>
        <ContentWrapper>
          <XxxLargePaddedHeading weight="regular" palette="secondary" variant="dark35">We Are Teaming Up With:</XxxLargePaddedHeading>
          <TeamingUpWithWrapper>
            <div>
              <LargePaddedImage src={assetPath('images/curtainup/ashley.png')} />
              <RegularPaddedBlock weight="medium" size="subtitle">Ashley Rodbro</RegularPaddedBlock>
              <PaddedBlock>Director, Writer, and Producer</PaddedBlock>
              <div>
                Ashley Rodbro frequently works as Alex Timbers’ associate. She is currently the Associate and Resident Director for Moulin Rouge (Broadway), was the Resident for Hamilton (Puerto Rico & San Francisco, CA), Associate for Oh, Hello with Nick Kroll and John Mulaney (Off-Broadway, Tour, Broadway, Netflix), and the Assistant Director for John Mulaney’s Kid Gorgeous.
              </div>
            </div>
            <div>
              <LargePaddedImage src={assetPath('images/curtainup/stephanie.png')} />
              <RegularPaddedBlock weight="medium" size="subtitle">Stephanie Cowen</RegularPaddedBlock>
              <PaddedBlock>Producer, Casting Director, and Dramaturg</PaddedBlock>
              <div>
                Stephanie Cowen specializes in new works. She is Creative Director at Gold/Ross Productions, Casting Associate at Michael Cassara Casting, and Line Producer for JoCo Cruise. She was an Associate Producer on Broadway’s Amélie, which she helped develop at Triptyk Studios, where she was Director of Creative Development from 2008-2017. She is an alumna of CTI.
              </div>
            </div>
          </TeamingUpWithWrapper>
          <XxxLargePaddedHeading weight="regular" palette="secondary" variant="dark35">And, Presenting Our Hosts From Seniorly!</XxxLargePaddedHeading>
          <div>
            <OurHostsWrapper>
              <div>
                <LargePaddedImage src={assetPath('images/curtainup/andrew.png')} />
                <RegularPaddedBlock weight="medium" size="subtitle">Andrew</RegularPaddedBlock>
              </div>
              <div>
                <LargePaddedImage src={assetPath('images/curtainup/emma.png')} />
                <RegularPaddedBlock weight="medium" size="subtitle">Emma</RegularPaddedBlock>
              </div>
            </OurHostsWrapper>
          </div>
        </ContentWrapper>
      </Section>
      <ColouredSection>
        <PaddedHeading weight="regular" palette="secondary" variant="dark35">Want to Join the Show?</PaddedHeading>
        <XxxLargePaddedBlock>Performers subject to change</XxxLargePaddedBlock>
        <TwoCol6Columns>
          <Box backgroundPalette="white">
            <LargePaddedBlock weight="medium" size="title">For Communities and Home Care</LargePaddedBlock>
            <PaddedBlock>We would love to work with senior living communities and home care agencies to feature your residents on Curtain Up! If you would like to join the show please complete the form below:</PaddedBlock>
            <Button href="" target="_blank">Join The Show As a Community</Button>
          </Box>
          <Box backgroundPalette="white">
            <LargePaddedBlock weight="medium" size="title">For Performers</LargePaddedBlock>
            <PaddedBlock>We are looking for professional performers of the stage and screen to help us bring entertainment to the homes of seniors. To join the show please complete out our volunteer form:</PaddedBlock>
            <Button href="" target="_blank">Join The Show As a Performer</Button>
          </Box>
        </TwoCol6Columns>
      </ColouredSection>
      <Section>
        <ContentWrapper>
          <XxxLargePaddedHeading weight="regular" palette="secondary" variant="dark35">Thank You to Our Partners</XxxLargePaddedHeading>
          <PaddedImage src={assetPath('images/curtainup/sing-for-your-seniors.png')} />
          <Block size="caption">The views, information or opinions expressed during &quot;Curtain Up!&quot; are solely those of the individuals appearing and do not necessarily represent those of Seniorly.com.</Block>
        </ContentWrapper>
      </Section>
    </Content>
    <Footer />
    <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5542ad2748437167" />
  </>
);

export default CurtainUpPage;
