import React from 'react';
import styled from 'styled-components';
import { string, node, bool } from 'prop-types';
import { ifProp } from 'styled-tools';

import { size, palette } from 'sly/components/themes';
import { Block, Hr } from 'sly/components/atoms';

const StyledSection = styled.section`
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('border.xLarge')};
  background-color: ${palette('white.base')};
`;

const HeadingBlock = styled(Block)`
  padding: ${size('spacing.xLarge')};
  padding-bottom: 0;
`;

const Body = styled.div`
  padding: ${size('spacing.xLarge')};
  padding-top: 0;
  padding: ${ifProp('hasNoBodyPadding', 0, null)};
`;

const HeadingBoxSection = ({
  heading, children, className, hasNoBodyPadding,
}) => (
  <StyledSection className={className}>
    <HeadingBlock size="subtitle" weight="medium">{heading}</HeadingBlock>
    <Hr />
    <Body hasNoBodyPadding={hasNoBodyPadding}>
      {children}
    </Body>
  </StyledSection>
);

HeadingBoxSection.propTypes = {
  className: string,
  heading: node.isRequired,
  children: node.isRequired,
  hasNoBodyPadding: bool,
};

export default HeadingBoxSection;
