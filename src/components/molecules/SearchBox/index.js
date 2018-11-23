import React, { Fragment } from 'react';
import { oneOf, string, func } from 'prop-types';
import styled, { css } from 'styled-components';

import { switchProp, ifProp } from 'styled-tools';
import PlacesAutocomplete from 'react-places-autocomplete';

import { size, assetPath, palette, key } from 'sly/components/themes';
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
  height: ${size('element.large')};
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.tiny')} 0 0 ${size('spacing.tiny')};

${switchProp('layout', {
    header: css`
      height: auto;
      border: none;
      border-right: 0;
    `,
    homeHero: css`
      border-right: 0;
    `,
  })}

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    height: ${size('element.large')};
    border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
    border-radius: ${size('spacing.tiny')} 0 0 ${size('spacing.tiny')};

${switchProp('layout', {
    header: css`
      border-right: 0;
    `,
    homeHero: css`
      border-right: 0;
    `,
  })}
  }
`;

const SearchButton = styled(Button)`
  height: ${size('element.large')};
  border: none;
  flex-shrink: 0;
  width: ${size('element.xxLarge')};
  border-radius: 0 ${size('spacing.tiny')} ${size('spacing.tiny')} 0;

${switchProp('layout', {
    header: css`
      margin-right: ${size('spacing.regular')};
      width: ${size('element.large')};
      height: auto;
      background: none;
      > span {
        color: ${palette('primary', 0)};
      }
`,
  })};

  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    margin-right: 0px;
    background-color: ${palette('primary', 0)};
    width: ${size('element.xxLarge')};
    > span {
      color: ${palette('white', 0)};
      vertical-align: middle;
    }
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
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  box-shadow: 0 ${size('spacing.small')} ${size('spacing.xLarge')}
    ${palette('slate', 'stroke')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    right: ${ifProp({ layout: 'header' }, size('spacing.xxxLarge'), 0)};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    right: 0;
  }
`;
const searchSuggestionBGColor = p => p.active ? palette('slate', 'background') : palette('white', 0);
const SearchSuggestion = styled.div`
  width: 100%;
  padding: ${size('spacing.large')};
  background-color: ${searchSuggestionBGColor};

  :hover {
    background-color: ${palette('slate', 'background')};
    cursor: pointer;
  }
`;

const GoogleLogo = styled(Image)`
  margin: ${size('spacing.regular')} ${size('spacing.large')};
  width: ${size('picture.tiny.width')};
  float: right;
`;
const baseSearchOptions = { types: ['(regions)'] };
const SearchBox = ({
  layout, value, onChange, onSelect, onSeachButtonClick, onTextboxFocus, placeholder, ...props
}) => (
  <Wrapper layout={layout} {...props}>
    <PlacesAutocomplete value={value} onChange={onChange} onSelect={onSelect} searchOptions={baseSearchOptions} highlightFirstSuggestion>
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <Fragment>
          {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
          <SearchInputButtonWrapper>
            <SearchTextBox
              size="large"
              {...getInputProps({ placeholder })}
              layout={layout}
              onFocus={onTextboxFocus}
            />
            {layout !== 'boxWithoutButton' &&
              <SearchButton layout={layout} onClick={onSeachButtonClick}>
                <Icon icon="search" size="regular" palette="white" />
              </SearchButton>
            }
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
  layout: oneOf(['header', 'homeHero', 'boxWithoutButton']),
  value: string.isRequired,
  onChange: func.isRequired,
  onSelect: func.isRequired,
  onSeachButtonClick: func.isRequired,
  onTextboxFocus: func,
  placeholder: string,
};

SearchBox.defaultProps = {
  layout: 'header',
  placeholder: 'Search by city or zip code',
};

export default SearchBox;
