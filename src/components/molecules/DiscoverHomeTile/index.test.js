import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { Block, Button } from 'sly/components/atoms';
import DiscoverHomeTile, { StyledHeading }
  from 'sly/components/molecules/DiscoverHomeTile';

const image =
  'https://d1qiigpe5txw4q.cloudfront.net/uploads/dbede7dcc263e098e3705e818b5ff463/RGP-June-2014_sd.jpg';
const title = 'test title';
const description = 'test description';
const buttonText = 'test buttonText';
const onButtonClick = sinon.spy();

const wrap = (props = {}) => shallow(<DiscoverHomeTile {...props} />);

describe('DiscoverHomeTile', () => {
  it('renders image', () => {
    const wrapper = wrap({
      image, title, description, buttonText, onButtonClick,
    });
    expect(wrapper.find('ResponsiveImage')).toHaveLength(1);
  });

  it('renders title', () => {
    const wrapper = wrap({
      image, title, description, buttonText, onButtonClick,
    });
    expect(wrapper.find(StyledHeading)).toHaveLength(1);
    expect(wrapper.find(StyledHeading).dive().dive()
      .render()
      .text()).toBe(title);
  });

  it('renders description', () => {
    const wrapper = wrap({
      image, title, description, buttonText, onButtonClick,
    });
    expect(wrapper.find(Block)).toHaveLength(1);
    expect(wrapper.find(Block).dive().render().text()).toBe(description);
  });

  it('renders buttonText', () => {
    const wrapper = wrap({
      image, title, description, buttonText, onButtonClick,
    });
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).dive().dive().render()
      .text()).toBe(buttonText);
  });

  it('onButtonClick fires', () => {
    const wrapper = wrap({
      image, title, description, buttonText, onButtonClick,
    });
    wrapper.find(Button).simulate('click');
    expect(onButtonClick.getCalls()).toHaveLength(1);
  });
});
