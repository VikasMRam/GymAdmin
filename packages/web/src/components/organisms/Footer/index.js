import React from 'react';
import { node, object } from 'prop-types';

import config from 'sly/web/config';
import {
  Logo,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from 'sly/common/icons/index';
import { Heading, Block, Link, Span } from 'sly/common/system';
import { clickEventHandler } from 'sly/web/services/helpers/eventHandlers';

const currentYear = new Date().getFullYear();

const aboutUs = {
  'Our story': '/about',
  'Contact us': '/contact',
  'Press and media': '/about#/#press',
  Careers: 'https://angel.co/company/seniorly/jobs',
};

const typesOf = {
  'Assisted living': '/assisted-living',
  'Independent living': '/independent-living',
  'Board and care homes': '/board-and-care-home',
  'Memory care': '/memory-care',
  'Home care': '/in-home-care',
  'Respite care': '/respite-care',
  'Continuing care retirement communities (CCRC)':
    '/continuing-care-retirement-community',
  'Skilled nursing facilities': '/skilled-nursing-facility',
  'Senior living overview': '/senior-living',
};

const forFamilies = {
  'Senior living resources': '/resource-center',
  'How it works': '/how-it-works',
  'Seniorly Local Advisors': '/agents',
  "Veteran's benefits": '/veterans-benefit-assisted-living',
};

const forPartners = {
  'Partner agents': '/partners/agents',
  'Partner communities': '/partners/communities',
};

const Body = ({ children }) => (
  <Block
    width="100%"
    margin="0 auto"
    padding="l"
    sx$laptop={{
      width: 'col12',
      display: 'flex',
      marginBottom: 'l',
      paddingX: '0',
      paddingBottom: '0',
      '> *': {
        flex: '1 1 0px',
      },
    }}
  >
    {children}
  </Block>
);

Body.propTypes = {
  children: node,
};

const FooterGroup = ({ children, ...props }) => (
  <Block
    borderBottom="1px solid"
    borderColor="slate.lighter-90"
    paddingTop="l"
    {...props}
  >
    {children}
  </Block>
);

FooterGroup.propTypes = {
  children: node,
};

const GroupHeading = ({ children, ...props }) => (
  <Heading {...props}>{children}</Heading>
);

GroupHeading.propTypes = {
  children: node,
};


GroupHeading.defaultProps = {
  font: 'body-xs',
  color: 'slate.lighter-40',
  marginBottom: 'l',
  textTransform: 'uppercase',
};

const Links = ({ items }) => (
  <Block
    display="flex"
    flexDirection="column"
    paddingBottom="s"
    sx$tablet={{
      flexDirection: 'row',
      flexWrap: 'wrap',
    }}
    sx$laptop={{
      flexDirection: 'column',
    }}
    sx={{
      '> a': {
        display: 'block',
        marginBottom: 's',
        paddingRight: 'm',
        '&:hover': {
          color: 'viridian.base',
        },
        '@tablet': {
          width: 'calc(100%/3)',
        },
        '@laptop': {
          width: '100%',
        },
      },
    }}
  >
    {Object.entries(items).map(([name, url]) => (
      <Link
        color="slate.base"
        fontSize="body-s"
        href={url}
        event={{
          category: 'footer-link',
          action: 'link-click',
          label: name,
        }}
      >
        {name}
      </Link>
    ))}
  </Block>
);

Links.propTypes = {
  items: object,
};

const Bottom = ({ children, ...props }) => (
  <Block
    margin="0 auto"
    position="relative"
    paddingX="l"
    paddingBottom="l"
    sx={{
      '.left': {
        display: 'flex',
        flexDirection: 'column',
        svg: {
          marginBottom: 'l',
        },
      },
      '.right': {
        position: 'absolute',
        top: '0px',
        right: '24px',
        '> a': {
          marginLeft: 's',
          color: 'slate.base',
        },
      },
      '@tablet': {
        '.left': {
          flexDirection: 'row',
          alignItems: 'center',
          svg: {
            marginBottom: 'initial',
            marginRight: 's',
          },
        },
      },
      '@laptop': {
        width: 'col12',
        display: 'flex',
        '.left': {
          svg: {
            marginBottom: 'initial',
            marginRight: 's',
          },
        },
      },
    }}
    {...props}
  >
    {children}
  </Block>
);

Bottom.propTypes = {
  children: node,
};

const Footer = props => (
  <Block as="footer" background="harvest.lighter-90" {...props}>
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
        <Link to="/">
          <Logo size="l" marginTop="-4px" />
        </Link>
        <Span fontSize="body-s">
          &copy; Seniorly {currentYear}
          <Span>{config.version}</Span> ·{' '}
          <Link
            event={{
              category: 'footer-link',
              action: 'link-click',
              label: 'Privacy',
            }}
            color="slate.base"
            to="/privacy"
          >
            Privacy
          </Link>{' '}
          ·{' '}
          <Link
            event={{
              category: 'footer-link',
              action: 'link-click',
              label: 'Terms',
            }}
            color="slate.base"
            to="/tos"
          >
            Terms
          </Link>{' '}
          ·{' '}
          <Link
            event={{
              category: 'footer-link',
              action: 'link-click',
              label: 'Sitemap',
            }}
            color="slate.base"
            href="/sitemap"
          >
            Sitemap
          </Link>
        </Span>
      </div>
      <div className="right">
        <Link onClick={clickEventHandler('footer-social-media', 'Facebook')}  href="https://www.facebook.com/seniorly/posts"><Facebook /></Link>
        <Link onClick={clickEventHandler('footer-social-media', 'Instagram')} href="https://www.instagram.com/seniorlyinc"><Instagram /></Link>
        <Link onClick={clickEventHandler('footer-social-media', 'Twitter')} href="https://twitter.com/Seniorly"><Twitter /></Link>
        <Link onClick={clickEventHandler('footer-social-media', 'Linkedin')} href="https://www.linkedin.com/company/seniorly"><Linkedin /></Link>
      </div>
    </Bottom>
  </Block>
);

export default Footer;
