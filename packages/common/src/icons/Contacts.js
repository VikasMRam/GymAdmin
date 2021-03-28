import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/contacts.svg').default
// import ContactsSvg from './svg/contacts.svg';

const Contacts = forwardRef((props, ref) => <Icon ref={ref} name="contacts" svg={svg} {...props} />);

Contacts.displayName = 'ContactsIcon';

export default Contacts;