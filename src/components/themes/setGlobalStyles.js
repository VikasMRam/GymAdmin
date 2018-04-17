import { injectGlobal } from 'styled-components';
import { palette } from 'styled-theme';
import styles from './default';

import { assetHost, publicPath } from 'sly/config';

const baseColor = styles.palette.grayscale[0];

export default function setGlobalStyles() {
  injectGlobal`
    @font-face {
      font-family: 'Azo Sans';
      src: url('${assetHost}${publicPath}/fonts/azo/azosans-bold-webfont.woff2') format('woff2'),
           url('${assetHost}${publicPath}/fonts/azo/azosans-bold-webfont.woff') format('woff');
      font-weight: 700;
      font-style: normal;
    }

    @font-face {
      font-family: 'Azo Sans';
      src: url('${assetHost}${publicPath}/fonts/azo/azosans-regular-webfont.woff2') format('woff2'),
           url('${assetHost}${publicPath}/fonts/azo/azosans-regular-webfont.woff') format('woff');
      font-weight: 400;
      font-style: normal;
    }

    @font-face {
      font-family: 'Azo Sans';
      src: url('${assetHost}${publicPath}/fonts/azo/azosans-light-webfont.woff2') format('woff2'),
           url('${assetHost}${publicPath}/fonts/azo/azosans-light-webfont.woff') format('woff');
      font-weight: 300;
      font-style: normal;
    }

    body {
      color: ${baseColor}; 
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
    }

    html * {
      font-family: Azo Sans, Helvetica Neue, Helvetica, Roboto, sans-serif;
      box-sizing: border-box;
    }
  `;
}
