import React from 'react';
import { shallow } from 'enzyme';

import CommunitySidebarWidget from 'sly/components/organisms/CommunitySidebarWidget';
import RhodaGoldmanPlaza from 'sly/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

jest.mock('sly/containers/AskAgentQuestionContainer');

const onBookATourClick = jest.fn();

const wrap = (props = {}) =>
  shallow(<CommunitySidebarWidget community={RhodaGoldmanPlaza} onBookATourClick={onBookATourClick} {...props} />);

// todo: add tests
describe('CommunitySidebarWidget', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });
});
