import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string, object } from 'prop-types';

import { size } from 'sly/components/themes';
import { Link, Span } from 'sly/components/atoms';

const Wrapper = styled.nav`
  margin-bottom: ${size('spacing.large')};

  ol {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      display: inline-block;
      text-transform: capitalize;

      span:not(:first-child) {
        margin: 0 ${size('spacing.regular')};
      }
    }
  }
`;

const BreadCrumb = ({ items, innerRef, size }) => (
  <Wrapper innerRef={innerRef}>
    <ol itemScope itemType="http://schema.org/BreadcrumbList">
      {
        items.map((item, key) => {
          const { label, path } = item;

          return (
            <li
              key={path}
              itemProp="itemListElement"
              itemScope
              itemType="http://schema.org/ListItem"
            >
              {key === items.length - 1 ?
                <Span itemProp="name" size={size}>{label}</Span>
              :
                <Link itemProp="item" to={path}>
                  <Span itemProp="name" palette="primary" size={size}>{label}</Span>
                </Link>
              }
              {key < items.length - 1 ? <Span>/</Span> : null}
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
  })).isRequired,
  innerRef: object,
  size: string,
};

export default BreadCrumb;
