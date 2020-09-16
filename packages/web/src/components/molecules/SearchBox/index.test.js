import React from 'react';
import { shallow } from 'enzyme';

import SearchBox from '.';

import suggestions from 'sly/storybook/sample-data/search-san.json';

const onChange = jest.fn();
const onSelect = jest.fn();
const onSearchButtonClick = jest.fn();
const defaultProps = {
  onSearchButtonClick,
  onChange,
  onSelect,
  suggestions,
};
const wrap = (props = {}) =>
  shallow(<SearchBox {...defaultProps} {...props} />);

describe('SearchBox', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('Input')).toHaveLength(1);
    expect(wrapper.find('SuggestionsWrapper')).toHaveLength(0);
  });

  it('renders suggestions when focused', () => {
    const wrapper = wrap({
      isTextboxInFocus: true,
    });

    expect(wrapper.find('Input')).toHaveLength(1);
    expect(wrapper.find('SuggestionsWrapper')).toHaveLength(1);
  });

  it('onSelect is called', () => {
    const onSelect = jest.fn();
    const wrapper = wrap({
      onSelect,
      isTextboxInFocus: true,
    });

    expect(wrapper.find('Input')).toHaveLength(1);
    expect(wrapper.find('SuggestionsWrapper')).toHaveLength(1);
    wrapper.find('SuggestionsWrapper').find('Suggestions').find('Suggestion')
      .at(2)
      .simulate('mouseDown');
    expect(onSelect).toHaveBeenCalledWith(suggestions[2]);
  });

  it('renders with homeHero layout', () => {
    const wrapper = wrap({ layout: 'homeHero' });

    expect(wrapper.find('Input')).toHaveLength(1);
    expect(wrapper.find('SuggestionsWrapper')).toHaveLength(0);
  });

  it('renders suggestions in homeHero layout when focused', () => {
    const wrapper = wrap({
      layout: 'homeHero',
      isTextboxInFocus: true,
    });

    expect(wrapper.find('Input')).toHaveLength(1);
    expect(wrapper.find('SuggestionsWrapper')).toHaveLength(1);
  });

  it('onSelect is called in homeHero layout', () => {
    const onSelect = jest.fn();
    const wrapper = wrap({
      onSelect,
      layout: 'homeHero',
      isTextboxInFocus: true,
    });

    expect(wrapper.find('Input')).toHaveLength(1);
    expect(wrapper.find('SuggestionsWrapper')).toHaveLength(1);
    wrapper.find('SuggestionsWrapper').find('Suggestions').find('Suggestion')
      .at(2)
      .simulate('mouseDown');
    expect(onSelect).toHaveBeenCalledWith(suggestions[2]);
  });
});
