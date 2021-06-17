(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('hoist-non-react-statics')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'hoist-non-react-statics'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.loadable = {}, global.React, global.hoistNonReactStatics));
}(this, (function (exports, React, hoistNonReactStatics) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var hoistNonReactStatics__default = /*#__PURE__*/_interopDefaultLegacy(hoistNonReactStatics);

  /* eslint-disable import/prefer-default-export */
  function invariant(condition, message) {
    if (condition) return;
    var error = new Error("loadable: " + message);
    error.framesToPop = 1;
    error.name = 'Invariant Violation';
    throw error;
  }
  function warn(message) {
    // eslint-disable-next-line no-console
    console.warn("loadable: " + message);
  }

  var Context = /*#__PURE__*/React__default['default'].createContext();

  var LOADABLE_REQUIRED_CHUNKS_KEY = '__LOADABLE_REQUIRED_CHUNKS__';
  function getRequiredChunkKey(namespace) {
    return "" + namespace + LOADABLE_REQUIRED_CHUNKS_KEY;
  }

  var sharedInternals = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getRequiredChunkKey: getRequiredChunkKey,
    invariant: invariant,
    Context: Context
  });

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var reactIs_development = createCommonjsModule(function (module, exports) {



  {
    (function() {

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
  // (unstable) APIs that have been removed. Can we remove the symbols?

  var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
  var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
  var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
  var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
  var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
  var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
  var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
  }

  function typeOf(object) {
    if (typeof object === 'object' && object !== null) {
      var $$typeof = object.$$typeof;

      switch ($$typeof) {
        case REACT_ELEMENT_TYPE:
          var type = object.type;

          switch (type) {
            case REACT_ASYNC_MODE_TYPE:
            case REACT_CONCURRENT_MODE_TYPE:
            case REACT_FRAGMENT_TYPE:
            case REACT_PROFILER_TYPE:
            case REACT_STRICT_MODE_TYPE:
            case REACT_SUSPENSE_TYPE:
              return type;

            default:
              var $$typeofType = type && type.$$typeof;

              switch ($$typeofType) {
                case REACT_CONTEXT_TYPE:
                case REACT_FORWARD_REF_TYPE:
                case REACT_LAZY_TYPE:
                case REACT_MEMO_TYPE:
                case REACT_PROVIDER_TYPE:
                  return $$typeofType;

                default:
                  return $$typeof;
              }

          }

        case REACT_PORTAL_TYPE:
          return $$typeof;
      }
    }

    return undefined;
  } // AsyncMode is deprecated along with isAsyncMode

  var AsyncMode = REACT_ASYNC_MODE_TYPE;
  var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  var ContextConsumer = REACT_CONTEXT_TYPE;
  var ContextProvider = REACT_PROVIDER_TYPE;
  var Element = REACT_ELEMENT_TYPE;
  var ForwardRef = REACT_FORWARD_REF_TYPE;
  var Fragment = REACT_FRAGMENT_TYPE;
  var Lazy = REACT_LAZY_TYPE;
  var Memo = REACT_MEMO_TYPE;
  var Portal = REACT_PORTAL_TYPE;
  var Profiler = REACT_PROFILER_TYPE;
  var StrictMode = REACT_STRICT_MODE_TYPE;
  var Suspense = REACT_SUSPENSE_TYPE;
  var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

  function isAsyncMode(object) {
    {
      if (!hasWarnedAboutDeprecatedIsAsyncMode) {
        hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

        console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
      }
    }

    return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
  }
  function isConcurrentMode(object) {
    return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
  }
  function isContextConsumer(object) {
    return typeOf(object) === REACT_CONTEXT_TYPE;
  }
  function isContextProvider(object) {
    return typeOf(object) === REACT_PROVIDER_TYPE;
  }
  function isElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
  function isForwardRef(object) {
    return typeOf(object) === REACT_FORWARD_REF_TYPE;
  }
  function isFragment(object) {
    return typeOf(object) === REACT_FRAGMENT_TYPE;
  }
  function isLazy(object) {
    return typeOf(object) === REACT_LAZY_TYPE;
  }
  function isMemo(object) {
    return typeOf(object) === REACT_MEMO_TYPE;
  }
  function isPortal(object) {
    return typeOf(object) === REACT_PORTAL_TYPE;
  }
  function isProfiler(object) {
    return typeOf(object) === REACT_PROFILER_TYPE;
  }
  function isStrictMode(object) {
    return typeOf(object) === REACT_STRICT_MODE_TYPE;
  }
  function isSuspense(object) {
    return typeOf(object) === REACT_SUSPENSE_TYPE;
  }

  exports.AsyncMode = AsyncMode;
  exports.ConcurrentMode = ConcurrentMode;
  exports.ContextConsumer = ContextConsumer;
  exports.ContextProvider = ContextProvider;
  exports.Element = Element;
  exports.ForwardRef = ForwardRef;
  exports.Fragment = Fragment;
  exports.Lazy = Lazy;
  exports.Memo = Memo;
  exports.Portal = Portal;
  exports.Profiler = Profiler;
  exports.StrictMode = StrictMode;
  exports.Suspense = Suspense;
  exports.isAsyncMode = isAsyncMode;
  exports.isConcurrentMode = isConcurrentMode;
  exports.isContextConsumer = isContextConsumer;
  exports.isContextProvider = isContextProvider;
  exports.isElement = isElement;
  exports.isForwardRef = isForwardRef;
  exports.isFragment = isFragment;
  exports.isLazy = isLazy;
  exports.isMemo = isMemo;
  exports.isPortal = isPortal;
  exports.isProfiler = isProfiler;
  exports.isStrictMode = isStrictMode;
  exports.isSuspense = isSuspense;
  exports.isValidElementType = isValidElementType;
  exports.typeOf = typeOf;
    })();
  }
  });
  reactIs_development.AsyncMode;
  reactIs_development.ConcurrentMode;
  reactIs_development.ContextConsumer;
  reactIs_development.ContextProvider;
  reactIs_development.Element;
  reactIs_development.ForwardRef;
  reactIs_development.Fragment;
  reactIs_development.Lazy;
  reactIs_development.Memo;
  reactIs_development.Portal;
  reactIs_development.Profiler;
  reactIs_development.StrictMode;
  reactIs_development.Suspense;
  reactIs_development.isAsyncMode;
  reactIs_development.isConcurrentMode;
  reactIs_development.isContextConsumer;
  reactIs_development.isContextProvider;
  reactIs_development.isElement;
  reactIs_development.isForwardRef;
  reactIs_development.isFragment;
  reactIs_development.isLazy;
  reactIs_development.isMemo;
  reactIs_development.isPortal;
  reactIs_development.isProfiler;
  reactIs_development.isStrictMode;
  reactIs_development.isSuspense;
  reactIs_development.isValidElementType;
  reactIs_development.typeOf;

  var reactIs = createCommonjsModule(function (module) {

  {
    module.exports = reactIs_development;
  }
  });

  var ReactIs = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': reactIs,
    __moduleExports: reactIs
  });

  var LOADABLE_SHARED = {
    initialChunks: {}
  };

  function resolveConstructor(ctor) {
    if (typeof ctor === 'function') {
      return {
        requireAsync: ctor
      };
    }

    return ctor;
  }

  var withChunkExtractor = function withChunkExtractor(Component) {
    return function (props) {
      return /*#__PURE__*/React__default['default'].createElement(Context.Consumer, null, function (extractor) {
        return /*#__PURE__*/React__default['default'].createElement(Component, Object.assign({
          __chunkExtractor: extractor
        }, props));
      });
    };
  };

  var identity = function identity(v) {
    return v;
  };

  function createLoadable(_ref) {
    var _ref$defaultResolveCo = _ref.defaultResolveComponent,
        defaultResolveComponent = _ref$defaultResolveCo === void 0 ? identity : _ref$defaultResolveCo,
        _render = _ref.render,
        onLoad = _ref.onLoad;

    function loadable(loadableConstructor, options) {
      if (options === void 0) {
        options = {};
      }

      var ctor = resolveConstructor(loadableConstructor);
      var cache = {};

      function _getCacheKey(props) {
        if (options.cacheKey) {
          return options.cacheKey(props);
        }

        if (ctor.resolve) {
          return ctor.resolve(props);
        }

        return null;
      }

      function resolve(module, props, Loadable) {
        var Component = options.resolveComponent ? options.resolveComponent(module, props) : defaultResolveComponent(module);

        if (options.resolveComponent && !undefined(Component)) {
          throw new Error("resolveComponent returned something that is not a React component!");
        }

        hoistNonReactStatics__default['default'](Loadable, Component, {
          preload: true
        });
        return Component;
      }

      var InnerLoadable = /*#__PURE__*/function (_React$Component) {
        _inheritsLoose(InnerLoadable, _React$Component);

        InnerLoadable.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
          var cacheKey = _getCacheKey(props);

          return _extends({}, state, {
            cacheKey: cacheKey,
            loading: state.loading || state.cacheKey !== cacheKey
          });
        };

        function InnerLoadable(props) {
          var _this;

          _this = _React$Component.call(this, props) || this;
          _this.state = {
            result: null,
            error: null,
            loading: true,
            cacheKey: _getCacheKey(props)
          };
          _this.promise = null;
          invariant(!props.__chunkExtractor || ctor.requireSync, 'SSR requires `@loadable/babel-plugin`, please install it'); // Server-side

          if (props.__chunkExtractor) {
            // This module has been marked with no SSR
            if (options.ssr === false) {
              return _assertThisInitialized(_this);
            } // We run load function, we assume that it won't fail and that it
            // triggers a synchronous loading of the module


            ctor.requireAsync(props)["catch"](function () {}); // So we can require now the module synchronously

            _this.loadSync();

            if (!options.ssrOnly) {
              props.__chunkExtractor.addChunk(ctor.chunkName(props));
            }

            return _assertThisInitialized(_this);
          } // Client-side with `isReady` method present (SSR probably)
          // If module is already loaded, we use a synchronous loading
          // Only perform this synchronous loading if the component has not
          // been marked with no SSR, else we risk hydration mismatches


          if (options.ssr !== false && ( // is ready - was loaded in this session
          ctor.isReady && ctor.isReady(props) || // is ready - was loaded during SSR process
          ctor.chunkName && LOADABLE_SHARED.initialChunks[ctor.chunkName(props)])) {
            _this.loadSync();
          }

          return _this;
        }

        var _proto = InnerLoadable.prototype;

        _proto.componentDidMount = function componentDidMount() {
          this.mounted = true;

          if (this.state.loading) {
            this.loadAsync();
          } else if (!this.state.error) {
            this.triggerOnLoad();
          }
        };

        _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
          // Component is reloaded if the cacheKey has changed
          if (prevState.cacheKey !== this.state.cacheKey) {
            this.promise = null;
            this.loadAsync();
          }
        };

        _proto.componentWillUnmount = function componentWillUnmount() {
          this.mounted = false;
        };

        _proto.safeSetState = function safeSetState(nextState, callback) {
          if (this.mounted) {
            this.setState(nextState, callback);
          }
        };

        _proto.triggerOnLoad = function triggerOnLoad() {
          var _this2 = this;

          if (onLoad) {
            setTimeout(function () {
              onLoad(_this2.state.result, _this2.props);
            });
          }
        };

        _proto.loadSync = function loadSync() {
          if (!this.state.loading) return;

          try {
            var loadedModule = ctor.requireSync(this.props);
            var result = resolve(loadedModule, this.props, Loadable);
            this.state.result = result;
            this.state.loading = false;
          } catch (error) {
            this.state.error = error;
          }
        };

        _proto.getCacheKey = function getCacheKey() {
          return _getCacheKey(this.props) || JSON.stringify(this.props);
        };

        _proto.getCache = function getCache() {
          return cache[this.getCacheKey()];
        };

        _proto.setCache = function setCache(value) {
          cache[this.getCacheKey()] = value;
        };

        _proto.loadAsync = function loadAsync() {
          var _this3 = this;

          if (!this.promise) {
            var _this$props = this.props;
                _this$props.__chunkExtractor;
                _this$props.forwardedRef;
                var props = _objectWithoutPropertiesLoose(_this$props, ["__chunkExtractor", "forwardedRef"]);

            this.promise = ctor.requireAsync(props).then(function (loadedModule) {
              var result = resolve(loadedModule, _this3.props, Loadable);

              if (options.suspense) {
                _this3.setCache(result);
              }

              _this3.safeSetState({
                result: resolve(loadedModule, _this3.props, Loadable),
                loading: false
              }, function () {
                return _this3.triggerOnLoad();
              });
            })["catch"](function (error) {
              _this3.safeSetState({
                error: error,
                loading: false
              });
            });
          }

          return this.promise;
        };

        _proto.render = function render() {
          var _this$props2 = this.props,
              forwardedRef = _this$props2.forwardedRef,
              propFallback = _this$props2.fallback;
              _this$props2.__chunkExtractor;
              var props = _objectWithoutPropertiesLoose(_this$props2, ["forwardedRef", "fallback", "__chunkExtractor"]);

          var _this$state = this.state,
              error = _this$state.error,
              loading = _this$state.loading,
              result = _this$state.result;

          if (options.suspense) {
            var cachedResult = this.getCache();
            if (!cachedResult) throw this.loadAsync();
            return _render({
              loading: false,
              fallback: null,
              result: cachedResult,
              options: options,
              props: _extends({}, props, {
                ref: forwardedRef
              })
            });
          }

          if (error) {
            throw error;
          }

          var fallback = propFallback || options.fallback || null;

          if (loading) {
            return fallback;
          }

          return _render({
            loading: loading,
            fallback: fallback,
            result: result,
            options: options,
            props: _extends({}, props, {
              ref: forwardedRef
            })
          });
        };

        return InnerLoadable;
      }(React__default['default'].Component);

      var EnhancedInnerLoadable = withChunkExtractor(InnerLoadable);
      var Loadable = React__default['default'].forwardRef(function (props, ref) {
        return /*#__PURE__*/React__default['default'].createElement(EnhancedInnerLoadable, Object.assign({
          forwardedRef: ref
        }, props));
      }); // In future, preload could use `<link rel="preload">`

      Loadable.preload = function (props) {
        ctor.requireAsync(props);
      };

      Loadable.load = function (props) {
        return ctor.requireAsync(props);
      };

      return Loadable;
    }

    function lazy(ctor, options) {
      return loadable(ctor, _extends({}, options, {
        suspense: true
      }));
    }

    return {
      loadable: loadable,
      lazy: lazy
    };
  }

  function defaultResolveComponent(loadedModule) {
    // eslint-disable-next-line no-underscore-dangle
    return loadedModule.__esModule ? loadedModule["default"] : loadedModule["default"] || loadedModule;
  }

  /* eslint-disable no-use-before-define, react/no-multi-comp */

  var _createLoadable$1 = /*#__PURE__*/createLoadable({
    defaultResolveComponent: defaultResolveComponent,
    render: function render(_ref) {
      var Component = _ref.result,
          props = _ref.props;
      return /*#__PURE__*/React__default['default'].createElement(Component, props);
    }
  }),
      loadable$2 = _createLoadable$1.loadable,
      lazy$2 = _createLoadable$1.lazy;

  /* eslint-disable no-use-before-define, react/no-multi-comp */

  var _createLoadable = /*#__PURE__*/createLoadable({
    onLoad: function onLoad(result, props) {
      if (result && props.forwardedRef) {
        if (typeof props.forwardedRef === 'function') {
          props.forwardedRef(result);
        } else {
          props.forwardedRef.current = result;
        }
      }
    },
    render: function render(_ref) {
      var result = _ref.result,
          loading = _ref.loading,
          props = _ref.props;

      if (!loading && props.children) {
        return props.children(result);
      }

      return null;
    }
  }),
      loadable$1 = _createLoadable.loadable,
      lazy$1 = _createLoadable.lazy;

  /* eslint-disable no-underscore-dangle, camelcase */
  var BROWSER = typeof window !== 'undefined';
  function loadableReady(done, _temp) {
    if (done === void 0) {
      done = function done() {};
    }

    var _ref = _temp === void 0 ? {} : _temp,
        _ref$namespace = _ref.namespace,
        namespace = _ref$namespace === void 0 ? '' : _ref$namespace;

    if (!BROWSER) {
      warn('`loadableReady()` must be called in browser only');
      done();
      return Promise.resolve();
    }

    var requiredChunks = null;

    if (BROWSER) {
      var id = getRequiredChunkKey(namespace);
      var dataElement = document.getElementById(id);

      if (dataElement) {
        requiredChunks = JSON.parse(dataElement.textContent);
        var extElement = document.getElementById(id + "_ext");

        if (extElement) {
          var _JSON$parse = JSON.parse(extElement.textContent),
              namedChunks = _JSON$parse.namedChunks;

          namedChunks.forEach(function (chunkName) {
            LOADABLE_SHARED.initialChunks[chunkName] = true;
          });
        } else {
          // version mismatch
          throw new Error('loadable-component: @loabable/server does not match @loadable/component');
        }
      }
    }

    if (!requiredChunks) {
      warn('`loadableReady()` requires state, please use `getScriptTags` or `getScriptElements` server-side');
      done();
      return Promise.resolve();
    }

    var resolved = false;
    return new Promise(function (resolve) {
      window.__LOADABLE_LOADED_CHUNKS__ = window.__LOADABLE_LOADED_CHUNKS__ || [];
      var loadedChunks = window.__LOADABLE_LOADED_CHUNKS__;
      var originalPush = loadedChunks.push.bind(loadedChunks);

      function checkReadyState() {
        if (requiredChunks.every(function (chunk) {
          return loadedChunks.some(function (_ref2) {
            var chunks = _ref2[0];
            return chunks.indexOf(chunk) > -1;
          });
        })) {
          if (!resolved) {
            resolved = true;
            resolve();
            done();
          }
        }
      }

      loadedChunks.push = function () {
        originalPush.apply(void 0, arguments);
        checkReadyState();
      };

      checkReadyState();
    });
  }

  /* eslint-disable no-underscore-dangle */
  var loadable = loadable$2;
  loadable.lib = loadable$1;
  var lazy = lazy$2;
  lazy.lib = lazy$1;
  var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sharedInternals;

  exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.default = loadable;
  exports.lazy = lazy;
  exports.loadableReady = loadableReady;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
