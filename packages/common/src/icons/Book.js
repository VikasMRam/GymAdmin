import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

// eslint-disable-next-line import/no-webpack-loader-syntax
const svg = require('!raw-loader!./svg/book.svg').default;

const Book = forwardRef((props, ref) => <Icon ref={ref} name="book" svg={svg} {...props} />);

Book.displayName = 'BookIcon';

export default Book;
