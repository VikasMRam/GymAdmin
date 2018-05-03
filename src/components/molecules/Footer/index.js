import React from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import Icon from 'sly/components/atoms/Icon';
import Button from 'sly/components/atoms/Button';
import Hr from 'sly/components/atoms/Hr';

const FooterWrapper = styled.div`
  background-color: ${palette('grayscale', 2)};
`;

const FooterTopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const SeniorlyWhiteIcon = styled(Icon)`
  margin-bottom: 16px;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    // To Center the Icon
    margin-left: 45%;
  }
`;

const MobileSignUpButton = styled(Button)`
  width: 148px;
  height: 40px;
  margin-bottom: 24px;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: none;
  }
`;

const SignUpButton = styled(Button)`
  display: none;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    display: block;
    margin-right: 32px;
  }
`;

const groups = {
  Company: [
    { name: 'About Us', url: '#' },
    { name: 'Career', url: '#' },
    { name: 'Contact', url: '#' },
    { name: 'Terms', url: '#' },
    { name: 'Privacy', url: '#' },
  ],
  Explore: [
    { name: 'Assisted Living', url: '#' },
    { name: 'Respite Care', url: '#' },
    { name: 'CareTalks', url: '#' },
    { name: 'Resources', url: '#' },
  ],
  Marketplace: [
    { name: 'How It Works', url: '#' },
    { name: 'List Your Business', url: '#' },
  ],
};

const Groups = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const GroupDiv = styled.div`
  flex-grow: 1;
  width: 50%;
  margin-bottom: 16px;

  padding-left: 16px;
  padding-right: 16px;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: 25%;

    padding-left: 32px;
  }
`;

const GroupHeading = styled.div`
  color: ${palette('white', 0)};
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const GroupItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const GroupItem = styled.a`
  color: ${palette('white', 0)};
  font-size: 16px;
  text-decoration: none;
  margin-bottom: 8px;
`;

const StyledHR = styled(Hr)`
  border-top: 1px solid ${palette('white', 0)};
  margin-bottom: 8px;
`;

const FooterBottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: row;
    padding: 8px;
  }
`;

const SocialIcons = styled.div`
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-grow: 1;
    order: 1;
    display: flex;
    flex-direction: row-reverse;
    margin-right: 28px;
  }
`;

const FooterIcon = styled(Icon)`
  margin: 16px;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin: 0;
    margin-left: 16px;
  }
`;

const TradeMark = styled.a`
  color: ${palette('white', 0)};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-grow: 1;
    margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 28px;
  }
`;

const Footer = () => {
  const groupComponents = Object.keys(groups).map((group) => {
    const groupItemComponents = groups[group].map((item) => {
      return (
        <GroupItem key={item.name} href={item.url}>
          {item.name}
        </GroupItem>
      );
    });
    return (
      <GroupDiv key={group}>
        <GroupHeading>{group}</GroupHeading>
        <GroupItems>{groupItemComponents}</GroupItems>
      </GroupDiv>
    );
  });
  return (
    <FooterWrapper>
      <FooterTopWrapper>
        <SeniorlyWhiteIcon icon="seniorly-white" size="xxLarge" />
        <MobileSignUpButton>Sign up for Free</MobileSignUpButton>
        <Groups>
          {groupComponents}
          <SignUpButton>Sign up for Free</SignUpButton>
        </Groups>
      </FooterTopWrapper>
      <StyledHR />
      <FooterBottomWrapper>
        <SocialIcons>
          <FooterIcon icon="facebook" size="large" />
          <FooterIcon icon="google-plus" size="large" />
          <FooterIcon icon="linkedin" size="large" />
          <FooterIcon icon="instagram" size="large" />
        </SocialIcons>
        <TradeMark>© Seniorly 2018</TradeMark>
      </FooterBottomWrapper>
    </FooterWrapper>
  );
};

export default Footer;
