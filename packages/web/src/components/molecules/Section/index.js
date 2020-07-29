import React from 'react';
import { string, node, bool } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { spacing as spacingPropType } from 'sly/common/propTypes/spacing';
import { Heading, Block } from 'sly/web/components/atoms';

const margin = ({ headingMargin }) => size('spacing', headingMargin);

const HeadingWrapper = styled.div`
  margin-bottom: ${margin};
`;

const CenteredHeading = styled(Heading)`
  text-align: center;
`;

const Section = ({
  title, subtitle, children, centerTitle, titleSize, headingMargin, ...props
}) => (
  <section {...props}>
    <HeadingWrapper headingMargin={headingMargin}>
      {title && (
        centerTitle ?
          <CenteredHeading size={titleSize} >{title}</CenteredHeading> :
          <Heading size={titleSize}>{title}</Heading>
      )}
      {subtitle &&
        <Block>
          {subtitle}
        </Block>
      }
    </HeadingWrapper>
    <article>{children}</article>
  </section>
);

Section.propTypes = {
  title: string,
  subtitle: string,
  centerTitle: bool,
  children: node,
  titleSize: string,
  headingMargin: spacingPropType,
};

Section.defaultProps = {
  headingMargin: 'xLarge',
};

export default Section;
