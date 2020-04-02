import React from 'react';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Block, Heading, Link, ResponsiveImage } from 'sly/components/atoms';
import pad from 'sly/components/helpers/pad';
import textAlign from 'sly/components/helpers/textAlign';
import HeaderContainer from 'sly/containers/HeaderContainer';
import { TemplateHeader, TemplateContent } from 'sly/components/templates/BasePageTemplate';
import ContentOverImage, { MiddleContent } from 'sly/components/molecules/ContentOverImage';
import Footer from 'sly/components/organisms/Footer';

const PaddedResponsiveImage = pad(ResponsiveImage);

const PaddedHeading = pad(Heading);

const PaddedLink = pad(Link, 'large');

const StyledMiddleContent = styled(textAlign(MiddleContent))`
  max-width: ${size('layout.col8')};
`;

const YoutubeVideo = styled.iframe`
  margin-top: -115px; // video has a non-standard dimension that's only used in this page
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;

  @media screen and (min-width: 515px) {
    width: 505px;
  }
`;

const CurtainUpPage = () => (
  <>
    <TemplateHeader>
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
            <ResponsiveImage path="react-assets/curtainup/youtube-subscribe.png" />
          </PaddedLink>
          <Block palette="white">Subscribe To Our YouTube Channel To Watch The Shows!</Block>
        </StyledMiddleContent>
      </ContentOverImage>
    </TemplateHeader>
    <TemplateContent>
      <YoutubeVideo title="what is curtainup" height="285" src="https://www.youtube.com/embed/H-wOQ-Areys" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
    </TemplateContent>
    <Footer />
  </>
);

export default CurtainUpPage;
