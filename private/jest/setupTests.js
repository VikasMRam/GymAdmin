import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import util from 'util';

process.env = Object.assign(process.env, {
  SLY_ENV: 'test',
});

/* eslint-disable-next-line no-console */
console.error = (error, ...args) => {
  if (args.length && typeof error === 'string') {
    throw new Error(util.format(error, ...args));
  }
  throw new Error(error);
};

configure({ adapter: new Adapter() });
