import React from 'react';
import { oneOf, string, func } from 'prop-types';
import styled, { css } from 'styled-components';
import { palette } from 'styled-theme';
import { switchProp } from 'styled-tools';
import PlacesAutocomplete from 'react-places-autocomplete';

import { size, assetPath } from 'sly/components/themes';
import { Icon, Input, Button, Image } from 'sly/components/atoms';

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  position: relative;

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
      border: none;
    `,
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

const SearchSuggestionsWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const SearchSuggestions = styled.div`
  width: 300px;
  z-index: 101;
  position: absolute;
  top: ${size('header.menu.position.top.laptopLarge')};
  left: 0;
  background: white;
  border: ${size('border.regular')} solid ${palette('grayscale', 2)};
  box-shadow: 0 ${size('spacing.small')} ${size('spacing.xLarge')}
    ${palette('grayscale', 2)};
`;

const SearchSuggestion = styled.div`
  width: 100%;
  padding: ${size('spacing.large')} ${size('spacing.regular')};

  :hover {
    background-color: ${palette('grayscale', 3)};
  }
`;

const GoogleLogo = styled(Image)`
  width: 50%;
  height: 50%;
  float: right;
`;
const baseSearchOptions = {types: ['(regions)']};
const SearchBox = ({
  layout, value, onChange, onSelect, onSeachButtonClick,
}) => (
  <SearchBar layout={layout}>
    <PlacesAutocomplete value={value} onChange={onChange} onSelect={onSelect} searchOptions={baseSearchOptions}>
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <SearchSuggestionsWrapper>
          <SearchTextBox
            size="large"
            {...getInputProps({
              placeholder: 'Search by city or zip code',
            })}
            layout={layout}
          />
          {suggestions.length > 0 && (
            <SearchSuggestions>
              {suggestions.map(suggestion => (
                <SearchSuggestion {...getSuggestionItemProps(suggestion)}>
                  <span>{suggestion.description}</span>
                </SearchSuggestion>
              ))}
              <GoogleLogo src={assetPath('powered_by_google.png')} />
            </SearchSuggestions>
          )}
        </SearchSuggestionsWrapper>
      )}
    </PlacesAutocomplete>
    <SearchButtonLargeLaptop layout={layout} onClick={onSeachButtonClick}>
      <Icon icon="search" size="regular" palette="white" />
    </SearchButtonLargeLaptop>
    {layout !== 'homeHero' && (
      <SearchButton transparent ghost onClick={onSeachButtonClick}>
        <Icon icon="search" size="regular" palette="secondary" />
      </SearchButton>
    )}
  </SearchBar>
);

SearchBox.propTypes = {
  layout: oneOf(['header', 'homeHero']),
  value: string.isRequired,
  onChange: func.isRequired,
  onSelect: func.isRequired,
  onSeachButtonClick: func.isRequired,
};

SearchBox.defaultProps = {
  layout: 'header',
};

export default SearchBox;
