# Seniorly Mobile

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
