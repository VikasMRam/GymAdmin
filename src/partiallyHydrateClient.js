/* eslint-disable no-underscore-dangle */
import '@babel/polyfill';
import 'react-hot-loader/patch';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ServerStateProvider } from 'react-router-server';
import Modal from 'react-modal';
import { ApiProvider, createApi } from 'sly/services/newApi';
import configureStore from 'sly/store/configure';
import theme from 'sly/components/themes/default';
import api from 'sly/services/api';
import WSProvider from 'sly/services/ws/WSProvider';
import NotificationSubscriptions from 'sly/services/notifications/Subscriptions';
import { hydrateComponents } from 'sly/partialHydration';
import { ThemeProvider } from 'styled-components';
import { withRouter } from 'react-router';

export default function partiallyHydrateClient(componentsToHydrate, root) {
  const serverState = window.__SERVER_STATE__;
  const initialState = window.__INITIAL_STATE__;
  const store = configureStore(initialState, { api: api.create() });

  const beesApi = createApi();

  Modal.setAppElement('#app');

  const ForceHardRedirectProvider = withRouter(
    class ForceHardRedirect extends React.Component {
      constructor(props) {
        super(props);

        this.props.history.listen((location) => {
          window.location.reload();
        });
      }
      render() {
        return this.props.children;
      }
    }
  );

  const Providers = ({ children }) => (
    <ServerStateProvider state={serverState}>
      <ApiProvider api={beesApi}>
        <Provider store={store}>
          {/* <WSProvider> */}
          {/*  <NotificationSubscriptions> */}
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <ForceHardRedirectProvider>{children}</ForceHardRedirectProvider>
            </BrowserRouter>
          </ThemeProvider>
          {/* </NotificationSubscriptions> */}
          {/* </WSProvider> */}
        </Provider>
      </ApiProvider>
    </ServerStateProvider>
  );

  hydrateComponents(componentsToHydrate, root, Providers);
}
