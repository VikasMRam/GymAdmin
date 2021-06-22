import React from 'react';
import { string, node, bool } from 'prop-types';

import { spacing as spacingPropType } from 'sly/common/propTypes/spacing';
import { Heading, Block } from 'sly/common/system';

const Section = ({
  title, subtitle, children, centerTitle, headingFont, headingMargin, headingMaxWidth, ...props
}) => (
  <Block {...props}>
    <Block
      margin={centerTitle && title ? 'auto' : null}
      pad={headingMargin}
      css={{
        maxWidth: headingMaxWidth,
      }}
    >
      {title && (
        <Heading testID="Heading" font={headingFont} textAlign={centerTitle ? 'center' : null}>{title}</Heading>
      )}
      {subtitle &&
        <Block>
          {subtitle}
        </Block>
      }
    </Block>
    <article>{children}</article>
  </Block>
);

Section.propTypes = {
  title: string,
  subtitle: string,
  centerTitle: bool,
  children: node,
  headingFont: string,
  headingMargin: spacingPropType,
  headingMaxWidth: string,
};

Section.defaultProps = {
  headingMargin: 'xLarge',
  as: 'section',
};

export default Section;
