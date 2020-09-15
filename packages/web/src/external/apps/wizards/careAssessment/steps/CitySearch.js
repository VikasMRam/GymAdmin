import React, { Component } from 'react';
import { func } from 'prop-types';
import { Field } from 'redux-form';

import pad from 'sly/web/components/helpers/pad';
import { STEP_INPUT_FIELD_NAMES } from 'sly/web/external/constants/steps';
import SearchBoxContainer from 'sly/web/containers/SearchBoxContainer';
import { Heading } from 'sly/web/components/atoms';

const PaddedHeading = pad(Heading, 'xLarge');
PaddedHeading.displayName = 'PaddedHeading';

const noRender = () => null;

class CitySearch extends Component {
  static propTypes = {
    setFormKey: func,
    setStoreKey: func,
  };

  handleLocationChange = (result) => {
    const { setFormKey, setStoreKey } = this.props;
    const [city, state] = result.displayText.split(',');
    const searchParams = {
      city: city.trim(),
      state: state.trim(),
    };

    setStoreKey('locationSearchParams', searchParams);
    setFormKey('location', result.displayText);
  }

  handleChange = () => {
    const { setFormKey, setStoreKey } = this.props;
    setFormKey('location', null);
    setStoreKey('locationSearchParams', null);
  }

  render() {
    return (
      <>
        <PaddedHeading weight="regular">In what city do you need care?</PaddedHeading>
        <SearchBoxContainer
          placeholder="Enter city name..."
          onLocationSearch={this.handleLocationChange}
          onTextChange={this.handleChange}
        />
        <Field name={STEP_INPUT_FIELD_NAMES.CitySearch[0]} component={noRender} />
      </>
    );
  }
}

export default CitySearch;
