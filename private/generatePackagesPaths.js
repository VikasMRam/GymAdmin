const path = require('path');
const fs = require('fs');

const PACKAGES = 'packages';
const SOURCE = 'src';
const PRIVATE = 'private';

const packagesPath = path.join(__dirname, '..', PACKAGES);
const packagesDirs = fs.readdirSync(packagesPath).filter(f => fs.statSync(path.join(packagesPath, f)).isDirectory());

const alias = packagesDirs.reduce((acc, cv) => {
  acc[`sly/${cv}/private`] = path.join(packagesPath, cv, PRIVATE);
  acc[`sly/${cv}`] = path.join(packagesPath, cv, SOURCE);
  return acc;
}, {});

const moduleNameMapper = {
  '^sly/([^/]+)/private/(.*)$': path.resolve(__dirname, '..', PACKAGES, '$1', PRIVATE, '$2'),
  '^sly/([^/]+)(.*)$': path.resolve(__dirname, '..', PACKAGES, '$1', SOURCE, '$2'),
};

module.exports = {
  alias,
  moduleNameMapper,
};
