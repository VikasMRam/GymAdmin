import React from 'react';
import styled, { css } from 'styled-components';
import { string, node, bool } from 'prop-types';
import { ifProp } from 'styled-tools';

import { Heading, Hr, Block, space, color, border, sx$tablet } from 'sly/common/system';

const filterProps = Component => ({
  hasNoBodyPadding,
  hasNoHr,
  ...props
}) => (
  <Component {...props} />
);

const StyledSection = filterProps(styled(Block)`
  border:  ${ifProp('hasNoBorder', 'none', border('s'))} ${color('slate.stroke')};
  border-radius: ${ifProp('hasNoBorder', null, space('spacing.xs'))};
  background-color: ${color('white.base')};
  padding: ${space('l')} ${space('m')};
  ${sx$tablet({
    paddingX: 'm',
  })}
  padding-left: ${ifProp('hasNoBodyPadding', 0, null)};
  padding-right: ${ifProp('hasNoBodyPadding', 0, null)};
  padding-bottom: ${ifProp('hasNoBodyPadding', 0, null)};

`);

const HeadingBlock = filterProps(styled(Heading)`
  padding-left: ${ifProp('hasNoBodyPadding', space('l'), 0)};
  padding-right: ${ifProp('hasNoBodyPadding', space('l'), 0)};
  padding-bottom: ${space('l')};
`);
HeadingBlock.displayName = 'HeadingBlock';

const StyledHr = filterProps(styled(Hr)`
  margin-left: ${ifProp('hasNoBodyPadding', 0, css`-${space('l')}`)};
  margin-right: ${ifProp('hasNoBodyPadding', 0, css`-${space('l')}`)};
  margin-bottom: ${ifProp('hasNoBodyPadding', 0, null)};
`);

const HeadingBoxSection = ({
  id, heading, children, className, headingFont, hasNoBodyPadding, hasNoBorder, hasNoBottomHr, hasNoHr, ...props
}) => (
  <StyledSection {...props} as="section" id={id} className={className} hasNoBodyPadding={hasNoBodyPadding} hasNoBorder={hasNoBorder}>
    <HeadingBlock font={headingFont} hasNoBodyPadding={hasNoBodyPadding} hasNoHr={hasNoHr}>{heading}</HeadingBlock>
    { !hasNoHr && <StyledHr hasNoBodyPadding={hasNoBodyPadding} /> }
    {children}
    {!hasNoBottomHr &&  <Hr mt="xxl" mb="xxl" display="none" sx$tablet={{ display: 'block' }} />}
  </StyledSection>
);


HeadingBoxSection.propTypes = {
  id: string,
  className: string,
  heading: node.isRequired,
  children: node,
  hasNoBodyPadding: bool,
  hasNoBorder: bool,
  hasNoHr: bool,
  hasNoBottomHr: bool,
  headingFont: string,
};

HeadingBoxSection.defaultProps = {
  headingFont: 'title-l',
};

export default HeadingBoxSection;
