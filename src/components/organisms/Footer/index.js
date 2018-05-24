import React from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import { Icon, Button, Link, Hr } from 'sly/components/atoms';

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

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('maxWidth')};
    padding-right: 0;
    justify-content: space-between;
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

const groups = {
  Company: [
    { name: 'Our History', url: '/about' },
    { name: 'The Team', url: '/about#/#sly-team' },
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
    { name: 'Assisted Living', url: '/assisted-living' },
    { name: 'Independent Living', url: '/assisted-living' },
    { name: 'Alzheimer\'s Care', url: '/memory-care' },
    { name: 'Respite Care', url: '/respite-care' },
    { name: 'CCRC', url: '/continuing-care-retirement-community' },
  ],
};


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
  text-transform: uppercase;
  margin-bottom: ${size('spacing.large')};
`;

const GroupItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const GroupItem = styled(Link)`
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
    justify-content: space-between;
    padding: ${size('spacing.regular')} 0;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('maxWidth')};
    padding-right: ${size('layout.sideColumn')};
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.laptop')};
    padding-right: 0;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    order: 3;
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

const Join = styled.a`
  color: ${palette('white', 0)};
  font-size: ${size('spacing.large')};
  text-decoration: none;
  margin-bottom: ${size('spacing.regular')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    order: 2;
    margin: ${size('spacing.regular')} 0;
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-left: 0;
  }
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
        <GroupItems>{groupItemComponents}</GroupItems>
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
        <TradeMark>&copy; Seniorly {currentYear}</TradeMark>
      </FooterBottomWrapper>
    </FooterWrapper>
  );
};

export default Footer;
