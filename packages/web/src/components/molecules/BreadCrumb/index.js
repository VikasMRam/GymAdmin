import React from 'react';
import styled from 'styled-components';
import { oneOf, arrayOf, shape, string, object } from 'prop-types';


import theme from 'sly/common/system/theme';
import { Link, Block, Span, font, space } from 'sly/common/system';


const getSize = p => font(p.size);

const Wrapper = styled(Block)`
  ol {
    display: block;
    list-style-type: none;
    margin: 0;
    padding: 0;
    font: ${getSize};

    li {
      display: inline-block;
      text-transform: capitalize;
      font: ${getSize};

      .separator {
        margin: 0 ${space('xs')};
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
          const color = isLast
            ? 'slate'
            : 'primary';

          const content = (
            <>
              <meta itemProp="position" content={index + 1} />
              <Span itemProp="name" color={color} size={size}>{label}</Span>
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
  size: oneOf(Object.getOwnPropertyNames(theme.fonts)),
};

BreadCrumb.defaultProps = {
  size: 'body-s',
};

export default BreadCrumb;
