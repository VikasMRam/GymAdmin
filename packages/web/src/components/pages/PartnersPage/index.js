import React from 'react';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { getHelmetForPartnersPage } from 'sly/web/services/helpers/html_headers';
import { partnerFAQs } from 'sly/web/constants/agents';
import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import { Hr } from 'sly/common/components/atoms';
import { Paragraph, ResponsiveImage } from 'sly/web/components/atoms';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import Section from 'sly/web/components/molecules/Section';
import IconInfoTile from 'sly/web/components/molecules/IconInfoTile';
import Footer from 'sly/web/components/organisms/Footer';
import PartnerWithSly from 'sly/web/components/molecules/PartnerWithSly';
import FactBox from 'sly/web/components/molecules/FactBox';
import { ColumnWrapper } from 'sly/web/components/molecules/MostSearchedRegions';
import PartnerReview from 'sly/web/components/molecules/PartnerReview';
import BecomeSlyPartnerBanner from 'sly/web/components/molecules/BecomeSlyPartnerBanner';
import FAQSection from 'sly/web/components/organisms/FAQSection';

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

const StyledImage = styled(ResponsiveImage)`
  width: 100%;
  height: 100%;
  opacity: 0.8;
  z-index: 0;
  display: block;
  img {
    object-position: right;
  }
`;

const HeroTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    <>
      <HeaderContainer registerContext={{ agents: true }} />
      <HeroWrapper>
        <StyledImage path="react-assets/agents-partners-hero.png" alt="A Home To Love" height={480} />
        <HeroTextWrapper><PartnerWithSly /></HeroTextWrapper>
      </HeroWrapper>
    </>
  );

  return (
    <>
      {getHelmetForPartnersPage()}
      <TemplateHeader>
        {headerContent}
      </TemplateHeader>
      <TemplateContent>
        <StyledSection title="How does it work?">
          <ColumnWrapper>
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="primary" iconVariation="base" icon="house" heading="Stay with your current agency" content="As a Seniorly Partner Agent you will still operate under your business name and simply receive extra family referrals in addition to your current business. " />
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="primary" iconVariation="base" icon="star" heading="Work with qualified families" content="We are not one of those “online lead companies”. As a Partner Agent, your profile will be highlighted on Seniorly.com. Families can reach out directly or be matched by Seniorly according to your area of expertise." />
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="primary" iconVariation="base" icon="loyalty" heading="Keep over 50% commission" content="You receive over 50% of the referral fee when successfully helping a Seniorly prospect. A referral commission is paid to Seniorly upon a new resident move-in." />
          </ColumnWrapper>
        </StyledSection>
      </TemplateContent>
      <Hr />
      <TemplateContent>
        <StyledSection title="Online Discovery Matched With Local Expertise">
          <Paragraph>Seniorly is changing the way families find senior housing and care. Thousands of families visit our site everyday, giving you exposure to new clients.</Paragraph>
          <StyledColumnWrapper>
            <FactBox title="200+" description="Partner Agents across the country" />
            <FactBox title="5000+" description="families helped by Seniorly Partner Agents" />
            <FactBox title="$30,000+" description="additional annual income by our most successful Partner Agents" />
          </StyledColumnWrapper>
        </StyledSection>
      </TemplateContent>
      <Hr />
      <TemplateContent>
        <StyledSection title="Meet Seniorly Partner Agents">
          <MSPAColumnWrapper>
            <PartnerReview name="Steve Villa" location="San Francisco, California" image="https://d1qiigpe5txw4q.cloudfront.net/uploads/d7ec3977575a476a64e7210857d64985/Steve_Villa_sd.jpg" review="'Steve was very professional, was very knowledgeable, extremely resourceful and most accommodating. It's been a pleasure to work with him. Thank you!'- Raymond T" />
            <PartnerReview name="Rijan & Sarah Shrestha" location="Phoenix, Arizona" image="https://d1qiigpe5txw4q.cloudfront.net/uploads/fa166abaea9307fae330875fb498eb43/sara%2520and%2520R%25204x4_sd.jpg" review="I am so very grateful for Rijan, Seniorly and Assisted Living Locators. They helped find the perfect place for my daughter, and were so service-oriented. I would recommend this service, and Rijan especially, to anyone looking to locate senior housing. - Donna B." />
            <PartnerReview name="David Greenwood" location="Springfield, Virginia" image="https://d1qiigpe5txw4q.cloudfront.net/uploads/a352ccccf80f218594eba5772de13b07/David_Greenwood_sd.jpg" review="Mr Greenwood has been nothing but wonderful, very helpful and I trust him. It's so nice to feel like I've got someone I can count on through this arduous and painful process. I will recommend this service to everyone I know. - Maureen B." />
            <PartnerReview name="Megan Wiswell" location="San Diego, California" image="https://d1qiigpe5txw4q.cloudfront.net/uploads/2adf1680a1abef2901f053e7bcaaf55f/Megan_Wiswell_sd.jpg" review="Good morning. Megan Wiswell is amazing. I would recommend her anytime. She is thorough and friendly. She knew the area and respected the budget I was working with. (Didn’t try to push me somewhere that wouldn’t work) I really appreciated that because she didn’t make me feel bad. She said “it is what it is” and we work with it. She’s a good listener and followed up to make sure I had what I needed. Thank you to all of you for being there for me. It is a steep learning curve and you don’t need it until you need it. Blessings for all - Sue G" />
          </MSPAColumnWrapper>
        </StyledSection>
      </TemplateContent>
      <BecomeSlyPartnerBanner />
      <StyledSection>
        <TemplateContent>
          <FAQSection faqs={partnerFAQs} />
        </TemplateContent>
      </StyledSection>
      <Footer />
    </>
  );
};

export default PartnersPage;
