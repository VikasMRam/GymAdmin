import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/settings.svg').default
// import SettingsSvg from './svg/settings.svg';

const Settings = forwardRef((props, ref) => <Icon ref={ref} name="settings" svg={svg} {...props} />);

Settings.displayName = 'SettingsIcon';

export default Settings;