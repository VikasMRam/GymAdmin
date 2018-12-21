import React from 'react';
import { string, node, bool } from 'prop-types';
import styled from 'styled-components';

import { Heading } from 'sly/components/atoms';
import { size } from 'sly/components/themes';

const StyledHeading = styled(Heading)`
  margin-bottom: ${size('spacing.xLarge')};
`;

const CenteredHeading = StyledHeading.extend`
  text-align: center;
`;

const Section = ({
  title, children, centerTitle, ...props
}) => (
  <section {...props}>
    {title && (
      centerTitle ?
        <CenteredHeading>{title}</CenteredHeading> :
        <StyledHeading>{title}</StyledHeading>
    )}
    <article>{children}</article>
  </section>
);

Section.propTypes = {
  title: string,
  centerTitle: bool,
  children: node,
};

export default Section;
