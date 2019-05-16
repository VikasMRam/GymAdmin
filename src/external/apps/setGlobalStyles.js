import { injectGlobal } from 'styled-components';

import setGlobalStyles from 'sly/components/themes/setGlobalStyles';

export default function addGlobalStyles() {
  setGlobalStyles();
  injectGlobal`
    html, body, #app {
      width: 100%;
      height: 100%;
    }
  `;
}
