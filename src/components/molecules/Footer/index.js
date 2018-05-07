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
  padding: ${size('spacing.large')} ${size('spacing.large')} 0
    ${size('spacing.large')};

  margin: 0 auto;
  width: 100%;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};
    padding: ${size('spacing.xLarge')} 0 0 0;
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    width: calc(
      ${size('layout.mainColumn')} + ${size('layout.sideColumn')} +
        ${size('spacing.xLarge')}
    );
    padding-right: ${size('layout.sideColumn')};
  }

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: ${size('layout.laptopLarge')};
    padding-right: 0;
    justify-content: space-between;
  }
`;

const SeniorlyWhiteIcon = styled(Icon)`
  order: 1;
  margin-bottom: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    // To Center the Icon
    margin-left: 45%;
  }

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    margin-left: 0;
  }
`;

const SignUpButtonDiv = styled.div`
  order: 2;
  margin-bottom: ${size('spacing.xLarge')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    order: 3;
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
  order: 3;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    order: 2;
  }
`;

const GroupDiv = styled.div`
  width: ${size('footer.group.width')};
  margin-bottom: ${size('spacing.xLarge')};

  :nth-child(odd) {
    margin-right: ${size('spacing.large')};
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin-right: ${size('spacing.xLarge')};
  }
`;

const GroupHeading = styled.div`
  color: ${palette('white', 0)};
  font-size: ${size('text.subtitle')};
  font-weight: bold;
  margin-bottom: ${size('spacing.large')};
`;

const GroupItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const GroupItem = styled.a`
  color: ${palette('white', 0)};
  font-size: ${size('spacing.large')};
  text-decoration: none;
  margin-bottom: ${size('spacing.regular')};
`;

const StyledHR = styled(Hr)`
  border-top: ${size('spacing.nano')} solid ${palette('white', 0)};
  margin-bottom: ${size('spacing.regular')};
`;

const FooterBottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${size('spacing.large')};

  margin: 0 auto;
  width: 100%;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.mainColumn')};

    flex-direction: row;
    padding: ${size('spacing.regular')} 0;
  }

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    width: calc(
      ${size('layout.mainColumn')} + ${size('layout.sideColumn')} +
        ${size('spacing.xLarge')}
    );
    padding-right: ${size('layout.sideColumn')};
  }

  @media screen and (min-width: ${size('breakpoint.laptopLarge')}) {
    width: ${size('layout.laptopLarge')};
    padding-right: 0;
  }
`;

const SocialIcons = styled.div`
  display: flex;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    order: 2;
    margin-left: auto;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-right: 0;
  }
`;

const FooterIcon = styled(Icon)`
  margin-right: ${size('spacing.large')};
  margin-bottom: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin: 0;
  }
`;

const TradeMark = styled.a`
  color: ${palette('white', 0)};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    order: 1;
    margin: ${size('spacing.regular')} 0;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-left: 0;
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
        <SignUpButtonDiv>
          <Button>Sign up for Free</Button>
        </SignUpButtonDiv>
        <Groups>{groupComponents}</Groups>
      </FooterTopWrapper>
      <StyledHR />
      <FooterBottomWrapper>
        <SocialIcons>
          <FooterIcon icon="instagram" size="large" />
          <FooterIcon icon="linkedin" size="large" />
          <FooterIcon icon="google-plus" size="large" />
          <FooterIcon icon="facebook" size="large" />
        </SocialIcons>
        <TradeMark>© Seniorly 2018</TradeMark>
      </FooterBottomWrapper>
    </FooterWrapper>
  );
};

export default Footer;
