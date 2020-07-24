# Monorepo for react projects

Individual folders in packages folder will have different projects or packages(eg: web, mobile).

## Setup

To setup do ```npm install``` in root folder.

## Usage

To start app, storybook, do linting and testing, in root package itself scripts are available. If you wish, you can also cd into the package and run npm commands there.

Scripts supported by root package:

* ```npm run start:web``` - This starts the web server. Depending on SLY_ENV environment variable dev or prod mods will be configured.
* ```npm run start:mobile``` - This starts the mobile app is emulator or connected device. Depending on PLATFORM environment variable(Defaults to ios) ios or android will be launched.
* ```npm run start:storybook``` - This starts the web component's storybook server.
* ```npm run start:storybook:mobile``` - This starts the mobile component's storybook server. Depending on PLATFORM environment variable(Defaults to ios) ios or android will be launched.
* ```npm run lint``` - This does linting in all packages. To do only in specific packages use scope option.

  eg:

      - run only in common package:
          npm run lint -- --scope=@sly-react/common

      - run in common and mobile package:
          npm run lint -- --scope={@sly-react/common,@sly-react/mobile}

* ```npm run test``` - This runs tests in all packages. To do only in specific packages use scope option.

  eg:

      - run only in common package:
          npm run test -- --scope=@sly-react/common
      - run in common and mobile package
          npm run test -- --scope={@sly-react/common,@sly-react/mobile}
