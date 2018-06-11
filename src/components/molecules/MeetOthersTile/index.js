import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import { size } from 'sly/components/themes';

import { Heading, Block, Image } from 'sly/components/atoms';

const Wrapper = styled.div`
  width: 100%;
  @media screen and (min-width: ${size('picture.regular.width')}) {
    width: ${size('picture.regular.width')};
  }
  text-align: left;
`;
export const StyledImage = styled(Image)`
  border-radius: ${size('border.large')};
  margin-bottom: ${size('spacing.xLarge')};
  width: 100%;
  @media screen and (min-width: ${size('picture.regular.width')}) {
    width: ${size('picture.regular.width')};
  }
`;
export const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const MeetOthersTile = ({
  image, title, description,
}) => (
  <Wrapper>
    <StyledImage src={image} />
    <StyledHeading level="subtitle" size="subtitle">{title}</StyledHeading>
    <Block>{description}</Block>
  </Wrapper>
);

MeetOthersTile.propTypes = {
  image: string.isRequired,
  title: string.isRequired,
  description: string.isRequired,
};

export default MeetOthersTile;
