import React from 'react';
import styled from 'styled-components';
import { string, oneOf } from 'prop-types';

import { size, palette } from 'sly/components/themes';
import { Icon } from 'sly/components/atoms';

const Wrapper = styled.th`
  display: flex;
  background-color: ${palette('grey', 'stroke')};
  padding: ${size('spacing.large')};
  font-weight: ${size('weight.medium')};
  color: ${palette('grey', 'base')};
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
      {children}
      {sort && <SortIcon icon="arrow-up" palette="grey" flip={sort === 'desc'} />}
      <DropDownIcon icon="dropdown-down" palette="grey" />
    </Wrapper>
  );
};

Th.propTypes = {
  children: string.isRequired,
  sort: oneOf(['asc', 'desc']),
};

export default Th;
