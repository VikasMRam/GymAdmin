import React from 'react';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { community as communityPropType } from 'sly/propTypes/community';
import { Paragraph } from 'sly/components/atoms';
import IconItem from 'sly/components/molecules/IconItem';
import CollapsibleBlock from 'sly/components/molecules/CollapsibleBlock';

const Wrapper = styled(CollapsibleBlock)`
  display: grid;
  grid-template-columns: 100%;
  grid-row-gap: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    grid-template-columns: 50% 50%;
    grid-column-gap: ${size('layout.gutter')};
  }
`;

const CommunityAmenities = ({ community }) => {
  const { propInfo } = community;
  const {
    communityHighlights = [],
    personalSpace = [],
    communitySpace = [],
    nonCareServices = [],
    languages = [],
  } = propInfo;
  let noData = false;
  if (!communityHighlights.length && !personalSpace.length && !communitySpace.length &&
      !nonCareServices.length && !languages.length) {
    noData = true;
  }

  const communityHighlightsComponents = communityHighlights.map(communityHighlight => (
    <IconItem
      key={communityHighlight}
      icon="check"
      iconPalette="slate"
      borderless={false}
    >
      {communityHighlight}
    </IconItem>
  ));
  const personalSpaceComponents = personalSpace.map(personalSpace => (
    <IconItem
      key={personalSpace}
      icon="check"
      iconPalette="slate"
      borderless={false}
    >
      {personalSpace}
    </IconItem>
  ));
  const communitySpaceComponents = communitySpace.map(communitySpace => (
    <IconItem
      key={communitySpace}
      icon="check"
      iconPalette="slate"
      borderless={false}
    >
      {communitySpace}
    </IconItem>
  ));
  const nonCareServicesComponents = nonCareServices.map(nonCareService => (
    <IconItem
      key={nonCareService}
      icon="check"
      iconPalette="slate"
      borderless={false}
    >
      {nonCareService}
    </IconItem>
  ));
  const languagesComponents = languages.map(language => (
    <IconItem
      key={language}
      icon="check"
      iconPalette="slate"
      borderless={false}
    >
      {language}
    </IconItem>
  ));

  return (
    <section>
      {noData &&
        <Paragraph>
          No information about amenities currently available
        </Paragraph>
      }
      <Wrapper minHeight="regular">
        {communityHighlightsComponents}
        {personalSpaceComponents}
        {communitySpaceComponents}
        {nonCareServicesComponents}
        {languagesComponents}
      </Wrapper>
    </section>
  );
};

CommunityAmenities.propTypes = {
  community: communityPropType.isRequired,
};

export default CommunityAmenities;
