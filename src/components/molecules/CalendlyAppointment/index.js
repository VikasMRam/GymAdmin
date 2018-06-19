import React, { Component } from 'react';

import { isBrowser } from 'sly/config';

if(isBrowser) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://assets.calendly.com/assets/external/widget.js';
  document.body.appendChild(script);
}

export default class CalendlyAppointment  extends Component {
  componentDidMount() {
    debugger;
    Calendly.initInlineWidgets();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const style = {
      minWidth: '320px',
      height: '900px',
    };

    return (
      <div
        className="calendly-inline-widget"
        data-url="https://calendly.com/seniorly_test"
        style={style}
      />
    );
  }
}
