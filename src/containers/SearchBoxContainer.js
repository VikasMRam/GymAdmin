import React, { Component } from 'react';
import { string, func, object, bool } from 'prop-types';
import { geocodeByAddress } from 'react-places-autocomplete';

import { gMapsApiKey, loadAutoComplete } from 'sly/config';
import {
  filterLinkPath,
  getSearchParamFromPlacesResponse,
} from 'sly/services/helpers/search';
import SearchBox from 'sly/components/molecules/SearchBox';
import SlyEvent from 'sly/services/helpers/events';
import { withRedirectTo } from 'sly/services/redirectTo';

class SearchBoxContainer extends Component {
  static propTypes = {
    layout: string,
    address: string,
    location: object,

    clearLocationOnBlur: bool,
    onTextChange: func,
    onLocationSearch: func,
    redirectTo: func.isRequired,
  };

  static defaultProps = {
    clearLocationOnBlur: true,
  };

  constructor(props) {
    super(props);
    const { address } = props;
    this.state = {
      isMounted: false,
      address: address || '',
      location: null,
    };
  }

  componentDidMount() {
    const scriptjs = require('scriptjs');
    if (loadAutoComplete) {
      scriptjs(
        `https://maps.googleapis.com/maps/api/js?key=${gMapsApiKey}&v=3.exp&libraries=geometry,drawing,places`,
        () => {
          this.setState({
            isMounted: true,
          });
        }
      );
    }
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false,
    });
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
        this.setState({ location: result });
        this.handleOnLocationSearch(result);
      })
      .catch(error => console.error('Error', error));
  };

  handleSearch = () => {
    const { location, address } = this.state;
    if (address) {
      this.handleSelect(address);
    } else if (location) {
      this.handleOnLocationSearch(location);
    }
  };

  handleTextboxFocus = () => {
    this.setState({ location: null });
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

  render() {
    const {
      layout, clearLocationOnBlur, ...props
    } = this.props;
    const { isMounted, address } = this.state;
    if (!isMounted) {
      return <div />;
    }

    if (clearLocationOnBlur) {
      return (
        <SearchBox
          layout={layout}
          value={address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          onSearchButtonClick={this.handleSearch}
          onTextboxFocus={this.handleTextboxFocus}
          {...props}
        />
      );
    }
    return (
      <SearchBox
        layout={layout}
        value={address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onSearchButtonClick={this.handleSearch}
        {...props}
      />
    );
  }
}

export default withRedirectTo(SearchBoxContainer);
