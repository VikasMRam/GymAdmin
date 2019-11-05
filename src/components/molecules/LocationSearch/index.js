import React, { Component } from 'react';
import { func } from 'prop-types';

import SearchBoxContainer from 'sly/containers/SearchBoxContainer';

class LocationSearch extends Component {
  static propTypes={
    onChange: func,
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
    return (
      <SearchBoxContainer
        allowOnlySelectionFromSuggestions
        clearLocationOnBlur={false}
        onLocationSearch={this.handleLocationChange}
        onTextChange={this.handleLocationTextChange}
      />
    );
  }
}

export default LocationSearch;
