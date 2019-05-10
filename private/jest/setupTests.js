import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@babel/polyfill';

configure({ adapter: new Adapter() });

/* eslint-disable-next-line no-console */
console.error = (message) => {
  throw new Error(message);
};
