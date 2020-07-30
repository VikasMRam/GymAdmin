import { publicPath } from 'sly/web/config';
import styles from 'sly/common/components/themes/default';

const baseColor = styles.palette.slate.base;

export default `
  @font-face {
    font-display: fallback;
    font-family: 'Azo Sans';
    src: url('${publicPath}/fonts/azo/azosans-medium-TEMP-REPLACEME-webfont.woff2') format('woff2'),
         url('${publicPath}/fonts/azo/azosans-medium-TEMP-REPLACEME-webfont.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-display: fallback;
    font-family: 'Azo Sans';
    src: url('${publicPath}/fonts/azo/azosans-regular-webfont.woff2') format('woff2'),
         url('${publicPath}/fonts/azo/azosans-regular-webfont.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-display: fallback;
    font-family: 'Azo Sans';
    src: url('${publicPath}/fonts/azo/azosans-light-webfont.woff2') format('woff2'),
         url('${publicPath}/fonts/azo/azosans-light-webfont.woff') format('woff');
    font-weight: 300;
    font-style: normal;
  }

  html, body {
    background: white;
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

  html pre {
    font-family: Consolas, Liberation Mono, Menlo, Courier, monospace;
  }

  // for IE
  header, nav, main, article, section, aside, footer {
    display: block;
  }

  a {
    background-color: transparent;
  }

  input[type=search]{
    -moz-appearance: none;/* older firefox */
    -webkit-appearance: none; /* safari, chrome, edge and ie mobile */
    appearance: none; /* rest */
  }
`;
