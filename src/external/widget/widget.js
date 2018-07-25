/* eslint-disable */
(function () {
  var Seniorly = {
    cssId: 'seniorly-widget-style',
    scriptId: 'seniorly-widget-script',
    context: {
      cssFileUrl: process.env.EXTERNAL_ASSET_URL + '/widget.css',
      iframeUrl: process.env.EXTERNAL_WIZARDS_ROOT_URL,
      env: process.env.SLY_ENV,
    },
    config: {},
    widgetClassName: {
      badge: 'seniorly-badge-widget',
      overlay: 'seniorly-overlay-widget',
      closeOverlay: 'seniorly-close-overlay-widget',
      closeOverlayButton: 'seniorly-close-overlay-button-widget',
      popup: 'seniorly-popup-widget',
    },
    altClassNames: {
      scrollLocked: 'seniorly-page-scroll-locked',
    },
    validWidgetConfig: {
      type: ['badge', 'popupOnClick'],
    },
    defaultWidgetConfig: {
      type: 'badge',
    },
    widgetConfigAttributes: {
      type: 'data-widget-type',
      triggerPopupWidget: 'data-open-seniorly-popup-onclick',
    },
    log: {
      prefix: '[Seniorly Widget]',
      error: (msg) => {
        console.error(`${Seniorly.log.prefix} ${msg}`);
      },
      warn: (msg) => {
        console.warn(`${Seniorly.log.prefix} ${msg}`);
      },
      debug: (msg) => {
        if (Seniorly.context.env === 'development') {
          console.log(`${Seniorly.log.prefix} ${msg}`);
        }
      },
    },
    widgetInstances: {},

    populateContextAndConfig: function() {
      const script = document.getElementById(this.scriptId);
      this.context.pageRoot = document.getElementsByTagName('html')[0];
      this.config.type = script.getAttribute(this.widgetConfigAttributes.type) || this.defaultWidgetConfig.type;
    },

    validateConfig: function() {
      let hasError = false;
      Object.keys(this.config).forEach((config) => {
        if (!this.validWidgetConfig[config] || this.validWidgetConfig[config].indexOf(this.config[config]) === -1) {
          this.log.error(`Invalid config value: ${this.config[config]} for config key: ${config}`);
          hasError = true;
        }
      });
      return hasError;
    },

    injectStyles: function() {
      if (!document.getElementById(this.cssId)) {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = this.cssId;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = this.context.cssFileUrl;
        link.media = 'all';
        head.appendChild(link);
      }
    },

    initWidget: function() {
      this.populateContextAndConfig();
      const hasError = this.validateConfig();
      if (hasError) {
        this.log.warn('Failed to initialize Seniorly widget');
      } else {
        this.injectStyles();
        const widget = this.widgets[this.config.type]();
        widget.build();
        widget.insert();
      }
    },
  };

  const SeniorlyWidget = function(type, options) {
    this.widget = {};
    this.type = type;
    this.options = options || {};
  };
  SeniorlyWidget.prototype.build = function() {
    this.widget = document.createElement('div');
    this.widget.className = 'seniorly-widget ' + Seniorly.widgetClassName[this.type];
    this.widget.onclick = this.options.onClick;
    const childContent = this.buildContent(this.type);
    if (childContent) {
      this.widget.appendChild(childContent);
    }
    return this.widget;
  };
  SeniorlyWidget.prototype.buildContent = function() {};
  SeniorlyWidget.prototype.insert = function(parent) {
    const newNode = parent ? parent.appendChild(this.widget) : document.body.insertBefore(this.widget, document.body.firstChild);
    if (this.options.afterInsert) {
      this.options.afterInsert();
    }
    Seniorly.widgetInstances[this.type] = this;
    return newNode;
  };
  SeniorlyWidget.prototype.destroy = function() {
    const oldNode = document.body.removeChild(this.widget);
    if (this.options.afterDestory) {
      this.options.afterDestory();
    }
    return oldNode;
  };

  Seniorly.widgets = {
    badge: function() {
      const w = new SeniorlyWidget('badge', {
        onClick: function() {
          const w = Seniorly.widgets.popup();
          w.build();
          w.insert(document.getElementsByClassName(Seniorly.widgetClassName.overlay)[0]);
        },
      });
      w.buildContent = function() {
        const t = document.createElement('span');
        t.innerHTML = 'Care Assesment Wizard<br>Powered by Seniorly';
        return t;
      };
      return w;
    },
    popupOnClick: function() {
      const w = new SeniorlyWidget('popupOnClick');
      w.buildContent = function() {
        var matches = document.querySelectorAll(`[${Seniorly.widgetConfigAttributes.triggerPopupWidget}]`);
        matches.forEach(function(match) {
          match.onclick = function() {
            const w = Seniorly.widgets.popup();
            w.build();
            w.insert(document.getElementsByClassName(Seniorly.widgetClassName.overlay)[0]);
          };
        });
      };
      return w;
    },
    overlay: function() {
      const w = new SeniorlyWidget('overlay', {
        afterInsert: function() {
          Seniorly.context.pageRoot.classList.add(Seniorly.altClassNames.scrollLocked);
        },
        afterDestory: function() {
          Seniorly.context.pageRoot.classList.remove(Seniorly.altClassNames.scrollLocked);
        },
      });
      return w;
    },
    closeOverlay: function() {
      return new SeniorlyWidget('closeOverlay', {
        onClick: function() {
          Seniorly.widgetInstances['overlay'].destroy();
        },
      });
    },
    closeOverlayButton: function() {
      const w = new SeniorlyWidget('closeOverlayButton', {
        onClick: function() {
          Seniorly.widgetInstances['overlay'].destroy();
        },
      })
      w.buildContent = function() {
        const t = document.createElement('button');
        t.type = 'button';
        t.innerHTML = process.env.CLOSE_ICON_SVG;
        return t;
      };
      return w;
    },
    popup: function() {
      const w = new SeniorlyWidget('popup');
      w.buildContent = () => {
        let w = this.overlay();
        w.build();
        w.insert();
        w = Seniorly.widgets.closeOverlay();
        w.build();
        w.insert(document.getElementsByClassName(Seniorly.widgetClassName.overlay)[0]);
        w = Seniorly.widgets.closeOverlayButton();
        w.build();
        w.insert(document.getElementsByClassName(Seniorly.widgetClassName.overlay)[0]);

        const t = document.createElement('iframe');
        t.src = Seniorly.context.iframeUrl + '/caw';
        t.width = '100%';
        t.height = '100%';
        t.frameBorder = '0';
        return t;
      };
      return w;
    },
  };

  Seniorly.startListeningForMessages = function() {
    // create IE + others compatible event handler
    var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
    var eventer = window[eventMethod];
    var messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';

    eventer(messageEvent, Seniorly.processMessages, false);
  };
  Seniorly.processMessages = function(e) {
    // don't even try to process messages sent from unknown sources
    if (Seniorly.context.iframeUrl.indexOf(e.origin) === -1) {
      return;
    }

    // since some old browsers support only string messages try decoding messsge.
    // if decoding fails log and continue
    try {
      var message = JSON.parse(e.data);
      switch(message.action) {
        case 'closePopup':
          Seniorly.widgetInstances['overlay'].destroy();
          break;
        default:
          Seniorly.log.debug('Unknown action in message from popup');
      }
    } catch (e) {
      Seniorly.log.warn('Failed to decode message from popup');
    }
  };

  document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
      Seniorly.initWidget();
      Seniorly.startListeningForMessages();
    }
  };
}).call(this);
