import React from 'react';
import styled from 'styled-components';
import {} from 'prop-types';
import { palette } from 'styled-theme';


import { size } from 'sly/components/themes';
import { Icon, Hr } from 'sly/components/atoms/index';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
  height:100%;
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col5')};
    border: ${size('border.regular')} solid ${palette('grayscale', 2)};
    box-shadow: 0 ${size('spacing.tiny')} ${size('spacing.small')} ${palette('grayscale', 0)}80;
  }
`;

const HeadingWrapper = styled.div`
  padding: ${size('spacing.xLarge')};
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: flex;
  }
`;
const HeadingDiv = styled.div``;
const CloseIcon = styled(Icon)`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    padding: 8px;
    margin-left: auto;
  }
`;
const CommunitiesListWrapper = styled.div`
  padding: ${size('spacing.xLarge')};
`;

const SavedCommunitiesPopup = () => {
  return (
    <Wrapper>
      <HeadingWrapper>
        <HeadingDiv>Saved Communities</HeadingDiv>
        <CloseIcon icon="close" size="small" />
      </HeadingWrapper>
      <Hr />
      <CommunitiesListWrapper>
        Hello
      </CommunitiesListWrapper>
    </Wrapper>
  );
};

export default SavedCommunitiesPopup;
