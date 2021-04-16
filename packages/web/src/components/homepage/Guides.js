import React from 'react';
import styled from 'styled-components';

import Section from './Section';

import { host } from 'sly/web/config';
import { getHelmetForHomePage } from 'sly/web/services/helpers/html_headers';
import Link from 'sly/common/components/atoms/Link';
import { Block, Button, Heading, sx$tablet, sx$laptop } from 'sly/common/system';
import { Chevron } from 'sly/common/icons';


const Body = styled(Section)`
  display: flex;
  flex-direction: column;
  padding: 48px 24px;

  ${sx$tablet({
    padding: '64px 24px',
  })}

  ${sx$laptop({
    flexDirection: 'row',
    paddingY: 'xxxl',
    '& > :first-child': {
      marginRight: 'xxl',
      flexShrink: 20,
    },
    '& > :last-child': {
      width: 'col6',
    },
  })}
`;

// @media screen and (min-width: ${size('breakpoint.tablet')}) {
//   padding: 64px 24px;
// }

// @media screen and (min-width: ${size('breakpoint.laptop')}) {
//   flex-direction: row;
//   padding: 80px 0;
//   & > * {
//     width: calc(50% - 24px)
//   }
//   & > :first-child {
//     margin-right: 48px;
//   }
// }

const guides = [
  {
    to: '/assisted-living',
    alt: 'assisted living senior living seniorly',
    title: 'Assisted Living Guide',
  },
  {
    to: '/memory-care',
    alt: 'memory care senior living seniorly',
    title: 'Memory Care Guide',
  },
  {
    to: '/independent-living',
    alt: 'independent living senior living seniorly',
    title: 'Independent Living Guide',
  },
  {
    to: '/continuing-care-retirement-community',
    alt: 'ccrc senior living seniorly',
    title: 'Continuing Care Retirement Community Guide',
  },
  {
    to: '/in-home-care',
    alt: 'in home care',
    title: 'Home Care Guide',
  },
];

const resources = {
  to: '/resources',
  alt: 'more senior living resources seniorly',
  title: 'Explore our resource center',
};

const significantLinks = guides.map(info => info.to);
significantLinks.push(resources.to);

const header = getHelmetForHomePage({ canonicalUrl: host, significantLinks });

const Guides = (props) => {
  return (
    <Block background="harvest.lighter-90" {...props}>
      {header}
      <Body>
        <Block pad="l" flexGrow="0">
          <Heading font="title-xl" pad="m">
            Resources and Helpful Guides
          </Heading>
          <Block font="body-l" pad="l" >
            When you first begin to explore senior living, the information and options can be overwhelming—and stressful. We get it. That’s why we’ve done the basic research for you, creating a series of Seniorly Guides and reliable resources to inform you along your journey.
          </Block>
          <Link href={resources.to}
            event={{
                category: 'homepage-guides',
                action: 'link-click',
                label: resources.title,
              }}
          >
            <Button height="l">{resources.title}</Button>
          </Link>
        </Block>


        <Block>
          {guides.map(guide => (
            <Block
              as={Link}
              font="title-s-azo"
              background="white.base"
              borderRadius="xs"
              padding="l"
              pad="m"
              sx={{
                display: 'flex',
                alignItems: 'center',
                '& > :first-child': {
                  flexGrow: 1,
                },
                '&:last-child': {
                  marginBottom: '0px',
                },
                '&:hover': {
                  boxShadow: 'rgb(0 0 0 / 6%) 0px 0.25rem 1rem',
                },
              }}
              {...guide}
              event={{
                category: 'homepage-guides',
                action: 'link-click',
                label: guide.title,

              }}
            >
              <span>{guide.title}</span>
              <Chevron rotation="90" size="l" />
            </Block>
          ))}
        </Block>
      </Body>
    </Block>
  );
};

export default Guides;
