import { injectGlobal } from 'styled-components';

export default function setGlobalStyles() {
  injectGlobal`
    @font-face {
      font-family: 'Azo Sans';
      src: url('/fonts/azo/azosans-bold-webfont.eot');
      src: url('/fonts/azo/azosans-bold-webfont.eot?#iefix') format('embedded-opentype'),
           url('/fonts/azo/azosans-bold-webfont.woff2') format('woff2'),
           url('/fonts/azo/azosans-bold-webfont.woff') format('woff'),
           url('/fonts/azo/azosans-bold-webfont.ttf') format('truetype'),
           url('/fonts/azo/azosans-bold-webfont.svg#azo_sansbold') format('svg');
      font-weight: 700;
      font-style: normal;
    }

    @font-face {
      font-family: 'Azo Sans';
      src: url('/fonts/azo/azosans-regular-webfont.eot');
      src: url('/fonts/azo/azosans-regular-webfont.eot?#iefix') format('embedded-opentype'),
           url('/fonts/azo/azosans-regular-webfont.woff2') format('woff2'),
           url('/fonts/azo/azosans-regular-webfont.woff') format('woff'),
           url('/fonts/azo/azosans-regular-webfont.ttf') format('truetype'),
           url('/fonts/azo/azosans-regular-webfont.svg#azo_sansbold') format('svg');
      font-weight: normal;
      font-style: normal;
    }

    @font-face {
      font-family: 'Azo Sans';
      src: url('/fonts/azo/azosans-light-webfont.eot');
      src: url('/fonts/azo/azosans-light-webfont.eot?#iefix') format('embedded-opentype'),
           url('/fonts/azo/azosans-light-webfont.woff2') format('woff2'),
           url('/fonts/azo/azosans-light-webfont.woff') format('woff'),
           url('/fonts/azo/azosans-light-webfont.ttf') format('truetype'),
           url('/fonts/azo/azosans-light-webfont.svg#azo_sansbold') format('svg');
      font-weight: 300;
      font-style: normal;
    }

    body {
      margin: 0;
      font-size: 16px;
    }

    html * {
      font-weight: 400;
      font-size: 16px;
      font-family: Azo Sans, Helvetica Neue, Helvetica, Roboto, sans-serif;
    }
  `;
}

