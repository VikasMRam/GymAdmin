import { createGlobalStyle } from 'styled-components';

let css;
try {
  // eslint-disable-next-line import/no-webpack-loader-syntax,import/no-unresolved
  css = require('!raw-loader!./react-datepicker.css').default;
} catch (e) {
  // eslint-disable-next-line no-console
  console.error(`datepicker CSS file not found: ${e.message} ${e.stack}`);
}

export default createGlobalStyle`${css}`;
