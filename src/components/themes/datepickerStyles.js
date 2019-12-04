// import { injectGlobal } from 'styled-components';

export default function setDatepickerStyles() {
  let css;
  try {
    // eslint-disable-next-line import/no-webpack-loader-syntax
    css = require('!raw-loader!./react-datepicker.css');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('datepicker CSS file not found: ', e);
  }
  // injectGlobal`${css}`;
}
