import React from 'react';
import { shallow } from 'enzyme';

import AdTile from 'sly/web/components/organisms/AdTile';

const defaultProps = {
  title: 'title',
  children: 'description',
  buttonText: 'buttonText',
  image: '/images/image.png',
};

const wrap = (props = {}) => shallow(<AdTile {...defaultProps} {...props} />);

describe('AdTile', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('PaddedBlock').at(0).contains(defaultProps.title)).toBeTruthy();
    expect(wrapper.find('PaddedBlock').at(1).contains(defaultProps.children)).toBeTruthy();
    expect(wrapper.find('StyledButton').contains(defaultProps.buttonText)).toBeTruthy();
    expect(wrapper.find('StyledResponsiveImage').prop('src')).toBe(defaultProps.image);
  });

  it('onButtonClick is called', () => {
    const buttonProps = { onClick: jest.fn() };
    const wrapper = wrap({ buttonProps });

    wrapper.find('StyledButton').simulate('click');
    expect(buttonProps.onClick).toHaveBeenCalled();
  });
});
