import fs from 'fs';
import parseUrl from 'parseurl';
import pathToRegexp from 'path-to-regexp';
import debounce from 'lodash/debounce';
import { ChunkExtractor } from '@loadable/server';

import { isDev } from 'sly/config';
import careTypes from 'sly/constants/careTypes';

const configs = [
  {
    bundle: 'external',
    ssr: false,
    path: '/external*',
  },
  {
    bundle: 'community-details',
    ssr: true,
    path: `/:toc(${careTypes.join('|')})/:state/:city/:communitySlug`,
  },
  {
    bundle: 'main',
    ssr: true,
    path: '*',
  },
];


const waitForFile = (path, timeout = 100, max= 10) => new Promise((resolve, reject) => {
  let counter = 0;
  const interval = setInterval(function() {
    if (fs.existsSync(path)) {
      clearInterval(interval);
      resolve(path);
    } else {
      counter++;
      if (counter >= max) {
        reject(new Error(`file: ${path} not found`));
      }
    }
  }, timeout);
});

function patchConfigs ({ statsWeb, statsNode }) {
  configs.forEach((config) => {
    const { bundle, ssr } = config;

    const extractor = new ChunkExtractor({ statsFile: statsWeb, entrypoints: [bundle] });

    Object.assign(config, {
      regexp: pathToRegexp(config.path),
      extractor,
    });

    if (ssr) {
      const extractorSsr = new ChunkExtractor({ statsFile: statsNode, entrypoints: [bundle] });
      const { default: ClientApp, renderToString } = extractorSsr.requireEntrypoint();

      Object.assign(config, {
        ClientApp,
        renderToString,
      });
    }
  });

  console.info('configs patched: ready');
}

export default function clientConfigsMiddleware ({ statsNode, statsWeb }) {
  if (!isDev) {
    // stats files are ready from build step
    patchConfigs({ statsWeb, statsNode });
  } else {
    // stats files might be compiling and might change during development
    const debouncedPatchConfig = debounce(
      () => patchConfigs({ statsWeb, statsNode }),
      100,
    );
    const files = [ statsNode, statsWeb ];
    Promise.all(files.map(waitForFile))
      .then(() => {
        debouncedPatchConfig();
        files.forEach(file => {
          fs.watchFile(file, debouncedPatchConfig);
        });
      })
      .catch(console.error);
  }

  return (req, res, next) => {
    const path = parseUrl(req).pathname;
    for (let i = 0; i < configs.length; i++) {
      const config = configs[i];
      if (path.match(config.regexp)) {
        req.clientConfig = config;
        break;
      }
    }
    next();
  };
};
