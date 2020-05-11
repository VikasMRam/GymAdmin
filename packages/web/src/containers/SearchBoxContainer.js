import React, { Component } from 'react';
import { string, func, bool, shape } from 'prop-types';
import { geocodeByAddress } from 'react-places-autocomplete';

import {
  filterLinkPath,
  getSearchParamFromPlacesResponse,
} from 'sly/services/helpers/search';
import { LOCATION_CURRENT_LATITUDE, LOCATION_CURRENT_LONGITUDE } from 'sly/constants/location';
import SlyEvent from 'sly/services/helpers/events';
import { query } from 'sly/services/api';
import { withRedirectTo } from 'sly/services/redirectTo';
import { normJsonApi } from 'sly/services/helpers/jsonApi';
import SearchBox from 'sly/components/molecules/SearchBox';

@withRedirectTo
@query('getAddresses', 'getAddresses')

export default class SearchBoxContainer extends Component {
  static propTypes = {
    layout: string,
    address: string,
    locationInfo: shape({
      geo: shape({
        latitude: string.isRequired,
        longitude: string.isRequired,
      }),
    }),
    clearLocationOnBlur: bool,
    onTextChange: func,
    onLocationSearch: func,
    redirectTo: func.isRequired,
    getAddresses: func.isRequired,
    onCurrentLocation: func,
  };

  static defaultProps = {
    clearLocationOnBlur: true,
  };

  state = {
    address: '',
    location: null,
    isTextboxInFocus: false,
  };

  constructor(props) {
    super(props);
    if (this.props.address && this.props.address !== '') {
      const { address } = this.props;
      this.state.address = address;
    }
    if (this.props.locationInfo) {
      const { locationInfo } = this.props;
      this.state.location = locationInfo;
    }
  }

  handleChange = (address) => {
    const { onTextChange } = this.props;
    if (onTextChange) {
      onTextChange(address);
    }
    this.setState({ address });
  };

  handleSelect = (address) => {
    const { address: value } = this.state;
    this.addressSelected = address;
    geocodeByAddress(address)
      .then(results => results[0])
      .then((result) => {
        SlyEvent.getInstance().sendEvent({
          action: 'select', category: 'googleSearchOption', label: result.formatted_address, value,
        });
        // TODO: Fix events server to store value in DB
        SlyEvent.getInstance().sendEvent({
          action: 'googleSearchTyped', category: result.formatted_address, label: value,
        });
        const geo = {
          latitude: result.geometry.location.lat(),
          longitude: result.geometry.location.lng(),
        };
        result.geo = geo;
        const [city, state] = result.formatted_address.split(',');
        result.city = city;
        result.state = state;
        this.setState({ location: result, address: result.formatted_address });
        this.handleOnLocationSearch(result);
      })
      .catch(error => console.error('Error', error));
  };

  handleSearch = () => {
    const { locationInfo, address } = this.state;
    if (address) {
      this.handleSelect(address);
    } else if (locationInfo) {
      this.handleOnLocationSearch(locationInfo);
    }
  };

  handleTextboxFocus = () => {
    const { clearLocationOnBlur } = this.props;
    const newState = {
      isTextboxInFocus: true,
    };
    if (clearLocationOnBlur) {
      newState.locationInfo = null;
    }

    this.setState(newState);
  };

  handleTextboxBlur = () => {
    this.setState({
      isTextboxInFocus: false,
    });
  };

  handleOnLocationSearch = (result) => {
    const { onLocationSearch, redirectTo } = this.props;
    if (onLocationSearch) {
      onLocationSearch(result);
    } else {
      const searchParams = getSearchParamFromPlacesResponse(result);
      const { path } = filterLinkPath(searchParams);
      redirectTo(path);
    }
  };

  handleCurrentLocationClick = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'select', category: 'googleSearchOption', label: 'currentLocation',
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
            action: 'revoke-permission', category: 'googleSearchOption', label: 'currentLocation',
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
        action: 'no-support', category: 'googleSearchOption', label: 'currentLocation',
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

  render() {
    const { layout, onCurrentLocation, ...props } = this.props;
    const { address, isTextboxInFocus } = this.state;

    return (
      <SearchBox
        layout={layout}
        value={address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onSearchButtonClick={this.handleSearch}
        onTextboxFocus={this.handleTextboxFocus}
        onTextboxBlur={this.handleTextboxBlur}
        isTextboxInFocus={isTextboxInFocus}
        onCurrentLocationClick={onCurrentLocation ? this.handleCurrentLocationClick : null}
        {...props}
      />
    );
  }
}
