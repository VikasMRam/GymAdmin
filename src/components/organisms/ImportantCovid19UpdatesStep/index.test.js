import React from 'react';
import { shallow } from 'enzyme';

import ImportantCovid19UpdatesStep from 'sly/components/organisms/ImportantCovid19UpdatesStep';

const buttons = [
  {
    text: 'Get information about in-home caregivers if you are interested in delaying your move',
    props: {
      onClick: jest.fn(),
      ghost: true,
    },
  },
];
const defaultProps = {
  buttons,
};
const wrap = (props = {}) => shallow(<ImportantCovid19UpdatesStep {...defaultProps} {...props} />);

describe('ImportantCovid19UpdatesStep', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const cityName = 'cityName';
    const wrapper = wrap({ cityName });
    const renderedButtons = wrapper.find('Button');

    expect(wrapper.find('TextAlignCenterHeading').text()).toContain(cityName);
    expect(renderedButtons).toHaveLength(buttons.length);
    renderedButtons.forEach((b, i) => {
      expect(b.contains(buttons[i].text)).toBeTruthy();
    });
  });

  it('renders without cityName', () => {
    const wrapper = wrap();
    const renderedButtons = wrapper.find('Button');

    expect(wrapper.find('TextAlignCenterHeading')).toHaveLength(1);
    expect(renderedButtons).toHaveLength(buttons.length);
    renderedButtons.forEach((b, i) => {
      expect(b.contains(buttons[i].text)).toBeTruthy();
    });
  });
});
