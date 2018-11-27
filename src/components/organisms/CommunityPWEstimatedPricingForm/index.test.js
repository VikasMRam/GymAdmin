import React from 'react';
import { shallow } from 'enzyme';

import CommunityPWEstimatedPricingForm from 'sly/components/organisms/CommunityPWEstimatedPricingForm';
import { Block } from 'sly/components/atoms';

const error = 'Blah';
const wrap = (props = {}) => shallow(<CommunityPWEstimatedPricingForm {...props} />);

describe('CommunityPWEstimatedPricingForm', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Styled(Field)')).toHaveLength(3);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(0);
  });

  it('render error when error is passed', () => {
    const wrapper = wrap({ error });

    expect(wrapper.find('Styled(Field)')).toHaveLength(3);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(1);
  });
});
