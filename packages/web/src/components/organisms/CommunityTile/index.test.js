import React from 'react';
import { shallow } from 'enzyme';

import CommunityTile from '.';

import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';

const note = 'note test';
const defaultProps = {
  onSlideChange: jest.fn(),
};
const wrap = (props = {}) => shallow(<CommunityTile community={RhodaGoldmanPlaza} {...defaultProps} {...props} />);

describe('CommunityTile', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('CommunityInfo')).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(0);
    expect(wrapper.find('[testID="EditNote"]')).toHaveLength(0);
    expect(wrapper.find('[testID="AddNote"]')).toHaveLength(0);
  });

  it('onEditNoteClick gets called', () => {
    const onEditNoteClick = jest.fn();
    const wrapper = wrap({ note, onEditNoteClick });

    wrapper.find('[testID="EditNote"]').simulate('click');
    expect(onEditNoteClick).toHaveBeenCalled();
  });

  it('onAddNoteClick gets called', () => {
    const onAddNoteClick = jest.fn();
    const wrapper = wrap({ onAddNoteClick, addNote: true });

    wrapper.find('[testID="AddNote"]').simulate('click');
    expect(onAddNoteClick).toHaveBeenCalled();
  });

  it('action buttons rendered', () => {
    const actionButtons = [
      {
        text: 'Ask Question',
        onClick: jest.fn(),
      },
      {
        text: 'Blah',
        ghost: true,
        onClick: jest.fn(),
      },
    ];
    const wrapper = wrap({ actionButtons });

    expect(wrapper.find('CommunityInfo')).toHaveLength(1);
    actionButtons.forEach((actionButton, i) => {
      expect(wrapper.find('Button[testID="ActionButton"]').at(i).dive()
        .text()).toBe(actionButton.text);
      wrapper.find('Button[testID="ActionButton"]').at(i).simulate('click');
      expect(actionButton.onClick).toHaveBeenCalled();
    });
  });
});
