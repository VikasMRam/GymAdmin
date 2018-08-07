import setGlobalStyles from 'sly/components/themes/setGlobalStyles';
import { injectGlobal } from 'styled-components';

export default function addGlobalStyles() {
  setGlobalStyles();
  injectGlobal`
    html, body {
      width: 100%;
      height: 100%;
    }
  `;
}
