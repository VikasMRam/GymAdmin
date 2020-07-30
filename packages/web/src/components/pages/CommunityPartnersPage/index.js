import React from 'react';
import styled from 'styled-components';
import { func } from 'prop-types';

import { size } from 'sly/common/components/themes';
import { gridColumns, assetPath } from 'sly/web/components/themes';
import { getHelmetForCommunityPartnersPage } from 'sly/web/services/helpers/html_headers';
import { partnerCommunityFAQs } from 'sly/web/constants/communities';
import { TemplateHeader, TemplateContent } from 'sly/web/components/templates/BasePageTemplate';
import { Hr, Paragraph, ResponsiveImage } from 'sly/web/components/atoms';
import HeaderContainer from 'sly/web/containers/HeaderContainer';
import Section from 'sly/web/components/molecules/Section';
import IconInfoTile from 'sly/web/components/molecules/IconInfoTile';
import Footer from 'sly/web/components/organisms/Footer';
import PartnerWithSlyCommunities from 'sly/web/components/molecules/PartnerWithSlyCommunities';
import FactBox from 'sly/web/components/molecules/FactBox';
import { ColumnWrapper } from 'sly/web/components/molecules/MostSearchedRegions';
import MeetOthersTile from 'sly/web/components/molecules/MeetOthersTile';
import BecomeSlyCommunityPartner from 'sly/web/components/molecules/BecomeSlyCommunityPartner';
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

const ThreeColumnWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
  ${gridColumns(1, size('spacing.xLarge'))};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    ${gridColumns(3, size('spacing.xLarge'))};
  }
`;

const CWTImage = styled(ResponsiveImage)`
  margin-bottom: ${size('spacing.regular')};
  height: ${size('picture.tiny.height')};
`;

const CWTColumnWrapper = styled.div`
  margin-bottom: ${size('spacing.xxLarge')};
  > * {
    margin-right: ${size('spacing.large')};
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    justify-content: center;
    > * {
      margin-right: ${size('spacing.huge')};
    }
  }
`;


const familiesWeHaveHelpedTiles = [
  {
    image: 'react-assets/home/meet-others/Sharon.jpg',
    title: 'Sharon T.',
    description: '"I felt like Seniorly was a lifesaver! I was daunted at the prospect of going through so many possibilities to find the right fit for my mom in such a short time, while taking care of so many other things that need attending as we deal with the aftermath of her stroke."',
  },
  {
    image: 'react-assets/home/meet-others/Kathy.jpg',
    title: 'Aileen H.',
    description: '"I was very frustrated that every time I wanted to see the price of a facility that I had to give my phone number and I would get bombarded with calls. Your site was the only one that allowed me to search on my own time and it listed more info than other sites."',
  },
  {
    image: 'react-assets/home/meet-others/Henry.jpg',
    title: 'Henry W.',
    description: '"We were lucky enough to find a great place for my father-in-law. Seniorly is a really helpful website, very helpful and informative. Thank you so much for what you do."',
  },
];

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

  const familiesWeHaveHelpedTilesComponents = familiesWeHaveHelpedTiles.map(familyWeHaveHelped => (
    <MeetOthersTile
      key={familyWeHaveHelped.title}
      image={familyWeHaveHelped.image}
      title={familyWeHaveHelped.title}
      description={familyWeHaveHelped.description}
    />
  ));

  return (
    <>
      {getHelmetForCommunityPartnersPage()}
      <TemplateHeader>
        {headerContent}
      </TemplateHeader>
      <TemplateContent>
        <StyledSection title="How does it work?">
          <ColumnWrapper>
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="primary" iconVariation="base" icon="house" heading="Claim your community listing" content="Seniorly has over 35,000 listings in the US. Senior living operators can claim these profiles and update their content any time. We’ve made it easier than building and managing a Facebook page." />
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="primary" iconVariation="base" icon="star" heading="Setup your team" content="Whether you are an owner-operator or part of a larger team, we can customize your team to fit your needs. We find that text messaging is the best way to communicate, and can set up multiple team members per account." />
            <IconInfoTile iconBorder borderless noPadding layout="iconTop" iconPalette="primary" iconVariation="base" icon="loyalty" heading="Get tours and move-ins" content="Seniorly provides all community information without forcing prospects to sign up first. We also partner with local placement agents to further qualify families. They spend the time managing the families so you can simply focus on closing tours." />
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
            <FactBox title="35K+" description="Communities listed on Seniorly" />
          </StyledColumnWrapper>
        </StyledSection>
      </TemplateContent>
      <Hr />
      <TemplateContent>
        <StyledSection title="What Our Customers Are Saying About Us">
          <ThreeColumnWrapper>
            {familiesWeHaveHelpedTilesComponents}
          </ThreeColumnWrapper>
        </StyledSection>
      </TemplateContent>
      <BecomeSlyCommunityPartner onRegisterClick={onRegisterClick} />
      <StyledSection>
        <TemplateContent>
          <FAQSection faqs={partnerCommunityFAQs} />
        </TemplateContent>
      </StyledSection>
      <TemplateContent>
        <StyledSection title="Corporate Senior Living Partners">
          <CWTColumnWrapper>
            <CWTImage src={assetPath('images/home/companies-we-trust/Brookdale_BW.png')} alt="Brookdale Senior Living Logo" />
            <CWTImage src={assetPath('images/home/companies-we-trust/SunriseSeniorLiving_BW.png')} alt="SunriseSenior Living Logo" />
            <CWTImage src={assetPath('images/home/companies-we-trust/HolidayRetirement_BW.png')} alt="Holidat Retirement" />
            <CWTImage src={assetPath('images/home/companies-we-trust/PacificaSeniorLiving_BW.png')} alt="Pacifica Senior Living Logo" />
          </CWTColumnWrapper>
          <CWTColumnWrapper>
            <CWTImage src={assetPath('images/home/companies-we-trust/HomeCareAssistance_BW.png')} alt="Home Care Assistance Logo" />
            <CWTImage src={assetPath('images/home/companies-we-trust/FCA_BW.png')} alt="Family Caregiver Alliance Logo" />
            <CWTImage src={assetPath('images/home/companies-we-trust/SeniorCareAuthority_BW.png')} alt="SeniorCareAuthority Logo" />
            <CWTImage src={assetPath('images/home/companies-we-trust/AssistedLivingLocators_BW.png')} alt="Assisted Living Locators Logo" />
          </CWTColumnWrapper>
        </StyledSection>
      </TemplateContent>
      <Footer />
    </>
  );
};

CommunityPartnersPage.propTypes = {
  onRegisterClick: func,
};

export default CommunityPartnersPage;
