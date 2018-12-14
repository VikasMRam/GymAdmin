import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import CommunityFloorPlanPopupForm from 'sly/components/molecules/CommunityFloorPlanPopupForm';

const defaultProp = {
  typeOfCare: 'Assisted Living',
  floorPlanInfo: {
    description: 'Blah',
    price: 7900,
    priceType: 'Monthly Rate',
    roomType: 'Shared',
    shareType: 'Private',
    accessibility: 'Ambulatory or Non Ambulatory',
    bathroom: 'Private',
    gender: 'Male or Female',
  },
};

const userDetails = {
  fullName: 'Pranesh',
  email: 'pranesh@seniorly.com',
  phone: '9999999999',
};

const wrap = (props = {}) =>
  shallow(<CommunityFloorPlanPopupForm {...defaultProp} {...props} />);

describe('CommunityFloorPlanPopupForm', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders default props', () => {
    const wrapper = wrap();
    expect(wrapper.contains(defaultProp.typeOfCare)).toBeTruthy();
    expect(wrapper.contains(defaultProp.floorPlanInfo.description)).toBeTruthy();
    expect(wrapper.find('NumberFormat').prop('value')).toEqual(defaultProp.floorPlanInfo.price);
    expect(wrapper.contains(defaultProp.floorPlanInfo.roomType)).toBeTruthy();
    expect(wrapper.contains(defaultProp.floorPlanInfo.shareType)).toBeTruthy();
    expect(wrapper.contains(defaultProp.floorPlanInfo.accessibility)).toBeTruthy();
    expect(wrapper.contains(defaultProp.floorPlanInfo.bathroom)).toBeTruthy();
    expect(wrapper.contains(defaultProp.floorPlanInfo.gender)).toBeTruthy();
  });

  it('renders with image passed', () => {
    const wrapper = wrap({ floorPlanInfo: { image: 'abc.png' } });
    expect(wrapper.find('Styled(Image)')).toHaveLength(1);
  });

  it('renders inputs when userDetails is not passed', () => {
    const wrapper = wrap();
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'notes' })).toHaveLength(0);
  });

  it('does not renders inputs when userDetails is passed', () => {
    const wrapper = wrap({ userDetails });
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(0);
    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(0);
    expect(wrapper.find(Field).filter({ name: 'phone' })).toHaveLength(0);
    expect(wrapper.find(Field).filter({ name: 'notes' })).toHaveLength(1);
  });

  it('render error when error is passed', () => {
    const wrapper = wrap({ error: 'Error1234' });
    expect(wrapper.contains('Error1234')).toBeTruthy();
  });

  it('renders shared price', () => {
    const wrapper = wrap({ floorPlanInfo: { shareType: 'Shared', priceShared: 8234.34 } });
    expect(wrapper.find('NumberFormat').prop('value')).not.toEqual(defaultProp.floorPlanInfo.price);
    expect(wrapper.find('NumberFormat').prop('value')).toEqual(8234.34);
  });

  it('handles onItemClick', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });
    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
