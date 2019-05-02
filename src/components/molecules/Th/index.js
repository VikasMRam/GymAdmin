import React from 'react';
import styled from 'styled-components';
import { string, oneOf } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import { Icon } from 'sly/components/atoms';

const Wrapper = styled.th`
  padding: 0;
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
`;
const StyledDiv = styled.div`
  display: flex;
  background-color: ${palette('grey', 'stroke')};
  padding: ${size('spacing.large')};
  font-weight: ${size('weight.medium')};
  color: ${palette('grey', 'base')};
  white-space: nowrap;
  font-size: ${p => size('text', p.size)};
  line-height: ${p => size('lineHeight', p.size)};
`;

const SortIcon = styled(Icon)`
  margin-left: ${size('spacing.regular')};
`;

const DropDownIcon = styled(Icon)`
  margin-left: auto;
`;

const Th = ({ children, sort, size }) => {
  return (
    <Wrapper>
      <StyledDiv size={size}>
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
  size: string,
};

Th.defaultProps = {
  size: 'caption',
};

export default Th;
