import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { object, func } from 'prop-types';
import { Field } from 'redux-form';

import { size } from 'sly/components/themes';
import { getSearchParamFromPlacesResponse } from 'sly/services/helpers/search';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import { Heading } from 'sly/components/atoms';

import { stepInputFieldNames } from '../helpers';

const StyledHeading = styled(Heading)`
  font-weight: normal;
  margin-bottom: ${size('spacing.xLarge')};
`;

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
        <StyledHeading>In what city do you need care?</StyledHeading>
        <SearchBoxContainer
          clearLocationOnBlur={false}
          layout="boxWithoutButton"
          placeholder="Enter city name..."
          onLocationSearch={this.handleLocationChange}
          onTextChange={this.handleChange}
        />
        <Field name={stepInputFieldNames.CitySearch[0]} component={noRender} />
      </Fragment>
    );
  }
}

export default CitySearch;
