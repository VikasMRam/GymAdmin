import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Box, Link } from 'sly/components/atoms';
import Section from 'sly/components/molecules/Section';

const DescriptionWrapper = styled.div`
  margin-bottom: ${size('spacing.xLarge')};
`;

const StyledLink = styled(Link)`
  font-weight: ${size('weight.medium')};
`;

const CommunityExtraInfoSection = ({
  title, description, url, urlText, className,
}) => (
  <Box className={className}>
    <Section title={title} titleSize="subtitle" headingMargin="large">
      {url ?
        <DescriptionWrapper>
          {description}
        </DescriptionWrapper>
        : description
      }
      {url && <StyledLink href={url}>{urlText}</StyledLink>}
    </Section>
  </Box>
);

CommunityExtraInfoSection.propTypes = {
  title: string,
  description: string,
  url: string,
  urlText: string,
  className: string,
};

CommunityExtraInfoSection.defaultProps = {
  urlText: 'Click Here',
};

export default CommunityExtraInfoSection;
