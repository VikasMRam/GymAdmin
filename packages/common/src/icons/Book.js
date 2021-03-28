import React, { forwardRef } from 'react';

import Icon from 'sly/common/system/Icon';

const svg = require('!raw-loader!./svg/book.svg').default
// import BookSvg from './svg/book.svg';

const Book = forwardRef((props, ref) => <Icon ref={ref} name="book" svg={svg} {...props} />);

Book.displayName = 'BookIcon';

export default Book;