import React from 'react';
import { shallow } from 'enzyme';

import CommunityPWEstimatedPricingForm from 'sly/web/components/organisms/CommunityPWEstimatedPricingForm';
import { Block } from 'sly/web/components/atoms';

const error = 'Blah';
const wrap = (props = {}) => shallow(<CommunityPWEstimatedPricingForm {...props} />);

describe('CommunityPWEstimatedPricingForm', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('StyledField')).toHaveLength(2);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(0);
  });

  it('render error when error is passed', () => {
    const wrapper = wrap({ error });

    expect(wrapper.find('StyledField')).toHaveLength(2);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(1);
  });

  it('does not render medicaid when medicaidCoverage is passed', () => {
    const wrapper = wrap({ uuidAux: { uuidInfo: { financialInfo: { medicaid: 'no' } } } });

    expect(wrapper.find('StyledField')).toHaveLength(1);
    expect(wrapper.find(Block).filter({ palette: 'danger' })).toHaveLength(0);
  });

  it('onMoveTimeline gets called', () => {
    const onMoveTimelineChange = jest.fn();
    const wrapper = wrap({ onMoveTimelineChange });
    const roomTypeField = wrapper.find('StyledField');

    expect(roomTypeField).toHaveLength(2);
    roomTypeField.at(0).simulate('change');
    expect(onMoveTimelineChange).toHaveBeenCalled();
  });

  it('onCareTypeChange gets called', () => {
    const onCareTypeChange = jest.fn();
    const wrapper = wrap({ onCareTypeChange });
    const careTypeField = wrapper.find('CareTypesField');

    expect(careTypeField).toHaveLength(1);
    careTypeField.at(0).simulate('change');
    expect(onCareTypeChange).toHaveBeenCalled();
  });
});
