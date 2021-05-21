// @ts-nocheck
/* eslint-disable guard-for-in */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import assign from 'object-assign';

export const merge = (a, b) => {
  const result = assign({}, a, b);
  for (const key in a) {
    // eslint-disable-next-line no-continue
    if (!a[key] || typeof b[key] !== 'object') continue;
    assign(result, {
      [key]: assign(a[key], b[key]),
    });
  }
  return result;
};

// sort object-value responsive styles
const sort = (obj) => {
  const next = {};
  Object.keys(obj)
    .sort((a, b) => a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base',
    }))
    .forEach((key) => {
      next[key] = obj[key];
    });
  return next;
};

export const get = (obj, key, def, p, undef) => {
  key = key && key.split ? key.split('.') : [key];
  for (p = 0; p < key.length; p++) {
    obj = obj ? obj[key[p]] : undef;
  }
  return obj === undef ? def : obj;
};

const createMediaQuery = n => `@media screen and (min-width: ${n}px)`;
const getValue = (n, scale) => get(scale, n, n);


const parseResponsiveStyle = (mediaQueries, sx, scale, raw, _props) => {
  const styles = {};
  raw.slice(0, mediaQueries.length).forEach((value, i) => {
    const media = mediaQueries[i];
    const style = sx(value, scale, _props);
    if (!media) {
      assign(styles, style);
    } else {
      assign(styles, {
        [media]: assign({}, styles[media], style),
      });
    }
  });
  return styles;
};

const parseResponsiveObject = (breakpoints, sx, scale, raw, _props) => {
  const styles = {};
  for (const key in raw) {
    const breakpoint = breakpoints[key];
    const value = raw[key];
    const style = sx(value, scale, _props);
    if (!breakpoint) {
      assign(styles, style);
    } else {
      const media = createMediaQuery(breakpoint);
      assign(styles, {
        [media]: assign({}, styles[media], style),
      });
    }
  }
  return styles;
};

const getQueryProp = (key) => {
  return key.match(/(startingWith|upTo)([^.]*$)/);
};

export const createParser = (config) => {
  const cache = {};
  const parse = (props) => {
    const stack = Object.keys(props);
    let styles = {};
    let shouldSort = false;
    const mediaKeys = {};

    for (let i = 0; i < stack.length; i++) {
      const stackElement = stack[i];
      const queryMatch = getQueryProp(stackElement);

      if (queryMatch) {
        const [, bound, breakpoint = 'Base'] = queryMatch;

        Object.entries(props[stackElement] || {}).forEach(([key, value]) => {
          const newElement = `${stackElement}.${key}`;
          stack.push(newElement);
          const media = props.theme.media?.[bound]?.[breakpoint];
          if (!media) {
            console.info(`There is no media query for ${stackElement}`);
            return;
          }
          mediaKeys[newElement] = {
            key,
            value,
            media,
          };
        });
        continue;
      }

      const mediaKey = mediaKeys[stackElement];
      const key = mediaKey?.key || stackElement;

      if (!config[key]) continue;

      const sx = config[key];
      const raw = mediaKey?.value || props[key];
      const media = mediaKey?.media;
      const scale = get(props.theme, sx.scale, sx.defaults);

      if (media) {
        assign(styles, {
          [media]: assign({}, styles[media], sx(raw, scale, props)),
        });
        continue;
      }

      if (typeof raw === 'object') {
        cache.breakpoints = cache.breakpoints ||
          Object.values(get(props.theme, 'sizes.breakpoint') || {});
        if (Array.isArray(raw)) {
          cache.media = cache.media || [
            null,
            ...cache.breakpoints.map(createMediaQuery),
          ];
          styles = merge(
            styles,
            parseResponsiveStyle(cache.media, sx, scale, raw, props),
          );
          continue;
        }
        if (raw !== null) {
          styles = merge(
            styles,
            parseResponsiveObject(cache.breakpoints, sx, scale, raw, props),
          );
          shouldSort = true;
        }
        continue;
      }

      assign(styles, sx(raw, scale, props));
    }

    // sort object-based responsive styles
    if (shouldSort) {
      styles = sort(styles);
    }

    return styles;
  };
  parse.config = config;
  parse.propNames = Object.keys(config);
  parse.cache = cache;

  const keys = Object.keys(config).filter(k => k !== 'config');
  if (keys.length > 1) {
    keys.forEach((key) => {
      parse[key] = createParser({ [key]: config[key] });
    });
  }

  return parse;
};

export const createStyleFunction = ({
  properties,
  property,
  scale,
  transform = getValue,
  defaultScale,
}) => {
  properties = properties || [property];
  const sx = (value, scale, _props) => {
    const result = {};
    const n = transform(value, scale, _props);
    if (n === null) return null;
    properties.forEach((prop) => {
      result[prop] = n;
    });
    return result;
  };
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
      return;
    }
    if (typeof conf === 'function') {
      config[key] = conf;
      return;
    }
    config[key] = createStyleFunction(conf);
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
