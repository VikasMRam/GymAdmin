import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { render } from 'react-native-testing-library';

import theme from 'sly/web/components/themes/default';

// react-test-render unlike enzyme won't work without theme provider.
// for more info check: https://github.com/styled-components/jest-styled-components/issues/119#issuecomment-537858665

const renderWithTheme = tree => render(
  <ThemeProvider theme={theme}>
    {tree}
  </ThemeProvider>,
);

export default renderWithTheme;
