import React from 'react';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import {
  withDisplay,
} from 'sly/common/components/helpers';
import { host } from 'sly/web/config';
import { getHelmetForHomePage } from 'sly/web/services/helpers/html_headers';
import Block from 'sly/common/components/atoms/Block';
import Button from 'sly/common/components/atoms/Button';
import Link from 'sly/common/components/atoms/Link';

import HomepageHeading from './HomepageHeading';
import HomepageParagraph from './HomepageParagraph';

const Body = styled.main`
  ${withDisplay}
  width: 100%;
  margin: 0 auto;
  padding: 0 ${size('spacing.large')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    padding: 0;
    width: ${size('layout.col8')};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    width: ${size('layout.col12')};
  }
`;

const guides = [
  {
    to: '/assisted-living',
    alt: 'assisted living senior living seniorly',
    title: 'Assisted Living',
  },
  {
    to: '/memory-care',
    alt: 'memory care senior living seniorly',
    title: 'Memory Care',
  },
  {
    to: '/independent-living',
    alt: 'independent living senior living seniorly',
    title: 'Independent Living',
  },
  {
    to: '/continuing-care-retirement-community',
    alt: 'ccrc senior living seniorly',
    title: 'CCRC / Life Plan',
  },
  {
    to: '/in-home-care',
    alt: 'in home care',
    title: 'Home care guide',
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

const Guide = styled(HomepageParagraph)`
  
`;

const Guides = ({}) => {
  return (
    <Block background="harvest.lighter-90">
      {header}
      <Body
        display="flex" 
      >
        <Block>
          <HomepageHeading pad="xLarge">
            Resources and Helpful Guides
          </HomepageHeading>
          <HomepageParagraph pad="xLarge">
            When you first begin to explore senior living, the information and options can be overwhelming—and stressful. We get it. That’s why we’ve done the basic research for you, creating a series of Seniorly Guides and reliable resources to inform you along your journey.  
          </HomepageParagraph>
          <Button {...resources}>{resources.title}</Button>
        </Block> 

        <Block>
          {guides.map((guide) => (
            <Guide as={Link} {...guide}>
              {guide.title}
            </Guide>
          ))}
        </Block>
      </Body>
    </Block>
  );
}

export default Guides;