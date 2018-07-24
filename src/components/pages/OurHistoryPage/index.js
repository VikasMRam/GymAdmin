import React, { Fragment } from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size, assetPath } from 'sly/components/themes';
import { Image, Icon, Hr } from 'sly/components/atoms';
import Modal from 'sly/components/molecules/Modal';
import ProfileTile from 'sly/components/molecules/ProfileTile';
import OverlappingSectionsTemplate from 'sly/components/templates/OverlappingSectionsTemplate';

const IntroText = styled.div`
  font-size: ${size('spacing.xLarge')};
  @media screen and (min-width: ${size('breakpoints.laptop')}) {
    width: ${size('layout.col9')};
    margin-right: ${size('layout.gutter')};
  }
`;

const IntroLogo = styled.div`
  padding-right: ${size('spacing.xxxLarge')};
  text-align: right;
  @media screen and (min-width: ${size('breakpoints.laptop')}) {
    width: ${size('layout.col3')};
  }
`;

const DescriptionText = styled.div`
  color: ${palette('grayscale', 1)};
  @media screen and (min-width: ${size('breakpoints.laptop')}) {
    width: ${size('layout.col8')};
    margin-right: ${size('layout.gutter')};
  }
`;

const DescriptionImage = styled.div`
  width: ${size('layout.col4')};
`;

const BabyArthurImage = styled(Image)`
  width: ${size('layout.col3')};
  height: ${size('layout.col3')};
  object-fit: cover;
  border-radius: calc(${size('layout.col3')} / 2);
`;

const StyledHr = styled(Hr)`
  margin: 72px 0;
`;

const ContentHeading = styled.div`
  font-size: 30px;
  margin-bottom: ${size('spacing.regular')};
`;

const ContentSubheading = styled.div`
  color: ${palette('grayscale', 1)};
  margin-bottom: ${size('spacing.xLarge')};
`;

const TeamMemberTilesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ProfileTileWrapper = styled.div`
  margin-right: 24px;
  margin-bottom: 24px;
  
  :nth-child(3n) {
    margin-right: 0;
  }
`;

const OurHistoryPage = ({ profiles, activeProfile, setModalProfile }) => {
  const imagePath = assetPath('images/our-history/hero.png');
  const intro = (
    <Fragment>
      <IntroText>
        Seniorly is committed to connecting our aging citizens with a home to love.
        We achieve this through a personalized experience built on industry expertise and powerful technology.
      </IntroText>
      <IntroLogo>
        <Icon icon="logo" size="xxLarge" />
      </IntroLogo>
    </Fragment>
  );
  const description = (
    <Fragment>
      <DescriptionText>
        Our CEO, Arthur Bretschneider, is a third-generation senior living operator.  He learned from his father, who learned from his father, how to create a personalized living experience that is respectful of someone’s history, attentive to their care needs, and focused on building community.  A lot has changed for senior housing since his grandfather was a pioneer in 1950s. The senior living industry has grown rapidly giving consumers the ability to move into new homes that match their unique wants and needs to enable them to thrive. Despite this positive new reality, finding the right senior living options is a process that is often difficult, confusing, and frustrating. So, Arthur took on the challenge to solve this problem.
        <br /><br />
        While at Berkeley Haas School of Business, he presented the challenge to his friend Sushanth Ramakrishna. At the time, “Sush” was a software engineer at Salesforce. He was raised to believe community is more important than the individual. His parents and older brother, through their personal examples of serving as doctors and civil servants, instilled in him the joy of pursuing something greater than himself. Throughout his life, Sush saw the vast disparity in access to technology for a large percentage of the population and felt a desire to change that.  He knew that technology was a key part of the solution Arthur was seeking. After discussing this in great detail with Kunal Shah, his undergraduate roommate that he recruited on this journey, Sush joined Arthur officially in 2014 when they became the founders of Seniorly.
        <br /><br />
        Our company is headquartered in San Francisco, a place where technology, innovation, diversity, and passion come together. We also seek knowledge and collaboration from around the world via our offices in Bangalore and London. We pride ourselves on our diversity both in professional expertise and personal culture. We believe that in honoring our aging family members we are building the best way for us all to age. Each member at Seniorly has a personal connection and commitment to our mission. Together, we have created a simple and personalized solution proven to help our parents and loved ones in the next stage of their lives to find a new home to love.
      </DescriptionText>
      <DescriptionImage>
        <BabyArthurImage
          src={assetPath('images/how-it-works/baby-arthur.png')}
          alt="Baby Arthur"
        />
      </DescriptionImage>
    </Fragment>
  );
  const TeamMemberTiles = profiles.map((member) => {
    const profile = { ...member };
    profile.imageUrl = assetPath(member.imageUrl);
    return (
      <ProfileTileWrapper key={profile.heading}>
        <ProfileTile profile={profile} onClick={() => setModalProfile(profile)} />
      </ProfileTileWrapper>
    );
  });
  const content = (
    <Fragment>
      <StyledHr />
      <ContentHeading>Meet Our Team</ContentHeading>
      <ContentSubheading>We are doing this for our parents and grandparents, and we are <br />committed to making life better for them however we can.</ContentSubheading>
      <TeamMemberTilesWrapper>{TeamMemberTiles}</TeamMemberTilesWrapper>
      <Modal layout="searchBox" closeable onClose={() => setModalProfile(null)} isOpen={activeProfile !== null}>
        {activeProfile && <ProfileTile profile={activeProfile} layout="modal" />}
      </Modal>
    </Fragment>
  );
  return (
    <OverlappingSectionsTemplate
      imagePath={imagePath}
      intro={intro}
      description={description}
      content={content}
    />
  );
};

export default OurHistoryPage;
