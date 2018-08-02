import React, { Fragment } from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size, assetPath } from 'sly/components/themes';
import { Image, Icon, Hr } from 'sly/components/atoms';
import Modal from 'sly/components/molecules/Modal';
import ProfileTile from 'sly/components/molecules/ProfileTile';
import PressTile from 'sly/components/molecules/PressTile';
import OverlappingSectionsTemplate from 'sly/components/templates/OverlappingSectionsTemplate';
import Footer from 'sly/components/organisms/Footer';

import { TeamMembersData as profiles } from 'sly/services/helpers/our_team';
import { PressTileContents as press } from 'sly/services/helpers/press';

const ourHistoryUri = member => member
  ? `/our-history/${member}`
  : `/our-history`;

const IntroText = styled.div`
  font-size: ${size('spacing.xLarge')};
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col9')};
    margin-right: ${size('layout.gutter')};
  }
`;

const IntroLogo = styled.div`
  padding-right: ${size('spacing.xxxLarge')};
  text-align: right;
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col3')};
  }
`;

const DescriptionText = styled.div`
  color: ${palette('grayscale', 1)};
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
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

const ContentWrapper = styled.div`
  margin-bottom: 72px;
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

const StyledProfileTile = styled(ProfileTile)`
  margin: calc(${size('spacing.xLarge')} / 2);
`;

const PressHeading = styled.div`
  font-size: 30px;
  margin-bottom: ${size('spacing.xLarge')};
`;

const PressTilesWrapper = styled.div`
  column-gap: ${size('spacing.xLarge')};
  column-width: ${size('picture.xLarge.width')};
`;

const PressTileWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
  column-break-inside: avoid;
`;

const OurHistoryPage = ({ match, history, setModalProfile, ...props }) => {
  const { push } = history;
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

  const TeamMemberTiles = profiles
    .map(p => <StyledProfileTile
      key={p.heading}
      to={ourHistoryUri(p.slug)}
      {...p} />);

  const pressTiles = press.map((item, index) => {
    const props = { ...item };
    props.imageUrl = assetPath(item.imageUrl);
    return (
      <PressTileWrapper key={index} >
        <PressTile {...props} />
      </PressTileWrapper>
    );
  });

  const member = profiles.filter(p => p.slug === match.params.member).pop();

  const content = (
    <ContentWrapper>
      <StyledHr />
      <ContentHeading>Meet Our Team</ContentHeading>
      <ContentSubheading>We are doing this for our parents and grandparents, and we are <br />committed to making life better for them however we can.</ContentSubheading>
      <TeamMemberTilesWrapper>{TeamMemberTiles}</TeamMemberTilesWrapper>
      <StyledHr />
      <PressHeading>Seniorly in the Press</PressHeading>
      <PressTilesWrapper>{pressTiles}</PressTilesWrapper>

      <Modal
        layout="single"
        closeable
        onClose={() => push(ourHistoryUri())}
        isOpen={!!member}
      >
        <ProfileTile layout="modal" {...member} />
      </Modal>
    </ContentWrapper>
  );
  return (
    <OverlappingSectionsTemplate
      imagePath={imagePath}
      intro={intro}
      description={description}
      content={content}
      footer={<Footer />}
    />
  );
};

export default OurHistoryPage;
