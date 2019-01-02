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

const CareServiceItem = ({ icon, palette, text }) => (
  <Wrapper>
    <IconWrapper>
      <Icon icon={icon} palette={palette} />
    </IconWrapper>
    <TextSection>{text}</TextSection>
  </Wrapper>
);

CareServiceItem.propTypes = {
  icon: string.isRequired,
  palette: string,
  text: string.isRequired,
};

export default CareServiceItem;
