import React from 'react';
import { shallow } from 'enzyme';

import CommunityExtraInfoSection from 'sly/web/components/molecules/CommunityExtraInfoSection';
import Section from 'sly/web/components/molecules/Section';

const wrap = (props = {}) =>
  shallow(<CommunityExtraInfoSection {...props} />);

const title = 'Test title';
const description = 'Test description';
const url = 'https://test.com';
const urlText = 'test urlText';

describe('CommunityExtraInfoSection', () => {
  it('renders', () => {
    const wrapper = wrap({ title, description, url });
    const section = wrapper.find(Section);

    expect(section).toBeTruthy();
    expect(section.prop('title')).toBe(title);
    expect(section.contains(description)).toBe(true);
    expect(section.find('StyledLink').prop('href')).toBe(url);
  });

  it('renders with urlText', () => {
    const wrapper = wrap({
      title, description, url, urlText,
    });
    const section = wrapper.find(Section);

    expect(section).toBeTruthy();
    expect(section.prop('title')).toBe(title);
    expect(section.contains(description)).toBe(true);
    expect(section.find('StyledLink').prop('href')).toBe(url);
    expect(section.find('StyledLink').render().text()).toBe(urlText);
  });

  it('renders without url', () => {
    const wrapper = wrap({ title, description });
    const section = wrapper.find(Section);

    expect(section).toBeTruthy();
    expect(section.prop('title')).toBe(title);
    expect(section.contains(description)).toBe(true);
    expect(section.find('StyledLink')).toHaveLength(0);
  });
});
