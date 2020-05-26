import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string, object } from 'prop-types';


import { size } from 'sly/web/components/themes';
import { text as textPropType } from 'sly/web/propTypes/text';
import { Link, Span } from 'sly/web/components/atoms';
import { withPad } from 'sly/web/components/helpers/pad';

const getSize = p => size('text', p.size);

const Wrapper = styled.nav`
  ol {
    display: block;
    list-style-type: none;
    margin: 0;
    padding: 0;
    font-size: ${getSize};

    li {
      display: inline-block;
      text-transform: capitalize;
      font-size: ${getSize};

      > span:not(:first-child) {
        margin: 0 ${size('spacing.regular')};
      }
    }
  }
`;

const BreadCrumb = withPad(({ items, innerRef, size, ...props }) => (
  <Wrapper ref={innerRef} size={size} {...props}>
    <ol itemScope itemType="http://schema.org/BreadcrumbList">
      {
        items.map((item, index) => {
          const { label, path, event } = item;

          const isLast = index === items.length - 1;
          const palette = isLast
            ? 'slate'
            : 'primary';

          return (
            <li
              key={path}
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              <Link itemProp="item" to={path} event={event}>
                <meta itemProp="position" content={index + 1} />
                <Span itemProp="name" palette={palette} size={size}>{label}</Span>
              </Link>
              {!isLast ? <Span size={size}>/</Span> : null}
            </li>
          );
        })
      }
    </ol>
  </Wrapper>
));

BreadCrumb.propTypes = {
  items: arrayOf(shape({
    label: string.isRequired,
    path: string.isRequired,
    event: object,
  })).isRequired,
  innerRef: object,
  size: textPropType,
  pad: string,
};

BreadCrumb.defaultProps = {
  size: 'tiny',
  pad: 'large',
};

export default BreadCrumb;
