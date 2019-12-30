import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import { size } from 'sly/components/themes';
import { Heading, Block, Image, Link } from 'sly/components/atoms';

const Wrapper = styled.div`
  text-align: left;
`;

export const StyledImage = styled(Image)`
  overflow: hidden;
  border-radius: ${size('spacing.small')};
  margin-bottom: ${size('spacing.xLarge')};
`;

export const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const MeetOthersTile = ({
  image, title, description,
}) => (
  <Wrapper>
    <StyledImage src={image} aspectRatio="3:2" />
    <StyledHeading level="subtitle" size="subtitle">{title}</StyledHeading>
    <Block>{description}</Block>
    <Link href="tel:+18558664515">Call us at (855) 866-4515.</Link>
  </Wrapper>
);

MeetOthersTile.propTypes = {
  image: string.isRequired,
  title: string.isRequired,
  description: string.isRequired,
};

export default MeetOthersTile;
