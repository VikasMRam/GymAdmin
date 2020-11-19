import React from 'react';
import { shallow } from 'enzyme';

import CommunitySummary from 'sly/web/components/organisms/CommunitySummary';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';
import { CONTINUING_CARE_RETIREMENT_COMMUNITY } from 'sly/web/constants/tags';

const searchParams = {
  city: 'san-carlos',
  communitySlug: 'rhoda-goldman-plaza',
  state: 'california',
  toc: 'assisted-living',
};

const wrap = (props = {}) => shallow(<CommunitySummary {...props} searchParams={searchParams} />);

const getCommunity = (state, tag) => {
  const community = { ...RhodaGoldmanPlaza };

  community.address.state = state;

  if (tag) {
    community.care = [...community.care, tag];
  }

  return community;
};

const verify = (wrapper) => {
  const {
    address, name,
  } = RhodaGoldmanPlaza;
  const {
    line1, line2, city, state, zip,
  } = address;
  const renderedAddress = wrapper.find('Heading[level="title"]').render().text();

  expect(renderedAddress).toContain(line1);
  expect(renderedAddress).toContain(line2);
  expect(renderedAddress).toContain(city);
  expect(renderedAddress).toContain(state);
  expect(renderedAddress).toContain(zip);
  expect(wrapper.find('Heading[level="hero"]').render().text()).toContain(name);
};

describe('CommunitySummary', () => {
  it('renders', () => {
    const wrapper = wrap({
      community: RhodaGoldmanPlaza,
    });
    verify(wrapper);
  });

  it('renders with isAdmin', () => {
    const wrapper = wrap({
      community: RhodaGoldmanPlaza,
      isAdmin: true,
    });
    verify(wrapper);
    expect(wrapper.find('Heading[level="hero"] Link')).toHaveLength(1);
  });

  it('Should render the care types tags for state Delaware', () => {
    const community = getCommunity('DE');
    const wrapper = wrap({
      community,
    });
    const styledTags = wrapper.find('Tag');

    expect(styledTags.at(0).render().text()).toBe('Assisted Living');
    expect(styledTags.at(1).render().text()).toBe('Memory Care');

    verify(wrapper);
    expect(styledTags).toHaveLength(2);
    wrapper.find('StyledTag');
  });

  it('Should render the care types tags for state Pennsylvania', () => {
    const community = getCommunity('PA');
    const wrapper = wrap({
      community,
    });
    const styledTags = wrapper.find('Tag');

    expect(styledTags.at(0).render().text()).toBe('Personal Care Home');
    expect(styledTags.at(1).render().text()).toBe('Memory Care');

    verify(wrapper);
    expect(styledTags).toHaveLength(2);
    wrapper.find('StyledTag');
  });

  it('Should render the care types tags for state Georgia', () => {
    const community = getCommunity('GA');
    const wrapper = wrap({
      community,
    });
    const styledTags = wrapper.find('Tag');

    expect(styledTags.at(0).render().text()).toBe('Personal Care Home');
    expect(styledTags.at(1).render().text()).toBe('Memory Care');

    verify(wrapper);
    expect(styledTags).toHaveLength(2);
    wrapper.find('StyledTag');
  });

  it('Should render the care types tags for state Kentucky', () => {
    const community = getCommunity('KY');
    const wrapper = wrap({
      community,
    });
    const styledTags = wrapper.find('Tag');

    expect(styledTags.at(0).render().text()).toBe('Personal Care Home');
    expect(styledTags.at(1).render().text()).toBe('Memory Care');

    verify(wrapper);
    expect(styledTags).toHaveLength(2);
    wrapper.find('StyledTag');
  });

  it('Should render CCRC', () => {
    const community = getCommunity('DE', CONTINUING_CARE_RETIREMENT_COMMUNITY);
    const wrapper = wrap({
      community,
    });
    const styledTags = wrapper.find('Tag');

    expect(styledTags.at(0).render().text()).toBe('Assisted Living');
    expect(styledTags.at(1).render().text()).toBe('Memory Care');
    expect(styledTags.at(2).render().text()).toBe('Continuing Care Retirement Community');

    verify(wrapper);
    expect(styledTags).toHaveLength(3);
    wrapper.find('StyledTag');
  });
});
