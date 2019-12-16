import React from 'react';
import { string, node, bool } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { spacing as spacingPropType } from 'sly/propTypes/spacing';
import { Heading, Block } from 'sly/components/atoms';

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
        <Heading size={titleSize}>{title}</Heading>
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
