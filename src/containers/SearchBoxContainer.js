import React, { Component } from 'react';
import { string, func, object, bool } from 'prop-types';
import { connect } from 'react-redux';
import { geocodeByAddress } from 'react-places-autocomplete';
import { withRouter } from 'react-router-dom';

import { gMapsApiKey } from 'sly/config';
import { changeAddress, setLocation, clearLocation } from 'sly/store/actions';
import { searchBoxAddress, searchBoxLocation } from 'sly/store/selectors';
import {
  filterLinkPath,
  getSearchParamFromPlacesResponse,
} from 'sly/services/helpers/search';
import SearchBox from 'sly/components/molecules/SearchBox';
import SlyEvent from 'sly/services/helpers/events';

class SearchBoxContainer extends Component {
  static propTypes = {
    layout: string,
    address: string,
    location: object,
    changeAddress: func,
    setLocation: func,
    clearLocation: func,
    clearLocationOnBlur: bool,
    onTextChange: func,
    onLocationSearch: func,
    history: object,
  };

  static defaultProps = {
    clearLocationOnBlur: true,
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
    const { changeAddress, onTextChange } = this.props;
    if (onTextChange) {
      onTextChange(address);
    }
    changeAddress(address);
  };

  handleSelect = (address) => {
    const { setLocation, address: value } = this.props;
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
  }

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
    const { onLocationSearch } = this.props;
    if (onLocationSearch) {
      onLocationSearch(result);
    } else {
      const { history } = this.props;
      const searchParams = getSearchParamFromPlacesResponse(result);
      const { path } = filterLinkPath(searchParams);
      history.push(path);
    }
  };

  render() {
    const {
      layout, address, clearLocationOnBlur, ...props
    } = this.props;
    const { isMounted } = this.state;
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

const mapStateToProps = (state, { address }) => ({
  address: searchBoxAddress(state) || address,
  location: searchBoxLocation(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeAddress: value => dispatch(changeAddress(value)),
    setLocation: value => (dispatch(setLocation(value))),
    clearLocation: () => dispatch(clearLocation()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBoxContainer));
