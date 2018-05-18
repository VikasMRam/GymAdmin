import React, { Component } from 'react';
import { string, func, object } from 'prop-types';
import { connect } from 'react-redux';
import { geocodeByAddress } from 'react-places-autocomplete';

import { gMapsApiKey } from 'sly/config';
import { changeAddress, setLocation, clearLocation } from 'sly/store/actions';
import { searchBoxAddress, searchBoxLocation } from 'sly/store/selectors';

import SearchBox from 'sly/components/molecules/SearchBox';

class SearchBoxContainer extends Component {
  static propTypes = {
    layout: string.isRequired,
    address: string,
    location: object,
    changeAddress: func,
    setLocation: func,
    onLocationSearch: func,
    clearLocation: func,
  };

  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    const scriptjs = require('scriptjs');
    scriptjs(
      `https://maps.googleapis.com/maps/api/js?key=${gMapsApiKey}&v=3.exp&libraries=geometry,drawing,places`,
      () => {
        this.setState({
          isMounted: true,
        });
      }
    );
  }
  componentWillUnmount() {
    this.setState({
      isMounted: false,
    });
  }

  handleChange = (address) => {
    const { changeAddress } = this.props;
    changeAddress(address);
  };

  handleSelect = (address) => {
    const { setLocation, onLocationSearch } = this.props;
    geocodeByAddress(address)
      .then(results => results[0])
      .then((result) => {
        setLocation(result);
        onLocationSearch(result);
      })
      .catch(error => console.error('Error', error));
  }

  handleSearch = () => {
    const { location, onLocationSearch } = this.props;
    if (location) {
      onLocationSearch(location);
    }
  };

  handleTextboxFocus = () => {
    const { clearLocation } = this.props;
    clearLocation();
  };

  render() {
    const { layout, address } = this.props;
    const { isMounted } = this.state;
    if (!isMounted) {
      return <div>Loading...</div>;
    }
    return (
      <SearchBox
        layout={layout}
        value={address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onSeachButtonClick={this.handleSearch}
        onTextboxFocus={this.handleTextboxFocus}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    address: searchBoxAddress(state),
    location: searchBoxLocation(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAddress: value => dispatch(changeAddress(value)),
    setLocation: value => (dispatch(setLocation(value))),
    clearLocation: () => dispatch(clearLocation()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBoxContainer);
