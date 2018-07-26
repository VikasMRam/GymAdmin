import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { object, func } from 'prop-types';
import { palette } from 'styled-theme';
import { Field } from 'redux-form';

import { size } from 'sly/components/themes';
import { getSearchParamFromPlacesResponse } from 'sly/services/helpers/search';
import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import { Heading } from 'sly/components/atoms';

const StyledHeading = styled(Heading)`
  font-weight: normal;
  margin-bottom: ${size('spacing.xLarge')};
`;
const Description = styled.p`
  color: ${palette('grayscale', 0)};
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
        <StyledHeading>What city are you renting in?</StyledHeading>
        <Description>Use the slider to adjust your budget.</Description>
        <SearchBoxContainer
          clearLocationOnBlur={false}
          layout="boxWithoutButton"
          placeholder="Search the city you are renting in..."
          onLocationSearch={this.handleLocationChange}
          onTextChange={this.handleChange}
        />
        <Field name="location" component={noRender} />
      </Fragment>
    );
  }
}

export default CitySearch;
