import React, { Fragment, Component } from 'react';
import { object, func } from 'prop-types';
import { Field } from 'redux-form';

import pad from 'sly/components/helpers/pad';
import { STEP_INPUT_FIELD_NAMES } from 'sly/external/constants/steps';
import { getSearchParamFromPlacesResponse } from 'sly/services/helpers/search';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import { Heading } from 'sly/components/atoms';

const PaddedHeading = pad(Heading, 'xLarge');

const noRender = () => null;

class CitySearch extends Component {
  static propTypes = {
    data: object,
    setFormKey: func,
    setStoreKey: func,
  };

  static defaultProps = {
    data: {},
  };

  handleLocationChange = (result) => {
    const { setFormKey, setStoreKey } = this.props;
    const searchParams = getSearchParamFromPlacesResponse(result);
    delete searchParams.toc;
    setStoreKey('locationSearchParams', searchParams);
    setFormKey('location', result.formatted_address);
  }

  handleChange = () => {
    const { setFormKey, setStoreKey } = this.props;
    setFormKey('location', null);
    setStoreKey('locationSearchParams', null);
  }

  render() {
    return (
      <Fragment>
        {/* TODO: replace with <> </> after upgrading to babel 7 & when eslint adds support for jsx fragments */}
        <PaddedHeading weight="regular">In what city do you need care?</PaddedHeading>
        <SearchBoxContainer
          clearLocationOnBlur={false}
          placeholder="Enter city name..."
          onLocationSearch={this.handleLocationChange}
          onTextChange={this.handleChange}
        />
        <Field name={STEP_INPUT_FIELD_NAMES.CitySearch[0]} component={noRender} />
      </Fragment>
    );
  }
}

export default CitySearch;
