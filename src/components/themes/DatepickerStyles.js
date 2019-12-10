import { createGlobalStyle } from 'styled-components';

let css;
try {
  // eslint-disable-next-line import/no-webpack-loader-syntax,import/no-unresolved
  css = require('!raw-loader!./react-datepicker.css');
} catch (e) {
  // eslint-disable-next-line no-console
  console.error('datepicker CSS file not found: ', e);
}

export default createGlobalStyle`${css}`;
