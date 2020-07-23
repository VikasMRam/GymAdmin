import React from 'react';

const getTag = (level) => {
  switch (level) { /* eslint-disable jsx-a11y/heading-has-content */
    case 'hero': return props => <h1 {...props} />;
    case 'title': return props => <h2 {...props} />;
    case 'subtitle': return props => <h3 {...props} />;
    default: return props => <h1 {...props} />;
  }
};

export default getTag;
