import React from 'react';
import { arrayOf, string, object } from 'prop-types';

import { Heading, Link, Grid, Block } from 'sly/common/components/atoms';

const SeoLinks = ({ title, links, ...props }) => (
  <Block as="section" {...props}>
    <Heading level="subtitle" size="subtitle" pad="xLarge">{title}</Heading>
    <Grid
      dimensions={['50%', '50%']}
      gap="large"
      upToTablet={{
        gridTemplateColumns: 'auto',
      }}
    >
      {links.map(link => (
        <Link
          key={link.to}
          {...link}
        >
          {link.title}
        </Link>
      ))}
    </Grid>
  </Block>
);

SeoLinks.propTypes = {
  title: string.isRequired,
  links: arrayOf(object).isRequired,
};

export default SeoLinks;
