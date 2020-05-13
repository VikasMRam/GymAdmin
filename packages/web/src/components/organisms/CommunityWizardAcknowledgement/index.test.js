import React from 'react';
import { shallow } from 'enzyme';

import CommunityWizardAcknowledgement from 'sly/web/components/organisms/CommunityWizardAcknowledgement';
import RhodaGoldmanPlaza from 'sly/web/../private/storybook/sample-data/property-rhoda-goldman-plaza.json';

const { similarProperties } = RhodaGoldmanPlaza;

const buttonTo = 'www.teamseniorly.com';
const buttonText = 'Take me to my dashboard';
const heading = 'temp heading';
const subheading = 'temp subheading';

const defaultProps = {
  buttonTo,
  buttonText,
  heading,
  subheading,
  similarCommunities: similarProperties,
};

const wrap = (props = {}) => shallow(<CommunityWizardAcknowledgement {...defaultProps} {...props} />);

describe('CommunityWizardAcknowledgement', () => {
  it('does not render passed children', () => {
    const wrapper = wrap({ children: 'test' });

    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();
    const button = wrapper.find('StyledButton');

    expect(wrapper.contains(heading)).toBeTruthy();
    expect(wrapper.contains(subheading)).toBeTruthy();
    expect(button.contains(buttonText)).toBeTruthy();
    expect(button.prop('href')).toEqual(buttonTo);
    expect(wrapper.find('SimilarCommunities').prop('communities')).toEqual(similarProperties);
  });
});
