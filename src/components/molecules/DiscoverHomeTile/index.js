import React from 'react';
import styled from 'styled-components';
import { string, func } from 'prop-types';

import { size } from 'sly/components/themes';
import { Box, Heading, Block, Button, Image } from 'sly/components/atoms';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  overflow: hidden;
  border-top-left-radius: ${size('spacing.small')}; 
  border-top-right-radius: ${size('spacing.small')}; 
  
  > :first-child {
    flex-grow: 0;
  }
  
  > :last-child {
    flex-grow: 1;
  }
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  
  > :last-child {
    margin-top: auto;
  }
`;

export const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.regular')};
`;

const ButtonWrapper = styled.div`
  display: block;
  padding-top: ${size('spacing.large')};
`;

const DiscoverHomeTile = ({
  image,
  title,
  description,
  buttonText,
  onButtonClick,
}) => (
  <Wrapper>
    <Image src={image} alt={title} aspectRatio="3:2" />
    <StyledBox snap="top">
      <StyledHeading>{title}</StyledHeading>
      <Block palette="slate">{description}</Block>
      <ButtonWrapper>
        <Button onClick={onButtonClick}>{buttonText}</Button>
      </ButtonWrapper>
    </StyledBox>
  </Wrapper>
);

DiscoverHomeTile.propTypes = {
  image: string.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  buttonText: string.isRequired,
  onButtonClick: func.isRequired,
};

export default DiscoverHomeTile;
