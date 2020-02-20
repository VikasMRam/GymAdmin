import React from 'react';
import { shallow } from 'enzyme';

import SearchResultsAdTile from 'sly/components/organisms/SearchResultsAdTile';

const defaultProps = {
  title: 'title',
  children: 'description',
  buttonText: 'buttonText',
  image: '/images/image.png',
};

const wrap = (props = {}) => shallow(<SearchResultsAdTile {...defaultProps} {...props} />);

describe('SearchResultsAdTile', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('PaddedBlock').at(0).contains(defaultProps.title)).toBeTruthy();
    expect(wrapper.find('PaddedBlock').at(1).contains(defaultProps.children)).toBeTruthy();
    expect(wrapper.find('StyledButton').contains(defaultProps.buttonText)).toBeTruthy();
    expect(wrapper.find('StyledResponsiveImage').prop('src')).toBe(defaultProps.image);
  });

  it('onButtonClick is called', () => {
    const onButtonClick = jest.fn();
    const wrapper = wrap({ onButtonClick });

    wrapper.find('StyledButton').simulate('click');
    expect(onButtonClick).toHaveBeenCalled();
  });
});
