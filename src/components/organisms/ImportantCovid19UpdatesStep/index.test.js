import React from 'react';
import { shallow } from 'enzyme';

import ImportantCovid19UpdatesStep from 'sly/components/organisms/ImportantCovid19UpdatesStep';

const buttons = [
  {
    label: 'Get information about senior living communities that are currently accepting new residents',
    value: 'admission-info',
  },
  {
    label: 'Get information about in-home caregivers if you are interested in delaying your move',
    value: 'in-home',
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
    const renderedButtons = wrapper.find('Field');

    expect(wrapper.find('TextAlignCenterHeading').text()).toContain(cityName);
    expect(renderedButtons).toHaveLength(buttons.length);
    renderedButtons.forEach((b, i) => {
      expect(b.contains(buttons[i].label)).toBeTruthy();
    });
  });

  it('renders without cityName', () => {
    const wrapper = wrap();
    const renderedButtons = wrapper.find('Field');

    expect(wrapper.find('TextAlignCenterHeading')).toHaveLength(1);
    expect(renderedButtons).toHaveLength(buttons.length);
    renderedButtons.forEach((b, i) => {
      expect(b.contains(buttons[i].label)).toBeTruthy();
    });
  });
});
