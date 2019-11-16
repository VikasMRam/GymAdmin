import React, { Component } from 'react';
import { func, string } from 'prop-types';

import SearchBoxContainer from 'sly/containers/SearchBoxContainer';

class LocationSearch extends Component {
  static propTypes={
    onChange: func,
    address: string,
  }

  handleLocationChange = (value) => {
    const { onChange } = this.props;
    if (onChange && value) {
      onChange(value);
    }
  };

  handleLocationTextChange = (value) => {
    const { onChange } = this.props;
    if (onChange && value === '') {
      onChange(null);
    }
  }

  render() {
    const { address } = this.props;
    return (
      <SearchBoxContainer
        clearLocationOnBlur={false}
        onLocationSearch={this.handleLocationChange}
        onTextChange={this.handleLocationTextChange}
        address={address}
      />
    );
  }
}

export default LocationSearch;
