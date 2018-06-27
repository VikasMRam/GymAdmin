import React, { Component } from 'react';

import { isBrowser } from 'sly/config';

if(isBrowser) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://assets.calendly.com/assets/external/widget.js';
  document.body.appendChild(script);
}

const sf = [
  'https://calendly.com/agentsf1/15min',
  'https://calendly.com/agentsf/15min',
];

const la = [
  'https://calendly.com/agentla1/15min',
  'https://calendly.com/agentla/15min',
];

const getDataUrl = community => {
  const which = Math.round(Math.random())
  const isSf = community.url
    .indexOf('california/san-francisco') !== -1;
  return isSf
    ? sf[which]
    : la[which];
}

export default class CalendlyAppointment  extends Component {
  componentDidMount() {
    if(isBrowser) {
      if (window.Calendly) {
        Calendly.initInlineWidgets();
      } else {
        document.addEventListener('DOMContentLoaded', () => {
          Calendly.initInlineWidgets();
        });
      }
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { community } = this.props;

    const style = {
      minWidth: '320px',
      height: '900px',
    };

    return (
      <div
        className="calendly-inline-widget"
        data-url={getDataUrl(community)}
        style={style}
      />
    );
  }
}
