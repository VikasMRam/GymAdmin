import React from 'react';
import { string, node, bool } from 'prop-types';

import { spacing as spacingPropType } from 'sly/common/propTypes/spacing';
import { Heading, Block } from 'sly/web/components/atoms';

const Section = ({
  title, subtitle, children, centerTitle, titleSize, headingMargin, headingMaxWidth, ...props
}) => (
  <section {...props}>
    <Block
      margin={centerTitle && title ? 'auto' : null}
      pad={headingMargin}
      css={{
        maxWidth: headingMaxWidth,
      }}
    >
      {title && (
        <Heading size={titleSize} textAlign={centerTitle ? 'center' : null}>{title}</Heading>
      )}
      {subtitle &&
        <Block>
          {subtitle}
        </Block>
      }
    </Block>
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
  headingMaxWidth: string,
};

Section.defaultProps = {
  headingMargin: 'xLarge',
};

export default Section;
