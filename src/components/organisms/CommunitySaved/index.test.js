import React from 'react';
import { shallow } from 'enzyme';

import CommunitySaved from 'sly/components/organisms/CommunitySaved';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { similarProperties } = RhodaGoldmanPlaza;

const wrap = (props = {}) =>
  shallow(<CommunitySaved {...props} />);

describe('CommunitySaved', () => {
  it('renders', () => {
    const wrapper = wrap({ similarCommunities: similarProperties });

    expect(wrapper.find('StyledHeading')).toHaveLength(2);
    expect(wrapper.find('StyledBlock')).toHaveLength(1);
    expect(wrapper.find('ButtonsWrapper')).toHaveLength(1);
    expect(wrapper.find('StyledHr')).toHaveLength(1);
    expect(wrapper.find('SimilarCommunities')).toHaveLength(1);
  });

  it('calls callback on done button click', () => {
    const onDoneButtonClickedSpy = jest.fn();
    const wrapper = wrap({
      similarCommunities: similarProperties,
      onDoneButtonClicked: onDoneButtonClickedSpy,
    });
    const button = wrapper.find('StyledDoneButton');

    expect(button).toHaveLength(1);
    button.simulate('click');
    expect(onDoneButtonClickedSpy).toHaveBeenCalled();
  });
});
