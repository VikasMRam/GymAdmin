import React from 'react';
import { string, node } from 'prop-types';
import styled from 'styled-components';

import { Heading } from 'sly/components/atoms';

import { size } from 'sly/components/themes';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.xxLarge')};
`;

const Section = ({ title, children, ...props }) => (
  <section {...props}>
    {title &&
      <StyledHeading>{title}</StyledHeading>
    }
    <article>{children}</article>
  </section>
);

Section.propTypes = {
  title: string,
  children: node,
};

export default Section;
