# Sly storybook

Storybook setup for both web and mobile is present in this package. This package has config and storybook specific helpers. All story definitions can be found near the component.

> :warning: **Important note** \
Try to avoid running npm installs in this folder. If you want to add an npm package that is used only by this folder then add it to \
package.json here. If the npm package is used by other folders then it's better to add it in root's package.json though it will be \
hoisted to root node_modules. \
**After adding a new package don't forget to run ```npm i``` from root.**

## Testing

Run ```npm test``` command in this folder to run all available unit tests for this package.

## Linting

Run ```npm run lint``` command in this folder to do linting in this package.


Fonz:

Currently disabled the following packages because of their locked peer dependencies would not let you do a npm install
```
  "@storybook/react-native": "6.0.0-alpha.0",
  "@storybook/react-native-server": "5.3.23",
  "@storybook/addon-ondevice-actions": "5.3.23",
```