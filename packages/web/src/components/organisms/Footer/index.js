import React, { PureComponent } from 'react';
import styled from 'styled-components';

import config from 'sly/web/config';
import { size, palette } from 'sly/web/components/themes';
import { Icon, Link, Hr } from 'sly/web/components/atoms';
import Block from 'sly/web/components/atoms/Block';

const FooterWrapper = styled.footer`
  background-color: ${palette('slate', 'base')};
  color: ${palette('white', 'base')};
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

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    > svg {
      margin: 0 auto;
    }
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
  > * {
    color: ${palette('white', 'base')};
  }
  color: ${palette('white', 'base')};
  font-size: ${size('spacing.large')};
  text-decoration: none;
  margin-bottom: ${size('spacing.regular')};
`;

const StyledHR = styled(Hr)`
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
  order: 1;
  margin-bottom: ${size('spacing.xLarge')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    order: 2;
    margin-bottom: 0;
  }
`;

const FooterIcon = styled(Icon)`
  margin-right: ${size('spacing.regular')};
`;

const TradeMark = styled.div`
  color: ${palette('white', 'base')};
  margin-bottom: ${size('spacing.regular')};
  order: 2;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    margin: ${size('spacing.regular')} 0;
    order: 1;
  }
`;

const Join = styled.div`
  margin-bottom: ${size('spacing.regular')};
  order: 2;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    order: 1;
    margin-bottom: 0;
    margin-right: ${size('spacing.xLarge')};
  }
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  order: 1;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    flex-direction: row;
    align-items: center;
    order: 2;
  }
`;

const groups = {
  Company: [
    { name: 'Our Company', url: '/about', target: '_blank' },
    { name: 'Our Partner Agents', url: '/agents', target: '_blank' },
    { name: 'Career', url: 'https://angel.co/seniorly/jobs', target: '_blank' },
    { name: 'Press', url: '/about#/#press', target: '_blank' },
    { name: 'Contact', url: '/contact', target: '_blank' },
    { name: 'Terms', url: '/tos', target: '_blank' },
    { name: 'Privacy', url: '/privacy', target: '_blank' },
    { name: 'Sitemap', url: '/sitemap', target: '_blank' },
  ],
  Listings: [
    { name: 'For Referral Agents', url: '/agents/partners', target: '_blank' },
    { name: 'For Communities', url: '/partners/communities', target: '_blank' },
    { name: 'How It Works', url: '/how-it-works', target: '_blank' },
  ],
  Resources: [
    { name: 'Senior Living Resources', url: '/resources', target: '_blank' },
    { name: 'Assisted Living', url: '/assisted-living', target: '_blank' },
    { name: 'Independent Living', url: '/independent-living', target: '_blank' },
    { name: 'Board and Care Home', url: '/board-and-care-home', target: '_blank' },
    { name: 'Memory Care', url: '/memory-care', target: '_blank' },
    { name: 'Senior Living', url: '/senior-living', target: '_blank' },
    { name: 'Veteran\'s Benefits', url: '/veterans-benefit-assisted-living', target: '_blank' },
    { name: 'Home Care', url: '/in-home-care', target: '_blank' },
    { name: 'Respite Care', url: '/respite-care', target: '_blank' },
    { name: 'CCRC', url: '/continuing-care-retirement-community', target: '_blank' },
    { name: 'Nursing Homes', url: '/nursing-homes', target: '_blank' },
    { name: 'Skilled Nursing Facilities', url: '/skilled-nursing-facility', target: '_blank' },
  ],
};

const Version = styled.span`
  opacity: 0.5;
`;

class Footer extends PureComponent {
  render() {
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
              <SeniorlyWhiteIcon icon="logo" palette="white" size="xxLarge" />
              <Block>Find the Best Senior Living</Block>
            </GroupItem>
          </GroupDiv>
          {groupComponents}
        </FooterTopWrapper>
        <StyledHR palette="grey" variation="dark" />
        <FooterBottomWrapper>
          <TradeMark>&copy; Seniorly {currentYear} <Version>{config.version}</Version></TradeMark>
          <RightWrapper>
            <Join>
              Join Our Community
            </Join>
            <SocialIcons>
              <Link href="https://www.facebook.com/seniorly/posts"><FooterIcon icon="facebook" size="large" palette="white" /></Link>
              <Link href="https://twitter.com/Seniorly"><FooterIcon icon="twitter" size="large" palette="white" /></Link>
              <Link href="https://www.linkedin.com/company/seniorly"><FooterIcon icon="linkedin" size="large" palette="white" /></Link>
              <Link href="https://www.instagram.com/seniorlyinc"><FooterIcon icon="instagram" size="large" palette="white" /></Link>
              <Link href="https://www.pinterest.com/seniorly"><FooterIcon icon="pinterest" size="large" palette="white" /></Link>
            </SocialIcons>
          </RightWrapper>
        </FooterBottomWrapper>
      </FooterWrapper>
    );
  }
}

export default Footer;
