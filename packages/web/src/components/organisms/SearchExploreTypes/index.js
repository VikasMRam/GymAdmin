import React from 'react';
import { string, node, object } from 'prop-types';

import { filterLinkPath } from 'sly/web/services/helpers/search';
import { Heading, Link, Grid, Block } from 'sly/common/components/atoms';

const tocsHeadingDesc = {
  'assisted-living': {
    heading: 'Asssisted Living',
    desc: 'Ideal for seniors who need help with some activities of daily living,but are interested in a social, active lifestyle.',
  },
  'memory-care': {
    heading: 'Memory Care',
    desc: 'Facilities with safe designed environments for residents to improve quality of life, reduce confusion and prevent wandering.',
  },
  'nursing-homes': {
    heading: 'Nursing Homes',
    desc: 'Safety and comfort for residents who need 24-hour medical supervision.',
  },
  'independent-living': {
    heading: 'Independent Living',
    desc: 'For residents who want to enjoy retirement without the responsibilites of home upkeep and daily chores.',
  },
  'board-and-care-home': {
    heading: 'Board and Care Home',
    desc: 'Houses in residential neighborhoods that are equipped  and staffed to care for a small number o residents, usually 2-10.',
  },
  'continuing-care-retirement-community': {
    heading: 'Continuing Care Retirement Communities (CCRC)',
    desc: 'For residents who want to age in place. Has accomodations for nursing home care, independent and assisted living.',
  },
  'active-adult': {
    heading: 'Active Adult (55+)',
    desc: 'Retirement communities where residents can stay ative and social.',
  },
  'skilled-nursing-facility': {
    heading: 'Skilled Nursing Facilities',
    desc: 'For residents who need transitional care between a hospital and a personal residence.',
  },
};

const HeadingDesc = ({ heading, to, children }) => (
  <article>
    <Link to={to}>
      <Heading level="subtitle" size="body" pad="small" palette="primary">{heading}</Heading>
    </Link>
    <Block size="caption" palette="grey">{children}</Block>
  </article>
);

HeadingDesc.propTypes = {
  heading: string,
  to: string,
  children: node,
};

const mapTocToHeadingDesc = (toc, searchParams) => {
  const { path } = filterLinkPath(searchParams, { toc });
  const currentToc = tocsHeadingDesc[toc];

  return (
    <HeadingDesc key={currentToc.heading} heading={currentToc.heading} to={path}>
      {currentToc.desc}
    </HeadingDesc>
  );
};

const SearchExploreTypes = ({ title, searchParams, ...props }) => {
  const tocKeys = Object.keys(tocsHeadingDesc);
  const column1Keys = tocKeys.slice(0, tocKeys.length / 2);
  const column2Keys = tocKeys.slice(tocKeys.length  / 2);
  const column1 = column1Keys.map(elem => mapTocToHeadingDesc(elem, searchParams));
  const column2 = column2Keys.map(elem => mapTocToHeadingDesc(elem, searchParams));

  return (
    <Block as="section" {...props}>
      <Heading level="subtitle" size="subtitle" pad="xLarge">{title}</Heading>
      <Grid
        dimensions={['50%', '50%']}
        gap="xLarge"
        upToTablet={{
          gridTemplateColumns: 'auto',
        }}
      >
        <Grid flow="row" gap="xLarge">
          {column1}
        </Grid>
        <Grid flow="row" gap="xLarge">
          {column2}
        </Grid>
      </Grid>
    </Block>
  );
};

SearchExploreTypes.propTypes = {
  searchParams: object.isRequired,
  title: string.isRequired,
};

export default SearchExploreTypes;
