import React, { Fragment } from 'react';
import { oneOf, string, func, bool } from 'prop-types';
import styled, { css } from 'styled-components';
import { switchProp, ifProp } from 'styled-tools';
import PlacesAutocomplete from 'react-places-autocomplete';

import shadow from 'sly/components/helpers/shadow';
import { size, assetPath, palette, key } from 'sly/components/themes';
import { Input, Image } from 'sly/components/atoms';

const Wrapper = styled.div`
  position: relative;
`;
const searchTextBoxStyles = css`
  background-color: ${palette('white', 'base')}!important;
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('border.xxLarge')};
  ${switchProp('layout', {
    header: css`
      height: auto;
    `,
    homeHero: css`
      height: ${size('element.large')};`,
  })}
`;
const ShadowedSearchTextBox = shadow(styled(Input)`
  ${searchTextBoxStyles}
`);
ShadowedSearchTextBox.displayName = 'ShadowedSearchTextBox';
const SearchTextBox = styled(Input)`
  ${searchTextBoxStyles}
`;
const SearchSuggestionsWrapper = styled.div`
  z-index: ${key('zIndexes.searchSuggestions')};
  position: absolute;
  // position the autocomplete items to be the same width as the container
  top: calc(100% + ${size('spacing.regular')});
  left: 0;
  right: 0;
  background: ${palette('white', 'base')};
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
const searchSuggestionBGColor = p => p.active ? palette('grey', 'stroke') : palette('white', 'base');
const SearchSuggestion = styled.div`
  width: 100%;
  padding: ${size('spacing.large')};
  background-color: ${searchSuggestionBGColor};

  :hover {
    background-color: ${palette('grey', 'stroke')};
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
  layout, value, onChange, onSelect, onSearchButtonClick, onTextboxFocus,
  placeholder, readOnly, hasShadow, ...props
}) => (
  <Wrapper layout={layout} {...props}>
    <PlacesAutocomplete value={value} onChange={onChange} onSelect={onSelect} searchOptions={baseSearchOptions} highlightFirstSuggestion>
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <Fragment>
          {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
          {hasShadow &&
            <ShadowedSearchTextBox
              {...getInputProps({ placeholder })}
              layout={layout}
              onFocus={onTextboxFocus}
              readOnly={readOnly}
              type="search"
              size="large"
            />
          }
          {!hasShadow &&
            <SearchTextBox
              {...getInputProps({ placeholder })}
              layout={layout}
              onFocus={onTextboxFocus}
              readOnly={readOnly}
              type="search"
              size="large"
            />
          }
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
  onSearchButtonClick: func.isRequired,
  onTextboxFocus: func,
  placeholder: string,
  readOnly: bool,
  hasShadow: bool,
};

SearchBox.defaultProps = {
  layout: 'header',
  placeholder: 'Search by city or ZIP code',
  value: '',
};

export default SearchBox;
