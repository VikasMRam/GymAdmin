import React from 'react';
import { string, bool } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/common/components/themes';
import { Badge, Icon, Block } from 'sly/web/components/atoms';

const StyledBadge = styled(Badge)`
  width: ${p => p.fullWidth ? '100%' : 'auto'};
  border-radius: ${size('spacing.small')};
  border-bottom-left-radius: ${p => p.fullWidth ? '0' : size('border.xxLarge')};
  border-bottom-right-radius: ${p => p.fullWidth ? '0' : size('border.xxLarge')};
  background-color: ${palette('primary', 'base')};
  display: inline-flex;
  justify-content: ${p => p.fullWidth ? 'left' : 'center'};
  align-items: ${p => p.fullWidth ? 'left' : 'center'};
  padding: ${size('spacing.small')} ${size('spacing.regular')};
`;

const StyledIcon = styled(Icon)`
  margin-right: ${size('spacing.small')};
`;
const PlusBlock = styled(Block)`
  font-style: italic;
  margin-right: ${size('spacing.small')};
`;
const CategoryBlock = styled(Block)`
  text-transform: uppercase;
  margin-left: ${size('spacing.small')};
`;
const PlusBadge = ({ plusCategory, fullWidth }) => (
  <StyledBadge fullWidth={fullWidth}>
    <StyledIcon icon="logo" palette="white" size="body" />
    <PlusBlock  palette="white" size="body">
      plus
    </PlusBlock>
    {plusCategory &&
    <Block palette="white">
      |
    </Block>
    }
    {plusCategory &&
    <CategoryBlock palette="white" size="body">
      {plusCategory}
    </CategoryBlock>
    }

  </StyledBadge>
);

PlusBadge.propTypes = {
  plusCategory: string,
  fullWidth: bool,
};

PlusBadge.defaultProps = {
  fullWidth: false,
};

export default PlusBadge;
