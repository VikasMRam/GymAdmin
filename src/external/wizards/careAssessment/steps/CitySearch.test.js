import React from 'react';
import { shallow } from 'enzyme';

import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import CitySearch, { StyledHeading } from './CareNeeds';

import { stepInputFieldNames } from '../helpers';

const wrap = (props = {}) => shallow(<CitySearch {...props} />);
const data = {};
const location = 'San Francisco, CA, USA';

describe('CitySearch', () => {
  it('renders', () => {
    const wrapper = wrap({ data });

    expect(wrapper.find(StyledHeading)).toHaveLength(1);
    expect(SearchBoxContainer).toHaveLength(1);
  });

  it('renders when location typed', () => {
    data[stepInputFieldNames.CitySearch[0]] = location;
    const wrapper = wrap({ data });

    expect(wrapper.find(StyledHeading)).toHaveLength(1);
    expect(SearchBoxContainer).toHaveLength(1);
  });
});
