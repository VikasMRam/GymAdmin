import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import Block from 'sly/common/system/Block';
import Link from 'sly/common/system/Link';

const href = path => `/styleguide/${path}`;
const options = {
  Foundation: {
    block: 'Block',
    colors: 'Colors',
    layout: 'Layout',
    typography: 'Typography',
  },
  Components: {
    button: 'Button',
    icon: 'Icon',
    input: 'Input',
    table: 'Table',
  },
};

const getLinkStyles = match => ({
  display: 'block',
  color: match ? 'viridian.base' : 'slate.base',
  background: match ? 'viridian.lighter-90' : undefined,
  padding: 'xs l',
  font: 'body-s',
  fontWeight: match ? 500 : 400,
});

const Menu = props => (
  <Block {...props}>
    {Object.entries(options).map(([section, links]) => (
      <div key={section}>
        <Block
          sx={{
            mt: 'm',
            padding: 'xs l',
            font: 'label',
            color: 'slate.lighter-40',
          }}
        >
          {section}
        </Block>
        {Object.entries(links).map(([path, name]) => {
          const to = href(path);
          const match = useRouteMatch(to);
          return (
            <Link
              key={`${section}-${path}`}
              to={to}
              sx={getLinkStyles(match)}
            >
              {name}
            </Link>
          );
        })}
      </div>
    ))}
  </Block>
);

export default Menu;
