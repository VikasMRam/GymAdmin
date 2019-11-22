import React, { Component } from 'react';
import styled from 'styled-components';

import { size, palette, assetPath, getKey } from 'sly/components/themes';
import { Heading, Image, Icon, Paragraph } from 'sly/components/atoms';
import IconItem from 'sly/components/molecules/IconItem';
import PlusBadge from 'sly/components/molecules/PlusBadge';

const TextWrapper = styled.div`
  display: block;
  transform: rotate(0);
`;

const StyledHeading = styled(Heading)`
  color: ${palette('secondary', 'base')};
  font-size: ${size('text.hero')};
  margin: ${size('spacing.large')};
  font-weight: ${size('weight.bold')};
  display: flex;
  align-items: center;
`;

const Italicize = styled.span`
  font-style: italic;
  font-family: ${getKey('fonts.quote')};
`;

const IconItemWrapper = styled.div`
  margin-bottom: ${size('spacing.large')};
`;

const FullWidthSection = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
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
    left:-webkit-calc(${size('plus.left.tablet')} - 50vw);
    left:-moz-calc(${size('plus.left.tablet')} - 50vw);
    left:calc(${size('plus.left.tablet')} - 50vw);
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    left:-webkit-calc(${size('plus.left.laptop')} - 50vw);
    left:-moz-calc(${size('plus.left.laptop')} - 50vw);
    left:calc(${size('plus.left.laptop')} - 50vw);
  }
  display:inline-block;
  &:before {
    content:'';
    position:absolute;
    left:0;
    top:0;
    width:100vw; 
    height:100%;
    background: linear-gradient(to right,rgba(213, 240, 240,1), rgba(213, 240, 240,0));
  }

`;
const StyledImage = styled(Image)`
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
  display: inline-block
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    > svg {
      margin: 0 auto;
    }
  }

`;

const StyledText = styled.div`
  font-size: ${size('text.subtitle')};
  color: ${palette('slate', 'base')};
  line-height: 1.5;
  margin-bottom: 1rem;
`;

export default class PlusBranding extends Component {
  render() {
    return (
      <FullWidthSection>
        <PlusWrapper>
          <ImageWrapper>
            <StyledImage src={assetPath('images/plus/plusbg.jpg')} alt="Seniorly Plus Home" />
          </ImageWrapper>
          <TextWrapper>
            <StyledHeading>
              <SeniorlyIcon icon="logo" palette="secondary" size="xxLarge" />
              <span>
                &nbsp;seniorly&nbsp;<Italicize>plus</Italicize>
              </span>
            </StyledHeading>
            <StyledText>
              Seniorly Plus is a curated list of senior homes. Each home is independently verified through an in-person
              inspection to ensure your next home is a great fit. Just look for the <PlusBadge /> badge.
            </StyledText>
            <Paragraph>
              <IconItemWrapper>
                <IconItem icon="verified" iconPalette="secondary" borderPalette="secondary" borderVariation="base" borderless={false}>Quality verified through in-person inspections</IconItem>
              </IconItemWrapper>
              <IconItemWrapper>
                <IconItem icon="house" iconPalette="secondary" borderPalette="secondary" borderVariation="base" borderless={false}>Access to thoughtfully designed suites and apartments</IconItem>
              </IconItemWrapper>
              <IconItemWrapper>
                <IconItem icon="phone" iconPalette="secondary" borderPalette="secondary" borderVariation="base" borderless={false}>Premium support during search and after the transition</IconItem>
              </IconItemWrapper>
            </Paragraph>
          </TextWrapper>
        </PlusWrapper>
      </FullWidthSection>
    );
  }
}
