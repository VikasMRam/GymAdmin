import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import { Icon, Block } from 'sly/components/atoms';

const Wrapper = styled.div`
  display: flex;
`;

const IconWrapper = styled.div`
  margin-right: ${size('spacing.large')};
  padding: ${size('spacing.regular')};
  border: ${size('border.regular')} solid ${palette('grey', 'filler')};
  border-radius: ${size('border.xLarge')};
`;

const TextSection = styled(Block)`
  padding-top: ${size('spacing.regular')};
`;

const CareServiceItem = ({
  icon, iconPalette, iconVariation, text, textPalette, textVariation,
}) => (
  <Wrapper>
    <IconWrapper>
      <Icon icon={icon} palette={iconPalette} variation={iconVariation} />
    </IconWrapper>
    <TextSection palette={textPalette} variation={textVariation} >{text}</TextSection>
  </Wrapper>
);

CareServiceItem.propTypes = {
  icon: string.isRequired,
  text: string.isRequired,
  iconPalette: string,
  iconVariation: string,
  textPalette: string,
  textVariation: string,
};

CareServiceItem.defaultProps = {
  iconPalette: 'secondary',
  iconVariation: 'base',
};

export default CareServiceItem;
