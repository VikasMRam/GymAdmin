(function () {
  // IE polyfill for classList
  function hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    }
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }

  function addClass(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else if (!hasClass(el, className)) {
      el.className += " " + className;
    }
  }

  function removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else if (hasClass(el, className)) {
      var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
      el.className = el.className.replace(reg, ' ');
    }
  }

  // the public object available in global scope
  this.SeniorlyWidget = {
    version: null,
    created: new Date().toString(),
    instances: []
  };
  var global = this;

  var Seniorly = {
    cssId: 'seniorly-widget-style',
    context: {
      cssFileUrl: process.env.EXTERNAL_ASSET_URL + '/widget.css',
      jsFileUrl: process.env.EXTERNAL_ASSET_URL + '/widget.js',
      iframeUrl: process.env.EXTERNAL_URL,
      env: process.env.SLY_ENV,
      version: process.env.VERSION
    },
    altClassNames: {
      scrollLocked: 'seniorly-page-scroll-locked',
      inline: 'seniorly-inline-widget',
    },
    widgetClassName: {
      overlay: 'seniorly-overlay-widget',
      closeOverlay: 'seniorly-close-overlay-widget'
    },
    validWidgetConfig: {
      type: ['modal', 'inline'],
      widgetType: ['wizards/caw', 'search']
    },
    defaultWidgetConfig: {
      widgetType: process.env.EXTERNAL_DEFAULT_WIDGET_TYPE
    },
    widgetConfigAttributes: {
      type: 'data-seniorly-widget',
      widgetType: 'data-seniorly-widget-type',
      state: 'data-seniorly-state',
      city: 'data-seniorly-city',
      utm_campaign: 'data-seniorly-campaign',
      utm_source: 'data-seniorly-source',
      utm_medium: 'data-seniorly-medium',
      pixel: 'data-seniorly-pixel',
      height: 'data-seniorly-height'
    },
    log: {
      prefix: '[Seniorly Widget]',
      error: function(msg) {
        // eslint-disable-next-line no-console
        console.error(Seniorly.log.prefix + ' ' + msg);
      },
      warn: function(msg) {
        // eslint-disable-next-line no-console
        console.warn(Seniorly.log.prefix + ' ' + msg);
      },
      debug: function(msg) {
        if (Seniorly.context.env === 'development') {
          // eslint-disable-next-line no-console
          console.log(Seniorly.log.prefix + ' ' + msg);
        }
      }
    },
    // for storing references to instances of widgets. is a hash having widget type
    // as key and array of instances as value
    widgetInstances: {},

    populateContext: function() {
      Seniorly.context.pageRoot = document.getElementsByTagName('html')[0];
    },

    getInstances: function() {
      var matches = document.querySelectorAll('[' + Seniorly.widgetConfigAttributes.type + ']');
      var instances = [];
      var configKeys = Object.keys(Seniorly.widgetConfigAttributes);

      // old browsers don't have forEach method on Nodelist so...
      Array.prototype.forEach.call(matches, function(m) {
        var config = {};
        Object.keys(m.attributes).forEach(function(a) {
          var configKey;
          for (var i = 0; i < configKeys.length; i++) {
            if (Seniorly.widgetConfigAttributes[configKeys[i]] === m.attributes[a].name) {
              configKey = configKeys[i];
              break;
            }
          }
          if (configKey) {
            config[configKey] = m.attributes[a].value;
          }
        });
        // default values
        Object.keys(Seniorly.defaultWidgetConfig).forEach(function(c) {
          if (!config[c]) {
            config[c] = Seniorly.defaultWidgetConfig[c];
          }
        });
        var i = {
          config: config,
          elem: m
        };
        instances.push(i);
      });
      return instances;
    },

    validateConfig: function(configHash) {
      var hasError = false;
      Object.keys(configHash).forEach(function(config) {
        if (Seniorly.validWidgetConfig[config] &&
          Seniorly.validWidgetConfig[config].indexOf(configHash[config]) === -1) {
          Seniorly.log.error('Invalid config value: ' + configHash[config] + ' for config key: ' + config);
          hasError = true;
        }
      });
      return hasError;
    },

    injectStyles: function() {
      if (!document.getElementById(Seniorly.cssId)) {
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.id   = Seniorly.cssId;
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = Seniorly.context.cssFileUrl;
        link.media = 'all';
        head.appendChild(link);
      }
    },

    initWidget: function() {
      Seniorly.populateContext();
      var instances = Seniorly.getInstances();
      if (instances.length) {
        Seniorly.injectStyles();
      }
      global.SeniorlyWidget.instances = instances;
      global.SeniorlyWidget.version = Seniorly.context.version;
      instances.forEach(function(instance, i) {
        var hasError = Seniorly.validateConfig(instance.config);
        if (hasError) {
          Seniorly.log.warn('Failed to initialize Seniorly widget instance ' + (i + 1));
        } else {
          var widget = Seniorly.widgets[instance.config.type](instance);
          widget.build();
          widget.insert();
        }
      });
    }
  };

  /*
    SeniorlyWidget base object from which widgets are created.
    anything that is injected to third party site is a widget.eg: popup, inline
    A SeniorlyWidget will have build, buildContent, insert and destroy lifecylce methods.
      * build - creates widget dom elements. this calls buildContent to fetch widget dom node.
      * buildContent - where widget's dom elements can be created. The function can return a dom node
                       that's appended to document body. optionally this can also choose to not return anything
                       if nothing new needs to be added, for eg only attach some event handlers to existing dom
                       nodes.
      * insert - where widget is added to document body.
      * destroy - removes widget from document body. returns the removed node object.
  */
  var SeniorlyWidget = function(type, options) {
    this.widget = null;
    this.type = type;
    this.options = options || {};
  };
  SeniorlyWidget.prototype.build = function() {
    var childContent = this.buildContent(this.type);
    if (childContent || Seniorly.widgetClassName[this.type]) {
      this.widget = document.createElement('div');
      var className = Seniorly.widgetClassName[this.type] ?
        Seniorly.widgetClassName[this.type] : 'seniorly-' + this.type + '-widget';
      this.widget.className = 'seniorly-widget ' + className;
      this.widget.onclick = this.options.onClick;
      if (childContent) {
        this.widget.appendChild(childContent);
      }
    }
    return this.widget;
  };
  SeniorlyWidget.prototype.buildContent = function() {};
  SeniorlyWidget.prototype.insert = function(parent) {
    var newNode = null;
    if (this.widget) {
      newNode = parent ? parent.appendChild(this.widget) :
      document.body.insertBefore(this.widget, document.body.firstChild);
      if (!Seniorly.widgetInstances[this.type]) {
        Seniorly.widgetInstances[this.type] = [];
      }
      Seniorly.widgetInstances[this.type].push(this);
    }
    if (this.options.afterInsert) {
      this.options.afterInsert();
    }
    return newNode;
  };
  SeniorlyWidget.prototype.destroy = function() {
    var oldNode = null;
    if (this.widget) {
      oldNode = document.body.removeChild(this.widget);
    }
    // find this instance and remove it from active instances
    for (var i = 0; i < Seniorly.widgetInstances[this.type].length; i++) {
      // comparison by reference is exactly what we want here
      if (Seniorly.widgetInstances[this.type][i] === this) {
        Seniorly.widgetInstances[this.type].splice(i, 1);
        break;
      }
    }
    if (this.options.afterDestory) {
      this.options.afterDestory();
    }
    return oldNode;
  };

  Seniorly.helpers = {
    serialize: function(obj) {
      var str = [];
      for (var p in obj) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
      return str.join('&');
    },
    generateIframe: function(widgetType, params) {
      var skipAttributes = ['type', 'widgetType'];
      var iframeParams = {}
      var t = document.createElement('iframe');

      Object.keys(params).forEach(function(p) {
        if (skipAttributes.indexOf(p) === -1) {
          iframeParams[p] = params[p];
        }
      });
      var qs = Seniorly.helpers.serialize(iframeParams);
      t.src = Seniorly.context.iframeUrl + '/' + params.widgetType + '?fromWidgetType=' + widgetType +
        (qs.length ? '&' + qs : '');
      t.width = '100%';
      t.height = '100%';
      t.frameBorder = '0';
      return t;
    }
  };

  Seniorly.widgets = {
    modal: function(instance) {
      var w = new SeniorlyWidget('modal');
      w.buildContent = function() {
        instance.elem.onclick = function() {
          var w = Seniorly.widgets.popup(instance);
          w.build();
          w.insert(document.getElementsByClassName(Seniorly.widgetClassName.overlay)[0]);
        };
      };
      return w;
    },
    inline: function(instance) {
      var w = new SeniorlyWidget('inline');
      w.buildContent = function() {
        var i = Seniorly.helpers.generateIframe('inline', instance.config);
        instance.elem.innerHTML = '';
        instance.elem.appendChild(i);
        addClass(instance.elem, Seniorly.altClassNames.inline);
        if (instance.config.height) {
          instance.elem.style.height = instance.config.height + 'px';
        }
      };
      return w;
    },
    overlay: function() {
      var w = new SeniorlyWidget('overlay', {
        afterInsert: function() {
          addClass(Seniorly.context.pageRoot, Seniorly.altClassNames.scrollLocked);
        },
        afterDestory: function() {
          removeClass(Seniorly.context.pageRoot, Seniorly.altClassNames.scrollLocked);
        }
      });
      return w;
    },
    closeOverlay: function() {
      return new SeniorlyWidget('closeOverlay', {
        onClick: function() {
          // it's a fair assumption that only one instance of overlay widget will be active
          Seniorly.widgetInstances['overlay'][0].destroy();
        }
      });
    },
    closeOverlayButton: function() {
      var w = new SeniorlyWidget('closeOverlayButton', {
        onClick: function() {
          // it's a fair assumption that only one instance of overlay widget will be active
          Seniorly.widgetInstances['overlay'][0].destroy();
        }
      });
      w.buildContent = function() {
        var t = document.createElement('button');
        t.type = 'button';
        t.innerHTML = process.env.CLOSE_ICON_SVG;
        return t;
      };
      return w;
    },
    popup: function(instance) {
      var options = {
        iframeParams: instance.config
      };
      var w = new SeniorlyWidget('popup', options);
      w.buildContent = function() {
        var w2 = Seniorly.widgets.overlay();
        w2.build();
        w2.insert();
        w2 = Seniorly.widgets.closeOverlay();
        w2.build();
        w2.insert(document.getElementsByClassName(Seniorly.widgetClassName.overlay)[0]);
        w2 = Seniorly.widgets.closeOverlayButton();
        w2.build();
        w2.insert(document.getElementsByClassName(Seniorly.widgetClassName.overlay)[0]);
        return Seniorly.helpers.generateIframe('popup', w.options.iframeParams);
      };
      return w;
    }
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
          if (Seniorly.widgetInstances['overlay'] &&
            Seniorly.widgetInstances['overlay'].length) {
            Seniorly.widgetInstances['overlay'].pop().destroy();
          }
          break;
        default:
          Seniorly.log.debug('Unknown action in message from popup');
      }
    } catch (e) {
      Seniorly.log.warn('Failed to decode message from popup');
      Seniorly.log.debug('Got error ' + e);
    }
  };

  document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
      Seniorly.initWidget();
      Seniorly.startListeningForMessages();
    }
  };
}).call(this);
