import React from 'react';
import { string, node } from 'prop-types';

import { Heading } from 'sly/components/atoms';

const Section = ({ title, children, ...props }) => (
  <section {...props}>
    <Heading>{title}</Heading>
    <article>{children}</article>
  </section>
);

Section.propTypes = {
  title: string.isRequired,
  children: node,
};

export default Section;
