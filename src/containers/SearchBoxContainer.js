import React, { Component } from 'react';
import { connect } from 'react-redux';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import { changeAddress } from 'sly/store/actions';
import { searchBoxAddress } from 'sly/store/selectors';

import SearchBox from 'sly/components/molecules/SearchBox';

class SearchBoxContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    const scriptjs = require('scriptjs');
    scriptjs(
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDnadc7V6jUuE9bs6Fw3SLAbzFbkBkqFP0&libraries=places',
      () => {
        this.setState({
          isMounted: true,
        });
      }
    );
  }

  handleChange = (address) => {
    const { changeAddress } = this.props;
    changeAddress(address);
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
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
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    address: searchBoxAddress(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAddress: value => dispatch(changeAddress(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBoxContainer);
