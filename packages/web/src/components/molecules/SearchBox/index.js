import React from 'react';
import { oneOf, string, func, bool } from 'prop-types';
import styled from 'styled-components';
import PlacesAutocomplete from 'react-places-autocomplete';

import { size, palette, key } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import { Icon, Block } from 'sly/common/components/atoms';
import { Input, Image } from 'sly/web/components/atoms';
import LoadGoogleMaps from 'sly/web/services/search/LoadGoogleMaps';

const SearchSuggestionsWrapper = styled(Block)`
  z-index: ${key('zIndexes.searchSuggestions')};
  left: 0;
  right: 0;
`;

const SearchSuggestion = styled(Block)`
  :hover {
    background-color: ${palette('primary', 'stroke')};
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
              <Input
                {...getInputProps({ onBlur, placeholder })}
                disabled={false}
                onFocus={(e) => { loadMaps(); onTextboxFocus && onTextboxFocus(e); }}
                onBlur={onTextboxBlur}
                readOnly={readOnly}
                type="search"
                size={layout === 'homeHero' ? 'large' : undefined}
              />
              {(isTextboxInFocus && (onCurrentLocationClick || suggestions.length > 0)) && (
                <SearchSuggestionsWrapper
                  background="white"
                  position="absolute"
                  border="regular"
                  borderPalette="slate"
                  borderVariation="stroke"
                  shadowBlur="regular"
                >
                  {/* user mouseDown instead of onClick as the onClick which is triggered after mouse button is release will trigger blur of textbox
                      that will by the time hide the suggestions dropdown
                  */}
                  {onCurrentLocationClick &&
                    <SearchSuggestion
                      onMouseDown={onCurrentLocationClick}
                      cursor="pointer"
                      width="100%"
                      padding="large"
                    >
                      <Icon icon="map" marginRight="regular" palette="grey" /> Current Location
                    </SearchSuggestion>}
                  {suggestions.map(suggestion => (
                    <SearchSuggestion
                      {...getSuggestionItemProps(suggestion)}
                      key={suggestion.description}
                      cursor="pointer"
                      background={suggestion.active ? 'grey.stroke' : 'white'}
                      palette="primary"
                      width="100%"
                      padding="large"
                    >
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
