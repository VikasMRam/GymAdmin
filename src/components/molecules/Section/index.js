import React from 'react';
import { string, node, bool } from 'prop-types';
import styled from 'styled-components';

import { Heading } from 'sly/components/atoms';
import { size } from 'sly/components/themes';
import { spacing as spacingPropType } from 'sly/propTypes/spacing';

const margin = ({ headingMargin }) => size('spacing', headingMargin);

const StyledHeading = styled(Heading)`
  margin-bottom: ${margin};
`;

const CenteredHeading = StyledHeading.extend`
  text-align: center;
`;

const Section = ({
  title, children, centerTitle, titleSize, headingMargin, ...props
}) => (
  <section {...props}>
    {title && (
      centerTitle ?
        <CenteredHeading size={titleSize} headingMargin={headingMargin}>{title}</CenteredHeading> :
        <StyledHeading size={titleSize} headingMargin={headingMargin}>{title}</StyledHeading>
    )}
    <article>{children}</article>
  </section>
);

Section.propTypes = {
  title: string,
  centerTitle: bool,
  children: node,
  titleSize: string,
  headingMargin: spacingPropType,
};

Section.defaultProps = {
  headingMargin: 'xLarge',
};

export default Section;
