import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components';

import { publicPath } from 'sly/web/config';
import GlobalStyles from 'sly/web/components/themes/GlobalStyles';
import { iconToComponent } from 'sly/common/system/Icon';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;
    const iconsContext = {};
    const sheet = new ServerStyleSheet();
    ctx.renderPage = () =>
      originalRenderPage({
        // useful for wrapping the whole react tree
        enhanceApp: App => props => sheet.collectStyles(<App iconsContext={iconsContext} {...props} />),
        // useful for wrapping in a per-page basis
        enhanceComponent: Component => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);
    const styleElements = sheet.getStyleElement();

    return {
      ...initialProps,
      styleElements,
      iconsContext,
    };
  }

  render() {
    const { iconsContext, styleElements } = this.props;
    return (
      <Html>
        <Head>
          {styleElements}
          <link rel="preload" href={`${publicPath}/fonts/TiemposHeadline-Medium.woff2`} as="font" crossOrigin="anonymous" />
          <link rel="preload" href={`${publicPath}/fonts/azo/azosans-medium-TEMP-REPLACEME-webfont.woff2`} as="font" crossOrigin="anonymous" />
          <link rel="preload" href={`${publicPath}/fonts/azo/azosans-regular-webfont.woff2`} as="font" crossOrigin="anonymous" />
          <link rel="preload" href={`${publicPath}/fonts/azo/azosans-bold-webfont.woff2`} as="font" crossOrigin="anonymous" />
          <style type="text/css">{GlobalStyles}</style>
        </Head>
        <body>
          <Main />
          {iconToComponent(iconsContext)}
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
