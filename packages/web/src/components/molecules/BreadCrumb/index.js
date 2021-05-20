import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string, object } from 'prop-types';

import { size } from 'sly/common/components/themes';
import { text as textPropType } from 'sly/common/propTypes/text';
import { Link, Block } from 'sly/common/components/atoms';
import { Span } from 'sly/web/components/atoms';

const getSize = p => size('text', p.size);

const Wrapper = styled(Block)`
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

      .separator {
        margin: 0 ${size('spacing.regular')};
      }
    }
  }
`;

const BreadCrumb = ({ items, innerRef, size, ...props }) => (
  <Wrapper ref={innerRef} size={size} as="nav" {...props}>
    <ol itemScope itemType="http://schema.org/BreadcrumbList">
      {
        items.map((item, index) => {
          const { label, path, event } = item;

          const isLast = index === items.length - 1;
          const palette = isLast
            ? 'slate'
            : 'primary';

          const content = (
            <>
              <meta itemProp="position" content={index + 1} />
              <Span itemProp="name" palette={palette} size={size}>{label}</Span>
            </>
          );

          return (
            <li
              key={path}
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              {!isLast &&
                <Link itemProp="item" to={path} event={event}>
                  {content}
                </Link>
              }
              {isLast && content}
              {!isLast && <Span className="separator" size={size}>/</Span>}
            </li>
          );
        })
      }
    </ol>
  </Wrapper>
);

BreadCrumb.propTypes = {
  items: arrayOf(shape({
    label: string.isRequired,
    path: string.isRequired,
    event: object,
  })).isRequired,
  innerRef: object,
  size: textPropType,
};

BreadCrumb.defaultProps = {
  size: 'caption',
};

export default BreadCrumb;
