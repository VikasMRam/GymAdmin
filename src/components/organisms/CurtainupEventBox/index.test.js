import React from 'react';
import { shallow } from 'enzyme';
import dayjs from 'dayjs';

import CurtainupEventBox from 'sly/components/organisms/CurtainupEventBox';
import { assetPath } from 'sly/components/themes';

// todo: replace with json dump when api is ready
const performers = [
  {
    name: 'Jackie Burns',
    description: '"Wicked," "Hair," "If/Then"',
    gallery: {
      id: 'dsfdsfs',
      images: [
        {
          id: 'sdfsdfsd',
          name: 'arthur.png',
          path: assetPath('images/curtainup/arthur.png'),
        },
      ],
    },
  },
  {
    name: 'Jackie Burns 1',
    description: '"Wicked," "Hair," "If/Then"',
    gallery: {
      id: 'dsfdsfs',
      images: [
        {
          id: 'sdfsdfsd',
          name: 'arthur.png',
          path: assetPath('images/curtainup/arthur.png'),
        },
      ],
    },
  },
  {
    name: 'Jackie Burns 2',
    description: '"Wicked," "Hair," "If/Then"',
    gallery: {
      id: 'dsfdsfs',
      images: [
        {
          id: 'sdfsdfsd',
          name: 'arthur.png',
          path: assetPath('images/curtainup/arthur.png'),
        },
      ],
    },
  },
];
const date = '2020-04-02T08:02:17-05:00';
const defaultProps = {
  date,
  performers,
};
const wrap = (props = {}) => shallow(<CurtainupEventBox {...defaultProps} {...props} />);
const parsedDate = dayjs(date);
const month = parsedDate.format('MMM');
const day = parsedDate.format('D');
const dayName = parsedDate.format('dddd');

describe('CreatePasswordForm', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ childred: 'test' });
    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();
    const header = wrapper.find('Header');
    const performerWrappers = wrapper.find('PerformerWrapper');

    expect(header.contains(day)).toBeTruthy();
    expect(header.contains(month)).toBeTruthy();
    expect(header.contains(dayName)).toBeTruthy();
    expect(performerWrappers).toHaveLength(performers.length);
    performerWrappers.forEach((pw, i) => {
      expect(pw.contains(performers[i].name)).toBeTruthy();
      expect(pw.contains(performers[i].description)).toBeTruthy();
    });
  });
});
