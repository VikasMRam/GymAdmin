import React from 'react';
import styled from 'styled-components';
import { string, func } from 'prop-types';

import Block from 'sly/components/atoms/Block/index';
import { size } from 'sly/components/themes/index';
import Button from 'sly/components/atoms/Button/index';

const Wrapper = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: flex;
    justify-content: space-between;
  }
`;

const TextSection = styled.div`

`;

const HeadingBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const SubheadingBlock = styled(Block)`
  margin-bottom: ${size('spacing.large')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-bottom: initial;
  }
`;

const TextBottomSection = ({
  heading, subHeading, buttonText, onButtonClick,
}) => (
  <Wrapper>
    <TextSection>
      <HeadingBlock weight="medium">{heading}</HeadingBlock>
      {subHeading && <SubheadingBlock size="caption">{subHeading}</SubheadingBlock>}
    </TextSection>
    <Button ghost onClick={onButtonClick}>{buttonText}</Button>
  </Wrapper>
);

TextBottomSection.propTypes = {
  heading: string.isRequired,
  subHeading: string,
  buttonText: string.isRequired,
  onButtonClick: func,
};

export default TextBottomSection;
