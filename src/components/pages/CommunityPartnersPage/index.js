import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';


import { size } from 'sly/components/themes';
import { getHelmetForCommunityPartnersPage } from 'sly/services/helpers/html_headers';
import { partnerCommunityFAQs } from 'sly/constants/communities';
import { TemplateHeader, TemplateContent } from 'sly/components/templates/BasePageTemplate';
import { Hr, Paragraph, ResponsiveImage } from 'sly/components/atoms';
import HeaderContainer from 'sly/containers/HeaderContainer';
import Section from 'sly/components/molecules/Section';
import IconInfoTile from 'sly/components/molecules/IconInfoTile';
import Footer from 'sly/components/organisms/Footer';
import PartnerWithSlyCommunities from 'sly/components/molecules/PartnerWithSlyCommunities';
import FactBox from 'sly/components/molecules/FactBox';
import { ColumnWrapper } from 'sly/components/molecules/MostSearchedRegions';
import PartnerReview from 'sly/components/molecules/PartnerReview';
import BecomeSlyCommunityPartner from 'sly/components/molecules/BecomeSlyCommunityPartner';
import FAQSection from 'sly/components/organisms/FAQSection';

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

const CommunityPartnersPage = ({
   onRegisterClick
  }) => {
  const headerContent = (
    <>
      <HeaderContainer />
      <HeroWrapper>
        <StyledImage path="react-assets/agents-partners-hero.png" alt="A Home To Love" height={480} />
        <HeroTextWrapper><PartnerWithSlyCommunities onRegisterClick={onRegisterClick} /></HeroTextWrapper>
      </HeroWrapper>
    </>
  );

  return (
    <>
      {getHelmetForCommunityPartnersPage()}
      <TemplateHeader>
        {headerContent}
      </TemplateHeader>
      <TemplateContent>
        <StyledSection title="How does it work?">
          <ColumnWrapper>
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" iconVariation="dark35" icon="house" heading="Claim your community listing" content="Seniorly has over 35,000 listings in the US. Senior living operators can claim these profiles and update their content any time. We’ve made it easier than building and managing a Facebook page." />
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" iconVariation="dark35" icon="star" heading="Setup your team" content="Whether you are an owner-operator or part of a larger team, we can customize your team to fit your needs. We find that text messaging is the best way to communicate, and can set up multiple team members per account." />
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="secondary" iconVariation="dark35" icon="loyalty" heading="Get tours and move-ins" content="Seniorly provides all community information without forcing prospects to sign up first. We also partner with local placement agents to further qualify families. They spend the time managing the families so you can simply focus on closing tours." />
          </ColumnWrapper>
        </StyledSection>
      </TemplateContent>
      <Hr />
      <TemplateContent>
        <StyledSection title="A Better Online Partner Matched With Local Handholding">
          <Paragraph>Our modern real estate style online search is augmented through our partnerships with local placement agents. Seniorly unlocks the online searcher and brings it to the high converting local placement agent channel.</Paragraph>
          <StyledColumnWrapper>
            <FactBox title="3M+" description="Visits to our website per year" />
            <FactBox title="50K+" description="Families helped per year" />
            <FactBox title="$35K+" description="Communities listed on Seniorly" />
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
      <BecomeSlyCommunityPartner onRegisterClick={onRegisterClick} />
      <StyledSection>
        <TemplateContent>
          <FAQSection faqs={partnerCommunityFAQs} />
        </TemplateContent>
      </StyledSection>
      <Footer />
    </>
  );
};

CommunityPartnersPage.propTypes = {
  onRegisterClick: func,
};

export default CommunityPartnersPage;
