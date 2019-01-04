import React from 'react';
import { string, node, bool } from 'prop-types';
import styled from 'styled-components';

import { Heading } from 'sly/components/atoms';
import { size } from 'sly/components/themes';
import { spacing as spacingPropType } from 'sly/propTypes/spacing';

const margin = ({ headingMargin }) => size('spacing', headingMargin);

const HeadingWrapper = styled.div`
  margin-bottom: ${margin};
`;

const CenteredHeading = styled(Heading)`
  text-align: center;
`;

const Section = ({
  title, children, centerTitle, titleSize, headingMargin, ...props
}) => (
  <section {...props}>
    <HeadingWrapper headingMargin={headingMargin}>
      {title && (
        centerTitle ?
          <CenteredHeading size={titleSize} >{title}</CenteredHeading> :
          <Heading size={titleSize}>{title}</Heading>
      )}
    </HeadingWrapper>
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
