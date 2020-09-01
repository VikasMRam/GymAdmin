import React from 'react';
import { oneOf, string, func, bool } from 'prop-types';
import styled, { css } from 'styled-components';
import { switchProp, ifProp } from 'styled-tools';
import PlacesAutocomplete from 'react-places-autocomplete';

import { size, palette, key } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import { Icon, Block } from 'sly/common/components/atoms';
import { Input, Image } from 'sly/web/components/atoms';
import LoadGoogleMaps from 'sly/web/services/search/LoadGoogleMaps';

const SearchTextBox = styled(Input)`
  background-color: ${palette('white', 'base')}!important;
  border: ${size('border.regular')} solid ${palette('slate', 'stroke')};
  border-radius: ${size('spacing.small')};
  ${switchProp('layout', {
    header: 'height: auto;',
    homeHero: css`
      height: ${size('element.large')};`,
  })};
`;
const SearchSuggestionsWrapper = styled(Block)`
  z-index: ${key('zIndexes.searchSuggestions')};
  // position the autocomplete items to be the same width as the container
  top: calc(100% - (2 * ${size('spacing.regular')}));
  left: 0;
  right: 0;
  box-shadow: 0 ${size('spacing.small')} ${size('spacing.xLarge')} ${palette('slate', 'stroke')};
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    right: ${ifProp({ layout: 'header' }, size('spacing.xxxLarge'), 0)};
  }
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    right: 0;
  }
`;
const searchSuggestionBGColor = p => (p.active ? palette('grey', 'stroke') : palette('white', 'base'));
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
  layout,
  value,
  onChange,
  onSelect,
  onSearchButtonClick,
  onTextboxFocus,
  onTextboxBlur,
  isTextboxInFocus,
  onLocationSearch,
  onCurrentLocationClick,
  onBlur,
  placeholder,
  readOnly,
  ...props
}) => (
  <Block position="relative" {...props}>
    <LoadGoogleMaps>
      {(googleCallbackName, loadMaps) => (
        <PlacesAutocomplete
          value={value}
          onChange={(e) => { loadMaps(); onChange(e); }}
          onSelect={onSelect}
          searchOptions={baseSearchOptions}
          highlightFirstSuggestion
          googleCallbackName={googleCallbackName}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <>
              <SearchTextBox
                {...getInputProps({ onBlur, placeholder })}
                disabled={false}
                layout={layout}
                onFocus={(e) => { loadMaps(); onTextboxFocus && onTextboxFocus(e); }}
                onBlur={onTextboxBlur}
                readOnly={readOnly}
                type="search"
                size="large"
              />
              {(isTextboxInFocus && (onCurrentLocationClick || suggestions.length > 0)) && (
                <SearchSuggestionsWrapper
                  background="white"
                  position="absolute"
                  border="regular"
                  borderPalette="slate"
                  borderVariation="stroke"
                  layout={layout}
                >
                  {/* user mouseDown instead of onClick as the onClick which is triggered after mouse button is release will trigger blur of textbox
                      that will by the time hide the suggestions dropdown
                  */}
                  {onCurrentLocationClick &&
                    <SearchSuggestion onMouseDown={onCurrentLocationClick}><Icon icon="map" marginRight="regular" /> Current Location</SearchSuggestion>}
                  {suggestions.map(suggestion => (
                    <SearchSuggestion {...getSuggestionItemProps(suggestion)} active={suggestion.active}>
                      {suggestion.description}
                    </SearchSuggestion>
                  ))}
                  <GoogleLogo src={assetPath('images/powered_by_google.png')} />
                </SearchSuggestionsWrapper>
              )}
            </>
          )}
        </PlacesAutocomplete>
      )}
    </LoadGoogleMaps>
  </Block>
);

SearchBox.propTypes = {
  layout: oneOf(['header', 'homeHero']),
  value: string.isRequired,
  onChange: func.isRequired,
  onSelect: func.isRequired,
  onSearchButtonClick: func.isRequired,
  onLocationSearch: func,
  onTextboxFocus: func,
  onTextboxBlur: func,
  isTextboxInFocus: bool,
  onCurrentLocationClick: func,
  onBlur: func,
  placeholder: string,
  readOnly: bool,
};

SearchBox.defaultProps = {
  layout: 'header',
  placeholder: 'Search by city or ZIP code',
  value: '',
};

export default SearchBox;
