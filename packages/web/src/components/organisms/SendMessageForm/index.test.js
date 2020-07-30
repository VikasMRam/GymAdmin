import React from 'react';
import { shallow } from 'enzyme';

import { Block } from 'sly/web/components/atoms';
import SendMessageForm from 'sly/web/components/organisms/SendMessageForm';
import participant2 from 'sly/storybook/sample-data/conversation-participant-2.json';

const error = 'Blah';
const defaultProps = {
  otherParticipant: participant2,
};

const wrap = (props = {}) => shallow(<SendMessageForm {...defaultProps} {...props} />);

describe('SendMessageForm', () => {
  it('renders', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });
    expect(wrapper.find('Textarea').filter({ name: 'message' })).toHaveLength(1);
    expect(wrapper.find('SmallScreenButton')).toHaveLength(1);
    expect(wrapper.find('BigScreenButton')).toHaveLength(1);
    expect(wrapper.find(Block)).toHaveLength(0);
  });

  it('render error when error is passed', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit, error });
    expect(wrapper.find('Textarea').filter({ name: 'message' })).toHaveLength(1);
    expect(wrapper.find('SmallScreenButton')).toHaveLength(1);
    expect(wrapper.find('BigScreenButton')).toHaveLength(1);
    expect(wrapper.find(Block)).toHaveLength(1);
  });

  it('handles onFormSubmit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });
    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
