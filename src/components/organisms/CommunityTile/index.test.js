import React from 'react';
import { shallow } from 'enzyme';

import CommunityTile from 'sly/components/organisms/CommunityTile';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const note = 'note test';
const defaultProps = {
  onSlideChange: jest.fn(),
};
const wrap = (props = {}) => shallow(<CommunityTile community={RhodaGoldmanPlaza} {...defaultProps} {...props} />);

describe('CommunityTile', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('StyledMediaGallery')).toHaveLength(1);
    expect(wrapper.find('StyledCommunityInfo')).toHaveLength(1);
    expect(wrapper.find('FullWidthButton')).toHaveLength(0);
    expect(wrapper.find('Span')).toHaveLength(0);
    expect(wrapper.find('CursorSpan')).toHaveLength(0);
    expect(wrapper.find('AddNote')).toHaveLength(0);
  });

  it('renders note', () => {
    const wrapper = wrap({ note });
    expect(wrapper.find('Span').dive().text()).toContain(note);
  });

  it('onEditNoteClick gets called', () => {
    const onEditNoteClick = jest.fn();
    const wrapper = wrap({ note, onEditNoteClick });
    wrapper.find('CursorSpan').simulate('click');
    expect(onEditNoteClick).toHaveBeenCalled();
  });

  it('onAddNoteClick gets called', () => {
    const onAddNoteClick = jest.fn();
    const wrapper = wrap({ onAddNoteClick, addNote: true });
    wrapper.find('AddNote').simulate('click');
    expect(onAddNoteClick).toHaveBeenCalled();
  });

  it('onAskQuestionClick gets called', () => {
    const onAskQuestionClick = jest.fn();
    const wrapper = wrap({ onAskQuestionClick, actionButtons: ['ask-question'] });
    wrapper.find('FullWidthButton').at(0).simulate('click');
    expect(onAskQuestionClick).toHaveBeenCalled();
  });
});
