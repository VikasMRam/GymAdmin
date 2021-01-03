import React from 'react';
import { shallow } from 'enzyme';

import End from '.';

import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';
import LindaIwamota from 'sly/storybook/sample-data/agent-linda-iwamota.json';

const handleSubmit = jest.fn();
const defaultProps = {
  handleSubmit,
  community: RhodaGoldmanPlaza,
  agent: LindaIwamota,
};
const wrap = (props = {}) => shallow(<End {...defaultProps} {...props} />);

describe('Wizards|assessment - Steps|End', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('ResponsiveImage')).toHaveLength(1);
    expect(wrapper.find('Heading').contains('Sending your request...')).toBeTruthy();
    // expect(wrapper.find('SimilarCommunities')).toHaveLength(1);
  });
});
