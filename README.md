# Monorepo for react projects

Individual folders in packages folder will have different projects or packages(eg: web).

> :warning: **Important note** \
Never delete package-lock.json files. Update package.json file and let npm manage generation of new lock files during installation. \
As we use lerna hoist which moves packages to root node_modules, some packages have dependency of dependency packages \
present only in lock files that come from project init tools.

## Setup

To setup do ```npm i``` in root folder.

## Usage

To start app, storybook, do linting and testing, in root package itself scripts are available. If you wish, you can also cd into the package and run npm commands there.

Scripts supported by root package:

* ```npm run start:web``` - This starts the web server. Depending on SLY_ENV environment variable dev or prod mods will be configured.
* ```npm run start:storybook``` - This starts the web component's storybook server.
* ```npm run lint``` - This does linting in all packages. To do only in specific packages use scope option.

  eg:

      - run only in common package:
          npm run lint -- --scope=@sly-react/common

* ```npm run test``` - This runs tests in all packages. To do only in specific packages use scope option.

  eg:

      - run only in common package:
          npm run test -- --scope=@sly-react/common

## Creating packages

To add new package run ```npm run create:package``` and follow the instructions. This is create a dummy package with standard file and folder structure.

All packages share a common jest and babel config that's present in the root. If your package wants to override the default configs or add specific configs, create the config files with only changing config inside respective package folder.
