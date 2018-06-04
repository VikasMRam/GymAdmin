import React, { Fragment } from 'react';
import { oneOf, string, func } from 'prop-types';
import styled, { css } from 'styled-components';
import { palette, key } from 'styled-theme';
import { switchProp, ifProp } from 'styled-tools';
import PlacesAutocomplete from 'react-places-autocomplete';

import { size, assetPath } from 'sly/components/themes';
import { Icon, Input, Button, Image } from 'sly/components/atoms';

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
  ${switchProp('layout', {
    header: css`
      width: ${size('header.SearchBox.width')};`,
    homeHero: css`
      width: ${size('header.home.heroSearchBox.width')};`,
  })}
  }
`;
const SearchInputButtonWrapper = styled.div`
  display: flex;
  height: 100%;
`;
const SearchTextBox = styled(Input)`
  ${switchProp('layout', {
    header: css`
      height: auto;
      border: none;
    `,
  })}

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
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

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: block;
  }
`;
const SearchButton = styled(Button)`
  height: 100%;
  border: none;
  margin-right: ${size('spacing.regular')};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    display: none;
  }
`;
const SearchSuggestionsWrapper = styled.div`
  z-index: ${key('zIndexes.searchSuggestions')};
  position: absolute;
  // position the autocomplete items to be the same width as the container
  top: calc(100% + ${size('spacing.regular')});
  left: 0;
  right: 0;
  background: ${palette('white', 0)};
  border: ${size('border.regular')} solid ${palette('grayscale', 2)};
  box-shadow: 0 ${size('spacing.small')} ${size('spacing.xLarge')}
    ${palette('grayscale', 2)};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    right: ${ifProp({ layout: 'header' }, size('spacing.xxxLarge'), 0)};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    right: 0;
  }
`;
const searchSuggestionBGColor = p => p.active ? palette('grayscale', 3) : palette('white', 0);
const SearchSuggestion = styled.div`
  width: 100%;
  padding: ${size('spacing.large')};
  background-color: ${searchSuggestionBGColor};

  :hover {
    background-color: ${palette('grayscale', 3)};
    cursor: pointer;
  }
`;

const GoogleLogo = styled(Image)`
  margin: ${size('spacing.regular')} ${size('spacing.large')};
  width: ${size('picture.tiny.width')};
  float: right;
`;
const baseSearchOptions = {types: ['(regions)']};
const SearchBox = ({
  layout, value, onChange, onSelect, onSeachButtonClick, onTextboxFocus,
}) => (
  <Wrapper layout={layout}>
    <PlacesAutocomplete value={value} onChange={onChange} onSelect={onSelect} searchOptions={baseSearchOptions} highlightFirstSuggestion>
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <Fragment>
          {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
          <SearchInputButtonWrapper>
            <SearchTextBox
              size="large"
              {...getInputProps({
                placeholder: 'Search by city or zip code',
              })}
              layout={layout}
              onFocus={onTextboxFocus}
            />
            <SearchButtonLargeLaptop layout={layout} onClick={onSeachButtonClick}>
              <Icon icon="search" size="regular" palette="white" />
            </SearchButtonLargeLaptop>
            {layout !== 'homeHero' && (
              <SearchButton transparent ghost onClick={onSeachButtonClick}>
                <Icon icon="search" size="regular" palette="secondary" />
              </SearchButton>
            )}
          </SearchInputButtonWrapper>
          {suggestions.length > 0 && (
            <SearchSuggestionsWrapper layout={layout}>
              {suggestions.map(suggestion => (
                <SearchSuggestion {...getSuggestionItemProps(suggestion)} active={suggestion.active}>
                  {suggestion.description}
                </SearchSuggestion>
              ))}
              <GoogleLogo src={assetPath('images/powered_by_google.png')} />
            </SearchSuggestionsWrapper>
          )}
        </Fragment>
      )}
    </PlacesAutocomplete>
  </Wrapper>
);

SearchBox.propTypes = {
  layout: oneOf(['header', 'homeHero']),
  value: string.isRequired,
  onChange: func.isRequired,
  onSelect: func.isRequired,
  onSeachButtonClick: func.isRequired,
  onTextboxFocus: func,
};

SearchBox.defaultProps = {
  layout: 'header',
};

export default SearchBox;
