import React from 'react';
import { string, node } from 'prop-types';


import { Link, Block, Grid, Heading } from 'sly/common/system';

const tocsHeadingDesc = {
  'assisted-living': {
    heading: 'Assisted Living',
    desc: 'For seniors who need some help with daily activities and want a supportive community that’s active, social, and engaging.',
  },
  'independent-living': {
    heading: 'Independent Living',
    desc: 'For active older adults who want to downsize to a home in a retirement community but don’t need help to live independently.',
  },
  'continuing-care-retirement-community': {
    heading: 'Continuing Care Retirement Communities',
    desc: 'For residents who want to age in place as their care needs change—from Independent Living to nursing care. Requires a buy-in fee.',
  },
  'skilled-nursing-facility': {
    heading: 'Skilled Nursing Facilities',
    desc: 'For seniors with more serious medical needs who require skilled care following a hospitalization, illness, or surgery.',
  },
  'memory-care': {
    heading: 'Memory Care',
    desc: 'A supervised and secured community designed to support engagement and quality of life for residents living with dementia.',
  },
  'board-and-care-home': {
    heading: 'Board and Care Home',
    desc: 'Homes in residential neighborhoods that are equipped and staffed to provide daily care for a small number of residents.',
  },
  'active-adult': {
    heading: 'Active Adult Communities (55+)',
    desc: 'Communities of houses and apartments for residents 55 and older who live independently, enjoying an active, social lifestyle.',
  },
};

const HeadingDesc = ({ heading, to, children }) => (
  <article>
    <Link to={to} target="_blank">
      <Heading font="title-xs-azo" pad="xxs" color="primary">{heading}</Heading>
    </Link>
    <Block font="body-s" color="grey">{children}</Block>
  </article>
);

HeadingDesc.propTypes = {
  heading: string,
  to: string,
  children: node,
};

const mapTocToHeadingDesc = (toc, city, state) => {
  const currentToc = tocsHeadingDesc[toc];
  const uri = city ? `${state}/${city}` : state;

  return (
    <HeadingDesc key={currentToc.heading} heading={currentToc.heading} to={`/${toc}/${uri}`}>
      {currentToc.desc}
    </HeadingDesc>
  );
};

const SearchExploreTypes = ({ title, city, state, ...props }) => {
  const tocKeys = Object.keys(tocsHeadingDesc);
  const splitBoundary = Math.ceil(tocKeys.length / 2);
  const column1Keys = tocKeys.slice(0, splitBoundary);
  const column2Keys = tocKeys.slice(splitBoundary);
  const column1 = column1Keys.map(toc => mapTocToHeadingDesc(toc, city, state));
  const column2 = column2Keys.map(toc => mapTocToHeadingDesc(toc, city, state));

  return (
    <Block as="section" {...props}>
      <Heading font="title-m" pad="l">{title}</Heading>
      <Grid
        gridGap="l"
        gridTemplateColumns="auto"
        sx$laptop={{
            gridTemplateColumns: 'calc(50% - 0.75rem) calc(50% - 0.75rem)',
          }}
      >
        <Grid flexDirection="row" gridGap="l">
          {column1}
        </Grid>
        <Grid flexDirection="row" gridGap="l" height="min-content">
          {column2}
        </Grid>
      </Grid>
    </Block>
  );
};

SearchExploreTypes.propTypes = {
  title: string.isRequired,
  city: string,
  state: string.isRequired,
};

export default SearchExploreTypes;
