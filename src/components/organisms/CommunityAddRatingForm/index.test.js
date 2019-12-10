import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import CommunityAddRatingForm, { ErrorBlock } from 'sly/components/organisms/CommunityAddRatingForm';

const handleSubmit = jest.fn();
const community = {
  name: 'Rhoda Goldman Plaza',
  url: '',
};
const user = { id: 1, name: 'Pranesh Kumar' };
const error = 'Blah';

const wrap = (props = {}) => shallow(
  <CommunityAddRatingForm
    handleSubmit={handleSubmit}
    community={community}
    {...props}
  />,
);

describe('CommunityAddRatingForm', () => {
  it('render name and email when user is not passed', () => {
    const wrapper = wrap({ });
    expect(wrapper.find('Heading').html()).toContain(community.name);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'comments' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'value' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
    expect(wrapper.find('Styled(Block)')).toHaveLength(0);
  });

  it('does not render name and email when user is passed', () => {
    const wrapper = wrap({ user });
    expect(wrapper.find('Heading').html()).toContain(community.name);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(0);
    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(0);
    expect(wrapper.find(Field).filter({ name: 'comments' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'value' })).toHaveLength(1);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
    expect(wrapper.find('Styled(Block)')).toHaveLength(0);
  });

  it('render error when error is passed', () => {
    const wrapper = wrap({ error });
    expect(wrapper.find('Heading').html()).toContain(community.name);
    expect(wrapper.find(Field).filter({ name: 'name' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'email' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'comments' })).toHaveLength(1);
    expect(wrapper.find(Field).filter({ name: 'value' })).toHaveLength(1);
    expect(wrapper.find('Styled(Block)')).toHaveLength(1);
    expect(wrapper.find('Styled(Block)').prop('children')).toEqual(error);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });

  it('handles onFormSubmit', () => {
    const wrapper = wrap({ });
    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
