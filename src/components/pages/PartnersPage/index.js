import React, { Fragment } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import { size, assetPath } from 'sly/components/themes';
import { getHelmetForPartnersPage } from 'sly/services/helpers/html_headers';
import { TemplateHeader, TemplateContent } from 'sly/components/templates/BasePageTemplate';
import { Hr, Paragraph } from 'sly/components/atoms';
import HeaderContainer from 'sly/containers/HeaderContainer';
import Section from 'sly/components/molecules/Section';
import IconInfoTile from 'sly/components/molecules/IconInfoTile';
import Footer from 'sly/components/organisms/Footer';
import PartnerWithSly from 'sly/components/molecules/PartnerWithSly';
import FactBox from 'sly/components/molecules/FactBox';
import { ColumnWrapper } from 'sly/components/molecules/MostSearchedRegions';
import PartnerReview from 'sly/components/molecules/PartnerReview';
import BecomeSlyPartnerBanner from 'sly/components/molecules/BecomeSlyPartnerBanner';

const HeroWrapper = styled.div`
  position: relative;
  height: ${size('header.agents.heroImage.height')};

  > * {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

const HeroTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-position: right 50%;
  background-image: url(${assetPath('images/agents-partners-hero.png')});

  > * {
    max-width: calc(100% - ${size('spacing.large')});
    @media screen and (min-width: ${size('breakpoint.tablet')}) {
      max-width: ${size('tabletLayout.col6')};
    }
    @media screen and (min-width: ${size('breakpoint.laptop')}) {
      max-width: ${size('layout.col8')};
    }
  }
`;

const StyledSection = styled(Section)`
  text-align: left;
  margin: ${size('spacing.huge')} auto;

  & > h2 {
    margin-bottom: ${size('spacing.xLarge')};
  }
`;

const StyledColumnWrapper = styled(ColumnWrapper)`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-template-columns: ${size('layout.col4')} ${size('layout.col4')} ${size('layout.col4')};
  }
`;

const MSPAColumnWrapper = styled(ColumnWrapper)`
  grid-template-columns: auto;
  grid-row-gap: ${size('spacing.xxxLarge')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PartnersPage = () => {
  const headerContent = (
    <Fragment>
      {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
      <HeaderContainer />
      <HeroWrapper>
        <HeroTextWrapper><PartnerWithSly /></HeroTextWrapper>
      </HeroWrapper>
    </Fragment>
  );

  return (
    <Fragment>
      {getHelmetForPartnersPage()}
      <TemplateHeader>{headerContent}</TemplateHeader>
      <TemplateContent>
        <StyledSection title="How does it work?">
          <ColumnWrapper>
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="house" heading="Stay with your curreny agency" content="As a Seniorly Partner Agent you will still operate under your business name and simply receive extra family referrals in addition to your current business. " />
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="star" heading="Work with qualified families" content="We are not one of those “online lead companies”. As a Partner Agent, your profile will be highlighted on Seniorly.com. Families can reach out directly or be matched by Seniorly according to your area of expertise." />
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" icon="loyalty" heading="Keep over 50% commission" content="You receive over 50% of the referral fee when successfully helping a Seniorly prospect. A referral commission is paid to Seniorly upon a new resident move-in." />
          </ColumnWrapper>
        </StyledSection>
        <Hr fullWidth />
        <StyledSection title="Online Discovery Matched With Local Expertise">
          <Paragraph>Seniorly is changing the way families find senior housing and care. Thousands of families visit our site everyday, giving you exposure to new high quality clients.</Paragraph>
          <StyledColumnWrapper>
            <FactBox title="30,000+" description="families found a home with the help of Seniorly Partner Advisors" />
            <FactBox title="98%" description="of families who moved in would recommend their Advisor to a friend" />
            <FactBox title="90%" description="Over 90% of our partners would refer Seniorly to their colleagues" />
          </StyledColumnWrapper>
        </StyledSection>
        <Hr fullWidth />
        <StyledSection title="Meet Seniorly Partner Advisors">
          <MSPAColumnWrapper>
            <PartnerReview name="Steve Villa" location="San Francisco, California" image="https://d1qiigpe5txw4q.cloudfront.net/uploads/3a29a352749330c0495783c6245b5bf0/steve-villa_sd.jpg" review="Steve was very professional, was very knowledgeable, extremely resourceful and most accommodating. It's been a pleasure to work with him. Thank you!" />
            <PartnerReview name="Rijan Shrestha" location="San Francisco, California" image="https://d1qiigpe5txw4q.cloudfront.net/uploads/fa166abaea9307fae330875fb498eb43/sara%2520and%2520R%25204x4_sd.jpg" review="I am so very grateful for Rijan and for Seniorly. They helped find the perfect place for my daughter, and were so service-oriented. I would recommend this service, and Rijan especially, to anyone looking to locate senior housing. - Donna B." />
            <PartnerReview name="Brett from Senior Advantages Assisted Living Placement (Florida)" location="San Francisco, California" image={assetPath('images/agent-xLarge.png')} review="Brett has done a great job assuring me that my mom can be assisted in a personalized way, not just warehoused.  He talked with me directly and has emailed me assuring me that there were several ways forward.  I truly appreciate nit just pushing mom into a facility but hearing who she was and her present/future needs might be. Thank you for this service. - Rebecca H" />
            <PartnerReview name="Megan Wiswell" location="San Francisco, California" image="https://d1qiigpe5txw4q.cloudfront.net/uploads/ede2264b7d3ad70e33ac7e3544658876/Screenshot%25202018-07-12%2520at%25202.15.09%2520PM_sd.png" review="Good morning. Megan Wiswell is amazing. I would recommend her anytime. She is thorough and friendly. She knew the area and respected the budget I was working with. (Didn’t try to push me somewhere that wouldn’t work) I really appreciated that because she didn’t make me feel bad. She said “it is what it is” and we work with it. She’s a good listener and followed up to make sure I had what I needed. Thank you to all of you for being there for me. It is a steep learning curve and you don’t need it until you need it. Blessings for all - Sue G" />
          </MSPAColumnWrapper>
        </StyledSection>
      </TemplateContent>
      <BecomeSlyPartnerBanner />
      <Footer />
    </Fragment>
  );
};

export default PartnersPage;
