import React from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import { Icon, Link, Hr } from 'sly/components/atoms';

import config from 'sly/config';

const FooterWrapper = styled.div`
  background-color: ${palette('grayscale', 2)};
  color: ${palette('white', 0)};
`;

const FooterTopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${size('spacing.large')} ${size('spacing.large')} 0
    ${size('spacing.large')};

  margin: 0 auto;
  width: 100%;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col8')};
    padding: ${size('spacing.xLarge')} 0 0 0;
    flex-direction: row;
    flex-wrap: wrap;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col12')};
    padding-right: 0;
  }
`;

const SeniorlyWhiteIcon = styled(Icon)`
  margin-bottom: ${size('spacing.small')};
  display:flex;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: 100%;
    > svg {
      margin: 0 auto;
    }
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: unset;
  }
`;

const GroupDiv = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: ${size('layout.col2')};
    margin-right: ${size('spacing.xLarge')};
    &:first-child {
      a {
        text-align: center;
      }
    }
    &:last-child {
      margin-right: 0px
    }
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col3')};
  }
`;

const GroupHeading = styled.div`
  font-size: ${size('text.subtitle')};
  font-weight: bold;
  margin-bottom: ${size('spacing.large')};
`;

const GroupItem = styled(Link)`
  display: block;
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
    width: ${size('layout.col8')};

    flex-direction: row;
    justify-content: space-between;
    padding: ${size('spacing.regular')} 0;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col12')};
  }
`;

const SocialIcons = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    order: 3;
  }
`;

const FooterIcon = styled(Icon)`
  margin-right: ${size('spacing.large')};
  margin-bottom: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin: 0;
  }
`;

const TradeMark = styled.div`
  color: ${palette('white', 0)};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    order: 1;
    margin: ${size('spacing.regular')} 0;
  }
`;

const Join = styled.div`
  font-size: ${size('spacing.large')};
  margin-bottom: ${size('spacing.regular')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    order: 2;
    margin: ${size('spacing.regular')} 0;
  }
`;

const groups = {
  Company: [
    { name: 'Our Company', url: '/about' },
    { name: 'Seniorly Guides', url: '/agents' },
    { name: 'Career', url: 'https://angel.co/seniorly/jobs', target: '_blank' },
    { name: 'Press', url: '/about#/#press' },
    { name: 'Contact', url: '/contact' },
    { name: 'Terms', url: '/tos' },
    { name: 'Privacy', url: '/privacy' },
  ],
  Listings: [
    { name: 'For Referral Agents', url: '/providers/crm' },
    { name: 'List Your Property', url: '/providers' },
    { name: 'How It Works', url: '/how-it-works' },
  ],
  Resources: [
    { name: 'Articles', url: '/resources' },
    { name: 'Moving Center', url: '/resources/tags/moving+center' },
    { name: 'Assisted Living', url: '/assisted-living' },
    { name: 'Independent Living', url: '/independent-living' },
    { name: 'Alzheimer\'s Care', url: '/memory-care' },
    { name: 'Home Care', url: '/in-home-care' },
    { name: 'Respite Care', url: '/respite-care' },
    { name: 'CCRC', url: '/continuing-care-retirement-community' },
  ],
};

const Version = styled.span`
  opacity: 0.5;
`;

const Footer = () => {
  const currentYear = (new Date()).getFullYear();
  const groupComponents = Object.keys(groups).map((group) => {
    const groupItemComponents = groups[group].map((item) => {
      return (
        <GroupItem key={item.name} to={item.url} target={item.target}>
          {item.name}
        </GroupItem>
      );
    });
    return (
      <GroupDiv key={group}>
        <GroupHeading>{group}</GroupHeading>
        {groupItemComponents}
      </GroupDiv>
    );
  });
  return (
    <FooterWrapper>
      <FooterTopWrapper>
        <GroupDiv>
          <GroupItem to="/">
            <SeniorlyWhiteIcon icon="seniorly-white" size="xxLarge" />
            Find a Home to Love
          </GroupItem>
        </GroupDiv>
        {groupComponents}
      </FooterTopWrapper>
      <StyledHR />
      <FooterBottomWrapper>
        <SocialIcons>
          <Link href="https://www.instagram.com/seniorlyinc"><FooterIcon icon="instagram" size="large" /></Link>
          <Link href="https://www.linkedin.com/company/seniorly"><FooterIcon icon="linkedin" size="large" /></Link>
          <Link href="https://plus.google.com/u/0/+SeniorlyIncSanFrancisco"><FooterIcon icon="google-plus" size="large" /></Link>
          <Link href="https://www.facebook.com/seniorly/posts"><FooterIcon icon="facebook" size="large" /></Link>
        </SocialIcons>
        <Join>
          Join Our Community
        </Join>
        <TradeMark>&copy; Seniorly {currentYear} <Version>{config.version}</Version></TradeMark>
      </FooterBottomWrapper>
    </FooterWrapper>
  );
};

export default Footer;
