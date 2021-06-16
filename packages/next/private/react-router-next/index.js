import { useMemo } from 'react';
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import pathToRegexp from 'path-to-regexp';
import { parsePath } from 'history';

const cache = {};
const cacheLimit = 10000;
let cacheCount = 0;

function compilePath(path) {
  if (cache[path]) return cache[path];

  const generator = pathToRegexp.compile(path);

  if (cacheCount < cacheLimit) {
    cache[path] = generator;
    cacheCount++;
  }

  return generator;
}

/**
 * Public API for generating a URL pathname from a path and parameters.
 */
export function generatePath(path = "/", params = {}) {
  return path === "/" ? path : compilePath(path)(params, { pretty: true });
}

/**
 * Public API for matching a URL pathname to a path.
 */
export function matchPath(pathname, options = {}) {
  if (typeof options === "string" || Array.isArray(options)) {
    options = { path: options };
  }

  const { path, exact = false, strict = false, sensitive = false } = options;

  const paths = [].concat(path);

  return paths.reduce((matched, path) => {
    if (!path && path !== "") return null;
    if (matched) return matched;

    const { regexp, keys } = compilePath(path)({
      end: exact,
      strict,
      sensitive
    });
    const match = regexp.exec(pathname);

    if (!match) return null;

    const [url, ...values] = match;
    const isExact = pathname === url;

    if (exact && !isExact) return null;

    return {
      path, // the path used to match
      url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
      isExact, // whether or not we matched exactly
      params: keys.reduce((memo, key, index) => {
        memo[key.name] = values[index];
        return memo;
      }, {})
    };
  }, null);
}

// {
//   key: 'ac3df4', // not with HashHistory!
//   pathname: '/somewhere',
//   search: '?some=search-string',
//   hash: '#howdy',
//   state: {
//     [userDefined]: true
//   }
// }
export function useLocation () {
  const { asPath } = useRouter();
  return useMemo(() => parsePath(asPath), [asPath]);
};

export function useHistory() {
  const router = useRouter();
  const location = useLocation();

  return {
    ...router,
    location,
  };
};

export function useParams() {
  return useRouter().query;
};

//export interface match<Params extends { [K in keyof Params]?: string } = {}> {
//    params: Params;
//    isExact: boolean;
//    path: string;
//    url: string;
//}
export function withRouter (Component) {
  return (props) => {
    const router = useRouter();
    const history = useHistory();
    const match = {
      params: router.query,
    };
    return (
      <Component
        match={match}
        history={history}
        location={history.location}
        {...props}
      />
    );
  };
}

export function Link ({ component: Component, to, href, children, ...props }) {
  return (
    <NextLink href={to || href}>
      <Component {...props}>{children}</Component>
    </NextLink>
  );
}

export function Redirect() {
  return null;
};

