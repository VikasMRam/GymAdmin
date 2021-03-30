import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/contacts.svg').default;

const Contacts = forwardRef((props, ref) => <Icon ref={ref} name="contacts" svg={svg} {...props} />);

Contacts.displayName = 'ContactsIcon';

export default Contacts;
