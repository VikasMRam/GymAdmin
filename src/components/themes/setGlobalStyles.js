import { injectGlobal } from 'styled-components';
import styles from './default';

import { publicPath } from 'sly/config';

const baseColor = styles.palette.slate[0];

export default function setGlobalStyles() {
  injectGlobal`
    @font-face {
      font-family: 'Azo Sans';
      src: url('${publicPath}/fonts/azo/azosans-bold-webfont.woff2') format('woff2'),
           url('${publicPath}/fonts/azo/azosans-bold-webfont.woff') format('woff');
      font-weight: 700;
      font-style: normal;
    }

    @font-face {
      font-family: 'Azo Sans';
      src: url('${publicPath}/fonts/azo/azosans-regular-webfont.woff2') format('woff2'),
           url('${publicPath}/fonts/azo/azosans-regular-webfont.woff') format('woff');
      font-weight: 400;
      font-style: normal;
    }

    @font-face {
      font-family: 'Azo Sans';
      src: url('${publicPath}/fonts/azo/azosans-light-webfont.woff2') format('woff2'),
           url('${publicPath}/fonts/azo/azosans-light-webfont.woff') format('woff');
      font-weight: 300;
      font-style: normal;
    }

    html, body {
      color: ${baseColor};
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
      padding: 0;
      margin: 0;
    }

    html * {
      font-family: Azo Sans, Helvetica Neue, Helvetica, Roboto, sans-serif;
      box-sizing: border-box;
    }

    // for IE
    header, nav, main, article, section, aside, footer {
      display: block;
    }

    a {
      background-color: transparent;
    }
  `;
}
