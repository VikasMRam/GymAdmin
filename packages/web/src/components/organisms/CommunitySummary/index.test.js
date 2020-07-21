import React from 'react';
import { shallow } from 'enzyme';

import CommunitySummary from 'sly/web/components/organisms/CommunitySummary';
import { Link } from 'sly/web/components/atoms';
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
    community.propInfo.typeCare = [...community.propInfo.typeCare, tag];
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
  const renderedAddress = wrapper.find('Heading').dive().render()
    .text();

  expect(renderedAddress).toContain(line1);
  expect(renderedAddress).toContain(line2);
  expect(renderedAddress).toContain(city);
  expect(renderedAddress).toContain(state);
  expect(renderedAddress).toContain(zip);
  expect(wrapper.find('StyledHeading').render().text()).toContain(name);
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
    expect(wrapper.find('StyledHeading').dive().find(Link)).toHaveLength(1);
  });

  it('Should render the care types tags for state Delaware', () => {
    const community = getCommunity('DE');
    const wrapper = wrap({
      community,
    });
    const styledTags = wrapper.find('StyledTag');

    expect(styledTags.get(0).props.children).toBe('Assisted Living');
    expect(styledTags.get(1).props.children).toBe('Memory Care');

    verify(wrapper);
    expect(styledTags).toHaveLength(2);
    wrapper.find('StyledTag');
  });

  it('Should render the care types tags for state Pennsylvania', () => {
    const community = getCommunity('PA');
    const wrapper = wrap({
      community,
    });
    const styledTags = wrapper.find('StyledTag');

    expect(styledTags.get(0).props.children).toBe('Personal Care Home');
    expect(styledTags.get(1).props.children).toBe('Memory Care');

    verify(wrapper);
    expect(styledTags).toHaveLength(2);
    wrapper.find('StyledTag');
  });

  it('Should render the care types tags for state Georgia', () => {
    const community = getCommunity('GA');
    const wrapper = wrap({
      community,
    });
    const styledTags = wrapper.find('StyledTag');

    expect(styledTags.get(0).props.children).toBe('Personal Care Home');
    expect(styledTags.get(1).props.children).toBe('Memory Care');

    verify(wrapper);
    expect(styledTags).toHaveLength(2);
    wrapper.find('StyledTag');
  });

  it('Should render the care types tags for state Kentucky', () => {
    const community = getCommunity('KY');
    const wrapper = wrap({
      community,
    });
    const styledTags = wrapper.find('StyledTag');

    expect(styledTags.get(0).props.children).toBe('Personal Care Home');
    expect(styledTags.get(1).props.children).toBe('Memory Care');

    verify(wrapper);
    expect(styledTags).toHaveLength(2);
    wrapper.find('StyledTag');
  });

  it('Should render CCRC', () => {
    const community = getCommunity('DE', CONTINUING_CARE_RETIREMENT_COMMUNITY);
    const wrapper = wrap({
      community,
    });
    const styledTags = wrapper.find('StyledTag');

    expect(styledTags.get(0).props.children).toBe('Assisted Living');
    expect(styledTags.get(1).props.children).toBe('Memory Care');
    expect(styledTags.get(2).props.children).toBe('CCRC');

    verify(wrapper);
    expect(styledTags).toHaveLength(3);
    wrapper.find('StyledTag');
  });
});
