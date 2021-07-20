import React, { Component } from 'react';
import { string, func, shape } from 'prop-types';
import debounce from 'lodash/debounce';

import { LOCATION_CURRENT_LATITUDE, LOCATION_CURRENT_LONGITUDE } from 'sly/web/constants/location';
import SlyEvent from 'sly/web/services/helpers/events';
import { query } from 'sly/web/services/api';
import {
  filterLinkPath,
  getSearchParamFromPlacesResponse,
  tocs,
} from 'sly/web/components/search/helpers';
import { maps } from 'sly/web/components/search/maps';
import { withRedirectTo } from 'sly/common/services/redirectTo';
import { normJsonApi } from 'sly/web/services/helpers/jsonApi';
import SearchBox from 'sly/web/components/molecules/SearchBox';

@withRedirectTo
@query('getAddresses', 'getAddresses')
@query('getSearch', 'getSearch')

export default class SearchBoxContainer extends Component {
  static propTypes = {
    address: string,
    locationInfo: shape({
      geo: shape({
        latitude: string.isRequired,
        longitude: string.isRequired,
      }),
    }),
    onTextChange: func,
    onLocationSearch: func,
    redirectTo: func.isRequired,
    getAddresses: func.isRequired,
    getSearch: func.isRequired,
    onCurrentLocation: func,
    include: string.isRequired,
    toc: string,
  };

  static defaultProps = {
    include: 'city,zip',
  };

  state = {
    textValue: '',
    isTextboxInFocus: false,
    suggestions: [],
    selectedSuggestion: undefined,
  };

  handleTextboxBlur = () => {
    this.setState({
      isTextboxInFocus: false,
    });
  };

  handleSelect = (suggestion) => {
    const { onLocationSearch, redirectTo, toc } = this.props;
    const { textValue } = this.state;
    const { name, resourceType } = suggestion;

    SlyEvent.getInstance().sendEvent({
      action: 'select', category: 'searchOption', label: resourceType, value: name,
    });

    this.handleTextboxBlur();
    this.setState({
      selectedSuggestion: suggestion,
    });

    if (suggestion.resourceType === 'GoogleCity') {
      maps.getGeocode({
        placeId: suggestion.place_id,
      })
        .then((responses = []) => {
          const searchParams = getSearchParamFromPlacesResponse(responses[0], toc);
          const { path } = filterLinkPath(searchParams);
          suggestion.url = path;
          suggestion.searchParams = searchParams;
          if (onLocationSearch) {
            onLocationSearch(suggestion);
          } else {
            redirectTo(path);
          }
        })
        .catch(e => console.error(e));
    } else if (onLocationSearch) {
      onLocationSearch(suggestion);
    } else if (suggestion.action === 'redirect') {
      redirectTo(suggestion.url);
    }
  };

  handleTextboxFocus = (e) => {
    let { suggestions, selectedSuggestion } = this.state;
    e.target.value = '';
    suggestions = [];
    selectedSuggestion = undefined;
    this.setState({
      isTextboxInFocus: true,
      textValue: '',
      suggestions,
      selectedSuggestion,
    });
  };

  handleTextboxChange = (e) => {
    let { suggestions, selectedSuggestion } = this.state;
    const { onTextChange } = this.props;

    if (!e.target.value) {
      suggestions = [];
      selectedSuggestion = undefined;
    }
    if (onTextChange) {
      onTextChange(e.target.value);
    }

    this.setState({
      textValue: e.target.value,
      suggestions,
      selectedSuggestion,
    });
  };

  handleCurrentLocationClick = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'select', category: 'searchOption', label: 'currentLocation',
    });

    if (navigator.geolocation) {
      const savedLatitude = localStorage.getItem(LOCATION_CURRENT_LATITUDE);
      const savedLongitude = localStorage.getItem(LOCATION_CURRENT_LONGITUDE);

      navigator.geolocation.watchPosition(({ coords }) => {
        localStorage.setItem(LOCATION_CURRENT_LATITUDE, coords.latitude);
        localStorage.setItem(LOCATION_CURRENT_LONGITUDE, coords.longitude);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          SlyEvent.getInstance().sendEvent({
            action: 'revoke-permission', category: 'searchOption', label: 'currentLocation',
          });
          localStorage.removeItem(LOCATION_CURRENT_LATITUDE);
          localStorage.removeItem(LOCATION_CURRENT_LONGITUDE);
          alert('There is no location support on this device or it is disabled. Please check your settings.');
        }
      });

      if (savedLatitude && savedLongitude) {
        this.searchForLatLong({
          coords: {
            latitude: savedLatitude,
            longitude: savedLongitude,
          },
        });
      } else {
        navigator.geolocation.getCurrentPosition(this.searchForLatLong);
      }
    } else {
      SlyEvent.getInstance().sendEvent({
        action: 'no-support', category: 'searchOption', label: 'currentLocation',
      });
      alert('There is no location support on this device or it is disabled. Please check your settings.');
    }
  };

  searchForLatLong = ({ coords }) => {
    const { getAddresses, onCurrentLocation } = this.props;

    if (coords.latitude && coords.longitude) {
      const query = {
        'filter[geo]': `${coords.latitude},${coords.longitude}`,
      };
      getAddresses(query)
        .then((resp) => {
          const addresses = normJsonApi(resp);
          if (onCurrentLocation) {
            onCurrentLocation(addresses, coords);
          }
        });
    }
  };

  getAutocomplete = (query) => {
    const { getSearch } = this.props;

    if (query) {
      return getSearch(query)
        .then((resp) => {
          const matches = normJsonApi(resp);
          const { suggestions } = this.state;

          this.setState({
            suggestions: [...suggestions, ...matches],
          });
        });
    }

    return Promise.resolve();
  };

  handleKeyDown = (e) => {
    if (!e || !e.target) {
      return null;
    }

    if (!e.target.value) {
      return this.setState({
        suggestions: [],
      });
    }

    const { include } = this.props;
    let query;

    if (include !== this.constructor.defaultProps.include) {
      query = {
        'filter[query]': e.target.value,
        include,
      };
    }

    return Promise.all([
      maps.getPlacePredictions(e.target.value)
        .then((results) => {
          const googleSuggestions = results.map(s => ({
            ...s,
            id: s.place_id,
            name: s.description,
            displayText: s.description,
            resourceType: 'GoogleCity',
            action: 'redirect',
          }));
          const { suggestions } = this.state;

          this.setState({
            suggestions: [...googleSuggestions, ...suggestions],
          });
        })
        .catch(e => console.error(e)),
      this.getAutocomplete(query),
    ]);
  };

  handleKeyDownThrottled = (e) => {
    e.persist();

    if (e.key === 'Enter') {
      this.handleSearchButtonClick();
    } else {
      if (!this.throttledhandleKeyDownFn) {
        this.throttledhandleKeyDownFn = debounce(this.handleKeyDown, 500);
      }

      this.throttledhandleKeyDownFn(e);
    }
  };

  getCurrentValue = () => {
    const { selectedSuggestion } = this.state;

    if (selectedSuggestion) {
      return selectedSuggestion.resourceType === 'City' ?
        selectedSuggestion.displayText : selectedSuggestion.name;
    }

    return selectedSuggestion;
  };

  handleSearchButtonClick = () => {
    const { selectedSuggestion, suggestions } = this.state;
    const suggestion = selectedSuggestion || suggestions[0];

    if (suggestion) {
      this.handleSelect(suggestion);
    }
  };

  render() {
    const { onCurrentLocation, address, onTextChange, ...props } = this.props;
    const { isTextboxInFocus, suggestions } = this.state;

    if (this.getCurrentValue()) {
      props.value = this.getCurrentValue();
    }

    return (
      <SearchBox
        suggestions={suggestions}
        defaultValue={address}
        onSelect={this.handleSelect}
        onFocus={this.handleTextboxFocus}
        onBlur={this.handleTextboxBlur}
        onKeyDown={this.handleKeyDownThrottled}
        onChange={this.handleTextboxChange}
        isTextboxInFocus={isTextboxInFocus}
        onCurrentLocationClick={onCurrentLocation ? this.handleCurrentLocationClick : null}
        onSearchButtonClick={this.handleSearchButtonClick}
        {...props}
      />
    );
  }
}
