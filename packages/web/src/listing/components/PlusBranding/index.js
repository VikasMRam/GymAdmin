import React, { Component } from 'react';
import styled from 'styled-components';

import { size, palette } from 'sly/common/components/themes';
import { Heading, Icon, Paragraph } from 'sly/common/components/atoms';
import { ResponsiveImage } from 'sly/web/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';
import PlusBadge from 'sly/web/components/molecules/PlusBadge';

const TextWrapper = styled.div`
  color: ${palette('white', 'base')};
  display: block;
  transform: rotate(0);
  margin: 0 ${size('spacing.large')};
`;

const StyledHeading = styled(Heading)`
  color: ${palette('white', 'base')};
  font-size: ${size('text.hero')};
  margin: ${size('spacing.large')};
  font-weight: ${size('weight.bold')};
  display: flex;
  align-items: center;
`;

const Italicize = styled.span`
  font-style: italic;
`;

const IconItemWrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
  
`;

const FullWidthSection = styled.section`
  margin: ${size('spacing.xLarge')} 0;
`;

const PlusWrapper = styled.div`
  position: relative;
  padding: ${size('spacing.huge')} 0;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: -${size('plus.left.default')};
  overflow: hidden;
  width:100vw;
  height:100%;
  z-index: 0;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    left:calc(${size('plus.left.tablet')} - 50vw);
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    left:calc(${size('plus.left.laptop')} - 50vw);
    background: linear-gradient(to right, #9f8352 25%, #d5f0f000);
  }
  display:inline-block;
  &:after {
    content: '';
    position: absolute;
    left:0;
    top: 0;
    width: 100vw;
    height: 100%;
    background: linear-gradient(to top, #9f8352 25%, #d5f0f000);
  }

`;
const StyledImage = styled(ResponsiveImage)`
  max-width: 100%;
  height:100%;
  object-fit: cover;
  display: block;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: 100%;
    max-height:100%;
  }
`;

const SeniorlyIcon = styled(Icon)`
  margin-bottom: ${size('spacing.small')};
  display: inline-block;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    > svg {
      margin: 0 auto;
    }
  }

`;

const StyledText = styled.div`
  color: ${palette('white', 'base')};
  line-height: 1.5;
  margin-bottom: 1rem;
`;

export default class PlusBranding extends Component {
  render() {
    return (
      <FullWidthSection>
        <PlusWrapper>
          <ImageWrapper>
            <StyledImage path="react-assets/plus/plusbg.jpg" alt="Seniorly Plus Home" height={510} />
          </ImageWrapper>
          <TextWrapper>
            <StyledHeading>
              <SeniorlyIcon icon="logo" palette="primary" variation="base" size="xxLarge" />
              <span>
                &nbsp;seniorly&nbsp;<Italicize>plus</Italicize>
              </span>
            </StyledHeading>
            <StyledText>
              Seniorly Plus is a curated list of senior homes. Each home is independently verified through an in-person
              inspection to ensure your next home is a great fit. Just look for the badge.
            </StyledText>
            <Paragraph>
              <IconItemWrapper>
                <IconItem icon="verified" iconPalette="white" borderPalette="white" borderVariation="base" borderless={false}>Quality verified through in-person inspections</IconItem>
              </IconItemWrapper>
              <IconItemWrapper>
                <IconItem icon="house" iconPalette="white" borderPalette="white" borderVariation="base" borderless={false}>Access to thoughtfully designed suites and apartments</IconItem>
              </IconItemWrapper>
              <IconItemWrapper>
                <IconItem icon="phone" iconPalette="white" borderPalette="white" borderVariation="base" borderless={false}>Premium support during search and after the transition</IconItem>
              </IconItemWrapper>
            </Paragraph>
          </TextWrapper>
        </PlusWrapper>
      </FullWidthSection>
    );
  }
}
