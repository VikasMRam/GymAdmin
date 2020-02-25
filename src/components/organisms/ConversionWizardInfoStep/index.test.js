import React from 'react';
import { shallow } from 'enzyme';

import ConversionWizardInfoStep from 'sly/components/organisms/ConversionWizardInfoStep';

const heading = 'heading';
const description = 'description';
const buttons = [
  { text: 'I qualify for Medicaid', onClick: jest.fn() },
  { text: 'I do NOT qualify for Medicaid', onClick: jest.fn() },
];
const points = [
  'point1',
  'point2',
];

const defaultProps = {
  heading,
  description,
  buttons,
  points,
};
const wrap = (props = {}) => shallow(<ConversionWizardInfoStep {...defaultProps} {...props} />);

describe('ConversionWizardInfoStep', () => {
  it('renders', () => {
    const wrapper = wrap();
    const renderedPoints = wrapper.find('ListItem');
    const renderedButtons = wrapper.find('Button');

    expect(wrapper.find('PaddedHeading').contains(heading)).toBeTruthy();
    expect(wrapper.find('PaddedBlock').contains(description)).toBeTruthy();
    expect(renderedPoints).toHaveLength(points.length);
    renderedPoints.forEach((p, i) => {
      expect(p.contains(points[i])).toBeTruthy();
    });
    expect(renderedButtons).toHaveLength(buttons.length);
    renderedButtons.forEach((b, i) => {
      expect(b.contains(buttons[i].text)).toBeTruthy();
    });
  });
});
