import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import Heading from 'sly/components/atoms/Heading/index';
import { Block, Button } from 'sly/components/atoms/index';
import Icon from 'sly/components/atoms/Icon/index';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-left: auto;
    margin-right: auto;
    width: calc(${size('layout.col5')} + ${size('layout.gutter')});
  }
`;

const HeadingSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${size('spacing.large')};
`;

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

const StyledHeading = styled(Heading)`
  text-align: center;
`;

const StyledBlock = styled(Block)`
  text-align: center;
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledButton = styled(Button)`
  margin-left: auto;
  margin-right: auto;
`;

const CommunityBookATourAcknowledgement = ({ heading, subheading, similarCommunititesHref }) => (
  <Wrapper>
    {heading &&
      <HeadingSection>
        <StyledIcon icon="circle-tick" size="large" palette="green" />
        <StyledHeading>{heading}</StyledHeading>
      </HeadingSection>
    }
    {subheading && <StyledBlock>{subheading}</StyledBlock>}
    <StyledButton kind="jumbo" href={similarCommunititesHref} >View Similar Communities</StyledButton>
  </Wrapper>
);

CommunityBookATourAcknowledgement.propTypes = {
  similarCommunititesHref: string.isRequired,
  heading: string,
  subheading: string,
};

export default CommunityBookATourAcknowledgement;