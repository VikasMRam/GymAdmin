import React from 'react';
import { shallow } from 'enzyme';

import SearchBoxContainer from 'sly/containers/SearchBoxContainer';
import CitySearch from 'sly/external/apps/wizards/careAssessment/steps/CareNeeds';

const wrap = (props = {}) => shallow(<CitySearch {...props} />);

describe('CitySearch', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('PaddedHeading')).toHaveLength(1);
    expect(SearchBoxContainer).toHaveLength(1);
  });
});
