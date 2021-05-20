import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

process.env = Object.assign(process.env, {
  SLY_ENV: 'test',
});

/* eslint-disable-next-line no-console */
console.error = (message) => {
  throw new Error(message);
};

configure({ adapter: new Adapter() });
