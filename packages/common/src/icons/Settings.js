import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/settings.svg').default;

const Settings = forwardRef((props, ref) => <Icon ref={ref} name="settings" svg={svg} {...props} />);

Settings.displayName = 'SettingsIcon';

export default Settings;
