import React from 'react';
import styled from 'styled-components';

import IconButton from '../IconButton/index';

import { size, palette } from 'sly/components/themes/index';

const Wrappper = styled.div`
  display: flex;
  padding: ${size('spacing.regular')}; ${size('spacing.large')};
  border: ${size('border.regular')} solid ${palette('grey', 'filler')};
`;

const SearchButton = styled(IconButton)`

`;

const RightSideButtons = styled.div`
  margin-left: auto;
`;

const SortButton = styled(IconButton)`
  margin-right: ${size('spacing.regular')};
`;

const TableHeaderButtons = () => {
  return (
    <Wrappper>
      <SearchButton icon="search" ghost palette="slate" iconPalette="grey" />
      <RightSideButtons>
        <SortButton icon="sort" ghost iconPalette="grey" />
        <IconButton icon="filter" ghost iconPalette="grey" />
      </RightSideButtons>
    </Wrappper>
  );
};

export default TableHeaderButtons;
