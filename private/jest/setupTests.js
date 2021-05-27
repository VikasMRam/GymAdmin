import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

process.env = Object.assign(process.env, {
  SLY_ENV: 'test',
});

/* eslint-disable-next-line no-console */
console.error = (message) => {
  throw new Error(message);
};

configure({ adapter: new Adapter() });
