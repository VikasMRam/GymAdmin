import { injectGlobal } from 'styled-components';

import setGlobalStyles from 'sly/components/themes/setGlobalStyles';

export default function addGlobalStyles() {
  setGlobalStyles();
  // injectglobal`
  //   html, body, #app {
  //     width: 100%;
  //     height: 100%;
  //   }
  // `;
}
