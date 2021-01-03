import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import TosAndPrivacy from 'sly/web/components/molecules/TosAndPrivacy';
import LeadFound from 'sly/web/external/apps/wizards/careAssessment/steps/LeadFound';

const wrap = (props = {}) => shallow(<LeadFound {...props} />);

const verifyLayout = (wrapper, searchResultCount = 0) => {
  const h = wrapper.find('PaddedHeading');
  expect(h).toHaveLength(1);
  expect(h.render().text()).toContain(searchResultCount);
  expect(wrapper.find('Description')).toHaveLength(1);
  expect(wrapper.find(Field)).toHaveLength(3);
  expect(wrapper.find(TosAndPrivacy)).toHaveLength(1);
};

describe('LeadFound', () => {
  it('renders', () => {
    const wrapper = wrap();
    verifyLayout(wrapper);
  });

  it('renders when searchResultCount passed', () => {
    const searchResultCount = 300;
    const wrapper = wrap({ searchResultCount });
    verifyLayout(wrapper, searchResultCount);
  });
});
