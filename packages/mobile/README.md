# Sly mobile

Mobile app is present in this package.

> :warning: **Important note** \
Try to avoid running npm installs in this folder. If you want to add an npm package that is used only by this folder then add it to \
package.json here. If the npm package is used by other folders then it's better to add it in root's package.json though it will be \
hoisted to root node_modules. \
**After adding a new package don't forget to run ```npm i``` from root.**

## Testing

Run ```npm test``` command in this folder to run all available unit tests for this package.

## Linting

Run ```npm run lint``` command in this folder to do linting in this package.

## Building and running on mac using ios simulator

The simulators available on xcode will be different depending on version. So first run ```instruments -s devices```
to find the list of available simulators. Then use it for running the app with command ```npm run ios -- --simulator="<put simulator name here>"```

eg:

```
npm run ios -- --simulator="iPhone 8 Plus (13.3)"
```
where iPhone 8 Plus (13.3) is the name of an available simulator.

### Tips

* Make sure that you have cocopods installed
* If any path or pod related errors try running ```npm run clean-build:ios``` before building
  - Note: If you get an pod version related issues when installing try removing ```ios/Podfile.lock``` and run again
* Want app errors from android device? Try running ```npm run debug:logs:android``` to see realtime warning and error logs.
You should be able to sort the app's logs by reffering to activity name; for eg: com.mobile. or keyword react will be there
* For android if you get build errors try ```npm run clean-build:android``` and build again.
  - still doesn't work and seeing soLoader errors or the apps crashes with so file errors try running ```rm -rf $HOME/.gradle/caches```
    and build your app again.
