import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';

import ShareCommunityForm from '.';

const wrap = (props = {}) => shallow(<ShareCommunityForm {...props} />);
const mainImage = 'https://d1qiigpe5txw4q.cloudfront.net/uploads/9e98a8d1b8d59941d725a30737861441/len%2520and%2520tablet_sd.jpg';

describe('ShareCommunityForm', () => {
  it('renders', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit, mainImage });
    const img = wrapper.find('StyledImage');

    expect(img).toHaveLength(1);
    expect(img.prop('src')).toBe(mainImage);
    expect(wrapper.find(Field)).toHaveLength(3);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });

  it('renders without mainImage', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });
    const img = wrapper.find('StyledImage');

    expect(img).toHaveLength(0);
    expect(wrapper.find(Field)).toHaveLength(3);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });

  it('renders when from disabled', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit, mainImage, fromEnabled: false });
    const img = wrapper.find('StyledImage');

    expect(img).toHaveLength(1);
    expect(img.prop('src')).toBe(mainImage);
    expect(wrapper.find(Field)).toHaveLength(2);
    expect(wrapper.find('StyledButton')).toHaveLength(1);
  });


  it('handles onFormSubmit', () => {
    const handleSubmit = jest.fn();
    const wrapper = wrap({ handleSubmit });
    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
  });
});
