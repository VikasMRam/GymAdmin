import React, { Component } from 'react';
import { string, func, object, bool } from 'prop-types';
import { connect } from 'react-redux';
import { geocodeByAddress } from 'react-places-autocomplete';
import { withRouter } from 'react-router-dom';

import { changeAddress, setLocation, clearLocation } from 'sly/store/actions';
import { searchBoxAddress, searchBoxLocation } from 'sly/store/selectors';
import {
  filterLinkPath,
  getSearchParamFromPlacesResponse,
} from 'sly/services/helpers/search';
import SearchBox from 'sly/components/molecules/SearchBox';
import SlyEvent from 'sly/services/helpers/events';
import {withRedirectTo} from "sly/services/redirectTo";

class SearchBoxContainer extends Component {
  static propTypes = {
    layout: string,
    address: string,
    defaultAddress: string,
    location: object,
    changeAddress: func,
    setLocation: func,
    clearLocation: func,
    clearLocationOnBlur: bool,
    onTextChange: func,
    onLocationSearch: func,
    redirectTo: func.isRequired,
    allowOnlySelectionFromSuggestions: bool,
  };

  static defaultProps = {
    clearLocationOnBlur: true,
  };

  componentDidMount() {
    const { changeAddress, defaultAddress } = this.props;
    if (defaultAddress) {
      changeAddress(defaultAddress);
    }
  }

  handleBlur = () => {
    const { addressSelected } = this;
    const { changeAddress, defaultAddress, address } = this.props;
    if (address && address !== addressSelected) {
      changeAddress(defaultAddress);
    }
  };

  handleChange = (address) => {
    const { changeAddress, onTextChange } = this.props;
    if (onTextChange) {
      onTextChange(address);
    }
    changeAddress(address);
  };

  handleSelect = (address) => {
    const { setLocation, address: value } = this.props;
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
        setLocation(result);
        this.handleOnLocationSearch(result);
      })
      .catch(error => console.error('Error', error));
  };

  handleSearch = () => {
    const { location, address } = this.props;
    if (address) {
      this.handleSelect(address);
    } else if (location) {
      this.handleOnLocationSearch(location);
    }
  };

  handleTextboxFocus = () => {
    const { clearLocation } = this.props;
    clearLocation();
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
    const { layout, address, clearLocationOnBlur, allowOnlySelectionFromSuggestions, onBlur, ...props } = this.props;

    return (
      <SearchBox
        layout={layout}
        value={address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onSearchButtonClick={this.handleSearch}
        onTextboxFocus={clearLocationOnBlur &&this.handleTextboxFocus}
        onBlur={allowOnlySelectionFromSuggestions ? this.handleBlur : onBlur}
        {...props}
      />
    );
  }
}

const mapStateToProps = (state, { address }) => ({
  address: searchBoxAddress(state),
  defaultAddress: address,
  location: searchBoxLocation(state),
});

const mapDispatchToProps = dispatch => ({
  changeAddress: value => dispatch(changeAddress(value)),
  setLocation: value => (dispatch(setLocation(value))),
  clearLocation: () => dispatch(clearLocation()),
});

export default withRedirectTo(withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBoxContainer)));
