const path = require('path');
const withTM = require('next-transpile-modules')(['../common', '../web']);

module.exports = withTM({
  future: {
    webpack5: true,
  },

  webpack(config, options) {
    const partialHydrationPath = path.resolve(process.cwd(), '../../packages/web/src/services/partialHydration');

    console.log('abs path', partialHydrationPath);
    config.resolve.alias = {
      ...config.resolve.alias,

      'react-router': 'private/react-router-next',
      'react-router-dom': 'private/react-router-next',
      [partialHydrationPath]: 'private/partialHydration',
      '@loadable/component': 'next/dynamic',
    };

    return config;
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          destination: 'http://localhost:8000/',
        },
      ],
      // After checking all Next.js pages (including dynamic routes)
      // and static files we proxy any other requests
      fallback: [
        {
          source: '/:path*',
          destination: `http://localhost:8000/:path*`,
        },
      ],
    }
  },
});
