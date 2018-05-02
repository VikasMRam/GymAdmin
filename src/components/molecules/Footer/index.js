import React from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import Icon from 'sly/components/atoms/Icon';
import Button from 'sly/components/atoms/Button';
import Hr from 'sly/components/atoms/Hr';

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${palette('grayscale', 2)};
  padding: 16px;
`;

const SeniorlyWhiteIcon = styled(Icon)`
  margin-bottom: 16px;
`;

const SignUpButton = styled(Button)`
  width: 148px;
  height: 40px;
  margin-bottom: 24px;
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

const FooterIcon = styled(Icon)`
  margin: 16px;
`;

const TradeMark = styled.a`
  color: ${palette('white', 0)};
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
      <SeniorlyWhiteIcon icon="seniorly-white" size="xxLarge" />
      <SignUpButton>Sign up for Free</SignUpButton>
      <Groups>{groupComponents}</Groups>
      <StyledHR />
      <div>
        <FooterIcon icon="instagram" size="regular" />
        <FooterIcon icon="linkedin" size="regular" />
        <FooterIcon icon="google-plus" size="regular" />
        <FooterIcon icon="facebook" size="regular" />
      </div>
      <TradeMark>© Seniorly 2018</TradeMark>
    </FooterWrapper>
  );
};

export default Footer;
