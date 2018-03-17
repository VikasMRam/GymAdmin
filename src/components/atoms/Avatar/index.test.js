import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Avatar from '.';

const wrap = (props = {}) => shallow(<Avatar {...props} />).dive();

const name = 'Fonz';
const picture = 'https://avatars.githubusercontent.com/u/113003';

describe('Avatar', () => {
  it('renders image when one passed', () => {
    const wrapper = wrap({ user: { name, picture } });
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('img').props()).toHaveProperty('src', picture);
  });

  it('renders first letter in the absence of picture', () => {
    const wrapper = wrap({ user: { name } });
    const div = wrapper.find('div');
    expect(div).toHaveLength(1);
    expect(div.props()).toHaveProperty('data-title', 'Fonz');
    expect(div.text()).toEqual('F');
  });

  describe('propTypes', () => {
    beforeEach(() => {
      sinon.stub(console, 'error');
    });
    afterEach(() => {
      console.error.restore();
    });
    it('does trigger a propType warning with no name', () => {
      wrap({ user: { picture } });
      expect(console.error.getCalls()).toHaveLength(1);
    });
    it('does not trigger a propType warning with no name', () => {
      wrap({ user: { name, picture } });
      expect(console.error.getCalls()).toHaveLength(0);
    });
  });
});
