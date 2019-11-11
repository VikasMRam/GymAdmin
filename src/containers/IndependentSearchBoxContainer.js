import React, { Component } from 'react';
import { string, func, object, bool } from 'prop-types';
import { geocodeByAddress } from 'react-places-autocomplete';

import { gMapsApiKey, loadAutoComplete } from 'sly/config';
import SearchBox from 'sly/components/molecules/SearchBox';
import SlyEvent from 'sly/services/helpers/events';
import { connectController } from 'sly/controllers';

// TODO: Copied from SearchBoxContainer, but having independent state.
class IndependentSearchBoxContainer extends Component {
  static propTypes = {
    layout: string,
    address: string,
    defaultAddress: string,
    location: object,
    set: func,
    resetController: func,
    clearLocationOnBlur: bool,
    onTextChange: func,
    onLocationSearch: func,
    allowOnlySelectionFromSuggestions: bool,
  };

  static defaultProps = {
    clearLocationOnBlur: true,
  };

  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    const { set, defaultAddress } = this.props;
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

      if (defaultAddress) {
        set({ defaultAddress });
      }
    }
  }

  componentWillUnmount() {
    const { resetController } = this.props;
    this.setState({
      isMounted: false,
    });
    resetController();
  }

  handleBlur = () => {
    const { addressSelected } = this;
    const { set, defaultAddress, address } = this.props;
    if (address && address !== addressSelected) {
      set({ defaultAddress });
    }
  };

  handleChange = (address) => {
    const { onTextChange, set } = this.props;
    if (onTextChange) {
      onTextChange(address);
    }
    set({ address });
  };

  handleSelect = (address) => {
    const { set, address: value } = this.props;
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
        set({ location: result });
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
    const { set } = this.props;
    set({ location: null });
  };

  handleOnLocationSearch = (result) => {
    const { onLocationSearch } = this.props;
    if (onLocationSearch) {
      onLocationSearch(result);
    }
  };

  render() {
    const { handleBlur } = this;
    const {
      layout, address, clearLocationOnBlur, allowOnlySelectionFromSuggestions, ...props
    } = this.props;
    const { isMounted } = this.state;
    if (!isMounted) {
      return <div />;
    }
    if (allowOnlySelectionFromSuggestions) {
      props.onBlur = handleBlur;
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

const mapStateToProps = (state, { controller = {}, address }) => ({
  address: controller.address || '',
  location: controller.location || null,
  defaultAddress: address,
});


export default connectController(mapStateToProps, null)(IndependentSearchBoxContainer);
