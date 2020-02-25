import React from 'react';
import { shallow } from 'enzyme';

import ConversionWizardInfoStep from 'sly/components/organisms/ConversionWizardInfoStep';

const heading = 'heading';
const description = 'description';
const button1Text = 'button1Text';
const button2Text = 'button2Text';
const points = [
  'point1',
  'point2',
];

const defaultProps = {
  heading,
  description,
  button1Text,
  button2Text,
  points,
};
const wrap = (props = {}) => shallow(<ConversionWizardInfoStep {...defaultProps} {...props} />);

describe('ConversionWizardInfoStep', () => {
  it('renders', () => {
    const wrapper = wrap();
    const renderedPoints = wrapper.find('ListItem');

    expect(wrapper.find('PaddedHeading').contains(heading)).toBeTruthy();
    expect(wrapper.find('PaddedBlock').contains(description)).toBeTruthy();
    expect(renderedPoints).toHaveLength(points.length);
    renderedPoints.forEach((p, i) => {
      expect(p.contains(points[i])).toBeTruthy();
    });
  });
});
