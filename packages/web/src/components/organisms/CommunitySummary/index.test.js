import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';

import { IconContext } from 'sly/common/system/Icon';
import CommunitySummary from 'sly/web/components/organisms/CommunitySummary';
import RhodaGoldmanPlaza from 'sly/storybook/sample-data/property-rhoda-goldman-plaza.json';
import { CONTINUING_CARE_RETIREMENT_COMMUNITY } from 'sly/web/constants/tags';

const searchParams = {
  city: 'san-carlos',
  communitySlug: 'rhoda-goldman-plaza',
  state: 'california',
  toc: 'assisted-living',
};

const defaultProps = { formattedAddress: '2180 Post Street, San Francisco, CA 94115' };


const icons = jest.fn();


const wrap = (props = {}) => mount(<BrowserRouter><IconContext.Provider value={icons}><CommunitySummary {...defaultProps} {...props} searchParams={searchParams} /></IconContext.Provider></BrowserRouter>);

const getCommunity = (state, tag) => {
  const community = { ...RhodaGoldmanPlaza };


  const {
    line1, line2, city, zip,
  } = community.address;

  const formattedAddress = `${line1}, ${line2}, ${city},
    ${state}
    ${zip}`
    .replace(/, null,/g, ',')
    .replace(/\s/g, ' ')
    .replace(/, ,/g, ', ');

  community.address.state = state;

  if (tag) {
    community.care = [...community.care, tag];
  }

  return { community, formattedAddress };
};

const verify = (wrapper) => {
  const {
    address, name,
  } = RhodaGoldmanPlaza;
  const {
    line1, line2, city, state, zip,
  } = address;

  const renderedAddress = wrapper.find('Block[pad="xs"]').at(1).render().text();
  expect(renderedAddress).toContain(line1);
  expect(renderedAddress).toContain(line2);
  expect(renderedAddress).toContain(city);
  expect(renderedAddress).toContain(state);
  expect(renderedAddress).toContain(zip);
  expect(wrapper.find('h1').render().text()).toContain(name);
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
    expect(wrapper.find('h1 Link')).toHaveLength(2);
  });

  it('Should render the care types tags for state Delaware', () => {
    const community = getCommunity('DE');
    const wrapper = wrap({
      ...community,
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
      ...community,
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
      ...community,
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
      ...community,
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
      ...community,
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
