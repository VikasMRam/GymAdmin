import { publicPath } from 'sly/web/config';

const baseColor = '#121c2b';

export default `
  @font-face {
    font-display: swap;
    font-family: 'Tiempos Headline';
    src: url('${publicPath}/fonts/TiemposHeadline-Medium.woff2') format('woff2'),
         url('${publicPath}/fonts/TiemposHeadline-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-display: swap;
    font-family: 'Azo Sans';
    src: url('${publicPath}/fonts/azo/azosans-bold-webfont.woff2') format('woff2'),
         url('${publicPath}/fonts/azo/azosans-bold-webfont.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-display: swap;
    font-family: 'Azo Sans';
    src: url('${publicPath}/fonts/azo/azosans-medium-TEMP-REPLACEME-webfont.woff2') format('woff2'),
         url('${publicPath}/fonts/azo/azosans-medium-TEMP-REPLACEME-webfont.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-display: swap;
    font-family: 'Azo Sans';
    src: url('${publicPath}/fonts/azo/azosans-regular-webfont.woff2') format('woff2'),
         url('${publicPath}/fonts/azo/azosans-regular-webfont.woff') format('woff');
    font-weight: 400;
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
    box-sizing: border-box;
    margin: 0;
  }

  body {
    font-family: Azo Sans, Helvetica Neue, Helvetica, Roboto, sans-serif;
  }

  pre, code {
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

  svg[data-sly-svgs] {
    display: none;
  }
`;
