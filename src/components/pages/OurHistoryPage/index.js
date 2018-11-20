import React, { Fragment } from 'react';
import styled from 'styled-components';


import { size, assetPath, palette } from 'sly/components/themes';
import { Heading, Block, Image, Icon, Hr } from 'sly/components/atoms';
import Modal from 'sly/components/molecules/Modal';
import ProfileTile from 'sly/components/molecules/ProfileTile';
import PressTile from 'sly/components/molecules/PressTile';
import OverlappingSectionsTemplate from 'sly/components/templates/OverlappingSectionsTemplate';
import Footer from 'sly/components/organisms/Footer';

import { TeamMembersData as profiles } from 'sly/services/helpers/our_team';
import { PressTileContents as press } from 'sly/services/helpers/press';

const ourHistoryUri = member => member
  ? `/about/${member}`
  : `/about`;

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
  color: ${palette('slate', 'filler')};
  margin-bottom: ${size('spacing.huge')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    order: 1;
    width: ${size('layout.col8')};
    margin-right: ${size('layout.gutter')};
  }
`;

const BabyArthurImage = styled(Image)`
  width: ${size('layout.col3')};
  height: ${size('layout.col3')};
  object-fit: cover;
  border-radius: calc(${size('layout.col3')} / 2);

  float: right;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-right: ${size('layout.col1')};
    float: none;
    order: 2;
  }
`;

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const StyledHr = styled(Hr)`
  margin-bottom: ${size('spacing.huge')};
`;

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.xLarge')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: 50%;
  }
`;

const ContentWrapper = styled.div`
  margin-bottom: ${size('spacing.xxxLarge')};
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-top: -${size('spacing.large')};
  }
`;

const TeamMemberTiles = styled.div`
  margin-bottom: ${size('spacing.huge')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    flex-wrap: wrap;
    margin-right: -${size('spacing.xLarge')};
  }
`;

const StyledProfileTile = styled(ProfileTile)`
  margin-bottom: ${size('spacing.xLarge')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: calc(100% / 2 - ${size('spacing.xLarge')});
    margin-right: ${size('spacing.xLarge')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: calc(100% / 3 - ${size('spacing.xLarge')});
  }
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
      <BabyArthurImage
        src={assetPath('images/how-it-works/baby-arthur.png')}
        alt="Baby Arthur"
      />
      <DescriptionText>
        Our CEO, Arthur Bretschneider, is a third-generation senior living operator.  He learned from his father, who learned from his father, how to create a personalized living experience that is respectful of someone’s history, attentive to their care needs, and focused on building community.  A lot has changed for senior housing since his grandfather was a pioneer in 1950s. The senior living industry has grown rapidly giving consumers the ability to move into new homes that match their unique wants and needs to enable them to thrive. Despite this positive new reality, finding the right senior living options is a process that is often difficult, confusing, and frustrating. So, Arthur took on the challenge to solve this problem.
        <br /><br />
        Our company is headquartered in San Francisco, a place where technology, innovation, diversity, and passion come together. We also seek knowledge and collaboration from around the world via our offices in Bangalore and London. We pride ourselves on our diversity both in professional expertise and personal culture. We believe that in honoring our aging family members we are building the best way for us all to age. Each member at Seniorly has a personal connection and commitment to our mission. Together, we have created a simple and personalized solution proven to help our parents and loved ones in the next stage of their lives to find a new home to love.
      </DescriptionText>
    </Fragment>
  );

  const teamMemberTiles = profiles
  .map(p => <StyledProfileTile
    key={p.heading}
    to={ourHistoryUri(p.slug)}
    profile={p} />);

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

  return (
    <OverlappingSectionsTemplate
      imagePath="images/our-history/hero.jpg"
      title="Our Company"
      subtitle="Helping Families and Individuals find the right Senior living options"
      intro={intro}
      description={description}
      footer={<Footer />}
    >
      <ContentWrapper>
        <StyledHr />
        <Heading>Meet Our Team</Heading>
        <StyledBlock>We are doing this for our parents and grandparents, and we are committed to making life better for them however we can.</StyledBlock>
        <TeamMemberTiles>{teamMemberTiles}</TeamMemberTiles>

        <StyledHr />

        <StyledHeading>Seniorly in the Press</StyledHeading>
        <PressTilesWrapper>{pressTiles}</PressTilesWrapper>

        {member &&
          <Modal
            layout="single"
            closeable
            isOpen={!!member}
            onClose={() => push(ourHistoryUri())}
          >
            <ProfileTile layout="modal" profile={member} to={ourHistoryUri()} />
          </Modal>
        }
      </ContentWrapper>
    </OverlappingSectionsTemplate>
  );
};

export default OurHistoryPage;
