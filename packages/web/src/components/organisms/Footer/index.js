import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';

import config from 'sly/web/config';
import { size, palette } from 'sly/common/components/themes';
import Span from 'sly/web/components/atoms/Span';
import { Icon, Block, Hr, Link, Heading } from 'sly/common/components/atoms';

const currentYear = (new Date()).getFullYear();

const aboutUs = { 
  'Our story': '/about', 
  'Contact us': '/contact', 
  'Press and media': '/about#/#press', 
  'Careers': 'https://angel.co/company/seniorly/jobs', 
};

const typesOf = {
  'Assisted living': '/assisted-living', 
  'Independent living': '/independent-living', 
  'Board and care homes': '/board-and-care-home', 
  'Memory care': '/memory-care', 
  'Home care': '/in-home-care', 
  'Respite care': '/respite-care', 
  'Continuing care retirement communities (CCRC)': '/continuing-care-retirement-community', 
  'Skilled nursing facilities': '/skilled-nursing-facility', 
  'Senior living overview': '/senior-living', 
};

const forFamilies = {
  'Senior living resources': '/resources', 
  'How it works': '/how-it-works', 
  'Seniorly Local Advisors': '/agents', 
  'Veteran\'s benefits': '/veterans-benefit-assisted-living', 
};

const forPartners = {
  'Partner agents': '/partners/agents', 
  'Partner communities': '/partners/communities', 
};

const Body = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  border-bottom: none;

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col12')};
    display: flex;
    > * {
      flex: 1 1 0px;
    }
    border-bottom: 1px solid ${palette('slate.lighter-90')};
    padding-bottom: 0px;
    margin-bottom: 24px;
  }
`;

const FooterGroup = styled.div`
  padding-top: 24px;
  border-bottom: 1px solid ${palette('slate.lighter-90')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    border-bottom: none;
  }
`;

const GroupHeading = styled(Heading)`
  text-transform: uppercase;
`;

GroupHeading.defaultProps = {
  font: 'label',
  palette: 'slate.lighter-30',
  pad: 'xLarge',
};

const Links = ({ items }) => (
  <Block
    css={css`
      display: flex;
      flex-direction: column;
      padding-bottom: 12px;

      @media screen and (min-width: ${size('breakpoint.tablet')}) {
        flex-direction: row;
        flex-wrap: wrap;
      }

      @media screen and (min-width: ${size('breakpoint.laptop')}) {
        flex-direction: column;
      }

      > a {
        display: block;
        margin-bottom: 12px;
        padding-right: 16px;

        @media screen and (min-width: ${size('breakpoint.tablet')}) {            
          width: calc(100%/3); 
        }

        @media screen and (min-width: ${size('breakpoint.laptop')}) {
          width: 100%;
        }
      }

    `}
  >
    {Object.entries(items).map(([name, url]) => (
      <Link
        palette="slate"
        font="body-small" 
        to={url}
      >
        {name}
      </Link>
    ))}
  </Block>
);

const Bottom = styled.div`
  margin: 0 auto;
  position: relative;
  padding: 0px 24px 24px;

  .left {
    display: flex;
    flex-direction: column;
    ${Icon} {
      margin-bottom: 24px;
    }
  }

  .right {
    position: absolute;
    top: 0px;
    right: 24px;
    > a {
      margin-left: 12px;
      color: ${palette('slate.base')}
    }
  }

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    .left {
      flex-direction: row;
      align-items: center;
      ${Icon} {
        margin-bottom: 0px;
        margin-right: 12px;
      }
    }
  }

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col12')};
    display: flex;
  }
`;

const Footer = () => (
  <Block as="footer" background="harvest.lighter-90">
    <Body>
      <FooterGroup>
        <GroupHeading>About us</GroupHeading>
        <Links items={aboutUs} />
      </FooterGroup>
      <FooterGroup>
        <GroupHeading>Types of senior living</GroupHeading>
        <Links items={typesOf} />
      </FooterGroup>
      <FooterGroup>
        <GroupHeading>For families</GroupHeading>
        <Links items={forFamilies} />
      </FooterGroup>
      <FooterGroup>
        <GroupHeading>For partners</GroupHeading>
        <Links items={forPartners} />
      </FooterGroup>
    </Body>

    <Bottom>
      <div className="left">
        <Link to="/"><Icon icon="logo" size={32} /></Link>
        <Span font="body-small">
          &copy; 
          Seniorly {currentYear} 
          <Span palette="slate.lighter-30">{config.version}</Span> 
          {' '}· <Link to="/privacy">Privacy</Link>
          {' '}· <Link to="/tos">Terms</Link>
          {/* {' '}· <Link to="/sitemap">Sitemap</Link> */}
        </Span>
      </div>
      <div className="right">
        <Link href="https://www.facebook.com/seniorly/posts"><Icon icon="facebook" /></Link>
        <Link href="https://www.instagram.com/seniorlyinc"><Icon icon="instagram" /></Link>
        <Link href="https://twitter.com/Seniorly"><Icon icon="twitter" /></Link>
        <Link href="https://www.linkedin.com/company/seniorly"><Icon icon="linkedin" /></Link>
      </div>
    </Bottom>
  </Block>
); 

export default Footer;
