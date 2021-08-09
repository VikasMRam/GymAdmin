import React, { Component } from 'react';
import { func, string, any, bool } from 'prop-types';

import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';

export default class LocationSearch extends Component {
  static propTypes={
    onChange: func,
    address: string,
    flex: any,
    showSearchIcon: bool,
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
    const { address, flex, showSearchIcon } = this.props;
    // todo: this will need cleanup in future
    return (
      <SearchBoxContainer
        flex={flex}
        onLocationSearch={this.handleLocationChange}
        onTextChange={this.handleLocationTextChange}
        address={address}
        showSearchIcon={showSearchIcon}
      />
    );
  }
}
