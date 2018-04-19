import React from 'react';
import { shallow } from 'enzyme';
import CommunityTile, { StyledCheckbox } from '.';

const community = {
  name: 'Rhoda Goldman Plaza',
  uri: 'rhoda-goldman-plaze',
  picture: 'blah',
  rating: 4.5,
  startingRate: 4500,
  numReviews: 55,
};
const wrap = (props = {}) =>
  shallow(<CommunityTile community={community} {...props} />);

describe('CommunityTile', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ size: 'medium' });
    expect(wrapper.find('Rating[size="medium"]')).toHaveLength(1);
  });

  it('renders default not selectable, calls toggle', () => {
    const wrapper = wrap({});
    const checkbox = wrapper.find(StyledCheckbox);

    expect(checkbox).toHaveLength(0);
  });

  it('renders checkbox when set as selectable', () => {
    const wrapper = wrap({ selectable: true });
    const checkbox = wrapper.find(StyledCheckbox);

    expect(checkbox).toHaveLength(1);
  });

  it('renders checkbox not checked and white bg-color when not selected', () => {
    const wrapper = wrap({ selectable: true });
    // console.log(wrapper.find(CommunityTileDiv).get(0));
    // const wrapperStyle = wrapper.find(CommunityTileDiv).get(0).style;
    // expect(wrapperStyle).toHaveProperty('background-color', '#fff');

    const checkbox = wrapper.find(StyledCheckbox);
    expect(checkbox.prop('checked')).toBeFalsy();
  });

  it('renders checkbox checked and bluw bg-color when not selected', () => {
    const wrapper = wrap({ selectable: true, selected: true });

    const checkbox = wrapper.find(StyledCheckbox);
    expect(checkbox.prop('checked')).toEqual(true);
  });
});
