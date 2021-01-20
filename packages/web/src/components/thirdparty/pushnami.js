/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import Helmet from 'react-helmet';


export default class Pushnami extends Component {
  render() {
    return (
      <>
        <Helmet>
          <link rel="manifest" href="/manifest.json" />
        </Helmet>
        <script
          defer
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: `
          setTimeout(() => {
          (function(document, window){
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "https://api.pushnami.com/scripts/v1/pushnami-adv/5fd13e248c7c1700129ed62a";
            script.onload = function() {
                Pushnami
                    .update()
                    .prompt({"delay":1500});
            };
            document.getElementsByTagName("head")[0].appendChild(script);
            console.log('this is being run');
        })(document, window);
      }, 5000);
          ` }}
        />
      </>
    );
  }
}
