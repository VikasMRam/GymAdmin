import { useMemo } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { BreakpointProvider } from 'sly/web/components/helpers/breakpoint';
import { NotificationProvider } from 'sly/web/components/helpers/notification';
import { IconContext } from 'sly/common/system/Icon';
import { ApiProvider } from 'sly/web/services/api';

import { createApiClient } from 'sly/web/services/api';
import configureStore from 'sly/web/store/configure';
import theme from 'sly/common/system/theme';
// For Lazy loading images, used in ResponsiveImage
import 'sly/web/services/yall';

function MyApp({ Component, pageProps, iconsContext={} }) {
  const { initialApiState } = pageProps;
  const apiContext = useMemo(() => ({
    apiClient: createApiClient({ initialState: initialApiState }),
    skipApiCalls: false,
  }), []);
  const store = useMemo(() => configureStore({}, { apiStore: apiContext.apiClient.store }), []);

  return (
    <ApiProvider value={apiContext}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <IconContext.Provider value={iconsContext}>
            <BreakpointProvider>
              <NotificationProvider>
                <Component {...pageProps} />
              </NotificationProvider>
            </BreakpointProvider>
          </IconContext.Provider>
        </ThemeProvider>
      </Provider>
    </ApiProvider>
  );
}

export default MyApp
