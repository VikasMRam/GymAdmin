import React from 'react';
import { oneOf } from 'prop-types';
import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import { switchProp } from 'styled-tools';

import { size } from 'sly/components/themes';
import { Icon, Input, Button } from 'sly/components/atoms';

const SearchBar = styled.div`
  display: flex;
  width: 100%;

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
  ${switchProp('layout', {
    header: css`
      width: ${size('header.searchBar.width')};`,
    homeHero: css`
      width: ${size('header.home.heroSearchBar.width')};`,
  })}
  }
`;
const SearchTextBox = styled(Input)`
  ${switchProp('layout', {
    header: css`
      height: 100%;
      border: none;`,
  })}

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    border: ${size('border.regular')} solid ${palette('grayscale', 2)};
  }
`;
const SearchButtonLargeLaptop = styled(Button)`
  ${switchProp('layout', {
    header: css`
      display: none;`,
    homeHero: css`
      height: ${size('element.large')};`,
  })}
  background-color: ${palette('secondary', 0)};
  margin-left: -${size('spacing.tiny')};
  > span {
    vertical-align: middle;
  }

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    display: block;
  }
`;
const SearchButton = styled(Button)`
  height: 100%;
  border: none;

  @media screen and (min-width: ${size('breakpoint.laptopSideColumn')}) {
    display: none;
  }
`;

const SearchBox = ({ layout }) => (
  <SearchBar layout={layout}>
    <SearchTextBox size="large" placeholder="Search by city or zip code" layout={layout} />
    <SearchButtonLargeLaptop layout={layout}>
      <Icon icon="search" size="regular" palette="white" />
    </SearchButtonLargeLaptop>
    {layout !== 'homeHero' &&
      <SearchButton transparent ghost>
        <Icon icon="search" size="regular" palette="secondary" />
      </SearchButton>
    }
  </SearchBar>
);

SearchBox.propTypes = {
  layout: oneOf(['header', 'homeHero']),
};

SearchBox.defaultProps = {
  layout: 'header',
};

export default SearchBox;
