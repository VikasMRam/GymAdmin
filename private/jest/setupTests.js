import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@babel/polyfill';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';

configure({ adapter: new Adapter() });

dayjs.extend(advancedFormat);
dayjs.extend(utc);

/* eslint-disable-next-line no-console */
console.error = (message) => {
  throw new Error(message);
};
