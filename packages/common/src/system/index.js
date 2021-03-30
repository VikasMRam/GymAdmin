// @ts-nocheck
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-mixed-operators */
/* eslint-disable guard-for-in */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import assign from 'object-assign';
import merge from 'lodash/merge';

import {
  get,
  getCardinalValue,
  createShouldForwardProp,
  makeMediaQueries,
} from './util';

export {
  get,
  getCardinalValue,
  createShouldForwardProp,
};

const getValue = (n, scale) => get(scale, n, n);

const map = (style, properties) => {
  const result = {};
  properties.forEach((prop) => {
    result[prop] = style;
  });
  return result;
};

const getQueryProp = (key) => {
  return key.match(/(startingWith|_?sx\$?|@)([^.]*$)/);
};

const getMediaStart = (match, media, def) => {
  const [, , breakpoint] = match || [];
  return media.indexes?.[breakpoint] || def;
};

const mergeStyles = (styles, media, value, selectors) => {
  if (media) {
    selectors = [media, ...selectors];
  }

  if (!selectors.length) {
    assign(styles, value);
  } else {
    for (let i = 0; i < selectors.length; i++) {
      const selector = selectors[i];
      assign(styles, {
        [selector]: assign({}, styles[selector], i === selectors.length - 1 ? value : undefined),
      });
      styles = styles[selector];
    }
  }
};

// check if key is a var
const getConfig = (config, key, raw) => {
  if (typeof key === 'string' && typeof raw === 'string') {
    const res = key.match(/^--.+-([^-]+)$/);
    if (res && typeof config[res[1]] === 'function') {
      const sx = config[res[1]];
      const cloned = sx.bind({});
      for (const i in sx) {
        cloned[i] = sx[i];
      }
      cloned.properties = [key];
      return cloned;
    }
  }
  return config[key];
};

const createParser = (config) => {
  const cache = {};
  const parse = (props) => {
    if (typeof props.theme !== 'object') {
      throw new Error('There is no theme in props, perhaps you forgot to include in the context.');
    }

    // eslint-disable-next-line no-multi-assign
    const media = (cache.media = (cache.media || makeMediaQueries(props.theme.breakpoint)));

    const styles = {};
    const work = [];

    work.push([null, props, 0, false, []]);

    do {
      const [key, raw, start, isTheme, selectors] = work.shift();

      if (key === 'theme') continue;

      const sx = getConfig(config, key, raw);
      const scale = get(props.theme, sx?.scale, sx?.defaults);
      let _value = raw;
      let _isTheme = isTheme;

      if (typeof _value === 'function') {
        _value = _value(props, scale, sx);
        if (typeof _value === 'object') {
          _isTheme = true;
        }
      }

      if (sx && typeof _value !== 'object') {
        _value = sx(_value, scale, props);
        if (typeof _value === 'object') {
          _isTheme = true;
        }
      }

      if (typeof _value === 'object' && Array.isArray(_value)) {
        const shift = _isTheme ? 0 : start;
        const _start = start - shift;
        for (let i = _start; i < media.queries.length; i++) {
          if (!_value[i] && _start < _value.length) continue;
          const pick = _start >= _value.length - 1
            ? _value.length - 1
            : i;

          work.splice(i - _start, 0, [key, _value[pick], i + shift, _isTheme, selectors]);
          if (pick < _start) {
            break;
          }
        }
        continue;
      }

      if (typeof _value === 'object' && _value !== null) {
        const ks = Object.keys(_value);
        for (let i = 0; i < ks.length; i++) {
          const k = ks[i];
          let queryMatch;
          if (config[k]) {
            work.splice(i, 0, [k, _value[k], start, _isTheme, selectors]);
            // eslint-disable-next-line no-cond-assign
          } else if (queryMatch = getQueryProp(k)) {
            work.splice(i, 0, [k, _value[k], getMediaStart(queryMatch, media, start), _isTheme, selectors]);
          } else if (key !== null) {
            const _selectors = typeof _value[k] === 'object'
              ? [...selectors, k]
              : selectors;
            work.splice(i, 0, [k, _value[k], start, _isTheme, _selectors]);
          }
        }
        continue;
      }

      const value = map(_value, sx?.properties || [key]);

      mergeStyles(
        styles,
        media.queries[start],
        value,
        selectors,
      );
    } while (work.length);

    return styles;
  };

  parse.config = config;
  parse.propNames = Object.keys(config);

  const keys = Object.keys(config).filter(k => k !== 'config');
  if (keys.length > 1) {
    keys.forEach((key) => {
      parse[key] = createParser({ [key]: config[key] });
    });
  }

  return parse;
};

const createStyleFunction = ({
  properties,
  property,
  scale,
  transform = getValue,
  defaultScale,
}) => {
  const sx = (value, scale, _props) => transform(value, scale, _props);
  sx.properties = properties || property && [property];
  sx.scale = scale;
  sx.defaults = defaultScale;
  return sx;
};

// new v5 API
export const system = (args = {}) => {
  const config = {};
  Object.keys(args).forEach((key) => {
    const conf = args[key];
    if (conf === true) {
      // shortcut definition
      config[key] = createStyleFunction({
        property: key,
        scale: key,
      });
    } else if (typeof conf === 'function') {
      config[key] = conf;
    } else {
      config[key] = createStyleFunction(conf);
    }
    if (args[key].alias) {
      const aliases = Array.isArray(args[key].alias)
        ? args[key].alias
        : [args[key].alias];
      aliases.forEach((a) => { config[a] = config[key]; });
    }
  });

  const parser = createParser(config);
  return parser;
};

export const compose = (...parsers) => {
  const config = {};
  parsers.forEach((parser) => {
    if (!parser || !parser.config) return;
    assign(config, parser.config);
  });
  const parser = createParser(config);

  return parser;
};

export const combineStyles = (sx, styles) => merge(sx || {}, styles);

