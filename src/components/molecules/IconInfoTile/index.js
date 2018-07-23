import React from 'react';
import styled from 'styled-components';
import { string, bool } from 'prop-types';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
import { Icon } from 'sly/components/atoms';

const Wrapper = styled.div`
  display: flex;
  padding: ${size('spacing.xLarge')};
  border: ${p => (p.borderless ? 0 : size('border.regular'))} solid ${palette('grayscale', 2)};
  border-radius: ${size('spacing.tiny')};
`;

const HeadingContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.xLarge')};
`;

const HeadingWrapper = styled.div`
  font-size: ${size('text.subtitle')};
  font-weight: bold;
  margin-bottom: ${size('spacing.regular')};
`;

const ContentWrapper = styled.div`

`;

const IconInfoTile = ({
  icon, iconPalette, heading, content, borderless,
}) => {
  return (
    <Wrapper borderless={borderless}>
      <StyledIcon icon={icon} palette={iconPalette} />
      <HeadingContentWrapper>
        <HeadingWrapper>{heading}</HeadingWrapper>
        <ContentWrapper>{content}</ContentWrapper>
      </HeadingContentWrapper>
    </Wrapper>
  );
};

IconInfoTile.propTypes = {
  icon: string.isRequired,
  iconPalette: string,
  heading: string.isRequired,
  content: string.isRequired,
  borderless: bool,
};

IconInfoTile.defaultProps = {
  iconPalette: 'black',
  borderless: false,
};

export default IconInfoTile;
