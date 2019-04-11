import React from 'react';
import styled from 'styled-components';
import { string, oneOf } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import { Icon } from 'sly/components/atoms';

const Wrapper = styled.th`
  padding: 0;
`;
const StyledDiv = styled.div`
  display: flex;
  background-color: ${palette('grey', 'stroke')};
  padding: ${size('spacing.large')};
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  font-weight: ${size('weight.medium')};
  color: ${palette('grey', 'base')};
  white-space: nowrap;
`;

const SortIcon = styled(Icon)`
  margin-left: ${size('spacing.regular')};
`;

const DropDownIcon = styled(Icon)`
  margin-left: auto;
`;

const Th = ({ children, sort }) => {
  return (
    <Wrapper>
      <StyledDiv>
        {children}
        {sort && <SortIcon icon="arrow-up" palette="grey" flip={sort === 'desc'} />}
        <DropDownIcon icon="dropdown-down" palette="grey" />
      </StyledDiv>
    </Wrapper>
  );
};

Th.propTypes = {
  children: string.isRequired,
  sort: oneOf(['asc', 'desc']),
};

export default Th;
