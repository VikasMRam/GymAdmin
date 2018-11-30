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

  it('does not render medicaid when medicaidCoverage is passed', () => {
    const wrapper = wrap({ userDetails: { medicaidCoverage: 'no' } });

    expect(wrapper.find('Styled(Field)')).toHaveLength(2);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(0);
  });

  it('onRoomTypeChange gets called', () => {
    const onRoomTypeChange = jest.fn();
    const wrapper = wrap({ onRoomTypeChange });
    const roomTypeField = wrapper.find('Styled(Field)');

    expect(roomTypeField).toHaveLength(3);
    roomTypeField.at(0).simulate('change');
    expect(onRoomTypeChange).toHaveBeenCalled();
  });

  it('onCareTypeChange gets called', () => {
    const onCareTypeChange = jest.fn();
    const wrapper = wrap({ onCareTypeChange });
    const careTypeField = wrapper.find('Styled(Field)');

    expect(careTypeField).toHaveLength(3);
    careTypeField.at(1).simulate('change');
    expect(onCareTypeChange).toHaveBeenCalled();
  });
});
