/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { googleTagManagerId, googleAppId, version, publicPath, assetsUrl, gMapsApiKey } from 'sly/web/config';
import { iconToComponent } from 'sly/common/system/Icon';

const Html = ({
  linkElements, styleElements, scriptElements, iconsContext, state, content,
}) => {
  const helmet = Helmet.renderStatic();
  const htmlAttrs = helmet.htmlAttributes.toComponent();
  const bodyAttrs = helmet.bodyAttributes.toComponent();

  return (
    <html lang="en" {...htmlAttrs}>
      <head>
        {helmet.link.toComponent()}
        <meta name="sly-version" content={version} />
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}

        {/*
          Google Platform Library
        */}
        <meta name="google-signin-client_id" content={googleAppId} />
        <link rel="preconnect" href="https://event.seniorly.com" />
        <link rel="preconnect" href="https://apis.google.com" />
        <link rel="preconnect" href={assetsUrl} />

        <link rel="preload" href={`${publicPath}/fonts/TiemposHeadline-Medium.woff2`} as="font" crossOrigin="anonymous" />
        <link rel="preload" href={`${publicPath}/fonts/azo/azosans-medium-TEMP-REPLACEME-webfont.woff2`} as="font" crossOrigin="anonymous" />
        <link rel="preload" href={`${publicPath}/fonts/azo/azosans-regular-webfont.woff2`} as="font" crossOrigin="anonymous" />
        <link rel="preload" href={`${publicPath}/fonts/azo/azosans-bold-webfont.woff2`} as="font" crossOrigin="anonymous" />

        {linkElements}
        {styleElements}
        {helmet.style.toComponent()}
        {helmet.script.toComponent()}
      </head>
      <body {...bodyAttrs}>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
        {iconToComponent(iconsContext)}
        {state.trim().length > 0 && <script type="text/javascript" dangerouslySetInnerHTML={{ __html: state }} />}
        {scriptElements}
        {/* eslint-disable */}

        {/* Google Tag Manager */}
        <script type="text/javascript" defer dangerouslySetInnerHTML={{ __html: `
          setTimeout(function(){
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${googleTagManagerId}');
          },8000)
        `}}></script>
        <noscript>
          {`<iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}" height="0" width="0" />`}
        </noscript>
        {/* End Google Tag Manager */}

        {/* Begin Google Platform Library Code */}
        <script type="text/javascript" defer dangerouslySetInnerHTML={{ __html: `
          (function(s,d,r) {
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s);
            j.defer=true;j.src=r;f.parentNode.insertBefore(j,f);
          })('script', document, 'https://apis.google.com/js/platform.js');
        `}}></script>
        {/* End Google Platform Library Code */}
        {/* eslint-enable */}

        {/* <script id="google-map-script" src={`https://maps.googleapis.com/maps/api/js?key=${gMapsApiKey}&libraries=places`} /> */}
      </body>
    </html>
  );
};

Html.propTypes = {
  linkElements: PropTypes.array.isRequired,
  styleElements: PropTypes.array.isRequired,
  scriptElements: PropTypes.array.isRequired,
  state: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  iconsContext: PropTypes.object,
};

export default Html;
